from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
import io
from PIL import Image

app = FastAPI()

# CORS Enable karein taake Vercel ka frontend isay access kar sakay
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Loading Model A (Custom CNN)...")
model_scratch = tf.keras.models.load_model('psl_custom_cnn.h5')

print("Loading Model B (MobileNetV2 Transfer Learning)...")
model_transfer = tf.keras.models.load_model('psl_transfer_learning.h5')

# Apne 37 classes ki list yahan pure likhein
CLASS_NAMES = ['Aliph', 'Bay', 'Tey', 'Jeem', 'Seen', 'Meem'] # Isay apne saare 37 classes se complete kar lein

@app.get("/")
def home():
    return {"status": "PSL Multi-Model API is running successfully on Render!"}

@app.post("/predict")
async def predict(file: UploadFile = File(...), model_type: str = Form("transfer")):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    
    if model_type == "transfer":
        image = image.resize((128, 128))
        img_array = np.array(image) / 127.5 - 1.0 # MobileNetV2 preprocessing
        active_model = model_transfer
    else:
        image = image.resize((128, 128))
        img_array = np.array(image) / 255.0 # Custom CNN preprocessing
        active_model = model_scratch
        
    img_array = np.expand_dims(img_array, axis=0)
    
    preds = active_model.predict(img_array)
    pred_class_idx = np.argmax(preds[0])
    confidence = float(np.max(preds[0])) * 100
    
    return {
        "model_used": "MobileNetV2 (Transfer)" if model_type == "transfer" else "Custom CNN",
        "class_name": CLASS_NAMES[pred_class_idx % len(CLASS_NAMES)],
        "confidence": round(confidence, 2)
    }
