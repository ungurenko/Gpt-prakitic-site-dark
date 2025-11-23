import React from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { Module } from '../../types';

interface AccordionProps {
  module: Module;
  isOpen: boolean;
  onClick: () => void;
}

export const Accordion: React.FC<AccordionProps> = ({ module, isOpen, onClick }) => {
  return (
    <div 
      className={`
        rounded-[2rem] overflow-hidden transition-all duration-300 border
        ${isOpen 
          ? 'bg-dark-700 border-neon-pink/30 shadow-neon' 
          : 'bg-dark-800 border-dark-600 hover:border-dark-500'
        }
      `}
    >
      <button
        onClick={onClick}
        className="w-full px-6 md:px-8 py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <div className="flex items-center gap-6">
          <div 
            className={`
              w-12 h-12 rounded-full flex items-center justify-center text-lg font-display font-bold transition-all duration-300 shrink-0
              ${isOpen 
                ? 'bg-neon-pink text-dark-900 rotate-0' 
                : 'bg-dark-600 text-gray-400 group-hover:text-white group-hover:bg-dark-500'
              }
            `}
          >
            {module.id}
          </div>
          <h3 
            className={`
              text-lg md:text-xl font-display font-medium transition-colors duration-300
              ${isOpen ? 'text-white' : 'text-gray-400 group-hover:text-white'}
            `}
          >
            {module.title}
          </h3>
        </div>
        <span className={`
          w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
          ${isOpen ? 'bg-dark-600 text-neon-pink rotate-180' : 'bg-transparent text-gray-600'}
        `}>
          <ChevronDown className="w-5 h-5" />
        </span>
      </button>
      
      <div 
        className={`
          overflow-hidden transition-all duration-500 ease-in-out
          ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-6 md:px-8 pb-8 ml-0 md:ml-[4.5rem]">
          <ul className="space-y-4 mb-8">
            {module.points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-4 text-gray-300 font-light leading-relaxed">
                <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-neon-lime shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          
          <div className="bg-dark-900/50 border border-dark-600 rounded-3xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="relative flex gap-4 items-start">
              <div className="p-2 bg-neon-lime rounded-full text-dark-900 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold uppercase tracking-widest text-neon-lime mb-2">Результат</span>
                <p className="text-white font-medium font-display text-lg leading-relaxed">
                  {module.result}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};