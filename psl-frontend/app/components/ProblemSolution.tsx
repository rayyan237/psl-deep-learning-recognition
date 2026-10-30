import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ProblemSolution() {
  return (
    <section id="problem-solution" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
      <div className="max-w-2xl mb-12">
        <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3">
          Problem & Approach
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          The challenge behind the project
        </h2>
        <p className="text-slate-400 mt-4 leading-relaxed">
          Exploring how image classification can help recognize static
          Pakistan Sign Language gestures.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-8 rounded-2xl bg-[#111927] border border-red-400/20">
          <div className="flex items-center gap-3 mb-5">
            <AlertCircle className="w-6 h-6 text-red-400" />
            <h3 className="text-xl font-bold text-white">The Problem</h3>
          </div>

          <p className="text-slate-400 leading-relaxed">
            People unfamiliar with Pakistan Sign Language may face difficulty
            understanding hand gestures. Accessible tools that can recognize
            PSL signs from images can help explore ways to reduce this
            communication gap.
          </p>

          <ul className="space-y-3 mt-6 text-sm text-slate-400">
            <li>• Limited familiarity with PSL gestures among non-signers.</li>
            <li>• Visual differences between hand gestures.</li>
            <li>• Need for a system that can classify multiple PSL signs.</li>
          </ul>
        </div>

        <div className="p-8 rounded-2xl bg-[#111927] border border-cyan-400/20">
          <div className="flex items-center gap-3 mb-5">
            <CheckCircle2 className="w-6 h-6 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Our Approach</h3>
          </div>

          <p className="text-slate-400 leading-relaxed">
            A deep learning image classification system trained on a
            Pakistan Sign Language dataset containing 37 gesture classes.
            Two model architectures are implemented and compared.
          </p>

          <ul className="space-y-3 mt-6 text-sm text-slate-400">
            <li>• Custom CNN trained from scratch.</li>
            <li>• MobileNetV2 with a frozen pre-trained feature extractor.</li>
            <li>• FastAPI backend connected to a Next.js interface.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}