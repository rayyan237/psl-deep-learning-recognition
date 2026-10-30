import React from 'react';
import ProblemSolution from './components/ProblemSolution';
import ModelInference from './components/ModelInference';
import ResourceDownloads from './components/ResourceDownloads';
import { Cpu, Video, User, BookOpen, Award } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d1117] text-[#c9d1d9] selection:bg-cyan-500 selection:text-black">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-[#161b22]/80 px-6 py-4 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <Cpu className="w-6 h-6 text-cyan-400" />
          <span className="font-bold text-lg text-white">PSL-Net <span className="text-cyan-400">AI</span></span>
        </div>
        <div className="flex space-x-6 text-sm items-center">
          <a href="#problem-solution" className="hover:text-cyan-400 transition">Problem & Solution</a>
          <a href="#demo" className="hover:text-cyan-400 transition">Live Demo</a>
          <a href="#resources" className="hover:text-cyan-400 transition">Downloads</a>
          <a 
            href="https://youtu.be/Pz0zrVCs3Lc" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-red-600/20 border border-red-500/30 text-red-400 hover:bg-red-600/30 transition text-xs font-semibold"
          >
            <Video className="w-4 h-4" />
            <span>Watch Demo</span>
          </a>
        </div>
      </nav>

      {/* Hero Header with Student Details */}
      <header className="text-center py-16 px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-800/50 text-cyan-400 text-xs font-medium mb-6">
          <Award className="w-3.5 h-3.5" />
          <span>Superior University • BSCS Final Project Evaluation</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Pakistan Sign Language <span className="text-cyan-400">Recognition System</span>
        </h1>
        
        <p className="text-slate-400 text-lg mb-8">
          Production-grade Deep Learning semester project featuring multi-model inference.
        </p>

        {/* Student Credentials Badge */}
        <div className="inline-grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-2xl bg-[#161b22] border border-slate-800 text-left text-sm max-w-2xl mx-auto shadow-lg">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <p className="text-xs text-slate-500">Student Name</p>
              <p className="font-semibold text-white">Muhammad Rayyan Tariq</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <BookOpen className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <p className="text-xs text-slate-500">Roll Number</p>
              <p className="font-semibold text-white">SU92-BSCSM-F23-237</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Cpu className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <p className="text-xs text-slate-500">Class & Section</p>
              <p className="font-semibold text-white">BSCS 7A</p>
            </div>
          </div>
        </div>
      </header>

      {/* 1. Problem & Solution Section First */}
      <ProblemSolution />

      {/* 2. Live Model Inference Section */}
      <ModelInference />

      {/* 3. Resource Downloads Center */}
      <ResourceDownloads />

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-xs text-slate-500">
        Pakistan Sign Language Recognition System • Muhammad Rayyan Tariq (SU92-BSCSM-F23-237)
      </footer>
    </main>
  );
}