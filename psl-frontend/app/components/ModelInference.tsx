'use client';

import React, { useEffect, useState } from 'react';
import {
  Upload,
  Cpu,
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  X,
} from 'lucide-react';

type Prediction = {
  class_name: string;
  confidence: number;
  model_used: string;
};

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  'https://psl-recognition-api.onrender.com'
).replace(/\/$/, '');

export default function ModelInference() {
  const [selectedModel, setSelectedModel] = useState('transfer');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fileToUpload) {
      setImagePreview(null);
      return;
    }

    const url = URL.createObjectURL(fileToUpload);
    setImagePreview(url);

    return () => URL.revokeObjectURL(url);
  }, [fileToUpload]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be less than 10 MB.');
      return;
    }

    setFileToUpload(file);
    setPrediction(null);
    setError(null);
  };

  const handlePredict = async () => {
    if (!fileToUpload) {
      setError('Please upload a PSL gesture image first.');
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);

    const formData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('model_type', selectedModel);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.detail || `Prediction request failed (${response.status}).`
        );
      }

      if (
        !data?.class_name ||
        data?.confidence === undefined ||
        !data?.model_used
      ) {
        throw new Error('The backend returned an unexpected response.');
      }

      setPrediction(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? `${err.message} If the backend is waking up on Render, wait a little and try again.`
          : 'Could not connect to the prediction service.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demo" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3">
          Interactive Demonstration
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Try the PSL Recognition System
        </h2>
        <p className="text-slate-400 mt-4 leading-relaxed">
          Upload an image of a Pakistan Sign Language gesture and select
          a model to see its prediction.
        </p>
      </div>

      <div className="max-w-5xl mx-auto p-6 md:p-9 rounded-3xl bg-[#111927] border border-white/10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-cyan-400/10 flex items-center justify-center">
            <Cpu className="text-cyan-400" />
          </div>
          <div>
            <h3 className="font-bold text-white">Live Model Inference</h3>
            <p className="text-xs text-slate-500">Powered by FastAPI and TensorFlow</p>
          </div>
          <span className="ml-auto text-xs text-cyan-300 border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 rounded-full">
            API Connected
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Select Model Architecture
              </label>

              <select
                value={selectedModel}
                onChange={(e) => {
                  setSelectedModel(e.target.value);
                  setPrediction(null);
                  setError(null);
                }}
                className="w-full bg-[#080d17] border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="transfer">MobileNetV2 – Transfer Learning</option>
                <option value="scratch">Custom CNN – From Scratch</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Upload Gesture Image
              </label>

              <label
                htmlFor="psl-file-upload"
                className="flex flex-col items-center justify-center min-h-44 rounded-2xl border-2 border-dashed border-slate-700 hover:border-cyan-400 bg-[#080d17] cursor-pointer transition p-6 text-center"
              >
                <Upload className="w-9 h-9 text-cyan-400 mb-3" />
                <span className="text-sm font-semibold text-white">
                  Click to upload an image
                </span>
                <span className="text-xs text-slate-500 mt-2">
                  JPG, PNG or other image formats · Max 10 MB
                </span>
                <input
                  id="psl-file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {fileToUpload && (
                <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
                  <span className="truncate max-w-[80%]">{fileToUpload.name}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setFileToUpload(null);
                      setPrediction(null);
                      setError(null);
                    }}
                    className="text-slate-400 hover:text-red-400"
                    aria-label="Remove image"
                  >
                    <X size={17} />
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handlePredict}
              disabled={loading || !fileToUpload}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-cyan-400 text-slate-950 font-bold hover:bg-cyan-300 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={19} />
                  Running Prediction...
                </>
              ) : (
                <>
                  <Cpu size={18} />
                  Run Prediction
                </>
              )}
            </button>

            {error && (
              <div className="p-4 rounded-xl border border-red-400/20 bg-red-400/5 text-red-300 text-sm leading-relaxed">
                {error}
              </div>
            )}
          </div>

          {/* Preview and result */}
          <div className="rounded-2xl bg-[#080d17] border border-white/10 p-5 min-h-[350px] flex flex-col items-center justify-center">
            {imagePreview ? (
              <div className="w-full flex flex-col items-center">
                <div className="w-48 h-48 rounded-2xl overflow-hidden border border-slate-700 bg-slate-900">
                  <img
                    src={imagePreview}
                    alt="Uploaded PSL gesture"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-3">Image ready for prediction</p>
              </div>
            ) : (
              <div className="text-center text-slate-600">
                <ImageIcon className="w-14 h-14 mx-auto mb-3 opacity-40" />
                <p className="text-sm">Your image preview will appear here</p>
              </div>
            )}

            {prediction && (
              <div className="w-full mt-6 p-5 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 text-center">
                <div className="flex items-center justify-center gap-2 text-cyan-300 text-xs font-semibold mb-3">
                  <CheckCircle2 size={15} /> PREDICTION COMPLETE
                </div>

                <p className="text-xs text-slate-400">{prediction.model_used}</p>

                <h3 className="text-3xl font-black text-cyan-300 mt-2">
                  {prediction.class_name}
                </h3>

                <p className="text-sm text-slate-300 mt-3">
                  Confidence:{' '}
                  <span className="font-bold text-white">
                    {Number(prediction.confidence).toFixed(2)}%
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}