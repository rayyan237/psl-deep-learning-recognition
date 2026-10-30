import os
import numpy as np
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import uvicorn
from io import BytesIO
from PIL import Image

app = FastAPI(title="PSL Recognition API")

# Enable CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Exact 37 Classes matching your dataset folders
CLASS_NAMES = [
    'Ain', 'Aliph', 'aRay', 'Bari yeh', 'Bay', 'Chay', 'Chhoti yeh', 
    'Daal', 'Ddaal', 'Dhaal', 'Dhuaad', 'Djay', 'Fay', 'Gaaf', 'Ghain', 
    'Hamza', 'Hay', 'hey', 'Jeem', 'Kaaf', 'Khay', 'Laam', 'Meem', 
    'Noon', 'Pay', 'Quaaf', 'Ray', 'Seen', 'Sheen', 'Suaad', 'Tay', 
    'Tey', 'Thay', 'Toay_n', 'Vao', 'Zay', 'Zoay_n'
]

# Load Models safely
MODEL_DIR = os.path.dirname(os.path.abspath(__file__))
custom_cnn_path = os.path.join(MODEL_DIR, "psl_custom_cnn.h5")
transfer_model_path = os.path.join(MODEL_DIR, "psl_transfer_learning.h5")

try:
    custom_cnn_model = load_model(custom_cnn_path)
    print("Custom CNN Model Loaded Successfully!")
except Exception as e:
    print(f"Error loading Custom CNN: {e}")

try:
    transfer_model = load_model(transfer_model_path)
    print("Transfer Learning Model Loaded Successfully!")
except Exception as e:
    print(f"Error loading Transfer Learning Model: {e}")

@app.get("/")
def home():
    return {"status": "PSL FastAPI Backend is Running Successfully!"}

@app.post("/predict")
async def predict(file: UploadFile = File(...), model_type: str = Form("transfer")):
    try:
        # Read uploaded image
        contents = await file.read()
        img = Image.open(BytesIO(contents)).convert("RGB")

        # Resize image
        img = img.resize((128, 128))

        # Convert to array (NO external normalization)
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)

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
                detail="Invalid model type. Use scratch or transfer."
            )

        # Predict
        preds = model.predict(x, verbose=0)

        predicted_index = int(np.argmax(preds[0]))
        confidence = float(np.max(preds[0])) * 100

        # Get correct class name
        class_name = CLASS_NAMES[predicted_index]

        return {
            "class_name": class_name,
            "confidence": round(confidence, 2),
            "model_used": model_used_name
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)