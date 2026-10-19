import React, { useState, useEffect } from 'react';
import { X, Printer, Copy, Check, ExternalLink, Download, FileText, Phone, Mail, MapPin } from 'lucide-react';
import { KENDREW_PROFILE } from '../data/kendrewData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const plainTextResume = `
KENDREW GONZAGA
Cebu City, Philippines
${KENDREW_PROFILE.phone}
${KENDREW_PROFILE.email}
GitHub: ${KENDREW_PROFILE.github}
Facebook: ${KENDREW_PROFILE.facebook}
Instagram: ${KENDREW_PROFILE.instagram}

PROFESSIONAL SUMMARY
${KENDREW_PROFILE.summary}

CORE SKILLS
Technical Support:
${KENDREW_PROFILE.coreSkills.technicalSupport.map(s => `• ${s}`).join('\n')}

Software Development:
${KENDREW_PROFILE.coreSkills.softwareDevelopment.map(s => `• ${s}`).join('\n')}

TECHNICAL SKILLS
Technical Support:
${KENDREW_PROFILE.technicalSkills.itSupport.map(s => `• ${s}`).join('\n')}

Software Development:
${KENDREW_PROFILE.technicalSkills.softwareDev.map(s => `• ${s}`).join('\n')}

PROFESSIONAL EXPERIENCES
${KENDREW_PROFILE.experiences.map(exp => `
${exp.role}
${exp.company}
${exp.period}
${exp.bullets.map(b => `• ${b}`).join('\n')}
`).join('\n')}

EDUCATION
COLLEGE (2021 – 2024)
Universidad De Zamboanga
Bachelor of Information Technology

SENIOR HIGH SCHOOL (2018 – 2020)
Baliwasan Senior High School - Stand Alone
Information and Communication Technology
With Honors

JUNIOR HIGH SCHOOL
Zamboanga National High School West
Information and Communication Technology

CERTIFICATION
${KENDREW_PROFILE.certifications.map(c => `• ${c}`).join('\n')}

REFERENCES
- AVAILABLE UPON REQUEST
`.trim();

  const handleCopyText = () => {
    navigator.clipboard.writeText(plainTextResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0c0e15] border-2 border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-slate-800 bg-slate-900/90 shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono uppercase text-white font-bold">
              Official Resume — Kendrew Gonzaga
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm shadow-amber-400/20"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer ml-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formatted Resume Body (White paper document style or dark clean view) */}
        <div className="p-6 sm:p-12 overflow-y-auto bg-white text-slate-900 font-sans selection:bg-amber-200 selection:text-slate-900 print:p-0">
          {/* Header */}
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pb-5 border-b-2 border-slate-900">
            <div className="space-y-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-slate-950 uppercase">
                {KENDREW_PROFILE.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-700 font-medium">
                {KENDREW_PROFILE.location} · {KENDREW_PROFILE.phone}
              </p>
              <div className="text-xs sm:text-sm text-slate-700 flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-1">
                <a href={`mailto:${KENDREW_PROFILE.email}`} className="text-blue-700 hover:underline">
                  {KENDREW_PROFILE.email}
                </a>
                <span>·</span>
                <a href={KENDREW_PROFILE.github} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                  github.com/Kendz16
                </a>
                <span>·</span>
                <a href={KENDREW_PROFILE.facebook} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                  fb/kendrew.gonzaga
                </a>
                <span>·</span>
                <a href={KENDREW_PROFILE.instagram} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                  @kendrew03_16
                </a>
              </div>
            </div>

            <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-slate-300 shrink-0 shadow-md">
              <img
                src={KENDREW_PROFILE.avatar}
                alt="Kendrew Gonzaga"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Professional Summary */}
          <section className="space-y-2 mb-6">
            <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-center text-slate-950">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed text-justify">
              {KENDREW_PROFILE.summary}
            </p>
          </section>

          <hr className="border-t border-slate-300 my-5" />

          {/* Core Skills */}
          <section className="space-y-3 mb-6">
            <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-center text-slate-950">
              CORE SKILL
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Technical Support</h3>
                <ul className="space-y-1 text-slate-800">
                  {KENDREW_PROFILE.coreSkills.technicalSupport.map((skill) => (
                    <li key={skill} className="flex items-start gap-2">
                      <span className="text-slate-600 font-bold">•</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-2">Software Development</h3>
                <ul className="space-y-1 text-slate-800">
                  {KENDREW_PROFILE.coreSkills.softwareDevelopment.map((skill) => (
                    <li key={skill} className="flex items-start gap-2">
                      <span className="text-slate-600 font-bold">•</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <hr className="border-t-2 border-slate-900 my-5" />

          {/* Technical Skills */}
          <section className="space-y-3 mb-6">
            <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-center text-slate-950">
              TECHNICAL SKILL
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div>
                <ul className="space-y-1 text-slate-800">
                  {KENDREW_PROFILE.technicalSkills.itSupport.map((skill) => (
                    <li key={skill} className="flex items-start gap-2">
                      <span className="text-slate-600 font-bold">•</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <ul className="space-y-1 text-slate-800">
                  {KENDREW_PROFILE.technicalSkills.softwareDev.map((skill) => (
                    <li key={skill} className="flex items-start gap-2">
                      <span className="text-slate-600 font-bold">•</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <hr className="border-t-2 border-slate-900 my-6" />

          {/* Professional Experiences */}
          <section className="space-y-5 mb-6">
            <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-center text-slate-950">
              PROFESSIONAL EXPERIENCES
            </h2>

            <div className="space-y-5">
              {KENDREW_PROFILE.experiences.map((exp, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <h3 className="font-bold text-slate-950 text-sm">
                      {exp.role}
                    </h3>
                    <span className="text-xs text-slate-600 font-medium">
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-700 italic">
                    {exp.company}
                  </div>
                  <ul className="space-y-1 text-xs text-slate-800 pl-1 pt-1">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-slate-600 font-bold">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-t-2 border-slate-900 my-6" />

          {/* Education */}
          <section className="space-y-3 mb-6">
            <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-center text-slate-950">
              EDUCATION
            </h2>

            <div className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <div className="font-bold text-slate-950">COLLEGE (2021 – 2024)</div>
                <div className="text-slate-800">Universidad De Zamboanga</div>
                <div className="text-slate-700 italic">Bachelor of Information Technology</div>
              </div>

              <div>
                <div className="font-bold text-slate-950">SENIOR HIGH SCHOOL (2018 – 2020)</div>
                <div className="text-slate-800">Baliwasan Senior High School - Stand Alone</div>
                <div className="text-slate-700">Information and Communication Technology</div>
                <div className="text-slate-800 font-semibold italic">With Honors</div>
              </div>

              <div>
                <div className="font-bold text-slate-950">JUNIOR HIGH SCHOOL</div>
                <div className="text-slate-800">Zamboanga National High School West</div>
                <div className="text-slate-700">Information and Communication Technology</div>
              </div>
            </div>
          </section>

          <hr className="border-t-2 border-slate-900 my-6" />

          {/* Certification */}
          <section className="space-y-2 mb-6">
            <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-center text-slate-950">
              CERTIFICATION
            </h2>
            <ul className="space-y-1 text-xs sm:text-sm text-slate-800 pl-2">
              {KENDREW_PROFILE.certifications.map((cert) => (
                <li key={cert} className="flex items-start gap-2">
                  <span className="text-slate-600 font-bold">•</span>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </section>

          <hr className="border-t-2 border-slate-900 my-6" />

          {/* References */}
          <section className="space-y-2">
            <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-center text-slate-950">
              REFERENCES
            </h2>
            <p className="text-xs text-center text-slate-700 font-mono">
              - AVAILABLE UPON REQUEST -
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
