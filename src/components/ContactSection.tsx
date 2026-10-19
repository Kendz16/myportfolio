import React, { useState, useEffect } from 'react';
import { Mail, Clock, Calendar, Check, Copy, Send, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_HERO } from '../data/portfolioData';
import { submitContactForm } from '../utils/contactForm';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Full-Time Senior Role',
    message: '',
  });

  // Timezone clocks
  const [sfTime, setSfTime] = useState('');
  const [visitorTime, setVisitorTime] = useState('');
  const [isWorkingHours, setIsWorkingHours] = useState(false);

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      // San Francisco (America/Los_Angeles)
      const sfFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      const sfHourFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: 'numeric',
        hour12: false,
      });
      const currentSfHour = parseInt(sfHourFormatter.format(now), 10);
      setSfTime(sfFormatter.format(now));
      setIsWorkingHours(currentSfHour >= 9 && currentSfHour < 18);

      // Visitor local time
      const visitorFormatter = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setVisitorTime(visitorFormatter.format(now));
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_HERO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmitError('');
    try {
      await submitContactForm({ ...formData, _replyto: formData.email });
      setFormSubmitted(true);
    } catch {
      setSubmitError('Message could not be sent. Please try again or email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-14">
          <div className="text-xs font-mono uppercase tracking-wider text-amber-400/90 mb-2">
            05. Contact & Collaboration
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-['Outfit']">
            Let's build something exceptional.
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl">
            Currently considering principal engineering roles, system architecture advisory, and selective creative commissions.
          </p>
        </div>

        {/* 2-Column Grid: Contact Form & Availability Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Message Form */}
          <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white font-['Outfit'] mb-1">
              Send a Direct Transmission
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Messages forward directly to {PORTFOLIO_HERO.email} with priority dispatch.
            </p>

            {formSubmitted ? (
              <div className="p-8 text-center space-y-3 bg-slate-950/80 border border-emerald-500/30 rounded-xl">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Transmission Delivered</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Thank you, <span className="text-amber-400 font-semibold">{formData.name}</span>. Kendz typically responds within 12–24 business hours.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', email: '', topic: 'Full-Time Senior Role', message: '' });
                  }}
                  className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white bg-slate-900 rounded-lg border border-slate-800 mt-3 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-400/80 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-400/80 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Engagement Category
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400/80 transition-colors cursor-pointer"
                  >
                    <option value="Full-Time Senior Role">Senior / Principal Engineering Role</option>
                    <option value="Architecture Advisory">Distributed Systems Architecture Advisory</option>
                    <option value="Design Engineering">High-Craft Frontend / Creative Web Engineering</option>
                    <option value="Keynote & Writing">Technical Keynote / Guest Article</option>
                    <option value="General Conversation">Coffee / General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Project Overview or Note *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your system requirements, team goals, or project timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-400/80 transition-colors resize-none leading-relaxed"
                  />
                </div>

                {submitError && <p role="alert" className="text-xs text-red-400">{submitError}</p>}
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">
                    Spam-free · End-to-end confidential
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-60 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm shadow-amber-400/20"
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Transmit Message'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Fast Contact & Synchronized Timezones */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Email Card */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Direct Electronic Mail
              </h3>
              <div>
                <a
                  href={`mailto:${PORTFOLIO_HERO.email}`}
                  className="text-base sm:text-lg font-mono font-bold text-white hover:text-amber-400 transition-colors block break-all"
                >
                  {PORTFOLIO_HERO.email}
                </a>
                <span className="text-xs text-slate-400 mt-1 block">
                  PGP Key fingerprint available upon request.
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleCopyEmail}
                  className="px-3.5 py-2 text-xs font-mono text-slate-200 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-amber-400" />
                  )}
                  <span>{copiedEmail ? 'Email Copied!' : 'Copy Email Address'}</span>
                </button>

                <a
                  href={`mailto:${PORTFOLIO_HERO.email}`}
                  className="px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1"
                >
                  <span>Open Client</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Live Dual Timezone Monitor */}
            <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Synchronized Time Zones</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {isWorkingHours ? 'Active Hours (PST)' : 'Async Queue (PST)'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <span className="text-[11px] text-slate-400 block font-mono">San Francisco (Kendz)</span>
                  <span className="text-lg font-bold font-mono text-white mt-1 block tabular-nums">
                    {sfTime || '09:00:00 AM'}
                  </span>
                  <span className="text-[10px] text-amber-400/90 font-mono">UTC-7 (Pacific)</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <span className="text-[11px] text-slate-400 block font-mono">Your Local Time</span>
                  <span className="text-lg font-bold font-mono text-slate-200 mt-1 block tabular-nums">
                    {visitorTime || 'Local'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Visitor Device</span>
                </div>
              </div>
            </div>

            {/* Channels & Social Presence */}
            <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800 space-y-3 text-xs">
              <span className="font-mono text-slate-400 block uppercase">Network Channels</span>
              <div className="flex flex-col space-y-2">
                <a
                  href={PORTFOLIO_HERO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-slate-300 hover:text-amber-400 transition-colors py-1 border-b border-slate-800/60"
                >
                  <span className="font-mono">GitHub / kendz-dev</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={PORTFOLIO_HERO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-slate-300 hover:text-amber-400 transition-colors py-1 border-b border-slate-800/60"
                >
                  <span className="font-mono">LinkedIn / in/kendz-dev</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={PORTFOLIO_HERO.x}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-slate-300 hover:text-amber-400 transition-colors py-1"
                >
                  <span className="font-mono">X (Twitter) / @kendz_dev</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
