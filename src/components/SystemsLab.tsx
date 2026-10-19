import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Volume2, VolumeX, Zap, Activity, HardDrive, ShieldCheck, Flame } from 'lucide-react';

interface SystemsLabProps {
  initialTab?: 'stream' | 'audio' | 'cache';
}

export const SystemsLab: React.FC<SystemsLabProps> = ({ initialTab = 'stream' }) => {
  const [activeTab, setActiveTab] = useState<'stream' | 'audio' | 'cache'>(initialTab);

  // Sync if prop changes
  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  // -------------------------------------------------------------
  // 1. Rate Limiter Simulator State
  // -------------------------------------------------------------
  const [algorithm, setAlgorithm] = useState<'token-bucket' | 'leaky-bucket' | 'fixed-window'>('token-bucket');
  const [tokens, setTokens] = useState<number>(10);
  const maxTokens = 10;
  const [allowedCount, setAllowedCount] = useState<number>(0);
  const [rejectedCount, setRejectedCount] = useState<number>(0);
  const [recentLogs, setRecentLogs] = useState<{ id: number; time: string; status: 'ALLOW' | 'REJECT'; reason: string }[]>([]);

  // Token bucket replenishment timer
  useEffect(() => {
    if (activeTab !== 'stream') return;
    const interval = setInterval(() => {
      setTokens((prev) => Math.min(maxTokens, prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTab]);

  const handleSendRequests = (count: number) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString() + '.' + String(now.getMilliseconds()).padStart(3, '0');

    if (algorithm === 'token-bucket') {
      let currentTokens = tokens;
      let allowed = 0;
      let rejected = 0;
      const newLogs: { id: number; time: string; status: 'ALLOW' | 'REJECT'; reason: string }[] = [];

      for (let i = 0; i < count; i++) {
        if (currentTokens >= 1) {
          currentTokens -= 1;
          allowed += 1;
          newLogs.unshift({
            id: Date.now() + i,
            time: timeStr,
            status: 'ALLOW',
            reason: `Token available (Remaining: ${currentTokens})`,
          });
        } else {
          rejected += 1;
          newLogs.unshift({
            id: Date.now() + i,
            time: timeStr,
            status: 'REJECT',
            reason: 'Bucket exhausted (429 Too Many Requests)',
          });
        }
      }

      setTokens(currentTokens);
      setAllowedCount((prev) => prev + allowed);
      setRejectedCount((prev) => prev + rejected);
      setRecentLogs((prev) => [...newLogs, ...prev].slice(0, 8));
    } else if (algorithm === 'leaky-bucket') {
      // Leaky bucket simulation
      const availableCapacity = maxTokens - tokens; // queue slots
      const allowed = Math.min(count, tokens);
      const rejected = count - allowed;

      setTokens((prev) => Math.max(0, prev - allowed));
      setAllowedCount((prev) => prev + allowed);
      setRejectedCount((prev) => prev + rejected);

      const newLogs = [
        {
          id: Date.now(),
          time: timeStr,
          status: (allowed > 0 ? 'ALLOW' : 'REJECT') as 'ALLOW' | 'REJECT',
          reason: allowed > 0 ? `Buffered ${allowed} in queue` : `Queue overflow (429)`,
        },
      ];
      setRecentLogs((prev) => [...newLogs, ...prev].slice(0, 8));
    } else {
      // Fixed window simulation
      const allowed = Math.min(count, Math.max(0, 10 - (allowedCount % 10)));
      const rejected = count - allowed;
      setAllowedCount((prev) => prev + allowed);
      setRejectedCount((prev) => prev + rejected);

      const newLogs = [
        {
          id: Date.now(),
          time: timeStr,
          status: (allowed > 0 ? 'ALLOW' : 'REJECT') as 'ALLOW' | 'REJECT',
          reason: allowed > 0 ? `Within window limit (+${allowed})` : 'Window limit exceeded (429)',
        },
      ];
      setRecentLogs((prev) => [...newLogs, ...prev].slice(0, 8));
    }
  };

  const resetRateLimiter = () => {
    setTokens(maxTokens);
    setAllowedCount(0);
    setRejectedCount(0);
    setRecentLogs([]);
  };

  // -------------------------------------------------------------
  // 2. WebAudio Synthesizer & Oscilloscope
  // -------------------------------------------------------------
  const [audioStarted, setAudioStarted] = useState(false);
  const [waveType, setWaveType] = useState<OscillatorType>('sawtooth');
  const [filterFreq, setFilterFreq] = useState(1500);
  const [isMuted, setIsMuted] = useState(false);
  const [lastNotePlayed, setLastNotePlayed] = useState<string | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(filterFreq, ctx.currentTime);

      filter.connect(analyser);
      analyser.connect(ctx.destination);

      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      filterRef.current = filter;
      setAudioStarted(true);

      startVisualizer();
    } else if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playSynthTone = (freq: number, noteLabel: string) => {
    if (isMuted) return;
    initAudio();
    const ctx = audioCtxRef.current;
    const filter = filterRef.current;
    if (!ctx || !filter) return;

    setLastNotePlayed(noteLabel);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = waveType;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // ADSR Envelope
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(analyserRef.current!);

    osc.start(now);
    osc.stop(now + 0.95);
  };

  const updateFilter = (freq: number) => {
    setFilterFreq(freq);
    if (filterRef.current && audioCtxRef.current) {
      filterRef.current.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
    }
  };

  const startVisualizer = () => {
    const canvas = canvasRef.current;
    if (!canvas || !analyserRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animFrameRef.current = requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);

      ctx.fillStyle = '#090a0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = '#fbbf24'; // Amber-400
      ctx.beginPath();

      const sliceWidth = (canvas.width * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    draw();
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  // -------------------------------------------------------------
  // 3. Cache & Latency Profiler State
  // -------------------------------------------------------------
  const [cacheCapacity, setCacheCapacity] = useState<number>(8);
  const [cacheItems, setCacheItems] = useState<string[]>(['user:101', 'token:a8f', 'config:v2', 'order:982']);
  const [cacheStats, setCacheStats] = useState({ hits: 42, misses: 8, p50: 0.18, p99: 3.42 });

  const simulateCacheAccess = (key: string) => {
    const isHit = cacheItems.includes(key);
    if (isHit) {
      // Move to front (LRU)
      const nextItems = [key, ...cacheItems.filter((k) => k !== key)];
      setCacheItems(nextItems);
      setCacheStats((prev) => ({
        ...prev,
        hits: prev.hits + 1,
        p50: Number((0.15 + Math.random() * 0.08).toFixed(2)),
      }));
    } else {
      // Evict least recently used if at capacity
      const nextItems = [key, ...cacheItems.slice(0, cacheCapacity - 1)];
      setCacheItems(nextItems);
      setCacheStats((prev) => ({
        ...prev,
        misses: prev.misses + 1,
        p99: Number((3.1 + Math.random() * 1.2).toFixed(2)),
      }));
    }
  };

  const simulateRandomBatch = () => {
    const keys = ['user:101', 'user:102', 'order:982', 'item:55', 'metric:cpu', 'token:a8f', 'cart:331', 'session:90'];
    for (let i = 0; i < 5; i++) {
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      simulateCacheAccess(randomKey);
    }
  };

  const musicalNotes = [
    { note: 'C4', freq: 261.63 },
    { note: 'D4', freq: 293.66 },
    { note: 'E4', freq: 329.63 },
    { note: 'F4', freq: 349.23 },
    { note: 'G4', freq: 392.00 },
    { note: 'A4', freq: 440.00 },
    { note: 'B4', freq: 493.88 },
    { note: 'C5', freq: 523.25 },
  ];

  return (
    <section id="systems-lab" className="py-20 border-t border-slate-800/80 bg-[#07080d] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400/90 mb-2">
              02. Interactive Systems Lab
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-['Outfit']">
              Live algorithmic simulations & Web APIs.
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Interact directly with core architectural concepts from Kendz’s projects. Fully executing in your browser.
            </p>
          </div>

          {/* Module Selector Buttons (Segmented Controls) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveTab('stream')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'stream'
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Rate Limiter</span>
            </button>
            <button
              onClick={() => setActiveTab('audio')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'audio'
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>WebAudio DSP</span>
            </button>
            <button
              onClick={() => setActiveTab('cache')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'cache'
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <HardDrive className="w-3.5 h-3.5" />
              <span>LRU Telemetry</span>
            </button>
          </div>
        </div>

        {/* Lab Content Container */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          {/* TAB 1: Rate Limiter Simulator */}
          {activeTab === 'stream' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
                    <span>Token Bucket & Ingestion Shaper</span>
                    <span className="text-xs font-mono font-normal text-amber-400">AetherFlow Core</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Simulates token generation at 1 token/sec up to capacity of 10. Prevents DDoS while tolerating micro-bursts.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={resetRateLimiter}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1"
                    title="Reset Simulator"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Live Gauges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-xs font-mono text-slate-400">Bucket Tokens</span>
                  <div className="text-2xl font-bold font-mono text-amber-400 mt-1 tabular-nums">
                    {tokens} / {maxTokens}
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-amber-400 h-full transition-all duration-300"
                      style={{ width: `${(tokens / maxTokens) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-xs font-mono text-slate-400">Allowed (200 OK)</span>
                  <div className="text-2xl font-bold font-mono text-emerald-400 mt-1 tabular-nums">
                    {allowedCount}
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">Dispatched</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-xs font-mono text-slate-400">Rejected (429)</span>
                  <div className="text-2xl font-bold font-mono text-rose-400 mt-1 tabular-nums">
                    {rejectedCount}
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">Throttled</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-xs font-mono text-slate-400">Replenish Rate</span>
                  <div className="text-2xl font-bold font-mono text-slate-200 mt-1 tabular-nums">
                    1.0 <span className="text-xs text-slate-400">tok/s</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">Auto-refill</span>
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleSendRequests(1)}
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Send Single Request</span>
                </button>

                <button
                  onClick={() => handleSendRequests(5)}
                  className="px-4 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Send Burst (5 Requests)</span>
                </button>

                <button
                  onClick={() => handleSendRequests(12)}
                  className="px-4 py-2 text-xs font-medium text-rose-300 bg-rose-950/40 border border-rose-800/40 hover:bg-rose-900/40 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Simulate Spike (12 Reqs — Triggers 429)</span>
                </button>
              </div>

              {/* Live Event Stream Telemetry Log */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 font-mono text-xs">
                <div className="text-slate-400 mb-2 flex items-center justify-between">
                  <span>Live Ingestion Telemetry Stream</span>
                  <span className="text-[11px] text-slate-500">Last 8 events</span>
                </div>
                {recentLogs.length === 0 ? (
                  <div className="text-slate-600 py-3 text-center">
                    Click an action button above to generate traffic events.
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {recentLogs.map((log) => (
                      <div
                        key={log.id}
                        className="flex items-center justify-between py-1 border-b border-slate-900/80 text-[11px]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500">{log.time}</span>
                          <span
                            className={
                              log.status === 'ALLOW'
                                ? 'text-emerald-400 font-semibold'
                                : 'text-rose-400 font-semibold'
                            }
                          >
                            [{log.status}]
                          </span>
                          <span className="text-slate-300">{log.reason}</span>
                        </div>
                        <span className="text-slate-600">p99: ~2.8ms</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: WebAudio Real-time Synthesizer & Oscilloscope */}
          {activeTab === 'audio' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
                    <span>WebAudio Real-Time DSP Synthesizer</span>
                    <span className="text-xs font-mono font-normal text-amber-400">Verve Studio Engine</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Native browser audio synthesis running with sub-10ms buffer latency and zero third-party audio plugins.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1.5"
                    title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                    <span>{isMuted ? 'Muted' : 'Audio On'}</span>
                  </button>
                </div>
              </div>

              {/* Canvas 2D Live Oscilloscope */}
              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#090a0f] h-32 flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={128}
                  className="w-full h-full block"
                />
                {!audioStarted && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs text-xs text-slate-300 font-mono">
                    Click any note key below to activate the WebAudio signal graph.
                  </div>
                )}
                {lastNotePlayed && audioStarted && (
                  <div className="absolute top-2 right-3 font-mono text-xs text-amber-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                    Active Note: {lastNotePlayed}
                  </div>
                )}
              </div>

              {/* Controls Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {/* Waveform Selector */}
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-2">
                    Oscillator Waveform
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['sawtooth', 'square', 'sine', 'triangle'] as OscillatorType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => setWaveType(type)}
                        className={`py-2 text-xs font-mono capitalize rounded-lg border transition-colors cursor-pointer ${
                          waveType === type
                            ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lowpass Filter Cutoff */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                    <span>Biquad Lowpass Cutoff</span>
                    <span className="text-amber-400 font-medium">{filterFreq} Hz</span>
                  </div>
                  <input
                    type="range"
                    min="300"
                    max="6000"
                    step="50"
                    value={filterFreq}
                    onChange={(e) => updateFilter(Number(e.target.value))}
                    className="w-full accent-amber-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                    <span>300 Hz (Warm)</span>
                    <span>6000 Hz (Bright)</span>
                  </div>
                </div>
              </div>

              {/* Musical Keyboard */}
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-2">
                  Interactive Polyphonic Keyboard
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {musicalNotes.map(({ note, freq }) => (
                    <button
                      key={note}
                      onClick={() => playSynthTone(freq, note)}
                      className="py-4 bg-slate-950 hover:bg-slate-800 active:bg-amber-400 active:text-slate-950 border border-slate-800 hover:border-amber-400/50 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer group"
                    >
                      <span className="text-base font-bold text-white group-active:text-slate-950 font-mono">
                        {note}
                      </span>
                      <span className="text-[10px] text-slate-500 group-active:text-slate-800 font-mono mt-0.5">
                        {Math.round(freq)}Hz
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LRU Cache & Latency Profiler */}
          {activeTab === 'cache' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
                    <span>LRU Cache & Quantile Latency Profiler</span>
                    <span className="text-xs font-mono font-normal text-amber-400">Chronos Telemetry Core</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Simulates in-memory hot key caching with Least Recently Used eviction and sliding window latency quantiles.
                  </p>
                </div>

                <button
                  onClick={simulateRandomBatch}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
                >
                  Simulate Random Workload (5 Ops)
                </button>
              </div>

              {/* Stats Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-xs font-mono text-slate-400">Cache Hit Rate</span>
                  <div className="text-2xl font-bold font-mono text-emerald-400 mt-1 tabular-nums">
                    {Math.round((cacheStats.hits / (cacheStats.hits + cacheStats.misses || 1)) * 100)}%
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {cacheStats.hits} Hits · {cacheStats.misses} Misses
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-xs font-mono text-slate-400">P50 Read Latency</span>
                  <div className="text-2xl font-bold font-mono text-amber-400 mt-1 tabular-nums">
                    {cacheStats.p50}ms
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">In-Memory Hot Path</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-xs font-mono text-slate-400">P99 Disk Rollup</span>
                  <div className="text-2xl font-bold font-mono text-slate-200 mt-1 tabular-nums">
                    {cacheStats.p99}ms
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">Tail Ingestion</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-xs font-mono text-slate-400">Eviction Policy</span>
                  <div className="text-2xl font-bold font-mono text-slate-200 mt-1">
                    LRU
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">Max Capacity: {cacheCapacity}</span>
                </div>
              </div>

              {/* Cache Slots Visualizer */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Active Cache Slot Memory (Ordered Most-to-Least Recent)</span>
                  <span>{cacheItems.length} / {cacheCapacity} occupied</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {cacheItems.map((key, index) => (
                    <div
                      key={key}
                      onClick={() => simulateCacheAccess(key)}
                      className="p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-400/60 transition-colors flex items-center justify-between cursor-pointer group"
                      title="Click to trigger cache HIT on this key"
                    >
                      <span className="font-mono text-xs text-slate-200 group-hover:text-amber-400">
                        {key}
                      </span>
                      <span className="text-[10px] font-mono text-slate-600">
                        slot {index + 1}
                      </span>
                    </div>
                  ))}
                  {Array.from({ length: Math.max(0, cacheCapacity - cacheItems.length) }).map((_, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-slate-950/40 border border-slate-900 border-dashed flex items-center justify-center text-[11px] font-mono text-slate-700"
                    >
                      empty
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Key Ingestion Simulator */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-400 font-mono mr-2">Query Hot Keys:</span>
                {['user:101', 'token:a8f', 'order:982', 'telemetry:sensor_4', 'analytics:daily'].map((k) => (
                  <button
                    key={k}
                    onClick={() => simulateCacheAccess(k)}
                    className="px-2.5 py-1 text-xs font-mono bg-slate-950 border border-slate-800 hover:border-slate-700 rounded text-slate-300 hover:text-white cursor-pointer transition-colors"
                  >
                    GET {k}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
