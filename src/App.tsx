import React, { useState, useEffect } from 'react';
import { KendrewNavbar } from './components/KendrewNavbar';
import { HomeSection } from './components/HomeSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ResumeModal } from './components/ResumeModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ContactModal } from './components/ContactModal';
import { ProjectItem, KENDREW_PROFILE } from './data/kendrewData';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<'home' | 'about' | 'projects'>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Handle active navigation
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId as 'home' | 'about' | 'projects');
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll detection to update active nav state
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const homeEl = document.getElementById('home');
      const aboutEl = document.getElementById('about');
      const projectsEl = document.getElementById('projects');

      if (projectsEl && scrollPosition >= projectsEl.offsetTop) {
        setActiveSection('projects');
      } else if (aboutEl && scrollPosition >= aboutEl.offsetTop) {
        setActiveSection('about');
      } else if (homeEl) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950 font-sans pb-16">
      {/* Primary Header with Myportfolio brand and navigation */}
      <KendrewNavbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onAvatarClick={() => setIsContactOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 w-full mt-4 space-y-12">
        <HomeSection
          onContactClick={() => setIsContactOpen(true)}
          onProjectsClick={() => handleNavigate('projects')}
        />

        <AboutSection
          onDownloadResume={() => setIsResumeOpen(true)}
        />

        <ProjectsSection
          onOpenProjectModal={(project) => setSelectedProject(project)}
        />
      </main>

      {/* Modals */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Clean Bottom Footer */}
      <footer className="mt-16 pt-8 border-t border-slate-800/80 text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono">
            <span className="font-bold text-white uppercase">{KENDREW_PROFILE.name}</span>
            <span>·</span>
            <span>{KENDREW_PROFILE.role}</span>
            <span>·</span>
            <span className="text-amber-400">{KENDREW_PROFILE.email}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://github.com/Kendz16"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.facebook.com/kendrew.gonzaga"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/kendrew03_16/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              Instagram
            </a>
            <button
              onClick={() => setIsResumeOpen(true)}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Resume
            </button>
            <button
              onClick={() => setIsContactOpen(true)}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Contact
            </button>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-white cursor-pointer ml-2"
              title="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
