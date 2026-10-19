import React, { useState } from 'react';
import { ArrowUpRight, Cpu, Layers } from 'lucide-react';
import { Project, PROJECTS } from '../data/portfolioData';

interface SelectedWorksProps {
  onSelectProject: (project: Project) => void;
  onOpenDemo: (demoType: 'stream' | 'audio' | 'cache') => void;
}

export const SelectedWorks: React.FC<SelectedWorksProps> = ({
  onSelectProject,
  onOpenDemo,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = [
    'All',
    'Distributed Systems',
    'Creative Tech',
    'Frontend Craft',
    'Developer Tooling',
  ];

  const filteredProjects =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="works" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400/90 mb-2">
              01. Selected Works & Case Studies
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-['Outfit']">
              Engineered for throughput, craft, and scale.
            </h2>
          </div>

          {/* Functional Filter Tabs (Segmented Button Controls) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl self-start md:self-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeFilter === category
                    ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {filteredProjects.map((project, index) => {
            // Give the first and second featured items wider bento spans when looking at 'All'
            const isWide = activeFilter === 'All' && (index === 0 || index === 1);
            const colSpan = isWide ? 'md:col-span-6' : 'md:col-span-4';

            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className={`${colSpan} group relative flex flex-col justify-between bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800/90 hover:border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/40 cursor-pointer`}
              >
                {/* Visual Area */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950 border-b border-slate-800/80">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Impact badge replacement: clean unboxed text on image */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-300 font-mono">
                    <span className="truncate max-w-[80%] text-[11px] text-slate-200">
                      {project.metrics[0].label}: {project.metrics[0].value}
                    </span>
                    <span className="text-[11px] text-amber-400 font-semibold">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Unboxed Metadata Header */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-2">
                      <span className="text-amber-400/90">{project.category}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span>{project.role}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors mb-2 font-['Outfit']">
                      {project.title}
                    </h3>

                    <p className="text-sm text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Bottom Strip: Technology List & Inspect Action */}
                  <div className="pt-4 border-t border-slate-800/70 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono truncate">
                      {project.stack.slice(0, 3).map((tech, i) => (
                        <React.Fragment key={tech}>
                          <span className="truncate">{tech}</span>
                          {i < Math.min(project.stack.length, 3) - 1 && (
                            <span aria-hidden="true" className="text-slate-600">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    <div className="flex items-center gap-1 text-xs font-semibold text-slate-300 group-hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
                      <span>Inspect</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section divider with subtle text ribbon */}
        <div className="mt-16 pt-8 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>Continuous Integration & Systems Architecture</span>
          <span className="hidden sm:inline">Zero-Copy Ingestion · WASM DSP · Token Discipline</span>
          <a
            href="#systems-lab"
            className="text-amber-400/90 hover:text-amber-300 flex items-center gap-1 transition-colors"
          >
            <span>Jump to Interactive Systems Lab</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
