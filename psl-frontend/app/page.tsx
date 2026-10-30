import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Database,
  Code2,
  Layers3,
  PlayCircle,
  ShieldCheck,
  Zap,
} from 'lucide-react';

import ModelInference from './components/ModelInference';
import ProblemSolution from './components/ProblemSolution';
import ResourceDownloads from './components/ResourceDownloads';

const GITHUB_URL = 'https://github.com/rayyan237/psl-deep-learning-recognition';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080d17] text-white selection:bg-cyan-400 selection:text-slate-950">

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#080d17]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-9 h-9 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-cyan-400" />
            </div>
            <span>PSL<span className="text-cyan-400">.AI</span></span>
          </a>

          <div className="hidden md:flex items-center gap-7 text-sm text-slate-400">
            <a href="#overview" className="hover:text-cyan-400 transition">Overview</a>
            <a href="#dataset" className="hover:text-cyan-400 transition">Dataset</a>
            <a href="#models" className="hover:text-cyan-400 transition">Models</a>
            <a href="#demo" className="hover:text-cyan-400 transition">Live Demo</a>
            <a href="#resources" className="hover:text-cyan-400 transition">Resources</a>
          </div>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 transition text-sm"
          >
            <Code2 size={16} />
            <span className="hidden sm:inline">GitHub</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-300 text-xs font-semibold mb-7">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              DEEP LEARNING SEMESTER PROJECT
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.08]">
              Understanding
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">
                Pakistan Sign Language
              </span>
              Through Deep Learning
            </h1>

            <p className="mt-7 text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl">
              An image-based PSL recognition system powered by two deep learning
              approaches: a Custom Convolutional Neural Network and MobileNetV2
              Transfer Learning.
            </p>

            <div className="flex flex-wrap gap-4 mt-9">
              <a
                href="#demo"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-400 text-slate-950 font-bold hover:bg-cyan-300 transition"
              >
                Try Live Demo <ArrowRight size={18} />
              </a>

              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-700 hover:border-cyan-400 transition font-semibold"
              >
                <Code2 size={18} /> View Source Code
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
            {[
              { value: '37', label: 'PSL Classes' },
              { value: '7,242', label: 'Dataset Images' },
              { value: '99.31%', label: 'Custom CNN Accuracy' },
              { value: '99.93%', label: 'MobileNetV2 Accuracy' },
            ].map((item) => (
              <div key={item.label} className="p-5 rounded-2xl border border-white/10 bg-white/[0.03]">
                <h3 className="text-2xl md:text-3xl font-bold text-cyan-300">{item.value}</h3>
                <p className="text-xs md:text-sm text-slate-500 mt-2">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section id="overview" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
        <div className="max-w-2xl mb-12">
          <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3">The Project</p>
          <h2 className="text-3xl md:text-4xl font-bold">A closer look at the system</h2>
          <p className="text-slate-400 mt-4 leading-relaxed">
            The project combines image classification, deep learning model
            training and web deployment into one interactive recognition system.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: Database,
              title: 'Image Dataset',
              desc: 'A dataset of 7,242 PSL gesture images organized into 37 classes.',
            },
            {
              icon: Layers3,
              title: 'Two Architectures',
              desc: 'A custom CNN trained from scratch and a MobileNetV2 transfer learning model.',
            },
            {
              icon: Zap,
              title: 'Live Prediction',
              desc: 'Upload a gesture image, choose a model and receive its predicted class.',
            },
          ].map((item) => (
            <div key={item.title} className="p-7 rounded-2xl bg-[#111927] border border-white/10 hover:border-cyan-400/40 transition">
              <item.icon className="w-8 h-8 text-cyan-400 mb-5" />
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mt-3">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Problem and Solution */}
      <ProblemSolution />

      {/* Dataset */}
      <section id="dataset" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3">Dataset</p>
            <h2 className="text-3xl md:text-4xl font-bold">37 classes. One recognition system.</h2>
            <p className="text-slate-400 mt-5 leading-relaxed">
              The project uses the Pakistan Sign Language dataset published
              on Kaggle by Wasif Ullah. The images are organized into 37
              gesture categories and prepared for image classification.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 rounded-xl bg-[#111927] border border-white/10">
                <p className="text-2xl font-bold text-cyan-300">128 × 128</p>
                <p className="text-xs text-slate-500 mt-1">Input Image Size</p>
              </div>
              <div className="p-4 rounded-xl bg-[#111927] border border-white/10">
                <p className="text-2xl font-bold text-cyan-300">80 / 20</p>
                <p className="text-xs text-slate-500 mt-1">Training / Validation</p>
              </div>
            </div>

            <a
              href="https://www.kaggle.com/datasets/wasifullahcs/dataset-pakistani-sign-language/data"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 text-cyan-300 font-semibold hover:text-cyan-200 transition"
            >
              Explore Kaggle Dataset <ArrowUpRight size={17} />
            </a>
          </div>

          <div className="p-7 rounded-2xl bg-[#111927] border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <Database className="text-cyan-400 w-6 h-6" />
              <h3 className="font-bold text-lg">Dataset Information</h3>
            </div>

            <div className="space-y-4 text-sm">
              {[
                ['Dataset source', 'Kaggle'],
                ['Total classes', '37'],
                ['Total images', '7,242'],
                ['Image format', 'RGB'],
                ['Input dimensions', '128 × 128'],
                ['Validation split', '20%'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 border-b border-white/5 pb-3">
                  <span className="text-slate-500">{label}</span>
                  <span className="text-slate-200 font-medium text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Models */}
      <section id="models" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3">Model Architectures</p>
          <h2 className="text-3xl md:text-4xl font-bold">Two approaches. One task.</h2>
          <p className="text-slate-400 mt-4">
            Both models were trained for the same 37-class PSL image classification task.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-8 rounded-2xl bg-[#111927] border border-white/10">
            <div className="flex justify-between items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-400/10">
                <BrainCircuit className="text-blue-300 w-7 h-7" />
              </div>
              <span className="text-xs px-3 py-1 rounded-full border border-blue-400/20 text-blue-300">
                Trained from Scratch
              </span>
            </div>
            <h3 className="text-2xl font-bold mt-6">Custom CNN</h3>
            <p className="text-slate-400 text-sm leading-relaxed mt-3">
              A custom convolutional architecture with three convolutional
              blocks, pooling layers, a dense classification layer and dropout.
            </p>
            <div className="mt-7 pt-5 border-t border-white/10">
              <p className="text-3xl font-bold text-cyan-300">99.31%</p>
              <p className="text-xs text-slate-500 mt-1">Validation Accuracy</p>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#111927] border border-cyan-400/30">
            <div className="flex justify-between items-start gap-4">
              <div className="p-3 rounded-xl bg-cyan-400/10">
                <Layers3 className="text-cyan-300 w-7 h-7" />
              </div>
              <span className="text-xs px-3 py-1 rounded-full border border-cyan-400/20 text-cyan-300">
                Transfer Learning
              </span>
            </div>
            <h3 className="text-2xl font-bold mt-6">MobileNetV2</h3>
            <p className="text-slate-400 text-sm leading-relaxed mt-3">
              A pre-trained MobileNetV2 feature extractor with additional
              pooling, dropout and dense classification layers for PSL.
            </p>
            <div className="mt-7 pt-5 border-t border-white/10">
              <p className="text-3xl font-bold text-cyan-300">99.93%</p>
              <p className="text-xs text-slate-500 mt-1">Validation Accuracy</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500 text-center mt-6">
          Accuracy values are from the project's validation results and do not represent independently verified real-world accuracy.
        </p>
      </section>

      {/* Live inference */}
      <ModelInference />

      {/* Resources */}
      <ResourceDownloads />

      {/* Footer */}
      <footer className="border-t border-white/10 mt-10">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <p className="font-bold text-lg">PSL<span className="text-cyan-400">.AI</span></p>
            <p className="text-xs text-slate-500 mt-1">Pakistan Sign Language Recognition System</p>
          </div>

          <p className="text-xs text-slate-500 text-center">
            Deep Learning Semester Project
          </p>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition"
          >
            <Code2 size={17} /> GitHub Repository <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>
    </main>
  );
}