export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Distributed Systems' | 'Frontend Craft' | 'Creative Tech' | 'Developer Tooling';
  year: string;
  role: string;
  client?: string;
  impact: string;
  image: string;
  stack: string[];
  overview: string;
  challenge: string;
  solution: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
  liveDemoType?: 'stream' | 'audio' | 'cache';
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
  tech: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; level: string; note: string }[];
}

export const PORTFOLIO_HERO = {
  name: "Kendz",
  kicker: "Creative Engineer & Systems Architect",
  headline: "Architecting resilient distributed systems and high-craft digital experiences.",
  lead: "Over a decade of bridging low-latency systems engineering with tactile, nuanced user interfaces. Passionate about developer tooling, real-time data streaming, and browser-native computing.",
  email: "kendz.dev@gmail.com",
  location: "San Francisco, CA (PST · UTC-7)",
  availability: "Available for select senior engineering roles & technical advisory",
  github: "https://github.com/kendz-dev",
  linkedin: "https://linkedin.com/in/kendz-dev",
  x: "https://x.com/kendz_dev",
  metrics: [
    { label: "Engineering Practice", value: "10+", unit: "Years" },
    { label: "Peak Ingestion Rate", value: "140k", unit: "msgs/sec" },
    { label: "Production Uptime", value: "99.99%", unit: "SLO" },
    { label: "Global Reach", value: "4.8M+", unit: "Users" },
  ],
};

export const PROJECTS: Project[] = [
  {
    id: "aetherflow",
    title: "AetherFlow Distributed Pipeline",
    subtitle: "Ultra-low latency streaming event bus with zero-copy deserialization",
    category: "Distributed Systems",
    year: "2025",
    role: "Lead Systems Architect",
    client: "ScaleCraft Labs",
    impact: "140k msg/sec sustained throughput · 3.2ms p99 latency · 40% cloud compute reduction",
    image: "/src/assets/images/distributed_system_preview_1792413054459.jpg",
    stack: ["Rust", "TypeScript", "gRPC", "Kafka", "ClickHouse", "WebSockets"],
    overview: "A distributed, in-memory stream pipeline built for enterprise analytics ingestion. Designed to absorb extreme traffic spikes while ensuring strict ordering and sub-5ms end-to-end delivery guarantees.",
    challenge: "The prior Node/Python infrastructure struggled under sudden burst loads exceeding 60k requests/sec, causing GC pauses, consumer lagging, and expensive cloud instance autoscaling thrashing.",
    solution: "Engineered a Rust-based worker pool utilizing lock-free circular ring buffers and zero-copy binary serde. Paired with a reactive TypeScript control plane for dynamic partition rebalancing and live telemetry inspection.",
    highlights: [
      "Zero-copy binary serde protocol minimizing memory allocations",
      "Dynamic backpressure regulation with adaptive windowing",
      "Sub-millisecond p50 latency with multi-threaded ring buffers",
      "Full OpenTelemetry tracing across all cluster micro-agents"
    ],
    metrics: [
      { label: "Sustained Throughput", value: "140,000 /s" },
      { label: "P99 Delivery Latency", value: "3.2ms" },
      { label: "Compute Cost Savings", value: "42.8%" },
      { label: "Memory Footprint", value: "48MB" }
    ],
    codeSnippet: {
      language: "rust",
      filename: "ring_buffer.rs",
      code: `pub struct RingBuffer<T: Copy, const N: usize> {
    storage: [UnsafeCell<T>; N],
    head: AtomicUsize,
    tail: AtomicUsize,
}

impl<T: Copy, const N: usize> RingBuffer<T, N> {
    pub fn push(&self, item: T) -> Result<(), BufferError> {
        let current_head = self.head.load(Ordering::Acquire);
        let next_head = (current_head + 1) % N;
        if next_head == self.tail.load(Ordering::Relaxed) {
            return Err(BufferError::Full);
        }
        unsafe { *self.storage[current_head].get() = item; }
        self.head.store(next_head, Ordering::Release);
        Ok(())
    }
}`
    },
    liveDemoType: "stream"
  },
  {
    id: "verve-studio",
    title: "Verve Studio Workstation",
    subtitle: "In-browser modular synthesizer & spatial audio workstation",
    category: "Creative Tech",
    year: "2024",
    role: "Sole Creator & Audio Engineer",
    client: "Open Source Audio Collective",
    impact: "60 FPS real-time audio visualization · Sub-10ms buffer latency · 85k monthly creators",
    image: "/src/assets/images/creative_workstation_ui_1792413070263.jpg",
    stack: ["WebAudio API", "WebAssembly", "Canvas 2D", "React", "Tailwind CSS"],
    overview: "A lightweight, browser-native digital audio workstation and harmonic synthesizer. Empowers sound designers to construct complex polyphonic modular patches and visualize frequencies in real time.",
    challenge: "Executing low-latency digital signal processing (DSP) inside browser sandboxes without audio glitching, dropouts, or blocking the UI thread on high-DPI displays.",
    solution: "Isolated DSP computation into AudioWorklet processors compiled from C++ via WebAssembly. Rendered high-framerate oscilloscope and spectrogram displays via requestAnimationFrame and custom 2D canvas batching.",
    highlights: [
      "Zero-latency AudioWorklet threads running off-main-thread",
      "Interactive 64-band frequency spectrum and vector oscilloscope",
      "Polyphonic ADSR envelope generator with customizable resonance filters",
      "Export directly to lossless 24-bit 96kHz WAV"
    ],
    metrics: [
      { label: "Audio Processing Latency", value: "6.8ms" },
      { label: "Visual Refresh Rate", value: "60 FPS" },
      { label: "Active Sound Designers", value: "85,000+" },
      { label: "DSP Code Footprint", value: "18KB WASM" }
    ],
    codeSnippet: {
      language: "typescript",
      filename: "audio-engine.ts",
      code: `export class SynthEngine {
  private ctx: AudioContext;
  private osc: OscillatorNode;
  private filter: BiquadFilterNode;

  constructor() {
    this.ctx = new AudioContext({ latencyHint: 'interactive' });
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
  }

  playNote(frequency: number, type: OscillatorType = 'sawtooth') {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
    osc.connect(this.filter);
    this.filter.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
  }
}`
    },
    liveDemoType: "audio"
  },
  {
    id: "chronos-db",
    title: "Chronos Telemetry Engine",
    subtitle: "Embedded columnar time-series storage with delta-of-delta compression",
    category: "Distributed Systems",
    year: "2024",
    role: "Core Developer",
    impact: "12:1 telemetry compression ratio · 8MB initial memory footprint",
    image: "/src/assets/images/distributed_system_preview_1792413054459.jpg",
    stack: ["Rust", "TypeScript", "WASM", "FlatBuffers", "React"],
    overview: "An embeddable time-series storage core intended for edge gateways, observability agents, and telemetry collectors. Provides fast rollups and sliding window aggregations.",
    challenge: "Industrial IoT edge devices have limited flash memory write endurance and strictly bounded RAM budgets, making standard SQLite or time-series engines too heavy.",
    solution: "Implemented Facebook Gorilla-style delta-of-delta timestamp compression and XOR floating-point delta encoding, packing millions of data points into kilobytes of storage.",
    highlights: [
      "Gorilla algorithm bit-packing for double-precision float metrics",
      "Append-only write-ahead log (WAL) with deterministic crash recovery",
      "Instant sliding-window quantile calculation (p50, p90, p99)"
    ],
    metrics: [
      { label: "Compression Ratio", value: "12.4 : 1" },
      { label: "Query Time (1M points)", value: "14ms" },
      { label: "Max Memory Usage", value: "8MB" },
      { label: "Write IOPS Reduction", value: "88%" }
    ],
    liveDemoType: "cache"
  },
  {
    id: "lumen-design-system",
    title: "Lumen UI Design System",
    subtitle: "Deterministic token architecture and accessible component library",
    category: "Frontend Craft",
    year: "2023 – 2024",
    role: "Design Systems Architect",
    client: "Enterprise FinTech Suite",
    impact: "Adopted across 22 micro-frontends · 100% WCAG AAA contrast · Zero runtime CSS",
    image: "/src/assets/images/hero_developer_portrait_1792413037959.jpg",
    stack: ["React", "TypeScript", "Tailwind CSS", "Radix Primitives", "Vite"],
    overview: "A comprehensive enterprise UI foundation providing rigorous keyboard accessibility, multi-brand themes, and sub-millisecond interaction feedback.",
    challenge: "Inconsistent UI patterns, slow build times, and high accessibility defect rates across decentralized engineering teams building critical trading tools.",
    solution: "Architected a single-source-of-truth token pipeline synced with Figma via GitHub Actions, combined with headless accessible primitives and strict zero-pill layout discipline.",
    highlights: [
      "Fully typed theme tokens with compile-time contrast checking",
      "Complete ARIA landmark and keyboard focus navigation across all components",
      "Automatic bundle analyzer preventing tree-shaking regressions"
    ],
    metrics: [
      { label: "Micro-frontends Unified", value: "22" },
      { label: "Accessibility Score", value: "100/100" },
      { label: "Component Count", value: "48+" },
      { label: "Dev Velocity Increase", value: "+35%" }
    ]
  },
  {
    id: "hyperion-mesh",
    title: "Hyperion Service Mesh Visualizer",
    subtitle: "Real-time topology graphing and latency bottleneck debugger",
    category: "Developer Tooling",
    year: "2023",
    role: "Full-Stack Engineer",
    impact: "Reduced mean time to detection (MTTD) by 68% across 450+ microservices",
    image: "/src/assets/images/distributed_system_preview_1792413054459.jpg",
    stack: ["Go", "React", "Canvas 2D", "Prometheus", "OpenTelemetry"],
    overview: "An infrastructure observability console visualizing inter-service communication, error cascades, and dynamic traffic routing across Kubernetes clusters.",
    challenge: "Engineers struggled during cascading outages to identify which upstream dependency was introducing retry storms or tail latencies.",
    solution: "Synthesized eBPF and service mesh traces into an intuitive force-directed node graph with instant latency heatmap overlays.",
    highlights: [
      "Zero-overhead passive network telemetry extraction",
      "Real-time visual cascading failure propagation detection",
      "Custom force-directed graph renderer handling 2,000+ nodes at 60 FPS"
    ],
    metrics: [
      { label: "MTTD Reduction", value: "68%" },
      { label: "Microservices Monitored", value: "450+" },
      { label: "Render Framerate", value: "60 FPS" },
      { label: "False Positive Drop", value: "54%" }
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    period: "2023 — Present",
    role: "Principal Systems Architect",
    company: "ScaleCraft Labs",
    location: "San Francisco, CA & Remote",
    description: "Leading core systems architecture for high-throughput distributed ingestion pipelines and real-time streaming infrastructure.",
    achievements: [
      "Designed event streaming engine supporting 140k msgs/sec with sub-5ms p99 latency across multi-region AWS clusters.",
      "Spearheaded cloud resource optimization initiative, saving $380,000 annually while improving service availability to 99.99%.",
      "Mentored a team of 12 distributed systems and full-stack software engineers."
    ],
    tech: ["Rust", "TypeScript", "Kafka", "ClickHouse", "Kubernetes", "AWS"]
  },
  {
    period: "2021 — 2023",
    role: "Staff Frontend & Creative Engineer",
    company: "Veloce Systems",
    location: "San Francisco, CA",
    description: "Directed frontend engineering, developer experience, and canvas-based visualization applications for distributed observability.",
    achievements: [
      "Built high-performance WebAudio and Canvas graphing systems handling millions of data points at 60 FPS.",
      "Established company-wide design system and component architecture used by 6 cross-functional engineering pods.",
      "Pioneered end-to-end performance budgets that cut first contentful paint (FCP) from 2.4s to 640ms."
    ],
    tech: ["React", "TypeScript", "WebAudio", "Tailwind CSS", "Vite", "GraphQL"]
  },
  {
    period: "2018 — 2021",
    role: "Senior Full-Stack Engineer",
    company: "Mosaic Creative Technologies",
    location: "New York, NY",
    description: "Architected modern web applications, client portals, and real-time collaborative workspaces for creative agencies and brands.",
    achievements: [
      "Constructed collaborative canvas tool supporting real-time multi-user cursor tracking and state conflict resolution.",
      "Engineered resilient serverless API proxies handling over 15M daily requests with automatic caching and retry layers."
    ],
    tech: ["Node.js", "React", "PostgreSQL", "Redis", "Docker", "WebSockets"]
  },
  {
    period: "2016 — 2018",
    role: "Software Engineer",
    company: "OpenPulse Networks",
    location: "Austin, TX",
    description: "Developed core backend microservices and client interfaces for network telemetry analysis and automated threat mitigation.",
    achievements: [
      "Implemented automated log parsing pipelines processing 2TB daily network packet data.",
      "Authored open-source CLI utilities adopted by hundreds of internal and external infrastructure operators."
    ],
    tech: ["Go", "Python", "JavaScript", "Linux", "InfluxDB"]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Distributed Systems & Architecture",
    description: "Designing resilient backend topologies, streaming pipelines, and low-latency storage.",
    skills: [
      { name: "Rust & Systems Programming", level: "Senior", note: "Lock-free structures, memory safety, zero-copy I/O" },
      { name: "Event Streaming (Kafka / NATS)", level: "Architect", note: "Partitioning, ordering semantics, backpressure" },
      { name: "Columnar Databases (ClickHouse)", level: "Advanced", note: "High-cardinality aggregation, shard topologies" },
      { name: "Concurrency & Multi-Threading", level: "Senior", note: "Ring buffers, atomic primitives, thread pools" },
      { name: "API & Protocol Design (gRPC, REST)", level: "Architect", note: "Protobuf contracts, binary streaming, versioning" }
    ]
  },
  {
    title: "Frontend Craft & Interactive Web",
    description: "Precision interaction design, headless components, and real-time graphics.",
    skills: [
      { name: "React & TypeScript Ecosystem", level: "Expert", note: "Strict typing, state machines, custom hooks" },
      { name: "Tailwind CSS & Token Systems", level: "Expert", note: "Zero-pill discipline, ergonomic typography, WCAG AA/AAA" },
      { name: "WebAudio API & DSP", level: "Advanced", note: "AudioWorklets, polyphony, filter chains, synthesis" },
      { name: "HTML5 Canvas & Rendering", level: "Advanced", note: "60 FPS rendering loops, offscreen canvas, batching" },
      { name: "Performance Optimization", level: "Expert", note: "Bundle budgeting, INP/LCP/CLS tuning, zero layout shifts" }
    ]
  },
  {
    title: "Infrastructure, Cloud & Observability",
    description: "Deterministic deployment pipelines, container orchestration, and metrics telemetry.",
    skills: [
      { name: "Kubernetes & Containers", level: "Senior", note: "Helm charts, resource limits, horizontal pod autoscaling" },
      { name: "OpenTelemetry & Prometheus", level: "Senior", note: "Distributed tracing, metric cardinality, alerting" },
      { name: "Cloud Architectures (AWS / GCP)", level: "Senior", note: "VPC networking, serverless compute, edge CDNs" },
      { name: "CI/CD & GitOps Automation", level: "Senior", note: "Zero-downtime releases, automated regression testing" }
    ]
  }
];

export const TESTIMONIALS = [
  {
    quote: "Kendz is one of those rare engineers who can dive into raw byte-level network protocols in the morning and polish micro-interactions in a design system in the afternoon. Their work on our streaming ingestion dropped our cloud bills by 40% while maintaining sub-5ms latency.",
    author: "Elena Rostova",
    role: "VP of Engineering",
    company: "ScaleCraft Labs",
    relation: "Direct Manager (2023 — Present)"
  },
  {
    quote: "When we needed to build a real-time audio synthesizer directly in the browser, everyone told us it couldn't be done without native desktop wrappers. Kendz delivered a 60 FPS WebAudio powerhouse in 8 weeks. Unmatched craft and attention to detail.",
    author: "Marcus Vance",
    role: "Product Director",
    company: "Veloce Systems",
    relation: "Collaborated on Core Audio Workstation"
  }
];
