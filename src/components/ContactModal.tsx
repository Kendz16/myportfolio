import React, { useState, useEffect } from 'react';
import { X, Mail, Send, Check, Copy, CheckCircle2, Facebook, Instagram, Github, Phone } from 'lucide-react';
import { KENDREW_PROFILE } from '../data/kendrewData';
import { submitContactForm } from '../utils/contactForm';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(KENDREW_PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmitError('');
    try {
      await submitContactForm({ ...formData, _replyto: formData.email });
      setSent(true);
    } catch {
      setSubmitError('Message could not be sent. Please try again or email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#0e111a] border-2 border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80 shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={KENDREW_PROFILE.avatar}
              alt="Kendrew Gonzaga"
              className="w-10 h-10 rounded-full object-cover border-2 border-amber-400 shrink-0"
            />
            <div>
              <span className="text-xs font-mono uppercase text-white font-bold block">
                {KENDREW_PROFILE.name}
              </span>
              <span className="text-[11px] font-mono text-amber-400">
                Software Developer · Cebu City
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Quick copy email & GitHub & Phone box */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-slate-400 block">Email Address:</span>
                <a
                  href={`mailto:${KENDREW_PROFILE.email}`}
                  className="text-xs sm:text-sm font-mono font-bold text-amber-400 hover:underline"
                >
                  {KENDREW_PROFILE.email}
                </a>
              </div>
              <button
                onClick={handleCopyEmail}
                className="px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Email'}</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs font-mono gap-2">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <a href={`tel:${KENDREW_PROFILE.phone}`} className="text-slate-200 hover:text-amber-400">
                  {KENDREW_PROFILE.phone}
                </a>
              </div>

              <div className="flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-amber-400" />
                <a
                  href={KENDREW_PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-200 hover:text-amber-400 hover:underline"
                >
                  github.com/Kendz16
                </a>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs font-mono gap-2">
              <div className="flex items-center gap-1.5">
                <Facebook className="w-3.5 h-3.5 text-blue-400" />
                <a
                  href={KENDREW_PROFILE.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-200 hover:text-amber-400 hover:underline"
                >
                  facebook.com/kendrew.gonzaga
                </a>
              </div>

              <div className="flex items-center gap-1.5">
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <a
                  href={KENDREW_PROFILE.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-200 hover:text-amber-400 hover:underline"
                >
                  @kendrew03_16
                </a>
              </div>
            </div>

            <div className="text-[11px] font-mono text-slate-400">
              Location: {KENDREW_PROFILE.location}
            </div>
          </div>

          {sent ? (
            <div className="py-8 text-center space-y-3 bg-slate-950/60 rounded-xl border border-emerald-500/30 p-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-white">Message Transmitted!</h3>
              <p className="text-xs text-slate-300">
                Thanks, <span className="text-amber-400">{formData.name}</span>! Kendrew has received your message and will reply shortly.
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setFormData({ name: '', email: '', message: '' });
                }}
                className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white bg-slate-900 rounded-lg border border-slate-800 mt-2 cursor-pointer"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Message</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Hi Kendrew, I'd like to discuss a software project or junior developer role..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              {submitError && <p role="alert" className="text-xs text-red-400">{submitError}</p>}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-400/20"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
