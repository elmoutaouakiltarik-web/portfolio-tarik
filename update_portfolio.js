const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// ============================================================
// PROJECT 1 - CFDML Enterprise Platform (v13)
// ============================================================
const oldP1 = `<article class="project wide reveal" style="--pg: rgba(52,231,255,0.16)">
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

const newP1 = `<article class="project wide reveal card-animate" style="--pg: rgba(52,231,255,0.16)">
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

html = html.replace(oldP1, newP1);

// ============================================================
// PROJECT 2 - Digital Twin Engine (v13)
// ============================================================
const oldP2 = `<article class="project tall reveal reveal-d1" style="--pg: rgba(255,179,71,0.16)">
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

const newP2 = `<article class="project tall reveal reveal-d1 card-animate" style="--pg: rgba(255,179,71,0.16)">
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

html = html.replace(oldP2, newP2);

// ============================================================
// PROJECT 3 - Nexus Omega (v13)
// ============================================================
const oldP3 = `<article class="project reveal" style="--pg: rgba(124,107,255,0.16)">
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

const newP3 = `<article class="project reveal card-animate" style="--pg: rgba(124,107,255,0.16)">
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

html = html.replace(oldP3, newP3);

// ============================================================
// PROJECT 4 - OpenClaw Agents (v13)
// ============================================================
const oldP4 = `<article class="project reveal reveal-d1" style="--pg: rgba(93,255,177,0.12)">
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

const newP4 = `<article class="project reveal reveal-d1 card-animate" style="--pg: rgba(93,255,177,0.12)">
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

html = html.replace(oldP4, newP4);

// ============================================================
// PROJECT 5 - FashionIntel (no major changes, just add card-animate)
// ============================================================
const oldP5 = `<article class="project reveal reveal-d2" style="--pg: rgba(255,93,143,0.12)">
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

const newP5 = `<article class="project reveal reveal-d2 card-animate" style="--pg: rgba(255,93,143,0.12)">
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

html = html.replace(oldP5, newP5);

// ============================================================
// PROJECT 6 -> 7 - Second Brain (renumbered to 7, v13)
// ============================================================
const oldP6 = `<article class="project wide reveal" style="--pg: rgba(52,231,255,0.1)">
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

const newP6 = `<article class="project wide reveal card-animate" style="--pg: rgba(52,231,255,0.1)">
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

html = html.replace(oldP6, newP6);

// ============================================================
// PROOF / CASE STUDIES - Update with 12 cases
// ============================================================
const oldProof = `<section id="proof">
      <div class="wrap">
        <div class="section-head reveal">
          <div>
            <div class="section-kicker">04 — Proof</div>
            <h2>Casi studio e risultati misurabili</h2>
          </div>
          <p>Evidenze da CFDML Enterprise e dal percorso di specializzazione industriale.</p>
        </div>
        <div class="case-strip">
          <article class="case reveal">
            <div class="case-num">CASE 01</div>
            <h4>Ottimizzazione NACA0012</h4>
            <p>11 run CFD, surrogate MLP su Cl/Cd con polari aerodinamiche riproducibili a seed fisso.</p>
            <div class="result">Cl R² = 0.9997 · Cd R² = 0.9903</div>
          </article>
          <article class="case reveal reveal-d1">
            <div class="case-num">CASE 02</div>
            <h4>Scambiatore E-2026</h4>
            <p>Surrogate per efficienza e finestra di manutenzione predittiva su asset energetico.</p>
            <div class="result">R² = 0.9995 · horizon 421 giorni</div>
          </article>
          <article class="case reveal reveal-d2">
            <div class="case-num">CASE 03</div>
            <h4>Cavità 2D multi-Re</h4>
            <p>Neural ODE su 7 regimi di Reynolds: errore < 1% vs CFD ad alta fedeltà.</p>
            <div class="result">Errore < 1% · shape control ready</div>
          </article>
          <article class="case reveal reveal-d3">
            <div class="case-num">CASE 04</div>
            <h4>Curva eolica Rimini</h4>
            <p>Modello surrogato per potenza e ottimizzazione pitch in tempo reale.</p>
            <div class="result">R² = 0.9989 · calc −99.9%</div>
          </article>
        </div>
      </div>
    </section>`;

const newProof = `<section id="proof">
      <div class="wrap">
        <div class="section-head reveal">
          <div>
            <div class="section-kicker">04 — Proof</div>
            <h2>Casi studio e risultati misurabili</h2>
          </div>
          <p>Evidenze da CFDML Enterprise v13, Digital Twin v11/v12, Nexus Omega L1-L13, percorso certificato EQF 6.</p>
        </div>
        <div class="case-strip">
          <article class="case reveal card-animate">
            <div class="case-num">CASE 01</div>
            <h4>Ottimizzazione NACA0012 — Surrogate MLP</h4>
            <p>11 run CFD full-fidelity, surrogate MLP su Cl/Cd con polari aerodinamiche riproducibili a seed fisso. Validazione vs oracle XFOIL.</p>
            <div class="result">Cl R² = 0.9997 · Cd R² = 0.9903 · 11× speedup</div>
          </article>
          <article class="case reveal reveal-d1 card-animate">
            <div class="case-num">CASE 02</div>
            <h4>Scambiatore E-2026 — Predictive Maintenance Window</h4>
            <p>Surrogate per efficienza termica e finestra manutenzione predittiva su asset energetico. Horizon 421 giorni, retraining incrementale POD.</p>
            <div class="result">R² = 0.9995 · Horizon 421 giorni · POD retrain < 100ms</div>
          </article>
          <article class="case reveal reveal-d2 card-animate">
            <div class="case-num">CASE 03</div>
            <h4>Cavità 2D Multi-Re — Neural ODE</h4>
            <p>Neural ODE su 7 regimi di Reynolds (100–10000): errore < 1% vs CFD ad alta fedeltà. Shape control ready per adjoint optimization.</p>
            <div class="result">Errore < 1% · 7 Re regimes · Shape control ready</div>
          </article>
          <article class="case reveal reveal-d3 card-animate">
            <div class="case-num">CASE 04</div>
            <h4>Parco Eolico Rimini — Digital Twin Template</h4>
            <p>Modello surrogato per potenza e ottimizzazione pitch real-time su 6 turbine. Jensen wake model + Bayesian opt GP-EI per AEP maximization.</p>
            <div class="result">R² = 0.9989 · Calcolo −99.9% vs CFD · AEP opt +3.2%</div>
          </article>
          <article class="case reveal card-animate">
            <div class="case-num">CASE 05</div>
            <h4>Carbon Ledger — CFDML Runs</h4>
            <p>Tracciamento CO₂eq per run CFD: 8 core, 1h, PUE 1.4, region Italy → 17.47 g CO₂eq. Carbon ledger cumulativo auditabile per compliance ESG.</p>
            <div class="result">17.47 g CO₂eq/run · Region-aware · ESG-ready</div>
          </article>
          <article class="case reveal reveal-d1 card-animate">
            <div class="case-num">CASE 06</div>
            <h4>Bayesian Opt — Shape Optimization</h4>
            <p>GP-EI multi-fidelity su NACA 4-digit: 15 valutazioni surrogate vs 200+ CFD. Convergenza a x*=[3.013, 2.20], f*=0.041 (vero [3,2]).</p>
            <div class="result">15 evals · x* error < 0.7% · 13× cost reduction</div>
          </article>
          <article class="case reveal reveal-d2 card-animate">
            <div class="case-num">CASE 07</div>
            <h4>GUM + Monte Carlo — Uncertainty Quantification</h4>
            <p>Propagazione incertezza y=x1·x2, x1=5±0.1, x2=3±0.05. GUM analitico u_c=0.391, MC 2000 samples mean=14.99 std=0.39. Match esatto.</p>
            <div class="result">GUM u_c=0.391 · MC match exact · Sobol indices ready</div>
          </article>
          <article class="case reveal reveal-d3 card-animate">
            <div class="case-num">CASE 08</div>
            <h4>Voice-to-CFD — Natural Language Pipeline</h4>
            <p>"cylinder cross-flow 20 m/s" → geometry=cylinder, physics=incompressible, solver=incompressible_2d, mesh=auto. Confidence 1.0. Whisper-ready.</p>
            <div class="result">Confidence 1.0 · End-to-end · Whisper compatible</div>
          </article>
          <article class="case reveal card-animate">
            <div class="case-num">CASE 09</div>
            <h4>MMS Verification — NASA/AIAA G-077 Gold Standard</h4>
            <p>Method of Manufactured Solutions: Poisson 2D order_L2=2.013 (atteso 2.0) → PASS. Heat 1D order_L2=1.991 → PASS. Convergenza dimostrata rigorosamente.</p>
            <div class="result">Order 2.013 · Order 1.991 · Gold standard verified</div>
          </article>
          <article class="case reveal reveal-d1 card-animate">
            <div class="case-num">CASE 10</div>
            <h4>IoT MQTT Bridge + Slack/Discord Alerts</h4>
            <p>Pipeline completa: Mosquitto broker → realtime twin → forecast → alert webhook. Rate-limit + severity threshold + history. Built-in: auto_anomaly, carbon_spike, validation_fail.</p>
            <div class="result">Zero-build HTML dashboard · Auto-poll 5s · Chart.js log-scale</div>
          </article>
          <article class="case reveal reveal-d2 card-animate">
            <div class="case-num">CASE 11</div>
            <h4>Python/JS SDK Zero-Dep + Docker 6-Service Stack</h4>
            <p>CFDMLClient (urllib stdlib only, 23 metodi). cfdml-client.js browser+Node (4 KB vanilla fetch). Jupyter magic %cfdml_ask. Docker compose: API+Ollama+MQTT+Redis+InfluxDB+Grafana. One-shot deploy.</p>
            <div class="result">Zero dependencies · 4149 bytes JS · 6 services · One command</div>
          </article>
          <article class="case reveal reveal-d3 card-animate">
            <div class="case-num">CASE 12</div>
            <h4>Nexus-Link + VRAM Pooling + HIL 1000Hz</h4>
            <p>Esecuzione fantasma AES-256 su GPU remote (cartella invisibile, auto-cleanup). GPUStack fonde 3×8GB = 24GB virtuali. HIL: scrive firmware, compila, gira motore dSPACE, legge 1000Hz InfluxDB, riscrive codice se overshoot.</p>
            <div class="result">Air-gapped · 24GB VRAM virtuali · 1000Hz telemetry · Auto-code repair</div>
          </article>
        </div>
      </div>
    </section>`;

html = html.replace(oldProof, newProof);

// ============================================================
// SKILLS - Update with v13 competencies
// ============================================================
const oldSkills = `<section id="skills">
      <div class="wrap">
        <div class="section-head reveal">
          <div>
            <div class="section-kicker">05 — Stack</div>
            <h2>Competenze operative</h2>
          </div>
          <p>Stack ibrido OT/IT costruito su formazione certificata e progetti di produzione.</p>
        </div>

        <div class="skills-layout">
          <div class="glass skill-panel reveal">
            <h3>Proficiency map</h3>
            <div class="skill-bars">
              <div class="skill-bar"><label><span>Digital Twin / CFD-AI</span><span>95%</span></label><div class="bar"><i data-w="95"></i></div></div>
              <div class="skill-bar"><label><span>Python · ML · PyTorch</span><span>92%</span></label><div class="bar"><i data-w="92"></i></div></div>
              <div class="skill-bar"><label><span>Automazione · PLC · Robotica</span><span>88%</span></label><div class="bar"><i data-w="88"></i></div></div>
              <div class="skill-bar"><label><span>IIoT · MQTT · OPC-UA</span><span>86%</span></label><div class="bar"><i data-w="86"></i></div></div>
              <div class="skill-bar"><label><span>CAD 3D · Onshape</span><span>84%</span></label><div class="bar"><i data-w="84"></i></div></div>
              <div class="skill-bar"><label><span>Sistemi agentic · RAG</span><span>90%</span></label><div class="bar"><i data-w="90"></i></div></div>
            </div>
          </div>

          <div class="glass skill-cloud reveal reveal-d1">
            <span class="skill-tag hot">OpenFOAM</span>
            <span class="skill-tag hot">PINNs</span>
            <span class="skill-tag hot">FNO / DeepONet</span>
            <span class="skill-tag hot">PyTorch</span>
            <span class="skill-tag hot">FastAPI</span>
            <span class="skill-tag">Siemens TIA Portal</span>
            <span class="skill-tag">Ladder / FBD / STL</span>
            <span class="skill-tag">KUKA · ABB · FANUC</span>
            <span class="skill-tag">OPC-UA</span>
            <span class="skill-tag">MQTT</span>
            <span class="skill-tag">Profinet</span>
            <span class="skill-tag">EtherCAT</span>
            <span class="skill-tag">Modbus TCP</span>
            <span class="skill-tag">Deep RL (PPO)</span
            <span class="skill-tag">Neural Operators</span>
            <span class="skill-tag">Scikit-learn</span>
            <span class="skill-tag">Pandas · NumPy</span>
            <span class="skill-tag">SQL</span>
            <span class="skill-tag">Docker</span>
            <span class="skill-tag">WSL · Linux</span>
            <span class="skill-tag">Onshape</span>
            <span class="skill-tag">Streamlit</span>
            <span class="skill-tag">Grafana</span>
            <span class="skill-tag">Power BI</span>
            <span class="skill-tag">Node-RED</span>
            <span class="skill-tag">NVIDIA Jetson</span>
            <span class="skill-tag">Computer Vision</span>
            <span class="skill-tag">ISA/IEC 62443</span>
            <span class="skill-tag">C++ · Bash · PowerShell</span>
            <span class="skill-tag">GraphRAG · LanceDB</span>
            <span class="skill-tag">MCP Agents</span
            <span class="skill-tag">React · TypeScript</span>
          </div>
        </div>
      </div>
    </section>`;

const newSkills = `<section id="skills">
      <div class="wrap">
        <div class="section-head reveal">
          <div>
            <div class="section-kicker">05 — Stack</div>
            <h2>Competenze operative certificate — 13 sprint CFDML + Nexus Omega L13</h2>
          </div>
          <p>Stack ibrido OT/IT costruito su 1.700+ ore formazione certificata EQF 6 e progetti di produzione reale.</        </div>

        <div class="skills-layout">
          <div class="glass skill-panel reveal">
            <h3>Proficiency Map</h3>
            <div class="skill-bars">
              <div class="skill-bar"><label><span>Digital Twin / CFD-AI / ROM (POD/DMD/Koopman)</span><span>98%</span></label><div class="bar"><i data-w="98"></i></div></div>
              <div class="skill-bar"><label><span>Python · PyTorch · Neural Operators (FNO/DeepONet/GeoFNO)</span><span>95%</span></label><div class="bar"><i data-w="95"></i></div></div>
              <div class="skill-bar"><label><span>Automazione · PLC (TIA Portal) · Robotica (KUKA/ABB/FANUC)</span><span>90%</span></label><div class="bar"><i data-w="90"></i></div></div>
              <div class="skill-bar"><label><span>IIoT · MQTT · OPC-UA · Profinet · EtherCAT · TSN</span><span>88%</span></label><div class="bar"><i data-w="88"></i></div></div>
              <div class="skill-bar"><label><span>CAD 3D · Onshape · build123d (STEP/STL/GLB/DXF)</span><span>85%</span></label><div class="bar"><i data-w="85"></i></div></div>
              <div class="skill-bar"><label><span>Sistemi Agentic · GraphRAG · MCP · Triple-tier Memory</span><span>92%</span></label><div class="bar"><i data-w="92"></i></div></div>
              <div class="skill-bar"><label><span>Bayesian Opt GP-EI · UQ (GUM/MC/Sobol) · MMS Verification</span><span>87%</span></label><div class="bar"><i data-w="87"></i></div></div>
              <div class="skill-bar"><label><span>Carbon Ledger · ESG · FMI Co-Sim · Code Gen C/Fortran/CUDA</span><span>82%</span></label><div class="bar"><i data-w="82"></i></div></div>
              <div class="skill-bar"><label><span>Z3 Formal Verification · QDoRA 4-bit · VRAM Pooling</span><span>78%</span></label><div class="bar"><i data-w="78"></i></div></div>
              <div class="skill-bar"><label><span>HIL Telemetry 1000Hz · PCB Thermal Vision · ISO 9001 Auto-Doc</span><span>75%</span></label><div class="bar"><i data-w="75"></i></div></div>
              <div class="skill-bar"><label><span>Nexus-Link Air-Gapped · GPUStack · Swarm DoRA · LiteLLM 14 Provider</span><span>80%</span></label><div class="bar"><i data-w="80"></i></div></div>
              <div class="skill-bar"><label><span>Docker 6-Service · Python/JS SDK Zero-Dep · CLI 20+ Aliases</span><span>88%</span></label><div class="bar"><i data-w="88"></i></div></div>
              <div class="skill-bar"><label><span>DORA Metrics · FinOps · Token Economy · SLO/Error Budget</span><span>85%</span></label><div class="bar"><i data-w="85"></i></div></div>
            </div>
          </div>

          <div class="glass skill-cloud reveal reveal-d1">
            <span class="skill-tag hot">OpenFOAM</span>
            <span class="skill-tag hot">PINNs</span>
            <span class="skill-tag hot">FNO / DeepONet / GeoFNO</span>
            <span class="skill-tag hot">PyTorch</span>
            <span class="skill-tag hot">FastAPI</span>
            <span class="skill-tag">Siemens TIA Portal</span>
            <span class="skill-tag">Ladder / FBD / STL</span>
            <span class="skill-tag">KUKA · ABB · FANUC</span>
            <span class="skill-tag">OPC-UA</span>
            <span class="skill-tag">MQTT · Mosquitto</span>
            <span class="skill-tag">Profinet</span>
            <span class="skill-tag">EtherCAT · TSN</span>
            <span class="skill-tag">Modbus TCP</span>
            <span class="skill-tag">Deep RL (PPO/DQN)</span>
            <span class="skill-tag">Neural Operators</span>
            <span class="skill-tag">Scikit-learn</span>
            <span class="skill-tag">Pandas · NumPy</span>
            <span class="skill-tag">SQL · DuckDB</span>
            <span class="skill-tag">Docker · Podman</span>
            <span class="skill-tag">WSL2 · Linux</span>
            <span class="skill-tag">Onshape</span>
            <span class="skill-tag">Streamlit</span>
            <span class="skill-tag">Grafana</span>
            <span class="skill-tag">Power BI</span>
            <span class="skill-tag">Node-RED</span>
            <span class="skill-tag">NVIDIA Jetson</span>
            <span class="skill-tag">Computer Vision</span>
            <span class="skill-tag">ISA/IEC 62443</span>
            <span class="skill-tag">C++ · Bash · PowerShell</span
            <span class="skill-tag">GraphRAG · LanceDB</span>
            <span class="skill-tag">MCP Agents</span>
            <span class="skill-tag">React · TypeScript</span>
            <span class="skill-tag">Ollama · LiteLLM</span>
            <span class="skill-tag">QDoRA · LoRA</span>
            <span class="skill-tag">Z3 Theorem Prover</span>
            <span class="skill-tag">build123d · STEP</span>
            <span class="skill-tag">Whisper · Voice AI</span>
            <span class="skill-tag">FMI / Modelica</span>
            <span class="skill-tag">DORA · FinOps</span>
            <span class="skill-tag">MMS Verification</span>
            <span class="skill-tag">Three.js · WebGL</span>
            <span class="skill-tag">Excel Export (openpyxl)</span>
            <span class="skill-tag">Scheduler SQLite</span>
            <span class="skill-tag">Result Cache SHA-256</span>
            <span class="skill-tag">Lineage DAG</span>
            <span class="skill-tag">Cost Estimator USD/CO₂</span>
            <span class="skill-tag">N-body Barnes-Hut</span>
            <span class="skill-tag">DSMC Rarefied</span>
            <span class="skill-tag">PNP Electrokinetic</span>
            <span class="skill-tag">WENO5 Shock-Capturing</span>
            <span class="skill-tag">Reactive Transport</span>
            <span class="skill-tag">Phase-Field Solidification</span
            <span class="skill-tag">Battery P2D Newman</span>
            <span class="skill-tag">GPUStack VRAM Pooling</span>
            <span class="skill-tag">Nexus-Link Air-Gapped</span>
            <span class="skill-tag">HIL dSPACE 1000Hz</span>
            <span class="skill-tag">PCB Thermal Vision</span>
            <span class="skill-tag">ISO 9001 Marp PDF</span>
          </div>
        </div>
      </div>
    </section>`;

html = html.replace(oldSkills, newSkills);

// Write the updated file
fs.writeFileSync('index.html', html);
console.log('All replacements completed!');