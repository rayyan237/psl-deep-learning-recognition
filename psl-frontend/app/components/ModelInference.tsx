'use client';

import React, { useState } from 'react';
import { Upload, Layers, Cpu } from 'lucide-react';

export default function ModelInference() {
  const [selectedModel, setSelectedModel] = useState('transfer');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<{ class_name: string; confidence: number; model_used: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileToUpload(file);
      setImagePreview(URL.createObjectURL(file));
      setPrediction(null);
      setError(null);
    }
  };

  const handlePredict = async () => {
    if (!fileToUpload) {
      setError('Baraye meharbani pehle koi sign image upload karein!');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('model_type', selectedModel);

    try {
      // Live Render FastAPI Backend Call
      const response = await fetch('https://psl-recognition-api.onrender.com/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Backend response failed');
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError('Connection error! Render free tier sleep mode mein ho sakta hai, 30 seconds baad dobara try karein.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demo" className="max-w-4xl mx-auto px-6 py-12 border-t border-slate-800">
      <div className="text-center mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/50 text-cyan-400 text-xs font-semibold mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>Live Render FastAPI Backend Connected</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Live Model Inference Engine</h2>
        <p className="text-slate-400">Upload an image to get real-time prediction from deployed `.h5` models.</p>
      </div>

      <div className="p-8 rounded-2xl bg-[#161b22] border border-slate-800 shadow-xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Select Architecture:</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-[#0d1117] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="transfer">MobileNetV2 (Transfer Learning)</option>
                <option value="scratch">Custom CNN (From Scratch)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Upload Sign Image:</label>
              <div className="border-2 border-dashed border-slate-700 hover:border-cyan-400 rounded-xl p-6 text-center cursor-pointer bg-[#0d1117]/50 transition">
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                  <Upload className="w-10 h-10 text-cyan-400 mb-2" />
                  <span className="text-sm font-medium text-white">Click to browse image</span>
                </label>
              </div>
            </div>

            <button
              onClick={handlePredict}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition disabled:opacity-50 shadow-lg shadow-cyan-500/10"
            >
              {loading ? 'Running Inference on Render...' : 'Run Prediction'}
            </button>
          </div>

          <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-[#0d1117] border border-slate-800 min-h-[280px]">
            {imagePreview ? (
              <div className="w-40 h-40 mb-4 rounded-lg overflow-hidden border border-slate-700">
                <img src={imagePreview} alt="Uploaded Sign" className="object-cover w-full h-full" />
              </div>
            ) : (
              <div className="text-slate-600 mb-4 flex flex-col items-center">
                <Layers className="w-12 h-12 mb-2 opacity-40" />
                <p className="text-sm">Image preview here</p>
              </div>
            )}

            {error && <p className="text-red-400 text-xs text-center mb-2">{error}</p>}

            {prediction && (
              <div className="text-center w-full bg-slate-900 p-4 rounded-xl border border-cyan-900/50">
                <p className="text-xs text-slate-400 uppercase">{prediction.model_used}</p>
                <h4 className="text-2xl font-black text-cyan-400 my-1">{prediction.class_name}</h4>
                <p className="text-sm text-slate-300">Confidence: <span className="font-bold text-white">{prediction.confidence}%</span></p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}