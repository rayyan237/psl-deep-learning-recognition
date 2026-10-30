
import os
import json
import numpy as np
import uvicorn

from io import BytesIO
from PIL import Image

from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image


# ==========================================
# 1. FASTAPI APPLICATION
# ==========================================

app = FastAPI(title="PSL Recognition API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# 2. PROJECT FILE PATHS
# ==========================================

MODEL_DIR = os.path.dirname(os.path.abspath(__file__))

custom_cnn_path = os.path.join(
    MODEL_DIR, "psl_custom_cnn.h5"
)

transfer_model_path = os.path.join(
    MODEL_DIR, "psl_transfer_learning.h5"
)

class_names_path = os.path.join(
    MODEL_DIR, "class_names.json"
)


# ==========================================
# 3. LOAD CLASS NAMES
# ==========================================

try:
    with open(class_names_path, "r") as f:
        CLASS_NAMES = json.load(f)

    if len(CLASS_NAMES) != 37:
        raise ValueError(
            f"Expected 37 classes, found {len(CLASS_NAMES)}"
        )

    print("Class names loaded successfully!")
    print("Total classes:", len(CLASS_NAMES))

except Exception as e:
    raise RuntimeError(f"Class names loading failed: {e}")


# ==========================================
# 4. LOAD TRAINED MODELS
# ==========================================

try:
    custom_cnn_model = load_model(custom_cnn_path)
    print("Custom CNN Model Loaded Successfully!")

except Exception as e:
    raise RuntimeError(f"Custom CNN loading failed: {e}")


try:
    transfer_model = load_model(transfer_model_path)
    print("Transfer Learning Model Loaded Successfully!")

except Exception as e:
    raise RuntimeError(f"Transfer Learning loading failed: {e}")


# ==========================================
# 5. HOME ROUTE
# ==========================================

@app.get("/")
def home():
    return {
        "status": "PSL FastAPI Backend is Running Successfully!",
        "classes": len(CLASS_NAMES),
        "models": [
            "Custom CNN",
            "MobileNetV2 Transfer Learning"
        ]
    }


# ==========================================
# 6. IMAGE PREDICTION ROUTE
# ==========================================

@app.post("/predict")
async def predict(
    file: UploadFile = File(...),
    model_type: str = Form("transfer")
):

    try:
        # Validate image
        if not file.content_type or not file.content_type.startswith("image/"):
            raise HTTPException(
                status_code=400,
                detail="Please upload a valid image."
            )

        # Read uploaded image
        contents = await file.read()

        img = Image.open(
            BytesIO(contents)
        ).convert("RGB")

        # Resize image
        img = img.resize((128, 128))

        # Convert image to array
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)

        # IMPORTANT:
        # Do not normalize here.
        # Both models contain their own Rescaling layer.

        # Select model
        if model_type == "scratch":

            model = custom_cnn_model
            model_used_name = "Custom CNN Model"

        elif model_type == "transfer":

            model = transfer_model
            model_used_name = "MobileNetV2 Transfer Learning"

        else:

            raise HTTPException(
                status_code=400,
                detail="Invalid model type. Use 'scratch' or 'transfer'."
            )

        # Generate predictions
        preds = model.predict(x, verbose=0)

        # Validate output
        if preds.shape[-1] != len(CLASS_NAMES):
            raise ValueError(
                "Model output classes do not match class_names.json"
            )

        # Get predicted class
        predicted_index = int(np.argmax(preds[0]))

        confidence = float(
            np.max(preds[0]) * 100
        )

        class_name = CLASS_NAMES[predicted_index]

        # Return response
        return {
            "class_name": class_name,
            "confidence": round(confidence, 2),
            "model_used": model_used_name
        }

    except HTTPException:
        raise

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# ==========================================
# 7. RUN SERVER
# ==========================================

if __name__ == "__main__":

    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 8000))
    )
