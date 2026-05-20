'use client';

import { useState } from 'react';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = useTranslations('FAQ');

  const faqs = [
    { question: t('q1'), answer: t('a1') },
    { question: t('q2'), answer: t('a2') },
    { question: t('q3'), answer: t('a3') },
    { question: t('q4'), answer: t('a4') },
    { question: t('q5'), answer: t('a5') }
  ];

  return (
    <section className="py-24 bg-zinc-900 relative">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-gold tracking-[0.25em] uppercase mb-3 flex items-center justify-center gap-2">
            <MessageCircleQuestion size={18} className="text-gold" /> {t('subtitle')}
          </h2>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider inline-block relative pb-4">
            {t('title')}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[3px] bg-gold rounded-full"></div>
          </h1>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border border-zinc-800 rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-zinc-800 border-gold/40' : 'bg-zinc-950 hover:border-zinc-700'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className={`font-semibold text-sm md:text-base ${isOpen ? 'text-gold' : 'text-zinc-200'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180 bg-gold/10 text-gold' : 'bg-zinc-900 text-zinc-500'}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
