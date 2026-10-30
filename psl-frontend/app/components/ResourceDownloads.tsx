import React from 'react';
import { Database, FileText, Presentation, Server, Code, Download, Video, ExternalLink } from 'lucide-react';

export default function ResourceDownloads() {
  const resources = [
    { 
      title: 'YouTube Presentation Video', 
      desc: 'Watch project walkthrough & live evaluation demo', 
      icon: Video, 
      link: 'https://youtu.be/Pz0zrVCs3Lc', 
      isExternal: true,
      buttonText: 'Watch Demo Video'
    },
    { 
      title: 'Render Live API Endpoint', 
      desc: 'FastAPI backend live service & docs', 
      icon: Server, 
      link: 'https://psl-recognition-api.onrender.com', 
      isExternal: true,
      buttonText: 'Open Live API'
    },
    { 
      title: 'Dataset (Google Drive Zip)', 
      desc: 'Wasif Ullah PSL Dataset (7,242 images, 37 classes)', 
      icon: Database, 
      link: 'https://drive.google.com/uc?export=download&id=17H6LtnTisLDx5bDkKUp4EzUNZw3GUKJ9', 
      isExternal: true,
      buttonText: 'Download Dataset Zip'
    },
    { 
      title: 'Academic Report (.pdf)', 
      desc: 'Complete methodology & evaluation findings', 
      icon: FileText, 
      link: '/downloads/PSL_Project_Report.pdf', 
      fileName: 'PSL_Project_Report.pdf',
      isExternal: false,
      buttonText: 'Download Report PDF'
    },
    { 
      title: 'Presentation Slides (.pptx)', 
      desc: 'Complete slide deck for final evaluation', 
      icon: Presentation, 
      link: '/downloads/Pakistan Sign Language (PSL) Recognition System.pptx', 
      fileName: 'Pakistan Sign Language (PSL) Recognition System.pptx',
      isExternal: false,
      buttonText: 'Download Slides'
    },
    { 
      title: 'Jupyter Notebook (.ipynb)', 
      desc: 'Full training pipeline & evaluation code', 
      icon: Code, 
      link: '/downloads/Pakistan_Sign_Language_(PSL)_Deep_Learning_Recognition_System.ipynb', 
      fileName: 'Pakistan_Sign_Language_(PSL)_Deep_Learning_Recognition_System.ipynb',
      isExternal: false,
      buttonText: 'Download Notebook'
    },
    { 
      title: 'Custom CNN Model (.h5)', 
      desc: 'Custom trained CNN model weights file', 
      icon: Server, 
      link: '/downloads/psl_custom_cnn.h5', 
      fileName: 'psl_custom_cnn.h5',
      isExternal: false,
      buttonText: 'Download CNN (.h5)'
    },
    { 
      title: 'MobileNetV2 Model (.h5)', 
      desc: 'Transfer Learning model weights file', 
      icon: Server, 
      link: '/downloads/psl_transfer_learning.h5', 
      fileName: 'psl_transfer_learning.h5',
      isExternal: false,
      buttonText: 'Download MobileNet (.h5)'
    }
  ];

  return (
    <section id="resources" className="max-w-6xl mx-auto px-6 py-12 border-t border-slate-800">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-3">Project Resource Download Center</h2>
        <p className="text-slate-400">Click any card below to instantly download project artifacts or dataset.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {resources.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="p-6 rounded-2xl bg-[#161b22] border border-slate-800 flex flex-col justify-between hover:border-cyan-500/50 transition">
              <div>
                <Icon className="w-8 h-8 text-cyan-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-slate-400 mb-6">{item.desc}</p>
              </div>
              <a
                href={item.link}
                {...(item.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : { download: item.fileName })}
                className="flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold transition border border-slate-700"
              >
                {item.isExternal ? <ExternalLink className="w-4 h-4 text-cyan-400" /> : <Download className="w-4 h-4 text-cyan-400" />}
                <span>{item.buttonText}</span>
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}