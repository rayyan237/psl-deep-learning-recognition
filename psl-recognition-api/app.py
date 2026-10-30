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
        # Read image file bytes
        contents = await file.read()
        img = Image.open(BytesIO(contents)).convert("RGB")
        
        # Resize image according to model requirement (e.g., 128x128)
        img = img.resize((128, 128))
        
        # Convert to array and normalize
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x = x / 255.0  # Normalization

        # Select model based on user choice
        if model_type == "scratch":
            if 'custom_cnn_model' not in globals():
                raise HTTPException(status_code=500, detail="Custom CNN model not loaded.")
            preds = custom_cnn_model.predict(x)
            model_used_name = "Custom CNN Model"
        else:
            if 'transfer_model' not in globals():
                raise HTTPException(status_code=500, detail="Transfer Learning model not loaded.")
            preds = transfer_model.predict(x)
            model_used_name = "MobileNetV2 Transfer Learning"

        # Get highest probability index safely
        predicted_index = int(np.argmax(preds[0]))
        confidence = float(np.max(preds[0])) * 100

        # Safe guard for class index out of bounds
        if predicted_index < len(CLASS_NAMES):
            class_name = CLASS_NAMES[predicted_index]
        else:
            class_name = f"Class_{predicted_index}"

        return {
            "class_name": class_name,
            "confidence": round(confidence, 2),
            "model_used": model_used_name
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)