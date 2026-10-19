import React from 'react';
import { Download, GraduationCap, Code2, Wrench, CheckCircle, Award, Briefcase } from 'lucide-react';
import { KENDREW_PROFILE } from '../data/kendrewData';

interface AboutSectionProps {
  onDownloadResume: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onDownloadResume }) => {
  return (
    <section id="about" className="py-8 sm:py-12">
      {/* Centered Title matching the wireframe Screen 2 */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-mono">
          About Me
        </h2>
      </div>

      {/* Outer Card Container matching the wireframe */}
      <div className="bg-[#0b0d14] border-2 border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Block: ABOUT ME text & Download Resume Button */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-white font-mono tracking-wide uppercase">
                ABOUT ME
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {KENDREW_PROFILE.summary}
              </p>

              {/* Education Accordion / Box */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold uppercase">
                  <GraduationCap className="w-4 h-4" />
                  <span>Educational History</span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <span className="font-bold text-white">Universidad De Zamboanga</span>
                    <span className="font-mono text-slate-400">2021 – 2024</span>
                  </div>
                  <div className="text-slate-400 italic">Bachelor of Information Technology</div>

                  <div className="pt-1 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between">
                    <span className="text-slate-300">Baliwasan Senior High School - Stand Alone</span>
                    <span className="font-mono text-emerald-400 font-medium">With Honors (2018 – 2020)</span>
                  </div>
                </div>
              </div>

              {/* Certifications and Experience highlights */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span className="font-mono text-slate-300">
                    Certification: <strong className="text-white">ICT NCII Passer</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-amber-400" />
                  <span className="font-mono text-slate-300">
                    OJT & Remote Experience
                  </span>
                </div>
              </div>
            </div>

            {/* Download Resume Button at the bottom left matching the wireframe */}
            <div className="pt-2">
              <button
                onClick={onDownloadResume}
                className="px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-98 border-2 border-amber-400 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-amber-400/20"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </button>
            </div>
          </div>

          {/* Right Block: Technical Skills framed box matching the wireframe */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="h-full border-2 border-slate-700 rounded-2xl p-6 bg-slate-900/50 flex flex-col justify-between space-y-5">
              <div>
                <h4 className="text-lg font-bold text-white font-mono uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-amber-400" />
                  <span>Technical Skills</span>
                </h4>

                <div className="space-y-3.5">
                  {/* Software Development */}
                  <div>
                    <span className="text-xs font-mono uppercase text-slate-400 block mb-1.5 font-semibold">
                      Software Development
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {KENDREW_PROFILE.technicalSkills.softwareDev.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 text-xs font-mono bg-slate-950 border border-slate-800 text-amber-300 rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* IT Support & Diagnostics */}
                  <div>
                    <span className="text-xs font-mono uppercase text-slate-400 block mb-1.5 font-semibold">
                      Technical Support & Diagnostics
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {KENDREW_PROFILE.technicalSkills.itSupport.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 text-xs font-mono bg-slate-950 border border-slate-800 text-slate-200 rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Core Strengths */}
                  <div>
                    <span className="text-xs font-mono uppercase text-slate-400 block mb-1.5 font-semibold">
                      Core Capabilities
                    </span>
                    <div className="space-y-1">
                      {KENDREW_PROFILE.coreSkills.technicalSupport.slice(0, 4).map((cap) => (
                        <div key={cap} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between font-mono">
                <span>Cebu City, Philippines</span>
                <span className="text-amber-400">Available for Hire</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
