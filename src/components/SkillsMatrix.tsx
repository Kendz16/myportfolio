import React, { useState } from 'react';
import { Search, CheckCircle, Terminal, Layers } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsMatrix: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = SKILL_CATEGORIES.map((category) => {
    if (!searchQuery) return category;
    const matchingSkills = category.skills.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.note.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...category, skills: matchingSkills };
  }).filter((category) => category.skills.length > 0);

  return (
    <section id="skills" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400/90 mb-2">
              04. Technical Capabilities & Philosophy
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-['Outfit']">
              Architecture, systems, and deep frontend craft.
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              A breakdown of production technologies, design principles, and core competencies cultivated across a decade.
            </p>
          </div>

          {/* Quick Filter Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search technologies or concepts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/80 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-500 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* 3 Domain Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredCategories.map((category) => (
            <div
              key={category.title}
              className="bg-slate-900/40 border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <h3 className="text-base font-bold text-white font-['Outfit'] mb-1">
                  {category.title}
                </h3>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  {category.description}
                </p>

                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="group">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-medium text-slate-200 group-hover:text-amber-400 transition-colors">
                          {skill.name}
                        </span>
                        <span className="font-mono text-[11px] text-amber-400/90 font-medium">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        {skill.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom footer note */}
              <div className="pt-6 mt-6 border-t border-slate-800/80 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                <span>Verified in Production</span>
                <span>100% Test Coverage</span>
              </div>
            </div>
          ))}
        </div>

        {/* Architectural Principles Callout (Single elevation, unboxed) */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-slate-900/30 border border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-xs font-mono uppercase text-amber-400 mb-1">Principle 1</div>
              <h4 className="text-sm font-bold text-white mb-1.5 font-['Outfit']">Mechanical Sympathy</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Software must honor the underlying CPU cache hierarchies, memory allocations, and network socket realities.
              </p>
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-amber-400 mb-1">Principle 2</div>
              <h4 className="text-sm font-bold text-white mb-1.5 font-['Outfit']">Sub-100ms Perception</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Interaction latency above 100ms shatters user immersion. UI feedback must settle within 16–60ms.
              </p>
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-amber-400 mb-1">Principle 3</div>
              <h4 className="text-sm font-bold text-white mb-1.5 font-['Outfit']">Simplicity Over Cleverness</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                The most resilient distributed systems use simple state machines, clear backpressure, and deterministic invariants.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
