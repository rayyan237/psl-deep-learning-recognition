import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function ProblemSolution() {
  return (
    <section id="problem-solution" className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">Problem Statement & Deep Learning Solution</h2>
        <p className="text-slate-400">Bridging the communication gap for the hearing-impaired community in Pakistan.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Problem */}
        <div className="p-8 rounded-2xl bg-[#161b22] border border-red-900/30 relative overflow-hidden">
          <div className="flex items-center space-x-3 mb-4">
            <AlertCircle className="w-6 h-6 text-red-400" />
            <h3 className="text-xl font-bold text-white">The Core Problem</h3>
          </div>
          <p className="text-slate-300 leading-relaxed mb-4">
            The speech and hearing-impaired community in Pakistan faces severe communication barriers due to a lack of standardized digital tools and a scarcity of certified sign language interpreters in public and educational sectors.
          </p>
          <ul className="space-y-2 text-sm text-slate-400 list-disc list-inside">
            <li>Absence of automated translation tools for Pakistan Sign Language (PSL).</li>
            <li>High intra-class visual variance and structural similarity among regional signs.</li>
            <li>Need for lightweight models capable of running on standard hardware.</li>
          </ul>
        </div>

        {/* Solution */}
        <div className="p-8 rounded-2xl bg-[#161b22] border border-cyan-900/30 relative overflow-hidden">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">The Deep Learning Solution</h3>
          </div>
          <p className="text-slate-300 leading-relaxed mb-4">
            A robust multi-model computer vision pipeline trained on Wasif Ullah's Kaggle PSL dataset (37 classes, 7,242 images) featuring a custom CNN and MobileNetV2 Transfer Learning architecture.
          </p>
          <ul className="space-y-2 text-sm text-slate-400 list-disc list-inside">
            <li><strong>Model A:</strong> Custom Convolutional Neural Network from scratch.</li>
            <li><strong>Model B:</strong> Fine-tuned MobileNetV2 Transfer Learning model.</li>
            <li>Decoupled deployment: FastAPI Backend on Render + Next.js Frontend on Vercel.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}