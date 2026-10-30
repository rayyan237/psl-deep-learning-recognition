import React from 'react';
import {
  Database,
  FileText,
  Presentation,
  Server,
  Code2,
  Download,
  Video,
  ExternalLink,
  
} from 'lucide-react';

const resources = [
  {
    title: 'GitHub Repository',
    desc: 'Complete source code, notebooks and trained model files.',
    icon: Code2,
    link: 'https://github.com/rayyan237/psl-deep-learning-recognition',
    external: true,
    button: 'View Repository',
  },
  {
    title: 'Kaggle Dataset',
    desc: 'Original Pakistan Sign Language dataset containing 37 classes.',
    icon: Database,
    link: 'https://www.kaggle.com/datasets/wasifullahcs/dataset-pakistani-sign-language/data',
    external: true,
    button: 'Explore Dataset',
  },
  {
    title: 'Live Backend API',
    desc: 'FastAPI service used for model inference.',
    icon: Server,
    link: 'https://psl-recognition-api.onrender.com/docs',
    external: true,
    button: 'Open API Docs',
  },
  {
    title: 'YouTube Presentation',
    desc: 'Project explanation and demonstration video.',
    icon: Video,
    link: 'https://youtu.be/Pz0zrVCs3Lc',
    external: true,
    button: 'Watch Video',
  },
  {
    title: 'Project Report',
    desc: 'Project methodology, model architectures and results.',
    icon: FileText,
    link: '/downloads/PSL_Project_Report.pdf',
    external: false,
    button: 'Download Report',
  },
  {
    title: 'Presentation Slides',
    desc: 'Slides prepared for the semester project presentation.',
    icon: Presentation,
    link: '/downloads/Pakistan%20Sign%20Language%20(PSL)%20Recognition%20System.pptx',
    external: false,
    button: 'Download PPT',
  },
  {
    title: 'Training Notebook',
    desc: 'Dataset preparation, model training and evaluation code.',
    icon: Code2,
    link: '/downloads/Pakistan_Sign_Language_(PSL)_Deep_Learning_Recognition_System.ipynb',
    external: false,
    button: 'Download Notebook',
  },
  {
    title: 'Custom CNN Model',
    desc: 'Trained Custom Convolutional Neural Network model.',
    icon: Server,
    link: '/downloads/psl_custom_cnn.h5',
    external: false,
    button: 'Download Model',
  },
  {
    title: 'MobileNetV2 Model',
    desc: 'Trained MobileNetV2 transfer learning model.',
    icon: Server,
    link: '/downloads/psl_transfer_learning.h5',
    external: false,
    button: 'Download Model',
  },
];

export default function ResourceDownloads() {
  return (
    <section id="resources" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
      <div className="max-w-2xl mb-12">
        <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3">
          Project Resources
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Explore the complete project
        </h2>
        <p className="text-slate-400 mt-4 leading-relaxed">
          Access the source code, dataset, trained models, report,
          presentation and project demonstration.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {resources.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="p-6 rounded-2xl bg-[#111927] border border-white/10 hover:border-cyan-400/40 transition flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-cyan-400/10 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-cyan-400" />
                </div>

                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <a
                href={item.link}
                {...(item.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : { download: true })}
                className="mt-6 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 hover:bg-cyan-400 hover:text-slate-950 text-white text-sm font-semibold transition"
              >
                {item.external ? <ExternalLink size={16} /> : <Download size={16} />}
                {item.button}
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}