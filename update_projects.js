const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace Project 1 - CFDML Enterprise
const oldProject1 = `<article class="project wide reveal" style="--pg: rgba(52,231,255,0.16)">
            <div class="bg-glow"></div>
            <div class="project-top"><span class="project-id">01 / FLAGSHIP</span><span class="project-status">Active · v11.2</span></div>
            <h3>CFDML Enterprise Platform</h3>
            <p>
              Piattaforma CFD-AI per prototipazione rapida: 52 solver di proprietà su 11 famiglie (Navier-Stokes, multigrid, multiphase VOF, LBM, SPH, FSI,
              turbolenza k-ω-SST/LES, combustion EDM), neural operators FNO/DeepONet, PINNs, automazione OpenFOAM e brain LLM locale.
              Inferenza sub-millisecondiana contro ore di CFD full-fidelity.
            </p>
            <div class="project-metrics">
              <span class="metric"><strong>75+</strong> REST endpoint</span>
              <span class="metric"><strong>52</strong> solver di proprietà</span>
              <span class="metric"><strong>R² > 0.999</strong> surrogate</span>
              <span class="metric"><strong>219</strong> test superati</span>
            </div>
            <div class="tech-row">
              <span class="tech">FastAPI</span><span class="tech">PyTorch</span><span class="tech">OpenFOAM</span>
              <span class="tech">PINNs</span><span class="tech">Ollama</span><span class="tech">ChromaDB</span>
            </div>
          </article>`;

const newProject1 = `<article class="project wide reveal card-animate" style="--pg: rgba(52,231,255,0.16)">
            <div class="bg-glow"></div>
            <div class="project-top"><span class="project-id">01 / FLAGSHIP</span><span class="project-status">Active · v13.0</span></div>
            <h3>CFDML Enterprise Platform</h3>
            <p>
              Piattaforma CFD-AI per prototipazione rapida: <strong>53 solver CFD</strong> su 14 famiglie (Navier-Stokes, multigrid, multiphase VOF, LBM, SPH, FSI, turbolenza k-ω-SST/LES, combustion EDM, reactive transport, phase-field solidification, battery P2D, WENO5 hyperbolic, N-body Barnes-Hut, DSMC rarefied, Poisson-Nernst-Planck electrokinetic), <strong>neural operators FNO/DeepONet/GeoFNO</strong>, <strong>PINNs</strong>, <strong>CFD Transformer</strong>, automazione OpenFOAM, SU2 bridge, <strong>Ollama LLM locale + Hybrid RAG (LanceDB/Chroma/BM25)</strong>. Inferenza sub-millisecondiana contro ore di CFD full-fidelity. <strong>MMS verification NASA/AIAA G-077</strong> (ordine 2.013 Poisson 2D, 1.991 Heat 1D).
            </p>
            <div class="project-metrics">
              <span class="metric"><strong>427</strong> endpoint REST</span>
              <span class="metric"><strong>53</strong> solver registrati</span>
              <span class="metric"><strong>48</strong> tool LLM-callable</span>
              <span class="metric"><strong>30</strong> workflow pre-built</span>
              <span class="metric"><strong>17</strong> moduli twin</span>
              <span class="metric"><strong>4</strong> moduli ops</span>
              <span class="metric"><strong>18</strong> DB scientifici</span>
              <span class="metric"><strong>42</strong> settori industriali</span>
              <span class="metric"><strong>224+</strong> test passing</span>
            </div>
            <div class="tech-row">
              <span class="tech">FastAPI</span><span class="tech">PyTorch</span><span class="tech">OpenFOAM</span>
              <span class="tech">PINNs</span><span class="tech">Ollama</span><span class="tech">ChromaDB</span><span class="tech">LanceDB</span>
              <span class="tech">MMS</span><span class="tech">MQTT</span><span class="tech">OPC-UA</span><span class="tech">Three.js</span>
              <span class="tech">Docker</span><span class="tech">SDK Python/JS</span>
            </div>
          </article>`;

html = html.replace(oldProject1, newProject1);

// Replace Project 2 - Digital Twin
const oldProject2 = `<article class="project tall reveal reveal-d1" style="--pg: rgba(255,179,71,0.16)">
            <div class="bg-glow"></div>
            <div class="project-top"><span class="project-id">02 / DIGITAL TWIN</span><span class="project-status">In production</span></div>
            <h3>Digital Twin Engine</h3>
            <p>
              Motore real-time per gemelli digitali: skeleton IK/FABRIK, motion loader, connettore FSI e animatore fluido-struttura.
              Trasforma risultati di simulazione in visualizzazioni interattive a 60fps per sala e linea.
            </p>
            <div class="project-metrics">
              <span class="metric"><strong>3.483</strong> LOC framework</span>
              <span class="metric"><strong>IK/FABRIK</strong> solver</span>
            </div>
            <div class="tech-row">
              <span class="tech">WebGL</span><span class="tech">FABRIK</span><span class="tech">FSI</span><span class="tech">Real-time</span>
            </div>
          </article>`;

const newProject2 = `<article class="project tall reveal reveal-d1 card-animate" style="--pg: rgba(255,179,71,0.16)">
            <div class="bg-glow"></div>
            <div class="project-top"><span class="project-id">02 / DIGITAL TWIN</span><span class="project-status">In production · v13</span></div>
            <h3>Digital Twin Engine — Complete Operations Pack</h3>
            <p>
              <strong>17 moduli twin</strong> real-time: POD/DMD/Koopman ROM, retraining incrementale, auto-mesh AI, pipeline NLP→CFD, Bayesian opt GP-EI, carbon footprint live, GUM/MC/Sobol risk, code-gen C/Fortran/CUDA, validation harness, auto-post, voice-to-CFD (Whisper), FMI co-sim, <strong>MMS verification</strong>, <strong>MQTT IoT bridge + Slack/Discord alerts</strong>, <strong>HTML dashboard zero-build</strong>, <strong>Python/JS SDK zero-dep</strong>, <strong>Three.js 3D viewer</strong>, <strong>OPC-UA PLC bridge (asyncua + VirtualPLC)</strong>, <strong>Excel multi-sheet export</strong>, <strong>Operations Pack</strong> (scheduler SQLite + worker thread + priorities, result cache SHA-256 content-addressable, lineage DAG SQLite, cost estimator wall-clock/USD/CO₂eq). <strong>3 template industriali</strong>: HVAC building 24h, Wind Farm Jensen wake, Process Plant 8h shift.
            </p>
            <div class="project-metrics">
              <span class="metric"><strong>17</strong> moduli twin</span>
              <span class="metric"><strong>4</strong> moduli ops</span>
              <span class="metric"><strong>21</strong> nuove rotte API v13</span>
              <span class="metric"><strong>~4.2K</strong> LOC v13</span>
            </div>
            <div class="tech-row">
              <span class="tech">WebGL</span><span class="tech">FABRIK</span><span class="tech">FMI</span><span class="tech">Real-time</span><span class="tech">GP-EI</span><span class="tech">GUM</span>
              <span class="tech">MQTT</span><span class="tech">Three.js</span><span class="tech">OPC-UA</span><span class="tech">Excel</span><span class="tech">Scheduler</span>
            </div>
          </article>`;

html = html.replace(oldProject2, newProject2);

// Replace Project 3 - Nexus Omega
const oldProject3 = `<article class="project reveal" style="--pg: rgba(124,107,255,0.16)">
            <div class="bg-glow"></div>
            <div class="project-top"><span class="project-id">03 / OS</span><span class="project-status">L1–L13</span></div>
            <h3>Nexus Omega</h3>
            <p>
              Architettura master sovrana e air-gapped: GraphRAG su terabyte, fine-tuning QDoRA locale,
              verifica formale Z3, swarm multi-GPU e text-to-CAD. Kernel operativo per industria meccatronica.
            </p>
            <div class="tech-row">
              <span class="tech">MCP</span><span class="tech">LanceDB</span><span class="tech">Z3</span><span class="tech">Docker</span>
            </div>
          </article>`;

const newProject3 = `<article class="project reveal card-animate" style="--pg: rgba(124,107,255,0.16)">
            <div class="bg-glow"></div>
            <div class="project-top"><span class="project-id">03 / NEXUS OS</span><span class="project-status">L1–L13</span></div>
            <h3>Nexus Omega — Sovereign Agentic OS (L1–L13)</h3>
            <p>
              Architettura master air-gapped: <strong>GraphRAG su terabyte</strong>, <strong>fine-tuning QDoRA 4-bit locale</strong> (magnitudine+direzione separati = full FT quality a LoRA cost), <strong>verifica formale Microsoft Z3</strong> (codice motori/firmware provato matematicamente bug-free), <strong>swarm multi-GPU</strong> via Nexus-Link (esecuzione fantasma AES-256 su GPU remote, auto-cleanup) + VRAM Pooling GPUStack (3×8GB = 24GB virtuali) + DoRA distribuito Unsloth 2x speed, <strong>text-to-CAD build123d</strong> (STEP industriali via codice). <strong>Omni-Router MCP</strong> single brain + hardware semaphore. <strong>HIL telemetry 1000Hz</strong> (scrive firmware, compila, gira motore dSPACE, legge sensori InfluxDB, riscrive codice se overshoot). <strong>PCB thermal vision OpenCV/Gerber</strong>. <strong>ISO 9001 auto-doc generator</strong> (Marp PDF). <strong>14 provider LLM</strong> via LiteLLM gateway (NVIDIA NIM Nemotron 550B/Ultra 253B, OpenRouter, GLM-5.2, Ollama phi4-mini/qwen2.5). Kernel operativo per industria meccatronica. EU AI Act 2026 compliant. AES-256 vault segreti industriali. Guardian agent blocca comandi letali. Sandbox Docker per codice AI.
            </p>
            <div class="tech-row">
              <span class="tech">MCP</span><span class="tech">LanceDB</span><span class="tech">Z3</span><span class="tech">Docker</span><span class="tech">QDoRA</span><span class="tech">LiteLLM</span>
              <span class="tech">GPUStack</span><span class="tech">Nexus-Link</span><span class="tech">HIL</span><span class="tech">build123d</span><span class="tech">ISO 9001</span>
            </div>
          </article>`;

html = html.replace(oldProject3, newProject3);

// Replace Project 4 - OpenClaw
const oldProject4 = `<article class="project reveal reveal-d1" style="--pg: rgba(93,255,177,0.12)">
            <div class="bg-glow"></div>
            <div class="project-top"><span class="project-id">04 / AGENTS</span><span class="project-status">Active</span></div>
            <h3>OpenClaw Standard Suite</h3>
            <p>
              Piattaforma multi-agente con memoria triple-tier, swarm registry, browser tandem e
              113 workflow community. Orchestrazione personale e operativa end-to-end.
            </p>
            <div class="project-metrics">
              <span class="metric"><strong>113</strong> workflow</span>
              <span class="metric"><strong>147</strong> nodi grafo</span>
            </div>
            <div class="tech-row">
              <span class="tech">Graphify</span><span class="tech">DAG</span><span class="tech">Triple-tier mem</span>
            </div>
          </article>`;

const newProject4 = `<article class="project reveal reveal-d1 card-animate" style="--pg: rgba(93,255,177,0.12)">
            <div class="bg-glow"></div>
            <div class="project-top"><span class="project-id">04 / AGENTS</span><span class="project-status">Active</span></div>
            <h3>OpenClaw Standard Suite — Multi-Agent Fleet</h3>
            <p>
              Piattaforma multi-agente con <strong>memoria triple-tier</strong> (episodic/semantic/procedural), swarm registry, browser tandem e <strong>113 workflow community</strong>. Orchestrazione personale e operativa end-to-end. <strong>Hermes multi-provider</strong>: Nemotron 550B (NVIDIA) + Claude Sonnet 4 (OpenRouter) + GLM-5.2 (z.ai) + Ollama locale — routing intelligente per task, fallback automatico, unified API. <strong>Antigravity lead architect</strong> (Gemini), <strong>Codex DevOps worker</strong>, <strong>Kimi long-context scout</strong>, <strong>Copilot GitHub operative</strong>. <strong>Graphify knowledge graph 17K+ nodi, 2.1K community</strong>, DAG orchestration, quality gates, token economy, SLO governance.
            </p>
            <div class="project-metrics">
              <span class="metric"><strong>113</strong> workflow</span>
              <span class="metric"><strong>147</strong> nodi grafo</span>
              <span class="metric"><strong>5</strong> agenti fleet</span>
              <span class="metric"><strong>3</strong> provider LLM tier-1</span>
            </div>
            <div class="tech-row">
              <span class="tech">Graphify</span><span class="tech">DAG</span><span class="tech">Triple-tier mem</span><span class="tech">Hermes</span>
              <span class="tech">Nemotron</span><span class="tech">GLM-5.2</span><span class="tech">Antigravity</span>
            </div>
          </article>`;

html = html.replace(oldProject4, newProject4);

// Replace Project 5 - FashionIntel (add tech row additions)
const oldProject5 = `<article class="project reveal reveal-d2" style="--pg: rgba(255,93,143,0.12)">
            <div class="bg-glow"></div>
            <div class="project-top"><span class="project-id">05 / SAAS</span><span class="project-status">Active</span></div>
            <h3>FashionIntel OS</h3>
            <p>
              Business intelligence AI-first per retail fashion: forecast domanda, pricing dinamico (DQN),
              sentiment e connettori POS (Shopify / WooCommerce) via FastAPI, con DLQ Kafka/Redis resiliente.
            </p>
            <div class="tech-row">
              <span class="tech">FastAPI</span><span class="tech">Kafka</span><span class="tech">Redis</span><span class="tech">DQN</span>
            </div>
          </article>`;

const newProject5 = `<article class="project reveal reveal-d2 card-animate" style="--pg: rgba(255,93,143,0.12)">
            <div class="bg-glow"></div>
            <div class="project-top"><span class="project-id">05 / SAAS</span><span class="project-status">Active</span></div>
            <h3>FashionIntel OS</h3>
            <p>
              Business intelligence AI-first per retail fashion: forecast domanda, <strong>pricing dinamico DQN</strong>, sentiment, connettori POS (Shopify / WooCommerce) via FastAPI, <strong>DLQ Kafka/Redis resiliente</strong>.
            </p>
            <div class="tech-row">
              <span class="tech">FastAPI</span><span class="tech">Kafka</span><span class="tech">Redis</span><span class="tech">DQN</span><span class="tech">RL</span>
            </div>
          </article>`;

html = html.replace(oldProject5, newProject5);

// Replace Project 6/7 - Second Brain
const oldProject6 = `<article class="project wide reveal" style="--pg: rgba(52,231,255,0.1)">
            <div class="bg-glow"></div>
            <div class="project-top"><span class="project-id">06 / SECOND BRAIN</span><span class="project-status">Live</span></div>
            <h3>Software House OS + WIKI AGENTI</h3>
            <p>
              Memoria operativa multi-agente (Claude · Codex · OpenClaw · Copilot · Antigravity) con 11 playbook professionali,
              quality gates, knowledge graph da oltre 17K nodi e metriche DORA. Il sistema che rende scalabile e ripetibile
              il lavoro di una software house AI-native.
            </p>
            <div class="project-metrics">
              <span class="metric"><strong>11</strong> playbook</span>
              <span class="metric"><strong>14</strong> skill nel matrix</span>
              <span class="metric"><strong>Hybrid RAG</strong> LanceDB</span>
            </div>
            <div class="tech-row">
              <span class="tech">Obsidian</span><span class="tech">Graphify</span><span class="tech">MCP</span><span class="tech">DORA</span>
            </div>
          </article>`;

const newProject6 = `<article class="project wide reveal card-animate" style="--pg: rgba(52,231,255,0.1)">
            <div class="bg-glow"></div>
            <div class="project-top"><span class="project-id">07 / SECOND BRAIN</span><span class="project-status">Live</span></div>
            <h3>Software House OS + WIKI AGENTI — The Operating System for AI-Native Delivery</h3>
            <p>
              Memoria operativa multi-agente (Claude · Codex · OpenClaw · Copilot · Antigravity · Kimi) con <strong>11 playbook professionali</strong> (Project Kickoff, SDLC, Architecture Design, Code Review, CI/CD, Secure SDLC, SRE, MLOps, Agentic Workflow, Production Readiness, Incident Response), <strong>14 skill matrix</strong>, quality gates, <strong>knowledge graph 17K+ nodi, 2.1K community</strong> (Graphify), <strong>Hybrid RAG LanceDB</strong> (597 chunk wiki, BM25+vector), <strong>DORA metrics</strong> dashboard, <strong>Cost Token Profitability System</strong> (value/token autotune), <strong>Engineering Maturity Scorecard</strong> (70/100 solid: Security 93, Memory 90, Operations 100), <strong>Autonomous Dream Cycle</strong> (LoRA dataset update nightly, Rust acceleration mutation, 6 vuln detected/patched, P2P mesh sync), <strong>Continuous Improvement Backlog</strong> P0/P1/P2 auto-prioritized. Il sistema che rende scalabile e ripetibile il lavoro di una software house AI-native.
            </p>
            <div class="project-metrics">
              <span class="metric"><strong>11</strong> playbook</span>
              <span class="metric"><strong>14</strong> skill matrix</span>
              <span class="metric"><strong>Hybrid RAG</strong> LanceDB</span>
              <span class="metric"><strong>DORA</strong> metrics</span>
              <span class="metric"><strong>17K+</strong> nodi grafo</span>
              <span class="metric"><strong>224+</strong> test pass</span>
            </div>
            <div class="tech-row">
              <span class="tech">Obsidian</span><span class="tech">Graphify</span><span class="tech">MCP</span><span class="tech">DORA</span><span class="tech">FinOps</span>
              <span class="tech">Dream Cycle</span><span class="tech">LoRA</span><span class="tech">Rust</span><span class="tech">Z3</span>
            </div>
          </article>`;

html = html.replace(oldProject6, newProject6);

fs.writeFileSync('index.html', html);
console.log('All projects updated!');