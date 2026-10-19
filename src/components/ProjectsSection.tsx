import React from 'react';
import { ArrowUpRight, Github, ExternalLink, CheckCircle2, Users, BookOpen } from 'lucide-react';
import { KENDREW_PROJECTS, ProjectItem } from '../data/kendrewData';

interface ProjectsSectionProps {
  onOpenProjectModal: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenProjectModal }) => {
  return (
    <section id="projects" className="py-8 sm:py-12">
      {/* Centered Title matching the wireframe Screen 3 */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-mono">
          My Projects
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">
          Troubleshot and maintained code on GitHub for academic thesis and collaborative web applications.
        </p>
      </div>

      {/* Projects List matching the wireframe 2-column layout (Left Description / Right Preview) */}
      <div className="space-y-10">
        {KENDREW_PROJECTS.map((project, index) => (
          <div
            key={project.id}
            className="bg-[#0b0d14] border-2 border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl hover:border-slate-600 transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Description matching the wireframe */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-amber-400">
                  <span className="font-bold">Project 0{index + 1}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-slate-300 font-medium">{project.projectType}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{project.year}</span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-400/90 font-mono mt-1">
                    {project.tagline}
                  </p>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Contribution note */}
                <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <span className="font-bold text-amber-400 font-mono block mb-1">My Contribution & Role:</span>
                  {project.contribution}
                  {project.collaborator && (
                    <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5 font-mono">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      <span>{project.collaborator}</span>
                    </div>
                  )}
                </div>

                {/* Key Features */}
                <div className="space-y-1.5 pt-1">
                  {project.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons: GitHub Link and Details Modal */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-98 border-2 border-amber-400 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-amber-400/20"
                  >
                    <Github className="w-4 h-4" />
                    <span>View on GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => onOpenProjectModal(project)}
                    className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border-2 border-slate-700 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Project Details</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Preview Container matching wireframe rounded box */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full relative rounded-2xl border-2 border-slate-700 overflow-hidden bg-slate-950 shadow-xl group cursor-pointer aspect-[16/10] block"
                  title="Open GitHub Repository"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-white">
                    <span className="truncate max-w-[70%] text-[11px] text-slate-200">
                      {project.tagline}
                    </span>
                    <span className="text-amber-400 font-semibold flex items-center gap-1 shrink-0 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                      <Github className="w-3 h-3" />
                      <span>GitHub</span>
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
