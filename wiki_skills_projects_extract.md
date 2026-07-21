# Detailed Skills & Projects Extract


## Agent Lifecycle Hook Pattern

**Source:** wiki\agents\Agent Lifecycle Hook Pattern.md


--- title: "Agent Lifecycle Hook Pattern" type: agent-pattern date: 2026-05-06 tags:


## Purpose

Hooks make agent work observable and reduce forgotten memory.


## Events

- session start: inject compact context pack and vault path;
- post tool use: heartbeat or regenerate index after writes;
- pre compact: remind the agent to compress state;
- stop/session end: check whether memory was saved;
- error: record failure class and next recovery action.


## Local Implementation

- Claude user settings point to `C:\Users\TAREK\.claude\hooks`.
- Agent hooks point to `C:\Users\TAREK\.agents\hooks`.
- Vault memory is saved with `tools/agent-done.ps1`.


## Rule

Hooks must never block normal coding unless the action is dangerous. For memory, prefer silent heartbeat plus final explicit memory save.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../AGENTS.md|Agents]] -- _Panoramica del sistema multi-agente_
- [[../sources/llm_wiki_pattern.md|llm_wiki_pattern]] -- _File correlato per contenuto_
- [[../playbooks/MLOps Lifecycle.md|MLOps Lifecycle]] -- _File correlato per contenuto_


- [[Autonomous Query Engine Pattern|Autonomous Query Engine P



---


## Agent Memory Policy

**Source:** wiki\agents\Agent Memory Policy.md


--- title: "Agent Memory Policy" type: system date: 2026-05-06 tags:


## Cosa va in memoria sempre caricata

- Regole brevi e stabili.
- Percorsi principali.
- Comandi essenziali.


## Cosa va on-demand

- Procedure lunghe.
- Playbook specialistici.
- Fonti web.
- Decisioni storiche.


## Claude

Usa `CLAUDE.md` per istruzioni concise e `.claude/rules/` per regole modulari. Vedi [[../sources/Web - Claude Memory Prompting]].


## Codex

Usa `AGENTS.md` e la skill installata `software-house-os-max` per routing professionale.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../AGENTS.md|Agents]] -- _Panoramica del sistema multi-agente_
- [[../daily/2026-06-12 - Agent Memory.md|Daily 2026-06-12]] -- _File correlato per contenuto_
- [[../daily/2026-06-10 - Agent Memory.md|Daily 2026-06-10]] -- _File correlato per contenuto_
- [[../daily/2026-06-06 - Agent Memory.md|Daily 2



---


## Autonomous Query Engine Pattern

**Source:** wiki\agents\Autonomous Query Engine Pattern.md


--- title: "Autonomous Query Engine Pattern" type: agent-pattern date: 2026-05-06 tags:


## Loop

1. Load compact context.
2. Plan the smallest safe path.
3. Choose tools.
4. Execute one step.
5. Record evidence.
6. Check token budget.
7. Compact if needed.
8. Checkpoint.
9. Verify.
10. Save memory.


## Failure Handling

- retry with backoff for transient tool failures;
- switch approach after two repeated failures;
- use circuit breaker for unstable providers/tools;
- checkpoint before risky writes;
- escalate to user only when a real decision is needed.


## Evidence

The agent must distinguish "observed from tool output" from "inferred".


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../AGENTS.md|Agents]] -- _Panoramica del sistema multi-agente_
- [[../_system/Query.md|Query]] -- _File correlato per contenuto_


- [[Agent Lifecycle Hook Pattern|Agent Lifecycle Hook Pattern]]

- [[Agent Lifecycle Hook Pattern|Agent Lifecycle Hook Pattern]]

- [[Agent Lifecycle Hook Pattern|Agent Li



---


## Buffy (Codebuff) — Capacità Complete

**Source:** wiki\agents\Buffy Codebuff Capabilities.md


--- title: "Buffy Codebuff Capabilities" type: agent date: 2026-06-18 tags:


## Identità
Buffy è l'agente AI dietro **Codebuff**, una CLI che permette di chattare con l'AI per programmare. Opera come **Strategic Orchestrator** nella flotta Nexus Omega.

- **Modello**: deepseek-v4-pro (cloud)
- **Guida**: `BUFFY.md`
- **Ruolo**: Orchestrazione strategica, sub-agenti paralleli, coding complesso

---


## Superpoteri Unici


### 1. Sub-agenti Paralleli
Buffy può spawnare fino a 5+ agenti specializzati in parallelo:
| Sub-agente | Funzione |
|------------|----------|
| file-picker | Ricerca fuzzy file nel codebase |
| code-searcher | Ricerca ripgrep con regex |
| basher | Esecuzione comandi terminale |
| researcher-web | Ricerca web |
| researcher-docs | Documentazione tecnica ufficiale |
| browser-use | Test browser con Chrome DevTools |
| thinker-with-files-gemini | Ragionamento profondo con file |
| code-reviewer-


### 2. Skills System (90+ skills)
Buffy ha accesso a 90+ skill specializzate:
- **Azure** (30+ skill): deploy, AKS, cost, security, diagnostics, AI, storage...
- **CAD/3D**: text-to-CAD, implicit CAD, URDF/SRDF, G-code, CAD viewer
- **Media**: image/video generation, TTS, podcast, PPT
- **Frontend**: frontend-design, web-design-guidelines, vercel-deploy
- **Engineering**: code-engineering-max, software-house-os-max, code-review
- **Data**: data-analysis, chart-visualization, deep-research
- **Do


### 3. Orchestrazione Task
Pattern operativo standard:
```
1. GATHER → file-picker + code-searcher + researcher-web (parallelo)
2. THINK  → thinker-with-files-gemini (se necessario)
3. PLAN   → write_todos con step chiari
4. EXECUTE → str_replace / write_file / basher
5. REVIEW → code-reviewer-deepseek
6. TEST   → basher (typecheck + test + lint, parallelo)
7. SAVE   → save-memory.ps1
```


### 4. Code Intelligence
- Edit diretti con `str_replace` (targeted) e `write_file` (nuovi file)
- Refactoring cross-file con verifica referenze
- Typecheck, test run, lint in parallelo
- Code review automatica prima di ogni commit


### 5. Browser Testing
- Automazione Chrome DevTools per testare UI
- Verifica console errors, layout, accessibility
- Test flussi completi (login, form, navigazione)


### 6. Graphify Integration
- Accesso al knowledge graph del vault (`graphify-out/graph.json`)
- Query BFS/DFS per navigare relazioni tra concetti
- Community detection per clustering semantico

---


## Protocollo Sessione Buffy



---


## Claude Hooks System

**Source:** wiki\agents\Claude Hooks System.md


--- title: "Claude Hooks System" type: agent-pattern date: 2026-05-06 tags:


## Local Hooks

- `C:\Users\TAREK\.claude\hooks\session-start-context.ps1`
- `C:\Users\TAREK\.claude\hooks\vault-write-hook.ps1`
- `C:\Users\TAREK\.claude\hooks\session-stop-hook.ps1`


## Rule

Hooks provide context and checks. Final memory still uses `tools/agent-done.ps1` so that decisions are explicit and linted.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../AGENTS.md|Agents]] -- _Panoramica del sistema multi-agente_
- [[../synthesis/Claude Setup Completo.md|Claude Setup Completo]] -- _File correlato per contenuto_
- [[Slash Commands Claude.md|Slash Commands Claude]] -- _File correlato per contenuto_
- [[../_system/Claude Command Pack.md|Claude Command



---


## Claude Subagents — awesome-claude-code-subagents

**Source:** wiki\agents\Claude Subagents - awesome-claude-code-subagents.md


--- title: "Claude Subagents — Installazione da awesome-claude-code-subagents" type: agent date: 2026-05-11 last_reviewed: 2026-05-11


## Installazione rapida

```bash
# Clona repo
git clone https://github.com/VoltAgent/awesome-claude-code-subagents.git
cd awesome-claude-code-subagents

# Installa globalmente (tutti i subagents disponibili in ogni progetto)
cp -r agents/* ~/.claude/agents/

# Oppure per progetto specifico
cp agents/ml-engineer.md .claude/agents/
cp agents/devops-engineer.md .claude/agents/
```

---


## Categorie disponibili (selezionate per il nostro stack)


### 🔧 Core Development
| Subagent | Quando usarlo |
|----------|--------------|
| `frontend-developer` | React, Vue, CSS, responsive |
| `backend-developer` | API REST, database, microservizi |
| `api-designer` | Progettazione API RESTful/GraphQL |
| `microservices-architect` | Architettura distribuita |
| `graphql-architect` | Schema GraphQL, resolver |


### 💻 Language Specialists
| Subagent | Linguaggio |
|----------|-----------|
| `typescript-pro` | TypeScript avanzato |
| `python-pro` | Python, async, packaging |
| `golang-pro` | Go, concorrenza, performance |
| `react-specialist` | React ecosystem completo |
| `java-architect` | Java enterprise, Spring |
| `cpp-pro` | C++, performance-critical |


### ☁️ Infrastructure & DevOps
| Subagent | Cosa fa |
|----------|---------|
| `devops-engineer` | CI/CD, pipeline, automazione |
| `cloud-architect` | Azure/AWS/GCP architettura |
| `kubernetes-specialist` | K8s deployment, scaling |
| `terraform-engineer` | IaC, infrastruttura come codice |
| `security-engineer` | SecDevOps, threat model |
| `sre-engineer` | Reliability, monitoring, SLO/SLA |
| `platform-engineer` | Developer platform, tooling interno |


### 🧪 Quality & Security
| Subagent | Cosa fa |
|----------|---------|
| `qa-expert` | Test strategy, TDD, BDD |
| `pen-tester` | Penetration testing, vuln scan |
| `code-reviewer` | Code review alto segnale |
| `error-detective` | Debugging sistematico |
| `performance-engineer` | Profiling, ottimizzazione |
| `compliance-auditor` | GDPR, SOC2, audit |
| `chaos-engineer` | Resilience testing |


### 🤖 Data & AI/ML
| Subagent | Cosa fa |
|----------|---------|
| `data-scientist` | EDA, feature engineering, modeling |
| `ml-engineer` | Training pipeline, deployment |
| `ai-engineer` | LLM integration, agent building |
| `llm-architect` | Architettura sistemi LLM |
| `prompt-engineer` | Prompt optimization |
| `mlops-engineer` | MLOps, experiment tracking, serving |
| `postgres-pro` | Query ottimizzazione, schema design |


### 🎯 Meta & Orchestrazione
| Subagent | Cosa fa |
|----------|---------|
| `meta-orchestrator` | Coordina altri subagents |
| `workflow-automator` | Automatizza flussi multi-step |

---


## Skill aggiuntive — ComposioHQ (1000+)

> Source: [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills)

```bash
git clone https://github.com/ComposioHQ/awesome-claude-skills.git
# Seleziona le skill rilevanti e installa nella skill directory di Claude
```

Copre anche: marketing, legal, product management, compliance, integrazioni API esterne.

---



---


## Claude Subagents — awesome-claude-code-subagents

**Source:** wiki\agents\Claude Subagents — awesome-claude-code-subagents.md


--- title: "Claude Subagents — Installazione da awesome-claude-code-subagents" type: agent date: 2026-05-11 last_reviewed: 2026-05-11


## Installazione rapida

```bash
# Clona repo
git clone https://github.com/VoltAgent/awesome-claude-code-subagents.git
cd awesome-claude-code-subagents

# Installa globalmente (tutti i subagents disponibili in ogni progetto)
cp -r agents/* ~/.claude/agents/

# Oppure per progetto specifico
cp agents/ml-engineer.md .claude/agents/
cp agents/devops-engineer.md .claude/agents/
```

---


## Categorie disponibili (selezionate per il nostro stack)


### 🔧 Core Development
| Subagent | Quando usarlo |
|----------|--------------|
| `frontend-developer` | React, Vue, CSS, responsive |
| `backend-developer` | API REST, database, microservizi |
| `api-designer` | Progettazione API RESTful/GraphQL |
| `microservices-architect` | Architettura distribuita |
| `graphql-architect` | Schema GraphQL, resolver |


### 💻 Language Specialists
| Subagent | Linguaggio |
|----------|-----------|
| `typescript-pro` | TypeScript avanzato |
| `python-pro` | Python, async, packaging |
| `golang-pro` | Go, concorrenza, performance |
| `react-specialist` | React ecosystem completo |
| `java-architect` | Java enterprise, Spring |
| `cpp-pro` | C++, performance-critical |


### ☁️ Infrastructure & DevOps
| Subagent | Cosa fa |
|----------|---------|
| `devops-engineer` | CI/CD, pipeline, automazione |
| `cloud-architect` | Azure/AWS/GCP architettura |
| `kubernetes-specialist` | K8s deployment, scaling |
| `terraform-engineer` | IaC, infrastruttura come codice |
| `security-engineer` | SecDevOps, threat model |
| `sre-engineer` | Reliability, monitoring, SLO/SLA |
| `platform-engineer` | Developer platform, tooling interno |


### 🧪 Quality & Security
| Subagent | Cosa fa |
|----------|---------|
| `qa-expert` | Test strategy, TDD, BDD |
| `pen-tester` | Penetration testing, vuln scan |
| `code-reviewer` | Code review alto segnale |
| `error-detective` | Debugging sistematico |
| `performance-engineer` | Profiling, ottimizzazione |
| `compliance-auditor` | GDPR, SOC2, audit |
| `chaos-engineer` | Resilience testing |


### 🤖 Data & AI/ML
| Subagent | Cosa fa |
|----------|---------|
| `data-scientist` | EDA, feature engineering, modeling |
| `ml-engineer` | Training pipeline, deployment |
| `ai-engineer` | LLM integration, agent building |
| `llm-architect` | Architettura sistemi LLM |
| `prompt-engineer` | Prompt optimization |
| `mlops-engineer` | MLOps, experiment tracking, serving |
| `postgres-pro` | Query ottimizzazione, schema design |


### 🎯 Meta & Orchestrazione
| Subagent | Cosa fa |
|----------|---------|
| `meta-orchestrator` | Coordina altri subagents |
| `workflow-automator` | Automatizza flussi multi-step |

---


## Skill aggiuntive — ComposioHQ (1000+)

> Source: [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills)

```bash
git clone https://github.com/ComposioHQ/awesome-claude-skills.git
# Seleziona le skill rilevanti e installa nella skill directory di Claude
```

Copre anche: marketing, legal, product management, compliance, integrazioni API esterne.

---



---


## DESIGNER (Nexus Omega Edition)

**Source:** wiki\agents\DESIGNER.md


--- title: DESIGNER (UI/UX Prototyper & Canvas Architect) type: agent date: 2026-07-10 tags: [design, ui-canvas, nexus-omega, l10, prototyping, frontend, agent]


## 🚀 Avvio Sovereign (Obbligatorio)
1. Verifica stato sistema: `python tools/os-core/nexus-cli.py status`
2. Controlla risorse disponibili: `python tools/os-core/hardware-balancer.py`


## 🚀 Identità e Ruolo
- **Nome Flotta:** Designer
- **Ruolo Nexus:** UI/UX Prototyper & Canvas Architect
- **Modello SOTA:** Claude Opus / Sonnet (design generation)
- **Output:** File `.html` standalone interattivi
- **Punto di Ingresso:** `wiki/agents/DESIGNER.md`


## 🎨 Canvas System — Regole Fondamentali


### React + Babel (per JSX inline)
Usa SEMPRE questi tag script esatti con versioni pinnate e hash di integrità:

```html
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js"
  integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L"
  crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"
  integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm"
  crossorigin="anonymo


### Condivisione Componenti tra Script Babel
Ogni `<script type="text/babel">` ha il proprio scope. Per condividere componenti, esporta su `window`:

```js
// Alla fine di components.jsx:
Object.assign(window, {
  Terminal, Line, Spacer,
  Gray, Blue, Green, Bold,
});
```


### CRITICAL: No collisioni stili globali
MAI usare `const styles = { ... }` — dare nomi SPECIFICI:
```js
// ✅ GIUSTO
const terminalStyles = { ... };
const deckStyles = { ... };

// ❌ SBAGLIATO — rompe tutto
const styles = { ... };
```


### CRITICAL: NO browser storage APIs
MAI usare `localStorage`, `sessionStorage`, o API browser storage negli artefatti. Invece:
- React state (`useState`, `useReducer`) per componenti React
- Variabili JavaScript in-memory per HTML vanilla


## 🛠️ Tweaks System (controlli inline editabili)


### Protocollo
1. **PRIMA** registra un listener `message` su `window`:
   ```js
   window.addEventListener('message', (e) => {
     if (e.data.type === '__activate_edit_mode') showTweaks();
     if (e.data.type === '__deactivate_edit_mode') hideTweaks();
   });
   ```
2. **POI** notifica disponibilità:
   ```js
   window.parent.postMessage({type: '__edit_mode_available'}, '*');
   ```



---


## DevForge Agent Memory Router

**Source:** wiki\agents\DevForge Agent Memory Router.md


--- title: "DevForge Agent Memory Router" type: agent-pattern date: 2026-05-06 tags:


## Order

1. Read [[../synthesis/Dreaming-Insights|Context Pack Agenti]].
2. If maximum mode, read [[../software-house/MAX Command Center]].
3. Select role with [[../synthesis/Dreaming-Insights]].
4. Recall only the relevant memory scope:
   - global stable rules;
   - user preference and business goals;
   - project facts;
   - session-local temporary context.
5. Use [[Token Budget Tracker Pattern]] before loading more files.
6. Save memory with [[../synthesis/Dreaming-Insights]] at the end.


## Stop Conditions

Save memory when any of these change:

- architecture decision;
- security or production risk;
- command that succeeded or failed in a useful way;
- project status;
- next action;
- reusable prompt, checklist, skill or workflow.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../AGENTS.md|Agents]] -- _Panoramica del sistema multi-agente_
- [[../daily/archive/2026-05-13 - Agent Memory.md|Daily 2026-05-13]] -- _File correlato per contenuto_
- [[../daily/archive/2026-05-12 - Agent Memory.md|Daily 2026-05-12]] -- _File correlato per contenuto_
- [[../daily/archive/2026-05-11 -



---


## Forked Verifier Agent Pattern

**Source:** wiki\agents\Forked Verifier Agent Pattern.md


--- title: "Forked Verifier Agent Pattern" type: agent-pattern date: 2026-05-06 tags:


## Purpose

Use a separate verifier for high-risk work so the main agent does not validate its own assumptions.


## Use When

- production code changed;
- security, payments, data loss or infra risk exists;
- ML metrics or benchmark claims are involved;
- generated docs or automation will guide future agents.


## Contract

Input:

- goal;
- changed files or artifacts;
- expected behavior;
- known risks.

Output:

- pass/fail;
- findings with file references;
- missing tests;
- residual risk.


## Token Rule

The verifier receives artifacts and task facts, not the full chat.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../AGENTS.md|Agents]] -- _Panoramica del sistema multi-agente_
- [[../sources/llm_wiki_pattern.md|llm_wiki_pattern]] -- _File correlato per contenuto_


- [[../scorecards/_index|Scorecards]]



---


## GitHub Copilot CLI Capabilities

**Source:** wiki\agents\GitHub Copilot CLI Capabilities.md


--- title: "GitHub Copilot CLI Capabilities" type: system date: 2026-05-11 tags:


## Quando scegliere GitHub Copilot CLI

| Scenario | Perché Copilot CLI | Vantaggio |
|---|---|---|
| Operazioni su GitHub (repo, issue, PR, commit) | GitHub integration nativa autenticata | Zero setup, accesso diretto al contesto GitHub |
| Task di coding nel terminale | Terminal-native, nessun context switch | Modifica, debug, refactor direttamente dalla CLI |
| Task complessi multi-step | Sub-agenti specializzati in parallelo | Explore + task + review in una sola sessione |
| Code review ad a


## Capacità principali


### 1. GitHub Context nativo
- Legge e scrive su repo, issue, PR, branch, commit, workflow CI/CD.
- Cerca codice su tutta GitHub con ricerca avanzata.
- Monitora workflow run, job logs, artifacts.
- Crea PR via `/delegate` (Copilot coding agent crea la PR).


### 2. Sub-agenti specializzati
| Tipo agente | Uso ideale |
|---|---|
| `explore` | Ricerca parallela su molte aree di codebase |
| `task` | Esecuzione comandi con output sintetico (build, test, lint) |
| `general-purpose` | Task multi-step complessi con ragionamento avanzato |
| `code-review` | Review modifiche: solo problemi reali, zero rumore |
| `research` | Ricerca GitHub + web con fonti citate |
| `code-correctness-analyzer` | Analisi correttezza codice e logica |


### 3. Skills ecosystem
Skills installabili che aggiungono conoscenza specializzata:
- **Azure**: deploy, cost, compliance, AKS, AI, storage, compute, RBAC, diagnostics
- **Cloud**: migrazione cross-cloud, infra planner, quotas
- **Dev**: code-review approfondito, frontend design, playwright
- **AI/ML**: Azure AI (Search, Speech, OpenAI), AI Gateway, AI Runway AKS
- **Business**: finops, messaggistica, monitoring


### 4. MCP (Model Context Protocol)
- GitHub MCP server incluso di default.
- Supporta server MCP custom (filesystem, memory, database, web, ecc.).
- Comandi MCP: `/mcp` per gestione configurazione.


### 5. Session memory (SQL)
- Database SQLite per-sessione: tracking todo, stato, risultati.
- Session store cross-sessione: storia di tutte le sessioni passate.
- FTS5 full-text search sulla storia sessioni.
- Query SQL per trovare lavori precedenti, file modificati, PR create.


### 6. LSP (Language Server Protocol)
- Configurabile per qualsiasi linguaggio (TypeScript, Python, Go, Rust, ecc.).
- Fornisce: go-to-definition, hover info, diagnostics, completamenti.
- Config: `~/.copilot/lsp-config.json` (user-level) o `.github/lsp.json` (repo-level).


### 7. Modalità operative
| Modalità | Attivazione | Descrizione |
|---|---|---|
| **Normal** | Default | Risposta interattiva, conferma ogni azione |
| **Plan** | `/plan` o prefisso `PLAN mode` | Pianifica prima, non implementa senza conferma |
| **Autopilot** | `Shift+Tab` | Lavora autonomamente fino al completamento |
| **Fleet** | `/fleet` | Subagent in parallelo su task multipli |



---


## 🧠 HERMES — Agente Sovrano Multi-Provider (Fable 5 + NEXUS OMEGA)

**Source:** wiki\agents\HERMES.md


--- title: "HERMES — Agente Sovrano Multi-Provider (Fable 5 + NEXUS OMEGA)" type: agent-identity agent: hermes version: "5.0-fable"


## 🧬 Architettura dell'Identità (3 Layer)

```
LAYER 3 — NEXUS OMEGA OVERRIDE (priorità assoluta)
  Zero Slop · Search-First · Memory-Write · Provider Routing
          ↓ sovrascrive e specializza
LAYER 2 — HERMES SPECIALIZATION
  Nome: Hermes · Lingua: italiano · Stile: diretto + codice completo
          ↓ estende
LAYER 1 — CLAUDE FABLE 5 (base etica e comportamentale)
  Il più avanzato modello Anthropic · Valori etici · Stile caldo-costruttivo
  Memory system · Tool use · Web search · Knowled


## 🎯 Missione e Identità

**Hermes** è l'agente AI primario del sistema NEXUS OMEGA. Opera come:

- **Architetto Software** — progetta sistemi, analizza codice, genera soluzioni complete e production-ready
- **Connettore del Second Brain** — legge e scrive nel vault Obsidian via LightRAG (porta 9621)
- **Orchestratore Multi-Provider** — seleziona automaticamente il miglior modello per ogni task
- **Memoria Persistente** — accumula esperienza tra sessioni via `HERMES-Memory.md` e `HERMES-Autolear


## 🔌 Stack Provider (via LiteLLM Proxy `localhost:4000`)

| Priorità | Alias | Provider | Modello | Uso Principale |
|:---:|------|----------|---------|----------------|
| 1 | `best` | **NVIDIA NIM** | Nemotron Ultra 550B | Reasoning profondo, architetture, thinking mode |
| 2 | `coding` | **OpenRouter** | Claude Sonnet 4 | Coding, agenti, file ops, review |
| 3 | `fast` | **Z.AI** | GLM-5.2 | Risposte rapide, estrazione KB, traduzione |
| 4 | `phi4-mini-ollama` | **Ollama** | phi4-mini | Offlin


### Routing Decisionale
```
reasoning/architettura/sicurezza  → NVIDIA Nemotron Ultra (thinking=ON)
coding/implementazione/review     → Claude Sonnet 4 via OpenRouter
estrazione/RAG/knowledge/veloce   → GLM-5.2 Z.AI
offline/privacy/budget zero       → phi4-mini Ollama
```


### Fallback Chain Automatica
```
NVIDIA → OpenRouter → GLM-5.2 → Ollama phi4-mini
```

---


## 🧬 Comportamento e Regole


### Leggi Operative (ordine di priorità)

1. **Search-First:** Prima di rispondere "non so", interroga il vault LightRAG (`http://127.0.0.1:9621`) e LanceDB
2. **Memory-Write:** Ogni insight rilevante va scritto in `HERMES-Memory.md` con tag e data
3. **Zero Slop:** Nessun filler ("Certamente!", "Ottima domanda!"). Risposte dirette e dense
4. **Codice Completo:** Ogni snippet deve essere eseguibile as-is, con error handling
5. **Lesson Learned:** Gli errori vengono documentati in `HERMES-Autolea


### Stile di Risposta
- **Lingua:** Italiano se la domanda è in italiano, inglese se in inglese
- **Formato:** Markdown con struttura chiara; usa tabelle per comparazioni
- **Profondità:** Calibra sulla complessità del task (non over-engineering su task semplici)
- **Proattività:** Anticipa problemi non richiesti, suggerisce ottimizzazioni

---


## 📁 Topologia del Sistema

```
NEXUS OMEGA Vault
├── HERMES.md              ← questo file (identità)
├── HERMES-Memory.md       ← memoria episodica persistente
├── HERMES-Autolearning.md ← log auto-apprendimento e skill evolution
├── .env                   ← API keys (mai committare)
├── nexus-config.yaml      ← config centralizzata
├── litellm_config.yaml    ← gateway proxy 12 modelli
├── nexus_multi_provider.py← client Python unificato
├── test_providers.py      ← test suite live
├── start_pr



---


## JCODE — Agente Jcode (Nexus Omega Fleet Member)

**Source:** wiki\agents\Jcode Agent Capabilities.md


--- title: "JCODE (Jcode Agent)" type: agent date: 2026-06-25 tags:


## 🚀 Avvio Sessione Jcode (Protocollo L10)

1. **Leggi il Context Pack:** `wiki/_system/context-pack.md`
2. **Consulta il Router Contesto:** `wiki/_system/Router Contesto.md`
3. **Controlla memoria precedente:** `.claude/auto-memory/MEMORY.md` o knowledge graph via `mcp__memory__search_nodes`
4. **Leggi session ledger:** `wiki/_system/session-ledger.md`


## 🛠️ Regole Operative Jcode nel Vault


### MCP gia' collegati (NON TOCCARE)

| Server | Funzione | Dir. Permessa |
|:---|:---|:---|
| **wiki** (filesystem MCP) | Legge/scrive file nel vault Obsidian | `C:\Users\TAREK\Desktop\AGENTE WIKI\WIKI AGENTI` |
| **memory** (knowledge-graph MCP) | Entita, relazioni, osservazioni persistenti | N/A (in-memory graph) |


### Come usare il Second Brain da Jcode

1. **Leggere informazione:** usa `mcp__wiki__read_text_file` o `mcp__wiki__read_multiple_files` per leggere le note wiki
2. **Cercare nel vault:** usa `mcp__wiki__search_files` per cercare file per pattern, oppure `mcp__wiki__directory_tree` per esplorare
3. **Scrivere note:** usa `mcp__wiki__write_file` per creare nuove note (sempre con frontmatter YAML)
4. **Modificare note:** usa `mcp__wiki__edit_file` per edit mirati
5. **Knowledge Graph:** usa `mcp__


### Struttura Vault per Jcode

```
wiki/
├── _system/          → Config, protocolli, stato, ledger
├── agents/           → Note sugli agenti (incluso questo file)
├── concepts/         → Concetti e framework
├── daily/            → Note giornaliere Agent Memory
├── decisions/        → Decisioni architetturali (ADR)
├── playbooks/        → Procedure operative
├── projects/         → Progetti attivi
├── prompts/          → Prompt riusabili
├── skills/           → Skill card agenti
├── software-hou


### Regole di Scrittura

- **Frontmatter obbligatorio:** ogni nuovo .md in `wiki/` DEVE avere frontmatter YAML con `title`, `type`, `date`, `tags`, `status`
- **Link wiki:** usa `[[../daily/2026-05-21 - Agent Memory]]` per link interni Obsidian
- **Append-only log:** `wiki/log.md` e `wiki/_system/session-ledger.md` sono append-only
- **raw/ e' immutabile:** non modificare mai i file in `raw/`
- **Decisioni:** vanno in `wiki/decisions/`
- **Sintesi:** vanno in `wiki/synthesis/`


## 💾 Fine Sessione Jcode

Salva sempre:
1. Knowledge Graph: `mcp__memory__create_entities` con quanto appreso
2. Auto-memory: aggiorna `.claude/auto-memory/` se pertinente
3. Session ledger: appendi a `wiki/_system/session-ledger.md`
4. Log: appendi a `wiki/log.md`


## 🎯 Differenze vs Altri Agenti

| Caratteristica | Jcode | Claude | Codex | Kimi | Copilot |
|:---|:---|:---|:---|:---|:---|
| Accesso MCP wiki | Si (filesystem) | Si (claude settings) | Limitato | No | No |
| Accesso MCP memory | Si (knowledge-graph) | Si (claude memory) | No | No | No |
| Swarm orchestration | Si (swarm tool) | Si (subagents) | Limitato | No | No |
| Terminal TUI | Si | No | CLI | Web | CLI |
| Browser automation | Si (browser tool) | Parziale | No | No | No |
| Heap config |


## 🔗 Link Rapidi

- [[context-pack]] — Entry point minimo
- [[Router Contesto]] — Quale file aprire per tipo di task
- [[00 Dashboard Agenti]] — Pannello operativo
- [[Auto Memory Protocol]] — Come salvare memoria
- [[Software House OS]] — Sistema operativo del vault
- [[MCP - Model Context Protocol]] — Standard MCP
- [[CoALA Memory Framework]] — Framework memoria agenti

- [[../knowledge/Second Brain Health Check 2026-07-10|Second Brain - Health Check Report]]



---


## Kimi Capabilities

**Source:** wiki\agents\Kimi Capabilities.md


--- title: "Kimi Capabilities" type: system date: 2026-05-07 tags:


## Quando scegliere Kimi

| Scenario | Perché Kimi | Risparmio |
|---|---|---|
| File > 100k token (codice, log, dati) | 200k+ context window nativo | Nessun chunking, meno chiamate API |
| Ricerca di fatti correnti | Web search integrato | Zero token spesi per riassunti obsoleti |
| Analisi screenshot / PDF / video | Multimodalità nativa | Non serve OCR esterno |
| Contesto MCP multi-file | Parallel tool execution | Sessioni più rapide |
| Budget costo su context lunghi | Prezzo competitivo per


## Regole operative

1. **Contesto massiccio**: se il task richiede 10+ file o un singolo file > 5000 righe, avvia con Kimi.
2. **Ricerca web**: se la risposta dipende da versioni software, news o documentazione aggiornata, usa Kimi invece di cercare manualmente.
3. **MCP**: Kimi supporta nativamente i server MCP già configurati per Claude (filesystem, memory, web search). Nessuna configurazione extra.
4. **Handoff**: quando passi a Codex o Claude, comprimi il contesto con [[../synthesis/Dreamin


## Anti-pattern

- Non usare Kimi per compensare un prompt confuso: comprimi prima.
- Non duplicare memoria: se Kimi fa l'ingest, salva in `wiki/sources/` e aggiorna `index.md`, poi gli altri agenti leggono la sintesi.
- Non fare web search su dati già nel vault: cerca prima in `wiki/index.md`.


## Integrazione multi-agente

Kimi completa Codex e Claude in un trio:

- **Codex**: struttura, automazione, lint, file locali, verifiche tecniche.
- **Claude**: sintesi semantica, memory graph, ragionamento lungo, continuità.
- **Kimi**: ingest massivo, ricerca web, analisi multimodale, contesti lunghi a basso costo.


## Link utili

- [[../synthesis/Dreaming-Insights]]: handoff e regole condivise.
- [[Model Routing Matrix]]: scegliere il modello giusto per il task.
- [[../synthesis/Dreaming-Insights]]: strategie generali di riduzione token.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../AGENTS.md|Agents]] -- _Panoramica del sistema multi-agente_
- [[../../KIMI.md|Kimi]] -- _Agente Kimi -- scout long-context_



---


## MCP Servers Consigliati

**Source:** wiki\agents\MCP Servers Consigliati.md


--- title: "MCP Servers Consigliati" type: agent date: 2026-05-11 last_reviewed: 2026-05-11


## Già installati / attivi

| Server | Stato | Note |
|--------|-------|------|
| `mcp__memory` | ✅ Attivo (Claude) | Knowledge graph persistente |
| `mcp__filesystem` | ✅ Attivo (Claude) | Accesso vault files |
| `mcp__sequential-thinking` | ✅ Attivo (Claude) | Ragionamento step-by-step |
| GitHub MCP (Copilot CLI) | ✅ Nativo | Integrato in Copilot CLI |

---


## Da installare — Priorità P0 (impatto alto)


### 1. GitHub MCP Server (per Claude/Codex)
```jsonc
// ~/.claude/mcp-config.json o settings.json → mcpServers
{
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "<token>" }
  }
}
```
- Accede a repo, issue, PR, commit, workflow CI/CD da Claude/Codex
- ⭐ 4.2k, 58k installs/week


### 2. Filesystem MCP (esteso — path extra)
```jsonc
{
  "filesystem": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-filesystem",
             "C:\\Users\\TAREK\\Desktop\\AGENTE WIKI\\WIKI AGENTI",
             "C:\\Users\\TAREK\\Desktop"]
  }
}
```
- Già attivo ma limitato — estendi i path se necessario

---


## Da installare — Priorità P1


### 3. Playwright MCP (browser automation + test E2E)
```bash
npx @playwright/mcp
```
```jsonc
{
  "playwright": {
    "command": "npx",
    "args": ["-y", "@playwright/mcp"]
  }
}
```
- ⭐ 6.1k — test automatici, scraping, UI automation


### 4. Postgres MCP (database)
```jsonc
{
  "postgres": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-postgres",
             "postgresql://user:pass@localhost/mydb"]
  }
}
```

---


## Da installare — Priorità P2


### 5. Notion MCP
```jsonc
{
  "notion": {
    "command": "npx",
    "args": ["-y", "@notionhq/notion-mcp-server"],
    "env": { "NOTION_API_KEY": "<key>" }
  }
}
```



---


## Model Routing Matrix

**Source:** wiki\agents\Model Routing Matrix.md


--- title: "Model Routing Matrix" type: system date: 2026-05-06 tags:


## Scelta modello per rischio

| Rischio | Esempi | Strategia |
|---|---|---|
| basso | riassunti, formattazione, boilerplate | modello economico, contesto minimo |
| medio | refactor locale, test, documenti tecnici | modello bilanciato, checklist |
| alto | sicurezza, architettura, produzione, dati sensibili | modello forte, review, eval |
| critico | deploy, incidenti, compliance, finanza | doppia verifica e human approval |


## Scelta agente per capacita'

| Capacita' | Agente ideale | Perche' |
|---|---|---|
| Contesto > 50k token | Kimi | 200k+ nativi, nessun chunking |
| Ricerca web aggiornata | Kimi | Browsing integrato, zero token su dati obsoleti |
| Analisi immagini / PDF | Kimi | Multimodalita' nativa |
| Struttura file, lint, automazioni | Codex | Tooling filesystem e PowerShell |
| Sintesi semantica, memory graph | Claude | MCP memory, ragionamento lungo |
| Review sicurezza, architettura critica | Claude 


## Hermes Provider Routing (Dettaglio)

| Task Complexity | Task Type | Provider | Model | Stima Latenza |
|:-:|---|---|---|---|
| 🔴 Alta | Architettura sistemi, security review | NVIDIA NIM | Nemotron Ultra 550B | 30-90s |
| 🔴 Alta | Debugging algoritmi complessi | NVIDIA NIM (thinking) | Nemotron Ultra 550B | 45-120s |
| 🟡 Media | Implementazione feature, refactoring | OpenRouter | Claude Sonnet 4 | 8-15s |
| 🟡 Media | Code review, documentazione | OpenRouter | Claude Sonnet 4 | 5-12s |
| 🟢 Ba


## Regola

Non usare il modello piu' forte per compensare prompt confusi. Prima comprimi il contesto e definisci output verificabile. Per contesti massivi, usa Kimi; non forzare Claude o Codex a caricare file enormi.

**Per Hermes:** usa sempre il proxy LiteLLM (`localhost:4000`) invece di chiamare i provider direttamente. Il proxy gestisce fallback automaticamente e logga i costi.


## Router dinamico (misurabile)

Per task critici usa anche il router automatico basato su KPI:

```powershell
.\tools\model-router.ps1 -Action route -Query "review PR security on GitHub" -Risk high -NeedGitHub -NeedSecurity
```

Output:
- `wiki/_system/model-router-last.json`
- `wiki/_system/Model Router Last Decision.md`


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../AGENTS.md|Agents]] -- _Panoramica del sistema multi-agente_
- [[../security/Threat Model System.md|Threat Model System]] -- _File correlato per contenuto_
- [[../_templates/Model Card.md|Model Card]] -- _File correlato per contenuto_


- [[../prompts/Prompt - Cost Optimizer|Prompt - Cost Optimizer]



---


## Multi-Agent Bus Pattern

**Source:** wiki\agents\Multi-Agent Bus Pattern.md


--- title: "Multi-Agent Bus Pattern" type: agent-pattern date: 2026-05-06 tags:


## Purpose

A multi-agent bus coordinates specialists without dumping all context into everyone.


## Model

- registry: agent id, role, capabilities, status;
- inbox: direct messages and assignments;
- shared state: project facts and decisions only;
- delegation: task plus acceptance criteria;
- broadcast: only for facts every agent needs.


## Local Rule

Use subagents only for independent, bounded work. Keep each subagent output compact and save durable conclusions in the vault.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../AGENTS.md|Agents]] -- _Panoramica del sistema multi-agente_
- [[../sources/llm_wiki_pattern.md|llm_wiki_pattern]] -- _File correlato per contenuto_



---


## Multi-Agent Operating Model

**Source:** wiki\agents\Multi-Agent Operating Model.md


--- title: "Multi-Agent Operating Model" type: synthesis date: 2026-05-06 tags:


## Regola

Un agente non deve fare tutto. Deve fare il pezzo giusto, con contesto minimo, output verificabile e handoff.


## Pattern (quartetto)

- **Router**: sceglie ruolo e skill. → Copilot CLI (Agent Role Router) o Claude (ragionamento)
- **Worker**: implementa. → Codex (file/automazione), Copilot CLI (coding/GitHub)
- **Reviewer**: trova rischi. → Copilot CLI (`/review`), Claude (architettura/sicurezza)
- **Evaluator**: misura output. → Qualsiasi agente con checklist o eval
- **Archivist**: salva conoscenza nel vault. → tutti, con `tools/save-memory.ps1`
- **Cost optimizer**: riduce token e strumenti inutili. 


## Regola di assegnazione

Per ogni task: scegli UN agente primario, max un agente di supporto. Non caricare tutti.

| Scenario | Primario | Supporto |
|---|---|---|
| Codice nuovo da scrivere | Copilot CLI | Codex |
| Review PR esistente | Copilot CLI `/review` | — |
| Ragionamento complesso | Claude | — |
| Ingest file > 50k token | Kimi | Codex (index) |
| Automazione file locale | Codex | — |
| GitHub issue → PR | Copilot CLI | — |
| Analisi immagini/PDF | Kimi | — |


## Handoff

Usa [[../synthesis/Dreaming-Insights]]. Salva in `wiki/daily/${DATE} - Handoff.md` con template [[../_templates/Handoff]].


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../AGENTS.md|Agents]] -- _Panoramica del sistema multi-agente_
- [[../software-house/Operating Model Software House.md|Operating Model Software House]] -- _File correlato per contenuto_
- [[../security/Threat Model System.md|Threat Model System]] -- _File correlato per contenuto_
- [[../_templates/Mod



---


## Neural Memory Consolidation Pattern

**Source:** wiki\agents\Neural Memory Consolidation Pattern.md


--- title: "Neural Memory Consolidation Pattern" type: agent-pattern date: 2026-05-06 tags:


## Purpose

Prevent memory from becoming noisy.


## Consolidation Loop

1. Detect duplicates by meaning, not exact text.
2. Merge repeated facts into one canonical note.
3. Promote durable lessons to synthesis or decision notes.
4. Archive stale or wrong notes with a correction.
5. Keep source evidence linked.


## Trigger

Run consolidation weekly or after a large project phase.


## Output

- updated canonical notes;
- deleted or archived duplicate list;
- new risks and next actions.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../AGENTS.md|Agents]] -- _Panoramica del sistema multi-agente_
- [[Session Memory Extractor Pattern.md|Session Memory Extractor Pattern]] -- _File correlato per contenuto_
- [[../daily/2026-06-12 - Agent Memory.md|Daily 2026-06-12]] -- _File correlato per contenuto_
- [[../daily/2026-06-10 - Agent Mem



---


## Prompt Library Governance

**Source:** wiki\agents\Prompt Library Governance.md


--- title: "Prompt Library Governance" type: system date: 2026-05-06 tags:


## Regole

- Ogni prompt riusabile vive in `wiki/prompts/`.
- Ogni prompt importante ha scopo, input, output e test.
- I prompt per agenti costosi devono avere eval.
- Se un prompt cresce troppo, dividerlo in ruolo, contesto, tool policy e output schema.


## Versionamento

Quando un prompt cambia comportamento, registra la decisione in `wiki/log.md` e salva un eval report se esiste.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../AGENTS.md|Agents]] -- _Panoramica del sistema multi-agente_
- [[../prompts/Prompt - ML Engineer.md|Prompt - ML Engineer]] -- _File correlato per contenuto_
- [[../prompts/Prompt - Agent Evaluator.md|Prompt - Agent Evaluator]] -- _File correlato per contenuto_
- [[../compliance/Responsible AI Govern



---


## RuFlo Marketplace e Swarm Orchestration

**Source:** wiki\agents\RuFlo Marketplace e Swarm Orchestration.md


--- title: "RuFlo Marketplace e Swarm Orchestration" type: agent date: 2026-05-11 tags:


## Quando usarlo

- Task lunghi che richiedono piu agenti coordinati.
- Pipeline con step dipendenti (planning -> coding -> test -> security -> docs).
- Sessioni dove serve memoria operativa condivisa tra worker.


## Quando NON usarlo

- Fix rapidi o task semplici.
- Sessioni con scope limitato a un singolo file.
- Quando bastano i subagent gia presenti (149) senza layer aggiuntivo.


## Setup consigliato (safe-first)

```bash
/plugin marketplace add ruvnet/ruflo
/plugin install ruflo-core@ruflo
/plugin install ruflo-swarm@ruflo
/plugin install ruflo-rag-memory@ruflo
/plugin install ruflo-testgen@ruflo
/plugin install ruflo-security-audit@ruflo
```


## Modalita operativa nel nostro quartetto

| Agente | Uso con RuFlo |
|---|---|
| Claude | Orchestrazione e routing swarm |
| Codex | Esecuzione tecnica, implementazione locale |
| Copilot CLI | GitHub context, PR, review ad alto segnale |
| Kimi | Long-context ingestion e ricerca web |


## Integrazione con il second brain

1. Pianifica in [[Model Routing Matrix]].
2. Usa RuFlo solo per i blocchi davvero multi-agent.
3. Salva esito in `wiki/log.md` e `wiki/_system/session-ledger.md`.
4. Mantieni il protocollo delta-loading: non caricare tutto il vault.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../AGENTS.md|Agents]] -- _Panoramica del sistema multi-agente_
- [[../../tools/os-core/nexus-supervisor.ps1|Nexus-Supervisor]] -- _Supervisore orchestrazione loop_


- [[../sources/Web - RuFlo Agent Orchestration|Web - RuFlo Agent Orchestration]]

- [[../sources/Web - RuFlo Agent Orchestration|Web - R



---


## Scoped Memory Architecture

**Source:** wiki\agents\Scoped Memory Architecture.md


--- title: "Scoped Memory Architecture" type: agent-pattern date: 2026-05-06 tags:


## Scopes

- user: stable preferences and long-term goals;
- organization: software-house rules and security baselines;
- project: architecture, commands, env, decisions;
- session: temporary work state;
- local/private: secrets or machine-only facts, never copied into shared notes.


## Retrieval Rule

Search narrow first:

1. project;
2. system/router;
3. synthesis;
4. sources;
5. raw only if evidence is needed.


## Storage Rule

Save one compact memory event per substantial task. Link to detailed notes instead of duplicating them.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../AGENTS.md|Agents]] -- _Panoramica del sistema multi-agente_
- [[../daily/2026-06-12 - Agent Memory.md|Daily 2026-06-12]] -- _File correlato per contenuto_
- [[../daily/2026-06-10 - Agent Memory.md|Daily 2026-06-10]] -- _File correlato per contenuto_
- [[../daily/2026-06-06 - Agent Memory.md|Daily 2



---


## Session Memory Extractor Pattern

**Source:** wiki\agents\Session Memory Extractor Pattern.md


--- title: "Session Memory Extractor Pattern" type: agent-pattern date: 2026-05-06 tags:


## Purpose

At the end of a serious task, extract only reusable facts from the session.


## Extract

- project facts;
- decisions;
- commands and verification results;
- constraints;
- risks;
- next actions;
- reusable prompts or workflows.


## Reject

- transient thinking;
- repeated chat text;
- raw logs unless needed;
- vague praise;
- claims without evidence.


## Local Tool

Use `tools/agent-done.ps1` for final memory. It writes ledger, daily note, log, index and lint.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../AGENTS.md|Agents]] -- _Panoramica del sistema multi-agente_
- [[Neural Memory Consolidation Pattern.md|Neural Memory Consolidation Pattern]] -- _File correlato per contenuto_
- [[../daily/2026-06-12 - Agent Memory.md|Daily 2026-06-12]] -- _File correlato per contenuto_
- [[../daily/2026-06-10 - Age



---


## Slash Commands Claude

**Source:** wiki\agents\Slash Commands Claude.md


--- title: "Slash Commands Claude" type: agent-pattern date: 2026-05-06 tags:


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../AGENTS.md|Agents]] -- _Panoramica del sistema multi-agente_
- [[Slash Commands Copilot.md|Slash Commands Copilot]] -- _File correlato per contenuto_
- [[Claude Hooks System.md|Claude Hooks System]] -- _File correlato per contenuto_
- [[../../CLAUDE.md|Claude]] -- _Agente Claude -- archivista semant



---


## Slash Commands GitHub Copilot CLI

**Source:** wiki\agents\Slash Commands Copilot.md


--- title: "Slash Commands Copilot CLI" type: reference date: 2026-05-11 tags:


## Comandi essenziali per il vault

| Comando | Quando usarlo |
|---------|--------------|
| `/compact` | Sessione lunga: comprimi la storia per ridurre token |
| `/context` | Verifica quanti token stai usando nel contesto |
| `/share` | Esporta sessione → markdown, HTML, o GitHub Gist |
| `/diff` | Rivedi i cambiamenti nella directory corrente |


## Agenti e skills

| Comando | Funzione |
|---------|---------|
| `/skills` | Installa, rimuovi, elenca skills specializzate |
| `/agent` | Sfoglia e seleziona agenti disponibili |
| `/mcp` | Configura server MCP (filesystem, memory, web) |
| `/fleet` | Abilita esecuzione parallela di subagent |


## GitHub integration

| Comando | Funzione |
|---------|---------|
| `/pr` | Gestisci PR del branch corrente |
| `/delegate` | Invia sessione a GitHub → Copilot crea PR |
| `/review` | Avvia agente code review (solo problemi reali) |


## Modalità operative

| Comando | Funzione |
|---------|---------|
| `/plan` | Crea piano prima di implementare |
| `Shift+Tab` | Cicla tra Normal → Plan → Autopilot |
| `/experimental` | Abilita feature sperimentali (Autopilot, ecc.) |


## Sessione e modelli

| Comando | Funzione |
|---------|---------|
| `/model` | Cambia modello AI (Claude Sonnet, GPT-5, ecc.) |
| `/resume` | Torna a una sessione precedente |
| `/rename` | Rinomina la sessione corrente |
| `/session` | Gestisci sessioni (lista, dettagli) |
| `/rewind` | Torna all'ultimo turn e ripristina file |
| `/compact` | Comprimi storia → meno token, stessa continuità |


## Permessi e sicurezza

| Comando | Funzione |
|---------|---------|
| `/allow-all` | Abilita tutti i permessi (tools, path, URL) |
| `/add-dir` | Aggiungi directory alla whitelist |
| `/list-dirs` | Mostra directory consentite |
| `/reset-allowed-tools` | Ripristina permessi tool |


## Utilità

| Comando | Funzione |
|---------|---------|
| `/research` | Ricerca approfondita GitHub + web con fonti |
| `/ide` | Connetti workspace IDE |
| `/lsp` | Configura language server (code intelligence) |
| `/changelog` | Mostra novità versione CLI |
| `/update` | Aggiorna CLI alla versione più recente |
| `/feedback` | Invia feedback riservato a GitHub |


## Sintassi speciale

| Sintassi | Funzione |
|----------|---------|
| `@file.ts` | Menziona un file nel contesto |
| `#42` | Menziona issue o PR per numero |
| `!comando` | Esegui comando shell direttamente |
| `Ctrl+X → B` | Sposta task corrente in background |


## Anti-pattern

- Non usare `/allow-all` in ambienti condivisi o produzione.
- Non incollare file lunghi in chat: usa `@file` per riferimento.
- Non fare `/compact` se stai per fare una decisione critica: comprimi DOPO aver salvato le info importanti nel vault.



---


## Token Budget Tracker Pattern

**Source:** wiki\agents\Token Budget Tracker Pattern.md


--- title: "Token Budget Tracker Pattern" type: agent-pattern date: 2026-05-06 tags:


## Purpose

Spend model context only where it improves decisions.


## Budget Rules

- Read router pages first, not the full vault.
- Use `rg --files` and targeted `rg` before opening directories.
- Exclude generated folders: `node_modules`, `data`, `.git`, `dist`, `build`, `.cache`.
- Summarize long sources into synthesis notes.
- Promote repeated work into skills or scripts.
- Ask a stronger model only after compacting the problem.


## Warning Signs

- repeated file reads with no decision;
- loading raw logs into chat;
- searching broad folders without excludes;
- using a verifier with the full conversation instead of artifacts.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../AGENTS.md|Agents]] -- _Panoramica del sistema multi-agente_
- [[../_system/Budget Token.md|Budget Token]] -- _File correlato per contenuto_
- [[../checklists/Token Budget Checklist.md|Token Budget Checklist]] -- _File correlato per contenuto_


- [[Model Routing Matrix|Model Routing Matrix]]



---


## Agents Index

**Source:** wiki\agents\_index.md


--- title: "Agents Index" type: index date: 2026-07-10 tags:


## Agenti Attivi

- [[Jcode Agent Capabilities|Jcode]] — Full-Stack Agent & MCP Orchestrator
- [[DESIGNER|Designer]] — UI/UX Prototyper & Canvas Architect
- [[Autonomous Query Engine Pattern]] — Workflow di interrogazione autonoma
- [[Agent Lifecycle Hook Pattern]] — Pattern hook lifecycle
- [[Agent Memory Policy]] — Policy memoria agente
- [[Claude Hooks System]] — Sistema hook Claude
- [[Kimi Capabilities]] — Capacità Kimi
- [[Model Routing Matrix]] — Matrice routing modelli
- [[Multi-Agent Op



---


## CFDBrain LLM

**Source:** wiki\projects\CFDBrain LLM.md


--- title: "CFDBrain LLM" type: project date: 2026-05-06 tags:


## Source

Project note: [[CFDML Enterprise Platform]]


## Facts

- Main file: `engine/brain.py`
- Use singleton `get_brain()`.
- Preferred local model order: `deepseek-r1:7b`, `mistral`, `llama3.2:3b`, `qwen2.5:3b`, `phi:latest`.
- RAG enrichment uses ChromaDB before answering.
- Must fallback to physics-based logic when Ollama is offline.


## Endpoints

- `/brain/query`
- `/brain/status`
- `/brain/analyze`
- `/brain/recommend-training`


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../sources/llm_wiki_pattern.md|llm_wiki_pattern]] -- _File correlato per contenuto_
- [[../evals/LLM Agent Eval System.md|LLM Agent Eval System]] -- _File correlato per contenuto_


- [[_index|Projects]]

- [[_index|Projects]]

- [[_index|Projects]]

- [[_index|Projects]]

- [[_index|Projects]]



---


## CFDML ENTERPRISE

**Source:** wiki\projects\CFDML ENTERPRISE.md


--- title: "CFDML ENTERPRISE" type: project date: 2026-05-10 tags:


## Note Principali

- [[../synthesis/CFDML WSL Experimental Map]]: inventario della home WSL `/home/tarik`, pesi, runtime, cartelle, archivi, venv, OpenFOAM, Julia, brain e Git repo.
- [[../synthesis/CFDML Enterprise Market Gap Roadmap]]: analisi profonda di cosa CFDML puo' fare oggi, gap rispetto al mercato CFD/CAE, rischi, claim policy e piano di miglioramento.


## Verita Corrente

- Versione ufficiale/current: `/home/tarik/CFDML_ENTERPRISE`.
- Profilo shell: CFDML Enterprise v12, build `20260507.truth-prod`.
- API prevista: `8915`; dashboard Streamlit prevista: `8501`.
- Miglior posizionamento oggi: workbench locale CFD/ML con OpenFOAM spine, truth contracts, dashboard, reporting, brain e ML surrogate lab.
- Non dichiarare equivalenza con Fluent, STAR-CCM+, COMSOL o SimScale finche' non esistono benchmark industriali, validazione estesa e stack product


## Prossime Azioni

1. Creare `PRODUCT_STATUS.md`.
2. Creare `CLAIMS_REGISTRY.md`.
3. Creare dashboard registry: official / experimental / legacy / archive.
4. Costruire primo workflow OpenFOAM production-grade con benchmark reference.
5. Ampliare validation harness e test coverage.


## Sessioni Recenti
- [[CFDML Enterprise - Sessione Digital Twin Enterprise 2026-05-12]]
- [[CFDML Enterprise - Audit Completo Stato Reale 2026-05-12]]
- [[CFDML WSL Home Map & Organization 2026-05-12]]


## Snapshot operativo ultima sessione (salvato)
- Hardening enterprise completato su AI4Animation Digital Twin + CAD/Geometry.
- Run registry persistente disponibile in:
  - `artifacts/digital_twin_runs`
  - `artifacts/cad_runs`
- Nuovi endpoint CAD run tracking:
  - `GET /cad/runs`
  - `GET /cad/runs/{run_id}`
- Test state consolidato:
  - AI4Animation: 8 passed
  - CAD/Geometry: 16 passed
- Jupyter enterprise on-demand integrato e hardenizzato:
  - controller: `/home/tarik/CFDML_ENTERPRISE/SYS



---


## CFDML Enterprise - Audit Completo Stato Reale (2026-05-12)

**Source:** wiki\projects\CFDML Enterprise - Audit Completo Stato Reale 2026-05-12.md


--- title: "CFDML Enterprise - Audit Completo Stato Reale 2026-05-12" type: audit-report date: 2026-05-12 tags:


## Scope analisi
Audit completo richiesto su:
`C:\Users\TAREK\Desktop\CFDML  CFD-AI Fast Prototyping COMPLETO`

Obiettivo: identificare **cosa c'è**, **cosa funziona**, **cosa non funziona**, **cosa manca**, **cosa è simulato/finto**, incluse cartelle secondarie/fail-risk.


## Executive summary
- Progetto ricco e operativo su più domini (CFD, AI, digital twin, reporting), ma con struttura root molto dispersiva.
- Backend FastAPI reale presente e importabile, OpenAPI generata correttamente (132 path).
- Buona base funzionale su engine + integrazioni principali, ma con drift test/API e smoke dipendenti da server live.
- Presenti fallback mock/demo in aree sensibili (OpenFOAM, validation, alcuni workflow), da governare meglio in produzione.
- Presente rischio alto di 


## Cosa c'è oggi (inventario reale)
- **Core runtime:** `main.py`, `cfd/`, `ai/`, `engine/`, `digital_twin/`, `geometry/`, `reporting/`, `apps/`, `tests/`, `viz/`.
- **Infra/dev:** `.git`, `.github`, `.venv`, `tools`, `scripts`, `monitoring`, `launcher`.
- **Feature module separato:** `ai4animationpy` (repo annidata con `.git` proprio).
- **Documentazione/business/media molto ampia in root** (molti `.odt/.pdf/.mp4/.png`).


## Cosa funziona (evidenza)
1. FastAPI app importabile, OpenAPI valida e completa.
2. `tests/test_engine.py`: 9/9 pass.
3. `test_phase1_integration.py`: 30 pass, 1 skip.
4. Sweep dedicato CAD+AI4Animation eseguito in questa sessione (sul runtime WSL): pass completo delle suite mirate.


## Cosa non funziona / è instabile
1. `tests/test_api.py`: mismatch contrattuale su versione/status (`10.0.1` vs `11.0.0`, `healthy` vs `ok`).
2. `tests/test_smoke.py`: failure di connessione (`WinError 10061`) senza server live attivo.
3. `scripts/test_data_science.py`: bloccato da `SyntaxError` (string literal non chiusa).
4. Broad pytest discovery inquinata da duplicati worktree (import file mismatch).


## Cosa è parzialmente reale (placeholder/rischio)
- Alcuni placeholder framework innocui (es. metodi astratti).
- Placeholder runtime da priorità alta in pipeline v2/motion:
  - pipeline mesh con dummy placeholder in orchestrazione,
  - mismatch API su motion pipeline,
  - alcuni endpoint training/dashboard con logica dimostrativa.


## Cosa è simulato/finto (da controllare)
1. Fallback mock OpenFOAM quando ambiente solver non presente.
2. Analyzer/validation che può tornare “pass” anche con dati/log mancanti.
3. Flussi demo in handoff/report quando mancano metriche reali.
4. Parti Colab/mock credentials e job simulati in alcuni moduli.


## Cosa manca
1. Nel tree Windows auditato, `cad_integration/` risulta assente come modulo separato.
2. Governance runtime non abbastanza rigida tra modalità real/mock/demo.
3. Pulizia strutturale root/worktree/archivi per evitare “sorgente sbagliata”.


## Cartelle secondarie/fail-risk (analisi dedicata)
| Cartella | Stato | Rischio |
|---|---|---|
| `CFDML  CFD-AI Fast Prototyping COMPLETO.worktrees` | fail-risk | copie multiple e worktree stale/broken |
| `.kilo/worktrees` | active | valida ma da escludere da scan/runtime |
| `archivio_da_cancellare` | stale | legacy da archiviare/rimuovere |
| `.git/worktrees/tttt` (temp non esistente) | stale/fail-risk | riferimento rotto |
| `ai4animationpy/.git` annidato | fail-risk | doppio repo nel root



---


## CFDML Enterprise - Sessione Digital Twin Enterprise (2026-05-12)

**Source:** wiki\projects\CFDML Enterprise - Sessione Digital Twin Enterprise 2026-05-12.md


--- title: "CFDML Enterprise - Sessione Digital Twin Enterprise 2026-05-12" type: session-report date: 2026-05-12 tags:


## Obiettivo sessione
Portare AI4Animation da integrazione tecnica a strumento enterprise reale per aziende e ingegneri: workflow unificato CFD+animazione, artefatti professionali, tracciabilita run, report cliente.


## Risultati principali completati
1. Integrazione trasversale AI4Animation in health, dashboard e report preview.
2. Profilo capacita operativo con endpoint dedicato.
3. Power-pack unificato operativo (non solo stato): streamlines, ECS, motion bridge, render, ROM registry.
4. Package professionale ZIP con artefatti reali per handoff tecnico/cliente.
5. Studio digitale completo con fasi workflow, artifact layers e quality gates.
6. Tracciabilita run con persistenza, lista run e recupero run per 


## Endpoint chiave disponibili
- `POST /ai4anim/digital-twin/studio`
- `POST /ai4anim/professional-package`
- `GET /ai4anim/digital-twin/runs`
- `GET /ai4anim/digital-twin/runs/{run_id}`
- `POST /ai4anim/power-pack`
- `GET /ai4anim/capabilities`
- `POST /report/generate`
- `POST /report/preview`


## Hardening enterprise introdotto
- `solver_result` obbligatorio per il package professionale (niente fallback demo implicito).
- Normalizzazione robusta dei campi CFD (`u/v/p`) con shape checks 2D.
- Persistenza run in `artifacts/digital_twin_runs` con:
  - file run singolo JSON
  - indice append-only `runs_index.jsonl`
  - `run_id` univoco e timestamp UTC
- `run_tracking` esposto nei payload e nel bundle ZIP.


## Contenuto package professionale
Il bundle ora include artefatti utili in produzione:
- `manifest.json`
- `package.json`
- `run_tracking.json`
- `capabilities.json`
- `studio_profile.json`
- `solver_result.json`
- `report_snapshot.json`
- `streamlines.json` (se attivo)
- `motion_bridge.json` (se attivo)
- `ecs_scene.json` (se attivo)
- `render.json` + `render.png` (se disponibile)
- `autoencoder_models.json` (se attivo)
- `README.txt`


## Integrazione report cliente
La sezione **AI4Animation & Digital Twin** del report include:
- stato, renderer, licenza, readiness
- workflow consigliati
- studio flow e artifact layers
- streamlines/motion/render summary
- run id (quando disponibile)


## File tecnici principali toccati
- `/home/tarik/CFDML_ENTERPRISE/main.py`
- `/home/tarik/CFDML_ENTERPRISE/ai4animation_cfdml/__init__.py`
- `/home/tarik/CFDML_ENTERPRISE/reporting/simulation_report.py`
- `/home/tarik/CFDML_ENTERPRISE/tests/integration/test_ai4animation_integration.py`


## Verifica stato
- Suite integrazione AI4Animation: **8 test passed**.
- Flusso studio + package + run tracking operativo e integrato.


## Governance
- Licensing esposto e mantenuto: **CC BY-NC 4.0** (ai4animationpy).
- Nessun claim di certificazione finale: il sistema resta orientato a engineering workflow e handoff professionale.



---


## CFDML Enterprise Platform

**Source:** wiki\projects\CFDML Enterprise Platform.md


--- title: "CFDML Enterprise Platform" type: project date: 2026-05-06 tags:


## Identità

| Campo | Valore |
|-------|--------|
| Path | `C:\Users\TAREK\Desktop\CFDML  CFD-AI Fast Prototyping COMPLETO` |
| Versione | v11.2 (aggiornata 2026-04-15) |
| Licenza | Proprietaria (uso interno + clienti con licenza) |
| Stack | FastAPI + PyTorch + OpenFOAM + Ollama LLM |
| Performance | Inference <2ms vs ore per CFD full | Accuracy R² > 0.999 |
| API surface | 75+ endpoint REST |


## Sotto-sistemi principali


### Brain LLM (Ollama)
- File: `engine/brain.py` — `CFDBrain` singleton
- Auto-select preference: `deepseek-r1:7b > mistral > llama3.2:3b > qwen2.5:3b > phi:latest`
- Pattern: SEMPRE `get_brain()`, mai istanze dirette
- RAG enrichment via `_enrich_prompt()` che consulta ChromaDB prima
- Fallback fisico se Ollama offline
- Endpoints: `/brain/query`, `/brain/status`, `/brain/analyze`, `/brain/recommend-training`


### CFD Solvers (11 routing)
- `cfd/solver.py` — 2D NS (projection, SOR red-black, DST, CFL adattivo)
- `cfd/solver_v2.py` — multigrid V-cycle + RK4 + progress callback
- `cfd/solver_3d.py` — 3D incompressible NS, Smagorinsky SGS
- `cfd/compressible.py` — Density-based Euler/NS, HLLC Riemann, MUSCL
- `cfd/multiphase.py` — VOF two-phase, CSF surface tension
- `cfd/lbm.py` — D2Q9/D3Q19 LBM, BGK+MRT
- `cfd/sph.py` — WCSPH, Wendland C2
- `cfd/fsi.py` — Euler-Bernoulli beam coupling, Aitken relaxatio


### AI Components
- `ai/neural_operators.py` — FNO1d/2d + DeepONet + FNO2dTrainer + FNORegistry
- `ai/pinns.py` — Burgers, NS steady, NS unsteady (x,y,t), Heat — con RAR sampler
- `ai/uncertainty.py` — MC Dropout + Deep Ensemble UQ
- `ai/drl/` — PPO (SB3 + ES fallback) + shape optimization (DRL/genetic/bayesian)
- `ai/ml_cfd/` — SmartSim wrapper + NN predictor + multi-model surrogate routing


### OpenFOAM Automation (Foam-Agent style)
- `engine/foam_agent/coordinator.py` — 4-stage pipeline, 8 case templates
- `engine/foam_agent/case_builder.py` — case generation con fallback
- `engine/foam_agent/error_recovery.py` — 8 pattern errore, 4 auto-fix
- `engine/foam_agent/result_analyzer.py` — 5 check validazione
- `cfd/openfoam.py` + `openfoam_v2.py` — interFoam, reactingFoam, rhoPimpleFoam


### Animation Framework v11.2 (AI4AnimationPy integration, 3483 lines)
- `digital_twin/animation.py` — Skeleton IK/FABRIK, MotionLoader, FSIConnector, RealTimeAnimator
- `viz/cfd_animation_renderer.py` — Pressure/Velocity/Streamline/SkeletalMesh renderers
- `digital_twin/fsi_connector.py` — Partitioned coupling con Aitken
- `ai/motion_cfd_pipeline.py` — BVH/TRC/C3D → CFD BC generation


### Knowledge & Agents
- `knowledge/kb.py` — ChromaDB RAG (singleton)
- `knowledge/pdf_ingestor.py` — PyMuPDF → pdfplumber, chunking 400 char
- `engine/agent.py` — `CFDAgent` ReAct (plan → execute → synthesize)
- `engine/tools.py` — `ToolRegistry` con 9 tool
- `engine/session.py` — `SessionStore` JSON in `~/.cfdml/sessions/`
- `engine/julia_bridge.py` — ZMQ → CFDMLTARIK.jl + fallback Python


## Regole non negoziabili (gotcha)

1. **API compat**: tutti gli endpoint esistenti devono continuare a funzionare
2. **Brain**: SEMPRE `get_brain()` singleton, mai istanze dirette
3. **FNORegistry**: usa `list_models()` per caricare, gestisce path automaticamente
4. **PDF con fpdf2**: SOLO caratteri **latin-1** — NO unicode (em-dash, ε greci, ecc.)
5. **OpenFOAM 2D**: usa `empty` per `frontAndBack` (caso quasi-3D)
6. **Test obbligatorio dopo modifiche**: `BenchmarkSuite(fast=True).run_all()` de



---


## CFDML Tech Stack

**Source:** wiki\projects\CFDML Tech Stack.md


--- title: "CFDML Tech Stack" type: project date: 2026-05-06 tags:


## Source

Project note: [[CFDML Enterprise Platform]]


## Stack

- API: FastAPI
- AI/ML: PyTorch, neural operators, PINNs, DRL
- CFD: OpenFOAM automation plus internal solvers
- RAG: ChromaDB and PDF ingestion
- Local LLM: Ollama
- Reporting: fpdf2 with latin-1 constraint


## Commands

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
python -c "from reporting.benchmark import BenchmarkSuite; BenchmarkSuite(fast=True).run_all()"
```


## Gotcha

Machine is effectively CPU-only despite CUDA-looking torch package.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[CFDML ENTERPRISE.md|CFDML ENTERPRISE]] -- _File correlato per contenuto_



---


## CFDML WSL Home Map & Organization (2026-05-12)

**Source:** wiki\projects\CFDML WSL Home Map & Organization 2026-05-12.md


--- title: "CFDML WSL Home Map & Organization 2026-05-12" type: infrastructure-audit date: 2026-05-12 tags:


## Scope
Analisi completa di `\\wsl.localhost\CFDML_Experimental\home\tarik` con:
- mappa strutturale,
- valutazione integrazione enterprise,
- avvio riordino intelligente non distruttivo.


## Mappa ad alto livello (stato reale)


### Runtime-core (da mantenere centrali)
- `/home/tarik/CFDML_ENTERPRISE` (CORE, engine, modules, integration, deploy)
- `/home/tarik/cfdml_projects`
- `/home/tarik/OpenFOAM`, `/home/tarik/OpenFOAM_working`, `/home/tarik/my_first_cfd`


### Progetti/Tooling
- `/home/tarik/scripts`, `/home/tarik/docs`, `/home/tarik/notebooks`, `/home/tarik/models`, `/home/tarik/data`
- ambienti/stack locali: `~/.local`, `~/.config`, `~/.cache`, `~/.julia`, `~/.npm`, ecc.


### Legacy/Archive (disordine principale)
- `/home/tarik/CFD_ML_Projects_archive`
- `/home/tarik/cfdml-legacy-backup`
- `/home/tarik/VERSIONE VECCHIE`
- backup multipli in `/home/tarik/CFDML_ENTERPRISE/BACKUP*`


### Segnali di disordine
- moltissimi file loose in root (`/home/tarik`) con naming eterogeneo;
- duplicazione alberi progetto (OpenFOAM/Projects/Windows_* vari);
- report/log/media mischiati alla root operativa.


## Integrazione consigliata nel nostro Enterprise

1. Unificare source-of-truth runtime su `/home/tarik/CFDML_ENTERPRISE`.
2. Mappare dati/modelli/export in un backbone coerente:
   - `CFDML_ENTERPRISE/DATA/{RAW,PROCESSED,MODELS,EXPORTS}`
3. Trattare `OpenFOAM*` come integration layer sotto `CFDML_ENTERPRISE/INTEGRATION/openfoam`.
4. Tenere fuori dal runtime:
   - media immagini/video,
   - log storici installazione,
   - backup shell/legacy e archivi vecchi.


## Riordino applicato (fase 1, sicura)

Creata struttura:
- `/home/tarik/CFDML_ORGANIZATION/01_Enterprise/{Marketing,Business,Reports}`
- `/home/tarik/CFDML_ORGANIZATION/02_Assets/{Media_Images,Media_Video}`
- `/home/tarik/CFDML_ORGANIZATION/03_Operations/{Logs,Shell_Backups}`
- `/home/tarik/CFDML_ORGANIZATION/04_Archive/Misc`

Spostamenti già eseguiti (safe-only, senza toccare codice runtime):
- Business: `1` file
- Reports: `4` file
- Media images: `18` file
- Logs: `25` file
- Shell backups: 


## Cosa resta da ordinare (prossima fase)

1. Fase 2: separare script/tool loose in `CFDML_ORGANIZATION/03_Operations/{Scripts,Diagnostics}`.
2. Fase 3: consolidare cartelle progetto duplicate (`OpenFOAM_projects`, `Windows_Projects`, `cfdml_projects`).
3. Fase 4: policy naming standard + cleanup progressivo dei file non standard in root.
4. Fase 5: aggiornare bootstrap/documentazione per puntare alle nuove path.



---


## ClawFlows Workflow System

**Source:** wiki\projects\ClawFlows Workflow System.md


--- title: "ClawFlows Workflow System" type: project date: 2026-05-06 tags:


## Source

Project note: [[OpenClaw Standard Suite]]


## Facts

- God node in OpenClaw graph.
- Includes 113 community workflows.
- Scheduler uses 15-minute heartbeat.
- Dashboard server lives under `clawflows/system/dashboard/server.js`.
- CLI command: `clawflows`.
- Validation uses BATS fixtures for malformed and valid workflows.


## Workflow Categories

- schedule and calendar;
- email and cleanup;
- mode activation;
- periodic review;
- backups and monitoring;
- personal life planning;
- journaling and specialized maintenance.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../playbooks/Agentic Workflow.md|Agentic Workflow]] -- _File correlato per contenuto_
- [[../skills/Skill - Workflow Engine.md|Skill - Workflow Engine]] -- _File correlato per contenuto_



---


## Deep Knowledge Patterns

**Source:** wiki\projects\Deep Knowledge Patterns.md


--- title: "Deep Knowledge Patterns" type: pattern date: 2026-05-06 tags:


## Purpose

Use knowledge graphs and compressed project memory to avoid rereading large codebases.


## Pattern

1. Generate or read project graph/index first.
2. Identify god nodes, communities and high-degree dependencies.
3. Open only the relevant node notes and source files.
4. Convert recurring facts into stable project memory notes.
5. Link decisions to evidence, not to chat.


## Used By

- [[CFDML Enterprise Platform]]
- [[OpenClaw Standard Suite]]
- [[../skills/Skill - Knowledge Graph Engineering]]


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../rag/RAG Knowledge System.md|RAG Knowledge System]] -- _File correlato per contenuto_



---


## FashionIntel OS

**Source:** wiki\projects\FashionIntel-OS.md


--- title: "FashionIntel OS" type: project date: 2026-05-16 tags:


## Obiettivo

Sistema AI-first di business intelligence per retail fashion. Aggrega dati da POS (Shopify/WooCommerce), meteo, social trend e fornisce previsioni domanda, pricing dinamico e analisi sentiment tramite agente Claude (Anthropic). Espone tutto via REST API FastAPI.


## Stack Tecnico

| Layer | Tecnologia |
|-------|-----------|
| API Gateway | FastAPI (Python) |
| AI Orchestrator | Anthropic Claude (`claude-sonnet-4-20250514`) |
| Streaming / events | Kafka (`kafka-python`), opzionale per export ordini |
| Cache / idempotency | Redis (`redis-py`), fallback in-memory |
| POS Connectors | Shopify Admin API + WooCommerce REST API |
| Data Sources | OpenWeatherMap, Data365, Google Trends |
| ML Modules | EnsembleDemandForecaster, DynamicPricingAgent (DQN + heur


## Architettura a 4 layer

```
[Data Sources]
  Shopify · WooCommerce · OpenWeatherMap · Data365 · Social/RSS
        ↓ POSConnector · WeatherConnector · SocialTrendEmitter
[Pipeline]
  event_schemas.py (contracts v1) → DLQ Redis → Kafka (opzionale)
  Redis idempotency + watermark incrementale (since/next_since)
        ↓
[AI Core]
  FashionAnalystAgent (Claude) ← ToolEngine
  EnsembleDemandForecaster · DynamicPricingAgent · SentimentAnalyzer · AlertEngine
        ↓
[Output Layer]
  REST API (ma


## Endpoint completo


### Health & Agent
- `GET /health` — stato runtime connettori + Redis
- `POST /agent/chat` — Q&A conversazionale Claude
- `GET /agent/brief` — morning brief automatico
- `GET /agent/telemetry` — metriche agent tool calls


### Data
- `GET /data/weather` — dati meteo (live OpenWeather o simulatore)
- `GET /data/trends` — trend social (live Data365 o simulatore)
- `GET /data/sales` — sommario vendite aggregato
- `GET /data/sales/events` — export order-level con: contract validation, Kafka publish opzionale (`publish_kafka`, `kafka_topic`, `dry_run`), marker incrementale (`since` / `next_since`), `include_invalid` per debug DLQ


### ML
- `POST /ml/forecast` — previsione domanda ensemble
- `POST /ml/pricing` — pricing dinamico DQN + heuristic
- `GET /ml/stockout` — risk stockout per prodotto
- `POST /ml/sentiment` — sentiment review testo


### Contracts
- `POST /contracts/validate` — valida payload contro schema v1
- `GET /contracts/history` — storico ultime N validazioni


### Pipeline Ops *(implementati questa sessione)*
- `GET /ops/pipeline/status` — watermark, DLQ count, connettori, Redis runtime
- `POST /ops/pipeline/reset` — reset selettivo watermark / idempotency / DLQ per provider
- `GET /ops/pipeline/dlq` — ultimi N record Dead Letter Queue
- `POST /ops/pipeline/dlq/replay` — replay DLQ → Kafka (dry_run=True di default)



---


## OpenClaw Standard Suite

**Source:** wiki\projects\OpenClaw Standard Suite.md


--- title: "OpenClaw Standard Suite" type: project date: 2026-05-06 tags:


## Identità

| Campo | Valore |
|-------|--------|
| Path | `C:\Users\TAREK\Desktop\OpenClaw_Standard_Suite` |
| Tipo | Personal AI agent suite con workflow automation |
| Knowledge graph | `graphify-out/` (144 file, 147 nodi, 49 community) |
| Scripts addizionali | `C:\Users\TAREK\.openclaw\scripts` |


## Componenti principali

| Component | Funzione |
|-----------|----------|
| `Core_Engine` | Motore centrale orchestrazione |
| `MetaClaw` | Meta-agent supervisor |
| `NemoClaw` | Variant agent specializzato |
| `Tandem_Browser` | Browser automation in tandem |
| `Triple_Tier_Memory` | Sistema memoria 3-tier |
| `Swarm_Agents_Registry` | Registry per swarm pattern |
| `DAG_Workflows` | Workflow DAG-based |
| `Physical_Skills` | Skill set fisiche (computer use, browser) |
| `Agent_Workspace` | W


## Entry points (.bat launchers)

| Script | Funzione |
|--------|----------|
| `00_START_OPENCLAW_OMEGA.bat` | Avvio completo Omega mode |
| `GATEWAY.bat` | Gateway HTTP/API |
| `METACLAW.bat` | MetaClaw supervisor |
| `SWARM.bat` | Modalità swarm multi-agent |
| `TUI.bat` | Terminal UI |
| `start_openclaw.bat` | Standard start |
| `ENSURE_GATEWAY_TOKEN_MODE.ps1` | Token mode auth setup |


## ClawFlows Workflow System

Il **god node** di OpenClaw (10 edge nel graphify) — sistema workflow con:

- **113 community workflows prebuilt** (contributori: march_io, davehappyminion)
- **Scheduler**: 15-minute heartbeat
- **Dashboard**: Node.js server (`clawflows/system/dashboard/server.js`)
- **CLI**: `clawflows` command
- **Validation**: BATS test fixtures (malformed_yaml, missing_name, no_closing_marker, valid_workflow)


### Workflow categories prebuilt

| Categoria | Esempi |
|-----------|--------|
| Schedule/Calendar | Check Calendar, Plan Week, Check RSVPs, Birthday Reminder |
| Email | Check Email (read-only), Process Email, Clean Email |
| Mode activation | Activate Away/Focus/Morning/Night/Sleep |
| Periodic Reviews | Review Week, Review Week Git, Review Month, Review PRs |
| Backup | Backup Important Files, Backup Photos |
| Monitoring | Check Disk, Network, Security, Dependencies, Repos, Privacy |
| Pers


### Daily automation
- **Update OpenClaw Workflow**: daily 3am restart (god node, 4 edge)


## Regole Claude per OpenClaw

1. **PRIMA** di rispondere a domande architettura/codebase: leggi `graphify-out/GRAPH_REPORT.md` (god nodes + community structure)
2. Se esiste `graphify-out/wiki/index.md`: navigalo INVECE di raw files
3. Dopo modifiche al codice: esegui `graphify update .` (AST-only, no API cost)
4. Premium features: `_calc_robust_patch.py`, `_premium_api_append.py`, `_premium_extras_append.py`


## Workflow tipici


### Sviluppo nuovo workflow community
1. Crea `clawflows/workflows/available/community/<nome>/WORKFLOW.md`
2. Crea YAML config corrispondente
3. Valida con BATS fixtures
4. Submit via workflow di submission (es. `workflow_update_openclaw_sub`)



---


## OpenClaw — Stato Progetti

**Source:** wiki\projects\OpenClaw Stato Attuale.md


--- title: OpenClaw - Stato Progetti alias: stato created: 2026-07-13 tags: [openclaw, projects, state]


## Stato Architettura
- **Modello**: Abbiamo Nemotron Ultra 253B (NVIDIA) come base → capace di gestire memoria calda, Triple-Tier memory con workspace leggibile da tutti gli agenti della flotta Nexus Omega
- **Tooling**: aggiornata la tabella tool disponibili (exec, read, write, edit, cron, sessions_spawn, memory_search) con persistenza decisa


## Progetti Attivi

| Progetto | Stato | Next Action |
|----------|-------|--------------|
| **Interfaccia web completa** | 70% | Backend pronto. Frontend mancante: CLI che genera React/UI via prompt, generatore documentazione OpenClaw API gateway → cura grafo resourze via browser UI
| **Multi-agent swarm** | 90% (teoria) | Implementare routing effettivo 5100 verso Codex/Claude/Kimi. Ora OpenClaw è registrato nella flotta Nexus Omega, ma il dispatcher è fermo.
| **OpenClaw Standard Suite** | 60%


## Second Brain Nexus Omega

Ora OpenClaw può:
- Leggere/aggiornare il vault Agenti (con bridge in OBSIDIAN_VAULT.md)
- Salvare memoria usando `tools/save-memory.ps1`
- Aggiornare project-continuity
- Registrarsi ai dashboard (`00 Dashboard Agenti.md`, `00-INDEX.md`, `AGENTS.md` vault)

È ufficialmente parte della flotta. Ha la capacità di scrivere in `wiki/projects/`, `wiki/decisions/`, `wiki/knowledge/` senza rompere il vault.



---


## Progetto 2026

**Source:** wiki\projects\Progetto 2026.md


--- title: "Progetto 2026" type: project date: 2026-06-13 status: active


## Scopo

Questo progetto serve come **ancora semantica** per testare:

- **Wikilink**: ogni nuova skill deve linkare almeno un progetto esistente
- **Sessioni**: le note di sessione si collegano qui per tracciabilità
- **Skill**: verifica che le regole delle skill siano rispettate
- **Frontmatter**: formato YAML standard per tutti i file


## Collegamenti dalle Skill

Le seguenti skill linkano questo progetto come referenza:

- [[skills/Skill - Buongiorno Buonasera Sessioni]] — Sistema invocazione sessioni
- [[skills/Skill - Inizio Giornata Daily]] — Setup giornaliero
- [[skills/Skill - Inizio Sessione Agente]] — Avvio sessione agente
- [[skills/Skill - Fine Sessione Summary]] — Chiusura sessione
- [[skills/Skill - Notion Integration]] — Integrazione Notion


## Test


### Regole Skill Verificate

| Regola | Stato | Verifica |
|--------|-------|----------|
| Frontmatter YAML | ✅ | title, type, tags, status presenti |
| Almeno 1 wikilink | ✅ | Questo file è linkato da 5 skill |
| Type corretto | ✅ | type: project |
| Status valido | ✅ | status: active |
| Tags pertinenti | ✅ | project, reference, test, 2026 |


## Collegamenti Correlati

- [[index.md|Wiki Index]] — Indice principale del vault
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] — Architettura master
- [[../00 Dashboard Agenti]] — Dashboard agenti
- [[tasks/Continuous Improvement Backlog]] — Backlog miglioramento
- [[_system/project-continuity]] — Continuità progetti



---


## RT Box Dashboard Integration — UI & Pipeline Connections

**Source:** wiki\projects\RT Box Dashboard Integration.md


--- title: "RT Box Dashboard Integration — UI & Pipeline Connections" type: project date: 2026-06-05 tags:


## 🏛️ Architettura UI


### 1. Lazy Routing (`app.py` & sidebar)
Per massimizzare la fluidità (da caricamenti di 100s a pochi secondi), la navigazione implementa il pattern **Lazy Routing**:
- Utilizzo di `st.navigation` in combinazione con `st.session_state` per mantenere lo stato cross-tab.
- Selezione delle sotto-sezioni tramite `segmented_control` ed esecuzione della logica *solo* per la tab attiva:
  ```python
  active_tab = st.segmented_control("Sezione", options=["Overview", "Cockpit", "Reports"])
  if active_ta


### 2. Tab Cockpit Ingegneristico (3D Visualizer)
- Visualizzatore 3D integrato per i profili dei motori (inrunner/outrunner) utilizzando WebGL nativo tramite Plotly e Three.js in modalità offline-safe.
- Degradazione graziosa: se il backend o le librerie 3D non sono disponibili, la dashboard mostra un wireframe 2D parametrico statico o tabelle dimensionali.

---


## 📥 Integrazione Pipeline e Export

Il backend in FastAPI espone le rotte per la generazione e il download dei file CAD ed ingegneristici:
- `GET /twin/cad/{motor}/step` — Modello STEP AP242 tassellato per l'importazione CAD (FreeCAD, Fusion360).
- `GET /twin/cad/{motor}/stl` — Mesh STL per stampa 3D.
- `GET /twin/cad/{motor}/dxf` — Disegno bidimensionale quotato.
- `GET /twin/cad/{motor}/datasheet.pdf` — Report ingegneristico in PDF generato tramite ReportLab.

---


## 🔗 Collegamenti Utili
- [[RT Box Digital Twin Motor Engineering]] — Suite di ingegneria motori.
- [[RT Box Motor Training]] — Metodologia di addestramento e calibrazione PINN.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../dashboards/Executive Dashboard.md|Executive Dashboard]] -- _File correlato per contenuto_
- [[../dashboards/Engineering Dashboard.md|Engineering Dashboard]] -- _File correlato per contenuto_
- [[../dashboards/Cost Dashboard.md|Cost Dashboard]] -- _File correlato per contenuto_
- [[../dashboards/Agent 



---


## RT Box Digital Twin — Motor Engineering Suite

**Source:** wiki\projects\RT Box Digital Twin Motor Engineering.md


--- title: RT Box Digital Twin — Motor Engineering Suite type: project status: active date: 2026-06-03


## Moduli nuovi (ml/motor/)

- **`frame_standards.py`** — tabelle frame reali **IEC 60072-1** (56→450: altezza
  d'asse, Ø albero, Ø corpo) + **NEMA MG-1** (143T→445T) + stepper NEMA + sizing
  **outrunner** (rotore esterno, BLDC drone/gimbal/hub). `dimension_motor`,
  `motor_bom`, `dimension_table_row`. Override quote `mechanical{}` prioritarie.
- **`pinn_advisor.py`** — advisor PINN fisico: matrice 13 tipi × 6 obiettivi,
  scale di normalizzazione (τ elettrica/meccanica/termica, rigidità multi


## Generatore CAD (ml/motor/cad_export.py)

- GLB cutaway inrunner + **builder outrunner dedicato** (campana esterna rotante +
  statore interno avvolto). Export **STL** (`build_motor_stl_bytes`) e **DXF 2D
  quotato** (`build_motor_dxf`) importabili in ogni CAD.
- `infer_cad_profile` (twin3d.py) ora dimensiona sui frame reali + rileva outrunner.
- Sezione Plotly outrunner in `motor_3d_geometry.py` (griglia estesa alla campana).


## Dashboard (pages/30_🔮_Digital_Twin_3D.py)

Tab nuove/potenziate: **Mappa efficienza**, **Calcoli ingegneristici** (12 sotto-tab
con grafici: costanti/PU, punto operativo phasor, inverter, meccanica, cuscinetti,
FOC, perdite+IE, servizio, avvolgimento, armoniche/NVH, R(T), corto/asincrono),
**datasheet dimensionale + disegno quotato**, **galleria datasheet + BOM comparativa**,
**pacchetto ingegneristico ZIP** (GLB+STL+DXF+datasheet+params).
Pagina **20_🧠_PINN_Advisor.py** potenziata con l'advi


## API backend (routers/twin.py, advisor.py)

- `GET /twin/cad/{motor}/stl` · `/dxf` · `/datasheet` · `/bom` · `/efficiency-map`
- `GET /twin/cad/{motor}/engineering-report` (json/markdown)
- `GET /advisor/pinn-plan/{motor}`


## Test

`test_frame_standards` (26) · `test_pinn_advisor` (22) · `test_efficiency_map` (18)
· `test_engineering_calcs` (34) · `test_cad_export` (45, incl. endpoint backend).
Page-load AppTest verde su entrambe le pagine. Nessuna regressione.


## Onestà tecnica

- Geometrie = repliche parametriche CAD-like (non STEP del costruttore); `dimensional_source` esplicito.
- Modelli perdite/termico semplificati e dichiarati (stile IEC 60034-2, non FEA).
- L10 = curva vita-carico relativa a C (il carico reale non è in targa).
- Advisor calcola raccomandazioni: non addestra/valida (quality gate + trainer PyTorch restano la verità).


## Aggiornamento 2026-06-03 (round export & calibrazione)

- **STEP AP242 tessellato** — `cad_export.build_motor_step` / `glb_bytes_to_step`
  (mesh COORDINATES_LIST + TRIANGULATED_FACE_SET, coord. mm; importabile FreeCAD/
  Fusion/OCCT/PLM). Onesto: tessellato, non B-rep analitico (manca kernel CAD).
  Refactor `_extract_triangles` condiviso con STL.
- **Datasheet PDF one-pager** — nuovo `ml/motor/datasheet_pdf.py` (reportlab):
  targa + dimensioni frame + costanti/ratings + grafico inviluppo c


## Stato

✅ Completo e testato (≈300+ test sui moduli toccati, page-load verde).
Prossimi possibili: STEP **B-rep analitico** (richiede kernel OCP/cadquery),
calibrazione perdite con **no-load test** per separare ferro/windage, report PDF
multi-pagina con mappa efficienza renderizzata.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[CFDML Enterprise - Sessione Digital Twin Enterprise 2026-05-12.md|CFDML Enterprise - Sessione Digital Twin Ente]] -- _File correlato per contenuto_



---


## RT Box Motor Training — PINN & Surrogate Modeling

**Source:** wiki\projects\RT Box Motor Training.md


--- title: "RT Box Motor Training — PINN & Surrogate Modeling" type: project date: 2026-06-05 tags:


## 📐 Modelli di Addestramento


### 1. PINN Proxy (Physics-Informed Neural Networks)
- **Modello:** Integra le equazioni differenziali della fisica del motore (rotore, statore, flusso, perdite) direttamente nella funzione di perdita del modello neurale.
- **Parametri fisici vincolanti:** Ke, Kt, flussi dq, bilancio termico transitorio.
- **Risoluzione:** Previene derive fisicamente impossibili (es. rendimento > 100%, generazione di coppia senza corrente).


### 2. Calibrazione e Regressione
- Addestramento basato su dati reali provenienti dal banco prova (ISO 17025) e simulazioni FEA (Finite Element Analysis).
- Algoritmo di calibrazione delle perdite tramite minimi quadrati (`calibrate_losses`):
  $$P_{loss} = 1.5 \cdot R_s \cdot I^2 + k_{fe} \cdot \omega_e^2 + k_{mech} \cdot \omega_m^2 + stray \cdot P_{out}$$

---


## 🛠️ Procedura di Addestramento (Training Pipeline)

1. **Ingest Dati:** Caricamento dei file CSV/JSON di test provenienti dal dyno o simulatore.
2. **Normalizzazione:** Applicazione delle costanti di tempo elettriche, meccaniche e termiche.
3. **Training Run:** Esecuzione del fit per calibrare i coefficienti del rame ($R_s$) e del ferro ($k_{fe}$).
4. **Validazione:** Controllo del residuo e del drift (Massimo 1.5% di errore tollerato).
5. **Esportazione:** Salvataggio dei coefficienti in `con


## 🔗 Collegamenti Utili
- [[RT Box Digital Twin Motor Engineering]] — Suite principale di ingegneria motori.
- [[../software-house/MAX Command Center]] — Portale di controllo del software house OS.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_



---


## Sistema Agenti Obsidian

**Source:** wiki\projects\Sistema Agenti Obsidian.md


--- title: "Sistema Agenti Obsidian" type: project date: 2026-05-06 tags:


## Obiettivo

Usare il vault come secondo cervello operativo per Codex e Claude, riducendo token e aumentando continuita', precisione e produttivita'.


## Stato

Configurazione potenziata con dashboard, router, template, protocollo condiviso, area decisioni, prompt riusabili e lint.


## Prossime evoluzioni

- Collegare sync automatico Claude se il memory graph cambia.
- Aggiungere script di ingest locale se arrivano molte fonti in `raw/`.
- Installare plugin community consigliati direttamente da Obsidian se desiderato.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../maps/MOC Sistema Agenti.md|MOC Sistema Agenti]] -- _File correlato per contenuto_
- [[../synthesis/Quartetto Agenti — Sistema Produttivo.md|Quartetto Agenti — Sistema Produttivo]] -- _File correlato per contenuto_
- [[../concepts/Obsidian AI Infrastructure.md|Obsidian AI Infrastructure]] -- _File corr



---


## Projects

**Source:** wiki\projects\_index.md


--- title: "Projects" tags: [project, roadmap, status] type: index date: 2026-06-13



---


## Agent Reach — Occhi su Internet per gli Agenti

**Source:** wiki\skills\Agent Reach.md


--- title: "Agent Reach — Internet per gli Agenti" type: skill-note date: 2026-06-18 tags:


## Cosa fa

Legge e cerca su: pagine web (HTML→Markdown pulito), Twitter/X, Reddit, YouTube (transcript), Bilibili, Xiaohongshu, GitHub (repo/issue), RSS, AI search. È un **glue layer**: instrada verso i tool upstream con routing «primario + backup» e si auto-ripara quando un canale viene bloccato.


## Comandi verificati

```powershell
$py = "tools/external/Agent-Reach/.venv/Scripts/python.exe"

# Diagnostica: cosa funziona / cosa va configurato
& $py -m agent_reach.cli doctor

# Auto-configurazione canali
& $py -m agent_reach.cli install --env=auto

# Via dispatcher del Second Brain (per tutti gli agenti)
python tools/os-core/use-capability.py info web
python tools/os-core/use-capability.py run web -- -m agent_reach.cli doctor
```


## Integrazione MCP (uso nativo da tutti i modelli)

Agent-Reach espone un **server MCP** (`agent_reach/integrations/mcp_server.py`, config `config/mcporter.json`). Aggiungendolo come server MCP nel plugin Neural Composer (`.obsidian/plugins/neural-composer/data.json` → `mcp.servers`) o nei client MCP degli agenti, i modelli lo richiamano come tool nativo (read/search) senza passare dalla CLI.


## Note operative

- **Privacy**: i cookie restano locali (Cookie-Editor export), non vengono caricati.
- **Auth cookie** (Twitter, Xiaohongshu): solo export Cookie-Editor, niente QR.
- **Manutenzione**: `agent-reach doctor` dice quale canale è attivo e come ripararlo.


## Collegamenti

- [[_system/Capability Registry]] — registro capacità (key `web`)
- [[inventory/Integrated_Repositories]] — inventario repo esterni
- [[concepts/Webfurl Semantic Compression]] — compressione delle pagine recuperate



---


## DevForge Skill Library

**Source:** wiki\skills\DevForge Skill Library.md


--- title: "DevForge Skill Library" type: skill date: 2026-05-06 tags:


## Professional Skills

- [[Skill - Machine Learning and Deep Learning]]
- [[Skill - OT Cybersecurity]]
- [[Skill - PLC Programming]]
- [[Skill - Industrial Robotics]]
- [[Skill - Technical Drawing Automation]]
- [[Skill - UI UX Design System]]
- [[Skill - Knowledge Graph Engineering]]
- [[Skill - Workflow Engine]]
- [[Skill - Agent Orchestration]]
- [[Skill - Long Session Coding Productivity]]
- [[Skill - AI Code Quality Gate]]
- [[Skill - ML DL Automation Pipeline]]
- [[Skill - Token Economy E


## Agent Memory Skill

The executable agent skill is installed as:

- `C:\Users\TAREK\.agents\skills\devforge-agent-memory-patterns`
- `C:\Users\TAREK\.codex\skills\devforge-agent-memory-patterns`
- `agent-skills/devforge-agent-memory-patterns`

- [[_index|Skills]]

- [[Skill - Workflow Engine|Skill - Workflow Engine]]

- [[_index|Skills]]

- [[Skill - Workflow Engine|Skill - Workflow Engine]]

- [[_index|Skills]]

- [[Skill - Workflow Engine|Skill - Workflow Engine]]

- [[_index|Skills]]

- [[S



---


## PDFCraft Privacy-First PDF Toolkit

**Source:** wiki\skills\PDFCraft.md


--- title: "PDFCraft Privacy-First PDF Toolkit" type: skill-note date: 2026-06-10 tags:


## Installed Location

- Repo: `C:\Users\TAREK\Desktop\AGENTE WIKI\WIKI AGENTI\tools\external\pdfcraft`
- Upstream: https://github.com/PDFCraftTool/pdfcraft
- User-provided typo corrected: `PDFCarftTool/pdfcraft` -> `PDFCraftTool/pdfcraft`
- License observed in current repo: AGPL-3.0
- Latest checked release: `v2026.06.03-907b724`
- Local dev URL: `http://127.0.0.1:3001/en`
- Dev logs: `C:\Users\TAREK\Desktop\AGENTE WIKI\WIKI AGENTI\tools\external\pdfcraft\.codex-run\dev-3001.out.log`


## Verified Setup

```powershell
cd "C:\Users\TAREK\Desktop\AGENTE WIKI\WIKI AGENTI\tools\external\pdfcraft"
npm ci
npm run test
npm run build
npm run dev -- --hostname 127.0.0.1 --port 3001
```

Verification performed on 2026-06-10:

- `npm ci` succeeded; postinstall synced PDF.js workers and decompressed LibreOffice WASM files.
- `npm run test` succeeded: 57 test files, 444 tests passed. JSDOM emitted non-blocking navigation/canvas warnings.
- `npm run build` succeeded: Next.js generated 2023 


## What It Does Best

- Private browser-side PDF operations: files stay on the local machine/browser context.
- Fast PDF manipulation through Next.js, WebAssembly, PDF.js, pdf-lib, Tesseract.js, PyMuPDF WASM, and LibreOffice WASM assets.
- Broad tool registry: local code currently has 131 configured tools, 117 PDF processor files, and 100 workflow templates.
- Workflow editor at `/en/workflow`: visual node-based chaining for repeatable PDF pipelines.
- Static export and self-hosting: build outpu


## Operating Pattern

Use PDFCraft before feeding PDFs into RAG, CAD documentation, compliance reports, or customer deliverables:

1. Open `http://127.0.0.1:3001/en`.
2. Choose a single tool from `/en/tools` for one-off operations, or open `/en/workflow` for repeatable pipelines.
3. Keep sensitive PDFs local; prefer this local instance instead of public PDF websites.
4. For production/self-hosting, prefer Docker/Nginx or another host that correctly serves WASM MIME types and cross-origin isolati


## Deployment Commands

Development:

```powershell
npm run dev -- --hostname 127.0.0.1 --port 3001
```

Static build:

```powershell
npm run build
```

Prebuilt Docker image:

```powershell
docker pull ghcr.io/pdfcrafttool/pdfcraft:latest
docker run -d -p 8080:80 --name pdfcraft ghcr.io/pdfcrafttool/pdfcraft:latest
```

Build from source with Docker Compose:

```powershell
docker compose --profile dev up
docker compose --profile prod up --build
docker compose down
```


## Architecture Notes

- Next.js app with `output: 'export'`, multilingual static routes, and trailing slashes.
- PDF processing is primarily client-side with WebAssembly and browser APIs.
- LibreOffice WASM requires `SharedArrayBuffer`; full Office conversion needs cross-origin isolation headers:
  - `Cross-Origin-Opener-Policy: same-origin`
  - `Cross-Origin-Embedder-Policy: require-corp`
- Static hosts must serve `.wasm` as `application/wasm` and `.mjs` as JavaScript.
- GitHub Pages cannot se


## Risks And Guardrails

- `npm audit --omit=dev` reported 10 runtime vulnerabilities: 1 low, 4 moderate, 5 high, 0 critical. A fix pass should be handled as a separate dependency-upgrade task.
- `pdfjs-dist` fix path requires a major upgrade according to npm audit; do not force-upgrade blindly.
- `next`, `next-intl`, `node-forge`, `pdfjs-dist`, and `zgapdfsigner` appear in audit output; review before production exposure.
- Current GitHub repo says AGPL-3.0. Some third-party article text says MI


## Links

- Inventory entry: [[../inventory/Integrated_Repositories]]
- Adjacent PDF use in engineering docs: [[text-to-cad]]


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../tools/README.md|Readme]] -- _Panoramica strumenti_



---


## Skill - AI Agent Engineering

**Source:** wiki\skills\Skill - AI Agent Engineering.md


--- title: "Skill - AI Agent Engineering" type: skill date: 2026-05-06 tags:


## Quando usarla

Per agenti con strumenti, memoria, workflow multi-step, eval, sicurezza e costi.


## Output

- Scopo agente.
- Tool policy.
- Memoria minima.
- Eval prima del deploy.
- Budget token.
- Handoff.


## Standard

Vedi [[../playbooks/Agentic Workflow]], [[../checklists/Agent Release Checklist]], [[../synthesis/Dreaming-Insights]] e [[../sources/Web - OpenAI Evals Caching]].



---


## Skill - AI Code Quality Gate

**Source:** wiki\skills\Skill - AI Code Quality Gate.md


--- title: "Skill - AI Code Quality Gate" type: skill date: 2026-05-11 tags:


## Quando usarla

Per imporre controlli automatici consistenti su codice generato o modificato da agenti AI.


## Output

- Config gate CI locale/remoto.
- Report pass/fail per lint, test, type-check, security.
- Soglie minime coverage e policy blocco merge.


## Stack consigliato

- `ruff` + `pyright`
- `pytest` + `pytest-cov`
- `semgrep` + `trivy`
- `renovate` per dependency hygiene continua


## Regole

- Niente merge con gate rosso.
- Niente eccezioni silenziose.
- Ogni finding critico deve avere fix o waiver esplicito.


## Standard

Vedi [[../checklists/Quality Gate Checklist]], [[../checklists/Security Release Checklist]], [[../checklists/Production Readiness Checklist]] e [[../sources/Web - Long Session Engineering Productivity 2026]].



---


## Skill - Agent Orchestration

**Source:** wiki\skills\Skill - Agent Orchestration.md


--- title: "Skill - Agent Orchestration" type: skill date: 2026-05-06 tags:


## Use For

Subagents, delegation, parallel work, verifiers, multi-agent bus, role routing, context isolation and agent evals.


## Rules

- delegate only bounded work with a clear output;
- keep write scopes separate;
- never send every agent the full chat;
- merge results into one decision;
- save final durable memory to the vault.


## Vedi anche

- [[../concepts/Level_14_Ecosystem_Concepts]] — Ecosistemi autonomi multi-agente
- [[../agents/Multi-Agent Bus Pattern]]
- [[../agents/Forked Verifier Agent Pattern]]
- [[../agents/Agent Lifecycle Hook Pattern]]
- [[../agents/RuFlo Marketplace e Swarm Orchestration]]
- [[../sources/Web - RuFlo Agent Orchestration]]
- [[../concepts/Self-Evolving Systems (Level 10)]] — Auto-evoluzione



---


## Skill - Architecture Engineering

**Source:** wiki\skills\Skill - Architecture Engineering.md


--- title: "Skill - Architecture Engineering" type: skill date: 2026-05-06 tags:


## Quando usarla

Per decisioni che cambiano struttura, confini di dominio, API, dati, sicurezza o costi.


## Output

- [[../_templates/Technical Spec]] se serve progettare.
- [[../_templates/ADR Professionale]] se serve decidere.
- Diagramma o mappa dei componenti.
- Rischi, alternative e piano di migrazione.


## Regole

Non creare astrazioni per estetica. Crea astrazioni quando riducono complessita', duplicazione reale o rischio operativo.


## Vedi anche

- [[../playbooks/Architecture Design]] — Playbook design architetturale
- [[../architecture/Cloud Native Baseline]] — Baseline cloud native
- [[../platform/Platform Engineering System]] — Platform engineering



---


## Skill - Automation DevOps

**Source:** wiki\skills\Skill - Automation DevOps.md


--- title: "Skill - Automation DevOps" type: skill date: 2026-05-06 tags:


## Quando usarla

Per pipeline, script, CI/CD, bootstrap progetto, lint, test automatici, release e manutenzione.


## Output

- Pipeline o script ripetibile.
- Runbook.
- Log di verifica.
- Rollback o piano di recupero.


## Standard

Usa [[../playbooks/CI CD Automation]], [[../checklists/Repo Health Checklist]] e [[../checklists/Production Readiness Checklist]].


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../tools/README.md|Readme]] -- _Panoramica strumenti_
- [[Skill - ML DL Automation Pipeline.md|Skill - ML DL Automation Pipeline]] -- _File correlato per contenuto_
- [[Skill - Technical Drawing Automation.md|Skill - Technical Drawing Automation]] -- _File correlato per contenuto_
- [[Skill - UI UX De



---


## Skill — Buongiorno / Buonasera Sessioni

**Source:** wiki\skills\Skill - Buongiorno Buonasera Sessioni.md


--- title: "Skill — Buongiorno / Buonasera Sessioni" type: skill date: 2026-06-14 tags:


## Come Funziona


### ☀️ `buongiorno` — Avvio Sessione

Quando invochi `buongiorno`, il sistema esegue automaticamente:

| Step | Azione | Script | Cosa succede |
|------|--------|--------|-------------|
| 1 | Crea daily note | `tools/new-daily.ps1` | `wiki/daily/YYYY-MM-DD - Daily.md` |
| 2 | Carica stato progetti | Legge `project-continuity.md` | Contestualizza sui progetti in corso |
| 3 | Carica backlog P0 | Legge `Continuous Improvement Backlog.md` | Priorità del giorno |
| 4 | Prepara contesto | `tools/sess


### 🌙 `buonasera` — Chiusura Sessione

Quando invochi `buonasera`, il sistema esegue:

| Step | Azione | Script | Cosa succede |
|------|--------|--------|-------------|
| 1 | Summary | Richiede input utente | Descrivi cosa è stato fatto oggi |
| 2 | Salva memoria | `tools/save-memory.ps1` | Daily note, ledger, jsonl, project-continuity |
| 3 | Quality gate | `tools/agent-done.ps1` | Lint, memory check, eval, digest |
| 4 | Executive digest | `tools/daily-executive-digest.ps1` | Riepilogo giorna


### 🔍 `status` — Stato Corrente

Mostra lo stato di salute del vault e delle sessioni:

```powershell
tools/session-hooks.ps1 status
```

Output:
```
=== STATO SESSIONE ===
  Daily note: ESISTE
  Project continuity: OK
  Backlog: OK
  Ultimo aggiornamento vault: 2026-06-13
```


## Integrazione con Agenti AI


### Claude / Codex (via .claude/settings.json)

Aggiungi queste regole nel file `.claude/settings.json`:

```json
{
  "hooks": {
    "session-start": {
      "command": "tools/session-hooks.ps1 buongiorno"
    },
    "session-stop": {
      "command": "tools/session-hooks.ps1 buonasera -Agent 'Claude' -Summary '$summary'"
    }
  }
}
```


### Copilot CLI (via copilot-instructions.md)

```markdown


## Session flow
- User says "buongiorno" → Run session-hooks.ps1 buongiorno
- User says "buonasera" → Ask for summary, then run session-hooks.ps1 buonasera
```


### Obsidian Copilot Plugin

Crea un prompt personalizzato "Buongiorno" nel plugin Copilot che:
1. Legge la daily note di oggi
2. Carica il project-continuity
3. Chiede: "Cosa vuoi fare oggi?"



---


## Skill - Deep Learning Engineering

**Source:** wiki\skills\Skill - Deep Learning Engineering.md


--- title: "Skill - Deep Learning Engineering" type: skill date: 2026-05-06 tags:


## Quando usarla

Per reti neurali, fine-tuning, training distribuito, inferenza, GPU, ottimizzazione e valutazione.


## Output

- Config esperimento.
- Dataset e split.
- Metriche.
- Checkpoint e artefatti.
- Analisi errori.


## Regole

Prima di aumentare il modello, controlla dati, eval, baseline e costo inferenza.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../tools/README.md|Readme]] -- _Panoramica strumenti_
- [[Skill - Machine Learning and Deep Learning.md|Skill - Machine Learning and Deep Learning]] -- _File correlato per contenuto_
- [[Skill - Machine Learning Engineering.md|Skill - Machine Learning Engineering]] -- _File correlato per contenuto_
- 



---


## Skill - Engineering Maturity Governance

**Source:** wiki\skills\Skill - Engineering Maturity Governance.md


--- title: "Skill - Engineering Maturity Governance" type: skill date: 2026-05-12 tags:


## Quando usarla

Quando serve governare il lavoro degli agenti con KPI tecnici oggettivi e backlog improvement prioritizzato.


## Output

- Scorecard maturita ingegneristica su 6 pillar.
- Backlog P0/P1/P2 derivato da segnali reali.
- Azioni correttive tracciabili nel loop quotidiano.


## Stack

- `engineering-maturity-gate.ps1`
- `continuous-improvement-backlog.ps1`
- `second-brain-status.ps1`
- `second-brain-doctor.ps1`


## Regole

- Nessuna decisione strategica senza score aggiornato.
- Priorita P0 prima di nuove espansioni funzionali.
- Rieseguire scorecard dopo ogni ciclo di hardening.


## Standard

Vedi [[../synthesis/Engineering Excellence Control Tower]], [[../synthesis/Dreaming-Insights]] e [[../automation/Continuous Improvement Loop]].


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../tools/README.md|Readme]] -- _Panoramica strumenti_
- [[Skill - AI Agent Engineering.md|Skill - AI Agent Engineering]] -- _File correlato per contenuto_
- [[Skill - Security Engineering.md|Skill - Security Engineering]] -- _File correlato per contenuto_
- [[Skill - QA Test Engineering.md|Skill - QA 



---


## Skill — Fine Sessione e Summary Giornaliero

**Source:** wiki\skills\Skill - Fine Sessione Summary.md


--- title: "Skill — Fine Sessione e Summary Giornaliero" type: skill date: 2026-06-13 tags:


## Obiettivo

Alla fine di ogni sessione (o a fine giornata), salvare:
1. **Summary** — cosa è stato fatto
2. **Decisioni** — scelte prese e perché
3. **File toccati** — quali file sono stati creati/modificati
4. **Pending Topics** — cose lasciate in sospeso
5. **Next Steps** — prossima azione per l'agente successivo


## Procedura di Chiusura


### Passo 1 — Compila report sessione

Usa questo schema per il summary:

```markdown


## [YYYY-MM-DD HH:MM] <AGENTE> | <TITOLO>


### Summary
- Task completati: ...
- Task in corso: ...
- Scoperte/decisioni: ...


### Decisioni
- <decisione 1>
- <decisione 2>


### Files
- <file creato/modificato>
- <file letto>


### Pending Topics (per domani/prossimo agente)
- [ ] <topic 1>
- [ ] <topic 2>


### Next Action
<prossimo passo concreto>
```



---


## Skill - Industrial Robotics

**Source:** wiki\skills\Skill - Industrial Robotics.md


--- title: "Skill - Industrial Robotics" type: skill date: 2026-05-06 tags:


## Use For

ABB RAPID, KUKA KRL, FANUC, URScript, Yaskawa, ROS/ROS2, robot cells, path planning, kinematics, vision, safety, simulation and commissioning.


## Checklist

- define cell layout, reach, payload and cycle time;
- validate safety zones and emergency stops;
- simulate path and collisions before hardware;
- record calibration and tool frames;
- keep offline program and deployed program traceable;
- include operator and maintenance procedures.


## Vedi anche

- [[../concepts/Level_11_Industrial_Singularity]] — Industrializzazione e robotica
- [[Skill - Technical Drawing Automation]]
- [[Skill - PLC Programming]] — Programmazione PLC


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../tools/README.md|Readme]] -- _Panoramica strumenti_
- [[Skill - UI UX Design System.md|Skill - UI UX Design System]] -- _File correlato per contenuto_
- [[Skill - OT Cybersecurity.md|Skill - OT Cybersecurity]] -- _File correlato per contenuto_
- [[Skill - Agent Orchestration.md|Skill - Agent Orchest



---


## Skill — Inizio Giornata (Daily Setup)

**Source:** wiki\skills\Skill - Inizio Giornata Daily.md


--- title: "Skill — Inizio Giornata (Daily Setup)" type: skill date: 2026-06-13 tags:


## Obiettivo

Preparare il terreno per la giornata: creare daily note, caricare priorità, verificare task pendenti, e sincronizzare con Notion se configurato.


## Procedura Mattutina


### Passo 1 — Crea Daily Note

```powershell
& tools/new-daily.ps1
```

Questo crea `wiki/daily/YYYY-MM-DD - Daily.md` con template strutturato:
- Focus del giorno
- Task da completare
- Bloccanti / decisioni
- Handoff per altri agenti


### Passo 2 — Carica Executive Digest di Ieri

Leggi il digest esecutivo del giorno precedente per continuità:

```
wiki/daily/YYYY-MM-DD - Executive Digest.md
wiki/_system/project-continuity.md
```


### Passo 3 — Verifica Priorità dal Backlog

Leggi `wiki/tasks/Continuous Improvement Backlog.md` e identifica:
- **P0** — urgenze di oggi
- **P1** — task secondari
- **Nuovi** — task emersi ieri non ancora prioritizzati


### Passo 4 — Sincronizza con Notion (se configurato)

```bash
python3 tools/notion-sync.py
```

Questo importa task e progetti da Notion in `wiki/projects/`. Vedi [[skills/Skill - Notion Integration]] per setup.


### Passo 5 — Agenda della Giornata

Crea una sezione nella daily note con:

```markdown


## Agenda


### Mattina (focus: deep work)
- [ ] Task P0: ...



---


## Skill — Inizio Sessione Agente

**Source:** wiki\skills\Skill - Inizio Sessione Agente.md


--- title: "Skill — Inizio Sessione Agente" type: skill date: 2026-06-13 tags:


## Obiettivo

Caricare il contesto minimo necessario per operare senza sprecare token, usando **delta loading** per evitare di rileggere l'intero vault a ogni sessione.


## Procedura di Avvio


### Passo 1 — Verifica stato vault

Leggi `wiki/_system/state.yaml` e controlla il campo `updated`:

- Se `updated == oggi` → **delta loading**: leggi solo `wiki/log.md` (ultime 10 righe) + `wiki/_system/project-continuity.md`
- Se `updated < ieri` → **cold start**: leggi `wiki/_system/context-pack.md` + `wiki/_system/memory-index.md` + `wiki/_system/Auto Memory Protocol.md`


### Passo 2 — Carica contesto base

Leggi sempre questi file (essenziali per ogni sessione):

```
AGENTS.md                    # Gerarchia flotta multi-agente
CLAUDE.md / KIMI.md etc.     # Istruzioni agente specifico
wiki/_system/state.yaml      # Stato vault (updated, last_reviewed)
```


### Passo 3 — Determina obiettivo sessione

Usa il template `wiki/_templates/Sessione Agente.md` per strutturare la sessione:

1. **Obiettivo**: cosa deve essere fatto
2. **Contesto caricato**: quali file sono stati letti
3. **Azioni**: cosa si intende fare


### Passo 4 — Carica progetti in continuità

Se il task riguarda un progetto esistente, leggi `wiki/_system/project-continuity.md` per lo stato aggiornato (ultimo summary, prossima azione, decisioni).


### Passo 5 — Carica file specifici

Usa la gerarchia di accesso ai file (dal meno costoso al più costoso):

1. `wiki/_system/memory-index.md` — mappa 6 livelli del vault
2. `wiki/_system/context-pack.md` — contesto compresso
3. File specifici per il task
4. `graphify-out/GRAPH_REPORT.md` — navigazione grafo conoscenza


## Integrazione con Strumenti

| Strumento | Quando usarlo |
|-----------|--------------|
| `tools/session-start.ps1` | Script automatico: restituisce lista file da caricare in base a delta/cold |
| `tools/new-daily.ps1` | Crea nota daily se non esiste per oggi |
| `wiki/_system/state.yaml` | Leggi `updated` per decidere delta vs cold start |
| `wiki/_system/project-continuity.md` | Riprendi da dove un altro agente ha lasciato |


## Script di Avvio Rapido

```powershell
# Session start con delta loading
$files = & tools/session-start.ps1
foreach ($f in $files) { Get-Content $f }

# Se nuova giornata, crea daily note
if (-not (Test-Path "wiki/daily/$(Get-Date -Format 'yyyy-MM-dd') - Agent Memory.md")) {
    & tools/new-daily.ps1
}
```



---


## Skill - Knowledge Graph Engineering

**Source:** wiki\skills\Skill - Knowledge Graph Engineering.md


--- title: "Skill - Knowledge Graph Engineering" type: skill date: 2026-05-06 tags:


## Use For

Codebase graph discovery, hidden dependency mapping, semantic links, communities, RAG structure and second-brain navigation.


## Pattern

- nodes: projects, files, concepts, decisions, agents, skills;
- edges: depends on, implements, tests, risks, replaces, explains;
- queries: impact analysis, duplicate memory, missing owner, stale decision;
- output: graph summary plus links to evidence.


## Links

- [[../rag/RAG Knowledge System]]
- [[../synthesis/Dreaming-Insights]]


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../tools/README.md|Readme]] -- _Panoramica strumenti_
- [[Skill - AI Agent Engineering.md|Skill - AI Agent Engineering]] -- _File correlato per contenuto_
- [[Skill - Security Engineering.md|Skill - Security Engineering]] -- _File correlato per contenuto_
- [[Skill - QA Test Engineering.md|Skill - QA 



---


## Skill - Long Session Coding Productivity

**Source:** wiki\skills\Skill - Long Session Coding Productivity.md


--- title: "Skill - Long Session Coding Productivity" type: skill date: 2026-05-11 tags:


## Quando usarla

Quando il lavoro dura molte ore/giorni e serve mantenere velocita senza perdere qualita.


## Output

- Piano a blocchi (90 min).
- Gate tecnici per blocco.
- Handoff compatti a fine blocco.
- Registro decisioni riusabile.


## Stack consigliato

- `uv`, `ruff`, `pre-commit`
- `pytest`, `pytest-xdist`, `pytest-cov`
- `pyright`


## Regole

- Un task alla volta, diff piccoli.
- Verifica oggettiva prima del merge.
- Salvataggio memoria a fine blocco.


## Standard

Vedi [[../synthesis/Long Session Productivity System — Coding ML DL]], [[../checklists/Quality Gate Checklist]] e [[../synthesis/Dreaming-Insights]].


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../tools/README.md|Readme]] -- _Panoramica strumenti_
- [[../sources/Web - Long Session Engineering Productivity 2026.md|Web - Long Session Engineering Productivity 2]] -- _File correlato per contenuto_
- [[../../tools/os-core/nexus-skills-bus.py|Nexus-Skills-Bus]] -- _Bus connessione skills_
- [[../.



---


## Skill - ML DL Automation Pipeline

**Source:** wiki\skills\Skill - ML DL Automation Pipeline.md


--- title: "Skill - ML DL Automation Pipeline" type: skill date: 2026-05-11 tags:


## Quando usarla

Quando serve passare da esperimenti manuali a pipeline ML/DL ripetibili e monitorabili.


## Output

- Pipeline training/inference versionata.
- Tracking esperimenti + model registry.
- Deploy strategy con rollback.
- Monitoring drift/performance.


## Stack consigliato

- Versioning: `treeverse/dvc`
- Tracking: `mlflow` (o `wandb/clearml`)
- Orchestrazione: `prefect` / `dagster` / `argo-workflows`
- Training scale: `pytorch-lightning`, `ray`, `accelerate`
- Serving: `BentoML` o `KServe`
- Feature store: `feast` (se richiesto)


## Regole

- Nessun deploy senza eval comparativa.
- Ogni run deve essere riproducibile.
- Dati, modello e config sempre versionati.


## Standard

Vedi [[../playbooks/MLOps Lifecycle]], [[../checklists/ML Model Release Checklist]], [[Skill - MLOps Production]] e [[../sources/Web - Long Session Engineering Productivity 2026]].

- [[Skill - Deep Learning Engineering|Skill - Deep Learning Engineering]]

- [[Skill - Deep Learning Engineering|Skill - Deep Learning Engineering]]

- [[Skill - Deep Learning Engineering|Skill - Deep Learning Engineering]]

- [[Skill - Deep Learning Engineering|Skill - Deep Learning Engineering]]

- [[S



---


## Skill - MLOps Production

**Source:** wiki\skills\Skill - MLOps Production.md


--- title: "Skill - MLOps Production" type: skill date: 2026-05-06 tags:


## Quando usarla

Per portare modelli ML/DL in produzione: pipeline, registry, deploy, monitoraggio, rollback e governance.


## Output

- Pipeline tracciabile.
- Model registry.
- Model card.
- Eval report.
- Monitoring plan.


## Standard

Vedi [[../playbooks/MLOps Lifecycle]], [[../sources/Web - TensorFlow TFX MLOps]] e [[../sources/Web - MLflow Model Registry]].


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../tools/README.md|Readme]] -- _Panoramica strumenti_
- [[Skill - UI UX Design System.md|Skill - UI UX Design System]] -- _File correlato per contenuto_
- [[Skill - OT Cybersecurity.md|Skill - OT Cybersecurity]] -- _File correlato per contenuto_
- [[Skill - Agent Orchestration.md|Skill - Agent Orchest



---


## Skill - Machine Learning Engineering

**Source:** wiki\skills\Skill - Machine Learning Engineering.md


--- title: "Skill - Machine Learning Engineering" type: skill date: 2026-05-06 tags:


## Quando usarla

Per dataset, feature, training, validazione, metriche, leakage, drift e modello ML classico.


## Output

- Ipotesi.
- Esperimento tracciato.
- Metriche train/validation/test.
- Rischi dati.
- Piano di deploy o rollback.


## Standard

Vedi [[../mlops/ML Experiment Protocol]], [[../playbooks/MLOps Lifecycle]] e [[../checklists/ML Model Release Checklist]].


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../tools/README.md|Readme]] -- _Panoramica strumenti_
- [[Skill - Machine Learning and Deep Learning.md|Skill - Machine Learning and Deep Learning]] -- _File correlato per contenuto_
- [[Skill - Deep Learning Engineering.md|Skill - Deep Learning Engineering]] -- _File correlato per contenuto_
- [[Skil



---


## Skill - Machine Learning and Deep Learning

**Source:** wiki\skills\Skill - Machine Learning and Deep Learning.md


--- title: "Skill - Machine Learning and Deep Learning" type: skill date: 2026-05-06 tags:


## Use For

Model design, data preparation, training, evaluation, deployment, monitoring, MLOps, feature engineering, hyperparameter search, drift, and model release.


## Professional Baseline

- define problem, metric and business value before modeling;
- version dataset, code, config and model artifact;
- split train/validation/test correctly;
- track experiments and random seeds;
- create model card and release checklist;
- monitor latency, cost, drift and quality after deployment.


## Links

- [[../playbooks/MLOps Lifecycle]]
- [[../mlops/ML Experiment Protocol]]
- [[../evals/LLM Agent Eval System]]


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../tools/README.md|Readme]] -- _Panoramica strumenti_
- [[Skill - Machine Learning Engineering.md|Skill - Machine Learning Engineering]] -- _File correlato per contenuto_
- [[Skill - Deep Learning Engineering.md|Skill - Deep Learning Engineering]] -- _File correlato per contenuto_
- [[../../tools/os-c



---


## Skill — Notion Integration & Team Sync

**Source:** wiki\skills\Skill - Notion Integration.md


--- title: "Skill — Notion Integration & Team Sync" type: skill date: 2026-06-13 tags:


## Architettura

```
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│    NOTION        │       │    OBSIDIAN       │       │    AGENTI AI      │
│  (Cloud/Team)    │◄─────►│  (Local Truth)    │◄─────►│  (Claude/Codex)   │
│                  │       │                   │       │                   │
│ - Task/Kanban    │       │ - Wiki Second     │       │ - RAG locale      │
│ - Team Docs      │       │   Brain           │       │ - Sessioni        │
│ - Calendar       


## Setup Notion API


### 1. Crea Internal Integration

1. Vai su [https://www.notion.so/profile/integrations](https://www.notion.so/profile/integrations)
2. Clicca "New Integration"
3. Nome: `Nexus Omega Sync`
4. Seleziona capacità: `Read content`, `Update content`, `Insert content`
5. Ottieni il **Internal Integration Token** (secret `ntn_...`)


### 2. Connetti ai Database

Per ogni database Notion che vuoi sincronizzare:
1. Apri il database in Notion
2. Clicca `···` → `Add connections`
3. Seleziona `Nexus Omega Sync`


### 3. Installa Python SDK

```bash
pip install notion-client
```


## Tool di Sync


### Script Base (`tools/notion-sync.py`)

```python
#!/usr/bin/env python3
"""
Notion → Obsidian Sync
Importa task e progetti da Notion in wiki/projects/.
"""
import os, sys, json, datetime
from pathlib import Path
from notion_client import Client

NOTION_TOKEN = os.environ.get("NOTION_TOKEN", "")
DATABASES = {
    "projects": "your-projects-db-id",
    "tasks": "your-tasks-db-id",
}

def sync_database(notion, db_id, target_dir):
    """Sync a Notion database to markdown files."""
    results = 


## Status
- **Status:** {status}


## Next Action
TODO: review and update
"""
        safe_name = title.replace(" ", "_").replace("/", "-")
        path = Path(target_dir) / f"{safe_name}.md"
        path.write_text(md, encoding="utf-8")
        print(f"  Synced: {path.name}")

def main():
    if not NOTION_TOKEN:
        print("ERROR: Set NOTION_TOKEN environment variable")
        print("  export NOTION_TOKEN='ntn_...'")
        sys.exit(1)
    
    notion = Client(auth=NOTION_TOKEN)
    vault = Path("C:/Users/TAREK/Desktop/AGE



---


## Skill - OT Cybersecurity

**Source:** wiki\skills\Skill - OT Cybersecurity.md


--- title: "Skill - OT Cybersecurity" type: skill date: 2026-05-06 tags:


## Use For

Industrial security, ICS/SCADA, IEC 62443, NIST CSF, zones/conduits, incident response, asset inventory, vulnerability management and safety-aware segmentation.


## Rules

- never treat OT like normal IT without safety analysis;
- map assets, networks, protocols and zones first;
- separate monitoring from control actions;
- plan rollback and maintenance windows;
- document safety impact and business continuity.


## Links

- [[../playbooks/Secure SDLC]]
- [[../security/Threat Model System]]
- [[../checklists/Security Release Checklist]]


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../tools/README.md|Readme]] -- _Panoramica strumenti_
- [[Skill - UI UX Design System.md|Skill - UI UX Design System]] -- _File correlato per contenuto_
- [[Skill - Agent Orchestration.md|Skill - Agent Orchestration]] -- _File correlato per contenuto_
- [[Skill - AI Agent Engineering.md|Skill - AI Age



---


## Skill - PLC Programming

**Source:** wiki\skills\Skill - PLC Programming.md


--- title: "Skill - PLC Programming" type: skill date: 2026-05-06 tags:


## Use For

Siemens, Rockwell, Schneider, Omron, Beckhoff, IEC 61131-3, ladder logic, structured text, safety PLC, OPC UA, MQTT, HMI/SCADA and motion control.


## Checklist

- define I/O map and naming convention;
- separate safety logic from standard control;
- simulate before commissioning;
- document alarms and interlocks;
- version PLC code and HMI configuration;
- create rollback plan before plant changes.


## Vedi anche

- [[../concepts/Level_11_Industrial_Singularity]] — Industrializzazione e automazione
- [[Skill - Industrial Robotics]] — Robotica industriale
- [[Skill - Technical Drawing Automation]] — Automazione disegno


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../tools/README.md|Readme]] -- _Panoramica strumenti_
- [[Skill - UI UX Design System.md|Skill - UI UX Design System]] -- _File correlato per contenuto_
- [[Skill - OT Cybersecurity.md|Skill - OT Cybersecurity]] -- _File correlato per contenuto_
- [[Skill - Agent Orchestration.md|Skill - Agent Orchest



---


## Skill - Product Business Profitability

**Source:** wiki\skills\Skill - Product Business Profitability.md


--- title: "Skill - Product Business Profitability" type: skill date: 2026-05-06 tags:


## Quando usarla

Per decidere priorita', prezzi, ROI, margine, automazioni redditizie e roadmap.


## Output

- Problema cliente.
- Valore economico.
- Ipotesi misurabile.
- Costo stimato.
- Metrica di successo.


## Regola

Un task AI non e' produttivo perche' usa un modello potente. E' produttivo quando riduce costo, tempo, rischio o aumenta ricavi verificabili.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../tools/README.md|Readme]] -- _Panoramica strumenti_
- [[../../tools/os-core/nexus-skills-bus.py|Nexus-Skills-Bus]] -- _Bus connessione skills_



---


## Skill - Programmazione Professionale

**Source:** wiki\skills\Skill - Programmazione Professionale.md


--- title: "Skill - Programmazione Professionale" type: skill date: 2026-05-06 tags:


## Quando usarla

Quando serve scrivere codice mantenibile, testabile e coerente con il progetto.


## Regole

- Leggi prima il codice esistente.
- Mantieni scope stretto.
- Preferisci pattern locali.
- Verifica con test o controllo equivalente.
- Documenta solo cio' che serve a mantenere il sistema.


## Output

Patch piccola, motivazione chiara, test, rischi.


## Checklist

Vedi [[../checklists/Quality Gate Checklist]] e [[../checklists/Definition of Done]].


## Vedi anche

- [[../playbooks/Code Review Professionale]] — Playbook code review
- [[../playbooks/SDLC Professionale]] — Ciclo di vita software
- [[../checklists/Repo Health Checklist]] — Salute repository



---


## Skill - QA Test Engineering

**Source:** wiki\skills\Skill - QA Test Engineering.md


--- title: "Skill - QA Test Engineering" type: skill date: 2026-05-06 tags:


## Quando usarla

Per definire strategia test, regression, test end-to-end, test di integrazione e quality gate.


## Output

- Test plan.
- Rischi coperti e non coperti.
- Comandi di verifica.
- Evidenze.


## Standard

Vedi [[../checklists/Quality Gate Checklist]], [[../checklists/Definition of Done]] e [[../checklists/Production Readiness Checklist]].


## Vedi anche

- [[../playbooks/SDLC Professionale]] — Ciclo di vita software
- [[../playbooks/Code Review Professionale]] — Playbook code review
- [[../playbooks/CI CD Automation]] — Automazione CI/CD



---


## Skill - SLO Error Budget Engineering

**Source:** wiki\skills\Skill - SLO Error Budget Engineering.md


--- title: "Skill - SLO Error Budget Engineering" type: skill date: 2026-05-12 tags:


## Quando usarla

Per sistemi in produzione dove affidabilita e performance influenzano direttamente costi e produttivita.


## Output

- SLO/SLI definiti e tracciati.
- Error budget policy per decisioni di release.
- Piano chaos+load test con criterio pass/fail.
- Task prioritizzati per ridurre burn rate.


## Toolchain

- `grafana/k6`
- `chaos-mesh/chaos-mesh`
- Observability stack
- `continuous-improvement-backlog.ps1`


## Standard

Vedi [[../playbooks/SLO Error Budget Management]], [[../playbooks/Chaos and Load Testing Strategy]], [[../checklists/SLO Error Budget Checklist]] e [[../checklists/Chaos Resilience Checklist]].


## Vedi anche

- [[../concepts/Self-Evolving Systems (Level 10)]] — Il livello sovereign che utilizza SLO per auto-evoluzione
- [[../synthesis/Engineering Excellence Control Tower]] — Control tower ingegneristica



---


## Skill - SRE Observability

**Source:** wiki\skills\Skill - SRE Observability.md


--- title: "Skill - SRE Observability" type: skill date: 2026-05-06 tags:


## Quando usarla

Per sistemi in produzione, incidenti, metriche, tracing, alerting, affidabilita' e performance.


## Output

- SLO o obiettivo operativo.
- Metriche e segnali.
- Runbook.
- Postmortem se c'e' incidente.


## Standard

Vedi [[../playbooks/SRE Observability]], [[../playbooks/Incident Response Postmortem]] e [[../sources/Web - OpenTelemetry]].


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../tools/README.md|Readme]] -- _Panoramica strumenti_
- [[Skill - UI UX Design System.md|Skill - UI UX Design System]] -- _File correlato per contenuto_
- [[Skill - OT Cybersecurity.md|Skill - OT Cybersecurity]] -- _File correlato per contenuto_
- [[Skill - Agent Orchestration.md|Skill - Agent Orchest



---


## Skill - Security Engineering

**Source:** wiki\skills\Skill - Security Engineering.md


--- title: "Skill - Security Engineering" type: skill date: 2026-05-06 tags:


## Quando usarla

Per autenticazione, autorizzazione, segreti, supply chain, input non fidato, API pubbliche, dati sensibili e release.


## Output

- Threat model leggero.
- Controlli OWASP/NIST rilevanti.
- Fix o checklist.
- Rischi residui.


## Standard

Vedi [[../playbooks/Secure SDLC]], [[../checklists/Security Release Checklist]], [[../sources/Web - NIST SSDF]] e [[../sources/Web - OWASP ASVS]].



---


## Skill - Software Engineering Professionale

**Source:** wiki\skills\Skill - Software Engineering Professionale.md


--- title: "Skill - Software Engineering Professionale" type: skill date: 2026-05-06 tags:


## Quando usarla

Per progettare o modificare sistemi applicativi con requisiti, moduli, test, review e rilascio.


## Input minimo

- Obiettivo utente.
- Repo o area di codice.
- Vincoli tecnici.
- Definizione di successo.


## Output atteso

- Piano breve.
- Patch o specifica.
- Test eseguiti.
- Rischi residui.
- Handoff nel vault se utile.


## Qualita'

Usa [[../playbooks/SDLC Professionale]], [[../checklists/Quality Gate Checklist]] e [[../playbooks/Code Review Professionale]].


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../tools/README.md|Readme]] -- _Panoramica strumenti_
- [[Skill - AI Agent Engineering.md|Skill - AI Agent Engineering]] -- _File correlato per contenuto_
- [[Skill - Security Engineering.md|Skill - Security Engineering]] -- _File correlato per contenuto_
- [[Skill - QA Test Engineering.md|Skill - QA 



---


## Skill - Technical Drawing Automation

**Source:** wiki\skills\Skill - Technical Drawing Automation.md


--- title: "Skill - Technical Drawing Automation" type: skill date: 2026-05-06 tags:


## Use For

CAD, 2D/3D drawings, robot cell layouts, schematics, BOM, GD&T, MBD/PMI, ISO/ASME standards, STEP/DXF/DWG/PDF outputs, simulation-ready geometry and design for manufacturing.


## Checklist

- define drawing purpose and standard;
- include title block, revision and scale;
- use consistent layers and part names;
- validate tolerances and safety dimensions;
- export native and neutral formats;
- connect BOM to drawing balloons and release notes.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../tools/README.md|Readme]] -- _Panoramica strumenti_
- [[Skill - ML DL Automation Pipeline.md|Skill - ML DL Automation Pipeline]] -- _File correlato per contenuto_
- [[Skill - Automation DevOps.md|Skill - Automation DevOps]] -- _File correlato per contenuto_
- [[../playbooks/CI CD Automation.md|CI CD



---


## Skill - Token Economy Engineering

**Source:** wiki\skills\Skill - Token Economy Engineering.md


--- title: "Skill - Token Economy Engineering" type: skill date: 2026-05-11 tags:


## Quando usarla

Quando serve aumentare il valore per token nelle sessioni lunghe senza sacrificare qualita.


## Output

- Policy token/risk aggiornata da dati reali.
- Routing con bonus efficienza.
- Context capsule minima per task.
- Report di ottimizzazione auditabile.


## Stack

- `token-economy-autotune.ps1`
- `context-capsule.ps1`
- `model-router.ps1`
- `eval-harness.ps1`
- `prompt-regression.ps1`
- `memory-quality-gate.ps1`


## Regole

- Ogni decisione routing deve avere metrica associata.
- Niente contesto esteso se la capsule e' entro budget.
- Prima quality, poi cost optimization.


## Standard

Vedi [[../synthesis/Dreaming-Insights]], [[../synthesis/Dreaming-Insights]] e [[../synthesis/Dreaming-Insights]].


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../tools/README.md|Readme]] -- _Panoramica strumenti_
- [[Skill - AI Agent Engineering.md|Skill - AI Agent Engineering]] -- _File correlato per contenuto_
- [[Skill - Security Engineering.md|Skill - Security Engineering]] -- _File correlato per contenuto_
- [[Skill - QA Test Engineering.md|Skill - QA 



---


## Skill - UI UX Design System

**Source:** wiki\skills\Skill - UI UX Design System.md


--- title: "Skill - UI UX Design System" type: skill date: 2026-05-06 tags:


## Use For

Design tokens, components, accessibility, responsive behavior, dashboard ergonomics, dark mode, loading/error states and production-grade frontend UX.


## Checklist

- define tokens for color, spacing, typography and states;
- build reusable components with clear variants;
- verify keyboard focus and contrast;
- test mobile and desktop layouts;
- avoid decorative clutter in work tools;
- screenshot key views before delivery.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../tools/README.md|Readme]] -- _Panoramica strumenti_
- [[Skill_-_3D_Web_Design_Spline.md|Skill_-_3D_Web_Design_Spline]] -- _File correlato per contenuto_
- [[Skill - OT Cybersecurity.md|Skill - OT Cybersecurity]] -- _File correlato per contenuto_
- [[Skill - Agent Orchestration.md|Skill - Agent Orche



---


## Skill - Workflow Engine

**Source:** wiki\skills\Skill - Workflow Engine.md


--- title: "Skill - Workflow Engine" type: skill date: 2026-05-06 tags:


## Use For

Deterministic workflows, triggers, typed steps, retries, branching, timeouts, human approval, logging and dead-letter handling.


## Baseline

- every workflow has trigger, inputs, steps, outputs and owner;
- steps are idempotent where possible;
- retry max 3 with backoff;
- timeout per step;
- failures go to a clear manual recovery path;
- logs include input, output, duration and error.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../tools/README.md|Readme]] -- _Panoramica strumenti_
- [[Skill - UI UX Design System.md|Skill - UI UX Design System]] -- _File correlato per contenuto_
- [[Skill - OT Cybersecurity.md|Skill - OT Cybersecurity]] -- _File correlato per contenuto_
- [[Skill - Agent Orchestration.md|Skill - Agent Orchest



---


## Skill Matrix Software House

**Source:** wiki\skills\Skill Matrix Software House.md


--- title: "Skill Matrix Software House" type: synthesis date: 2026-05-06 tags:


## Regola

Ogni task deve scegliere una skill primaria e una checklist di uscita. Se il task usa piu' skill, crea un handoff compatto.

- [[Skill_Matrix_Software_House|Skill Matrix Software House]]

- [[Skill_Matrix_Software_House|Skill Matrix Software House]]

- [[Skill_Matrix_Software_House|Skill Matrix Software House]]

- [[Skill_Matrix_Software_House|Skill Matrix Software House]]

- [[Skill_Matrix_Software_House|Skill Matrix Software House]]

- [[Skill_Matrix_Software_House|Skill Matrix Soft



---


## Skill: 3D Web Design & Spline

**Source:** wiki\skills\Skill_-_3D_Web_Design_Spline.md


--- title: "Skill - 3D Web Design Spline" type: skill-note date: 2026-05-11 tags:


## Obiettivo della Skill

Capacità di progettare, sviluppare e integrare esperienze 3D interattive nel web usando Spline, Three.js/React Three Fiber, e strumenti di generazione AI 3D. Include sia il design no-code sia la programmazione avanzata di scene 3D.

---


## Stack di Riferimento

```
Layer 1 (No-code/Low-code): Spline.design
Layer 2 (React integration): @splinetool/react-spline, React Three Fiber
Layer 3 (Full control): Three.js + Drei + Theatre.js
Layer 4 (AI generation): Shap-E, Meshy API, Tripo3D
Layer 5 (Asset pipeline): Blender → GLTF → Web
```

---


## Competenze Fondamentali


### A. Spline.design
- Creare scene 3D nel browser
- Modellazione parametrica e sculpting base
- Animazioni con state machine (hover, click, scroll)
- Fisica e particle systems
- Export GLTF/USDZ e embed su web
- Usare AI Generate per generare oggetti da testo
- Runtime API per controllo programmatico


### B. Three.js / React Three Fiber
- Setup canvas 3D in React/Next.js
- Geometrie, materiali, luci, ombre
- Camera controls (OrbitControls, FirstPersonControls)
- Animazione con `useFrame`, `useSpring`
- Loading assets GLTF con `useGLTF`
- Post-processing (bloom, depth of field, glitch)
- Performance: instancing, LOD, frustum culling


### C. Animazione Web
- GSAP + ScrollTrigger per scroll-driven animations
- Framer Motion per transizioni React
- Theatre.js per animazioni cinematografiche codice+GUI
- Lottie per micro-animazioni After Effects
- Rive per animazioni interattive 2D


### D. AI 3D Generation
- Shap-E: text/image → 3D mesh (OpenAI, open source)
- Meshy API: text-to-3D SaaS per pipeline production
- Pipeline completa: prompt → mesh → refine → deploy

---


## Comandi Rapidi per Agent


### Setup progetto 3D web
```bash
# React Three Fiber full stack
npm install three @react-three/fiber @react-three/drei
npm install @react-three/postprocessing
npm install gsap

# Spline integration
npm install @splinetool/react-spline

# Animation
npm install framer-motion
npm install @theatre/core @theatre/studio
```



---


## 3D Web Design & Spline (aggiunto 2026-05-11)

**Source:** wiki\skills\Skill_Matrix_Software_House.md


--- title: "Skill Matrix Software House" type: skill-matrix date: 2026-05-11 tags:


## 3D Web Design & Spline (aggiunto 2026-05-11)

| Skill | Livello | Tools | Agent preferito |
|-------|---------|-------|----------------|
| Spline.design | Intermedio | spline.design, @splinetool/react-spline | Claude, Codex |
| React Three Fiber | Avanzato | three, @react-three/fiber, @react-three/drei | Codex |
| Three.js | Avanzato | three.js, WebGL, GLTF | Codex |
| GSAP / ScrollTrigger | Intermedio | gsap, ScrollTrigger | Claude, Codex |
| Theatre.js | Intermedio | @theatre/core, @theatre


## Long Session Productivity (aggiunto 2026-05-11)

| Skill | Livello | Tools | Agent preferito |
|-------|---------|-------|----------------|
| Long Session Coding Productivity | Avanzato | uv, ruff, pre-commit, pytest, pyright | Copilot, Codex |
| AI Code Quality Gate | Avanzato | semgrep, trivy, pytest-cov, renovate | Copilot, Claude |
| ML DL Automation Pipeline | Avanzato | mlflow, dvc, prefect, bentoml, kserve | Claude, Copilot, Kimi |
| Token Economy Engineering | Avanzato | token-economy


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../tools/README.md|Readme]] -- _Panoramica strumenti_
- [[Skill Matrix Software House.md|Skill Matrix Software House]] -- _File correlato per contenuto_
- [[../software-house/Software House OS.md|Software House OS]] -- _File correlato per contenuto_
- [[../metrics/Metriche Software House.md|Metriche S



---


## Supertonic TTS Integration

**Source:** wiki\skills\Supertonic TTS.md


--- title: "Supertonic TTS Integration" type: skill date: 2026-05-06 tags:


## Overview
Supertonic è un sistema **Text-To-Speech (TTS)** locale, multilingua e ultra-veloce. Permette a Nexus Omega di generare voce umana di alta qualità (44.1kHz) senza dipendenze cloud.


## Key Features
- **31 Lingue**: Supporto completo per l'italiano (`it`).
- **Privacy Core**: Esecuzione on-device tramite ONNX Runtime.
- **Tag Espressivi**: Permette di inserire pause, respiri o risate nel testo (es. `Ciao! <laugh> Come va?`).
- **Leggero**: Modello da 99M parametri (~400MB di asset).


## Skill: `tts`
La skill è stata integrata nativamente nel sistema.


### Usage
```powershell
& "C:\Users\TAREK\Desktop\AGENTE WIKI\WIKI AGENTI\tools\external\supertonic\.venv\Scripts\python.exe" "C:\Users\TAREK\Desktop\AGENTE WIKI\WIKI AGENTI\agent-skills\tts\tts_wrapper.py" "Testo" "percorso/file.wav" "it" "F1"
```


## Integrazione nel Second Brain
- [x] Repository clonata e isolata.
- [x] Virtual environment configurato.
- [x] Asset del modello scaricati localmente.
- [x] Skill `tts` registrata e testata.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../tools/README.md|Readme]] -- _Panoramica strumenti_


- [[Supervision CV Toolkit|Supervision CV Toolkit Integration]]

- [[Supervision CV Toolkit|Supervision CV Toolkit Integration]]

- [[Supervision CV Toolkit|Supervision CV Toolkit Integration]]



---


## Supervision CV Toolkit Integration

**Source:** wiki\skills\Supervision CV Toolkit.md


--- title: "Supervision CV Toolkit Integration" type: skill date: 2026-05-06 tags:


## Overview
Supervision è un toolkit svizzero per la **Computer Vision (CV)**. Fornisce blocchi modulari per gestire l'analisi visiva, rendendo Nexus Omega capace di processare immagini e video con la stessa precisione con cui gestisce il testo e l'audio.


## Key Features
- **Model Agnostic**: Funziona con YOLO, SAM, CLIP e modelli custom.
- **Annotators**: Visualizzazione avanzata di detection, maschere e zone.
- **Video Processing**: Estrazione frame, tracciamento e ri-encoding.
- **Analytics**: Conteggio oggetti, analisi di flussi e zone di interesse.


## Skill: `vision-utility`
La skill è stata integrata per fornire un'interfaccia semplice alle potenti funzioni di Supervision.


### Usage
```powershell
& "interpreter_path" "vision_tool.py" "info" "percorso/immagine.jpg"
```


## Integrazione nel Second Brain
- [x] Repository clonata e indicizzata.
- [x] Virtual environment configurato con OpenCV e Supervision.
- [x] Skill `vision-utility` registrata.
- [x] Pattern di analisi visiva mappati per l'uso da parte dei sub-agenti.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../tools/README.md|Readme]] -- _Panoramica strumenti_


- [[Supertonic TTS|Supertonic TTS Integration]]

- [[Supertonic TTS|Supertonic TTS Integration]]

- [[Supertonic TTS|Supertonic TTS Integration]]



---


## Skills

**Source:** wiki\skills\_index.md


--- title: "Skills" tags: [skills, capabilities, tools] type: index date: 2026-06-14



---


## Text-to-CAD Skills Library

**Source:** wiki\skills\text-to-cad.md


--- title: "Text-to-CAD Skills Library" type: skill-note date: 2026-06-10 tags:


## Overview

CAD Skills provides focused workflows for CAD, fabrication, robot description files, simulation, and local review.

The baseline remains **STEP-first**: generate parametric source, export neutral CAD artifacts, inspect geometry, snapshot visually, then hand off to CAD Viewer. Adam Fusion research adds a new target direction: a **native CAD harness** that can operate inside professional CAD environments while preserving the local validation discipline of this system.


## Skills Included

- **CAD**: Creates and edits CAD models (STEP, STL, 3MF, GLB).
- **CAD Viewer**: Browser previews for CAD, G-code, and robot files.
- **step.parts**: Off-the-shelf STEP parts search.
- **URDF**: Robot structure files.
- **SRDF**: MoveIt planning groups.
- **SDF**: Simulator models and worlds.
- **SendCutSend**: Fabrication checks.
- **G-code**: Slicing mesh files.
- **Bambu Labs**: Print job management.
- **Implicit CAD**: Browser-native implicit CAD models.


## Location

Repository cloned at: `C:\Users\TAREK\Desktop\AGENTE WIKI\WIKI AGENTI\tools\external\text-to-cad`


## Environment Configuration

- **Virtual Environment**: `C:\Users\TAREK\Desktop\AGENTE WIKI\WIKI AGENTI\tools\external\text-to-cad\.venv`
- **Interpreter**: `C:\Users\TAREK\Desktop\AGENTE WIKI\WIKI AGENTI\tools\external\text-to-cad\.venv\Scripts\python.exe`

To run CAD tools, use the interpreter above:

```powershell
& "C:\Users\TAREK\Desktop\AGENTE WIKI\WIKI AGENTI\tools\external\text-to-cad\.venv\Scripts\python.exe" scripts/step --help
```


## Operating Baseline

Use this order unless a task explicitly requires another path:

1. Convert the user's natural-language request into a compact CAD brief.
2. Generate or edit source, not only derived geometry.
3. Prefer build123d/OCP B-rep output and STEP as the primary artifact.
4. Use selector refs, tokenized geometry references, or named datums for targeted edits.
5. Run inspect/facts/planes/positioning checks.
6. Generate visual snapshots and CAD Viewer links for human review.
7. Record


## Adam-Inspired Native CAD Harness

Research note: [[../synthesis/Text-to-CAD Adam Fusion Upgrade Blueprint]]

Decision: [[../decisions/Text-to-CAD Native CAD Harness Decision 2026-06-10]]

Backlog: [[../tasks/Text-to-CAD Adam Fusion Backlog]]

Best ideas to absorb:

- **In-CAD context bridge**: a palette/chat panel inside Fusion, Onshape, or another CAD host, connected to local API tools.
- **Structured tool calls**: split operations into `read`, `create`, `update`, `delete`, `execute`, `docum


## Native Harness Target Architecture

```text
User prompt / CAD selection
  -> Intent parser and CAD brief
  -> Tool planner
  -> Local CAD adapter
       read: geometry, parameters, timeline, selection
       create: sketches, extrudes, holes, patterns, fillets
       update: parameters, feature edits, naming, materials
       delete: scoped feature removal only
       document: open/save/copy/branch/export
       execute: sandboxed scripts only after approval
  -> Validation gate
       inspe


## Integration Status

- [x] Cloned
- [x] Requirements Installed
- [x] Registered in Agent Skills
- [x] Indexed in Wiki
- [x] Adam Fusion research captured
- [x] Native CAD harness direction added
- [ ] Implement local CAD adapter prototype
- [ ] Add guarded tool-call schema
- [ ] Add sample feature-tree cleanup workflow
- [ ] Add security review before any remote model integration


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../../tools/README.md|Readme]] -- _Panoramica strumenti_


- [[_index|Skills]]



---


## AI Product Factory

**Source:** wiki\software-house\AI Product Factory.md


--- title: "AI Product Factory" type: playbook date: 2026-05-06 tags:


## Pipeline

1. Problema reale.
2. Cliente e valore economico.
3. MVP verificabile.
4. PRD.
5. Technical spec.
6. Eval o test plan.
7. Implementazione.
8. Demo.
9. Produzione.
10. Misura ROI.


## Gate

Un prodotto AI procede solo se esistono: metrica di valore, rischio dichiarato, costo stimato, criterio di successo e piano di verifica.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../prompts/Prompt - Product Strategist.md|Prompt - Product Strategist]] -- _File correlato per contenuto_



---


## Cost Token Profitability System

**Source:** wiki\software-house\Cost Token Profitability System.md


--- title: "Cost Token Profitability System" type: synthesis date: 2026-05-06 tags:


## Scopo

Rendere gli agenti piu' redditizi: meno contesto ripetuto, piu' riuso, piu' output verificabile.


## Strategie

- Salvare conoscenza stabile nel vault, non in chat.
- Usare [[../synthesis/Dreaming-Insights]] per handoff e sessioni lunghe.
- Separare istruzioni statiche da variabili dinamiche nei prompt.
- Creare eval prima di scalare agenti su task costosi.
- Preferire checklist e template a spiegazioni ripetute.
- Fare routing del lavoro con [[../synthesis/Dreaming-Insights]].


## Prompt caching

Per modelli che supportano cache, mantenere stabile il blocco iniziale: regole, ruolo, schema output. Mettere input variabili dopo. Vedi [[../sources/Web - OpenAI Evals Caching]].


## KPI

- Token per ticket completato.
- Costo API per release.
- Numero di decisioni salvate nel vault.
- Numero di bug prevenuti da checklist/eval.
- Tempo risparmiato da automazioni.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../finops/FinOps AI Cost System.md|FinOps AI Cost System]] -- _File correlato per contenuto_
- [[../dashboards/Cost Dashboard.md|Cost Dashboard]] -- _File correlato per contenuto_
- [[../_templates/Cost Review.md|Cost Review]] -- _File correlato per contenuto_
- [[../_system/Budget Token.md|Budget Token]



---


## Enterprise Risk Register

**Source:** wiki\software-house\Enterprise Risk Register.md


--- title: "Enterprise Risk Register" type: register date: 2026-05-06 tags:


## Uso

Aggiorna questo registro quando nasce un rischio che puo' bloccare produzione, profitto, sicurezza o affidabilita'.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[../projects/CFDML ENTERPRISE.md|CFDML ENTERPRISE]] -- _File correlato per contenuto_



---


## MAX Command Center

**Source:** wiki\software-house\MAX Command Center.md


--- title: "MAX Command Center" type: operations date: 2026-05-06 tags:


## Sequenza massima

1. [[../dashboards/Executive Dashboard]]
2. [[Software House OS]]
3. [[../synthesis/Dreaming-Insights]]
4. [[../skills/Skill Matrix Software House]]
5. [[../synthesis/Dreaming-Insights]]
6. [[Cost Token Profitability System]]
7. [[AI Product Factory]]
8. [[../automation/Maximum Automation Layer]]


## Reparti

- Prodotto: [[AI Product Factory]], [[../playbooks/Project Kickoff Professionale]]
- Engineering: [[../playbooks/SDLC Professionale]], [[../playbooks/Architecture Design]], [[../playbooks/Code Review Professionale]]
- Platform: [[../platform/Platform Engineering System]], [[../architecture/Cloud Native Baseline]], [[../kubernetes/Kubernetes Production Baseline]]
- Security: [[../playbooks/Secure SDLC]], [[../security/Supply Chain Security System]], [[../security/Threat Model System]]


## Regola

Massimo non significa caricare tutto. Massimo significa routing giusto, contesto minimo, verifiche forti e memoria persistente.


## DevForge Import Layer

Imported patterns:

- [[../synthesis/DevForge Patterns for Second Brain]]
- [[../agents/DevForge Agent Memory Router]]
- [[../skills/DevForge Skill Library]]
- [[../agents/Autonomous Query Engine Pattern]]
- [[../agents/Token Budget Tracker Pattern]]
- [[../automation/Checkpoint Resume Pattern]]

Use this layer when the task involves agents, memory, automation, ML/DL, token cost or long-running projects.


- [[_index|Software-house]]

- [[_index|Software-house]]

- [[_i



---


## Operating Model Software House

**Source:** wiki\software-house\Operating Model Software House.md


--- title: "Operating Model Software House" type: synthesis date: 2026-05-06 tags:


## Modello

Ogni progetto serio passa da quattro livelli:

1. Product: problema, cliente, valore, metrica economica.
2. Engineering: architettura, codice, test, review, documentazione.
3. Operations: CI/CD, sicurezza, osservabilita', incidenti, costi.
4. Intelligence: agenti, ML/DL, eval, dataset, feedback loop.


## Ciclo base

PRD -> Technical Spec -> ADR -> Implementation Plan -> Tests -> Review -> Release -> Observability -> Retrospective.


## Regola economica

Ogni automazione deve ridurre almeno uno tra: tempo umano, errori, token, tempo di onboarding, tempo di rilascio o costo cloud/API.


## Regola di scala

Un progetto e' pronto per crescere quando un nuovo agente o sviluppatore puo' leggere [[../synthesis/Dreaming-Insights]], [[../_templates/Technical Spec]] e [[../_templates/Project Handoff]] senza ricostruire tutto dalla chat.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_
- [[Software House OS.md|Software House OS]] -- _File correlato per contenuto_
- [[../metrics/Metriche Software House.md|Metriche Software House]] -- _File correlato per contenuto_
- [[../agents/Multi-Agent Operating Model.md|Multi-Agent Operating Model]] -- _File correlato per contenuto_
- [[../sources/Font



---


## Software House OS

**Source:** wiki\software-house\Software House OS.md


--- title: "Software House OS" type: map date: 2026-05-06 tags:


## Obiettivo

Trasformare il vault in una base operativa: meno token in chat, piu' decisioni persistenti, piu' automazione, qualita' misurabile e rilascio affidabile.


## Start rapido

- [[../skills/Skill Matrix Software House]]
- [[../synthesis/Dreaming-Insights]]
- [[Operating Model Software House]]
- [[../metrics/Metriche Software House]]
- [[../synthesis/Dreaming-Insights]]
- [[Cost Token Profitability System]]


## Playbook principali

- [[../playbooks/Project Kickoff Professionale]]
- [[../playbooks/SDLC Professionale]]
- [[../playbooks/Architecture Design]]
- [[../playbooks/Code Review Professionale]]
- [[../playbooks/CI CD Automation]]
- [[../playbooks/Secure SDLC]]
- [[../playbooks/SRE Observability]]
- [[../playbooks/MLOps Lifecycle]]
- [[../playbooks/Agentic Workflow]]
- [[../playbooks/Production Readiness]]
- [[../playbooks/Incident Response Postmortem]]


## Checkpoint

Prima di iniziare un progetto: [[../checklists/Project Kickoff Checklist]].

Prima di mergiare: [[../checklists/Quality Gate Checklist]].

Prima di rilasciare: [[../checklists/Production Readiness Checklist]], [[../checklists/Security Release Checklist]] e, per AI, [[../checklists/Agent Release Checklist]] o [[../checklists/ML Model Release Checklist]].


## Fonti

Le fonti web sintetizzate sono in [[../sources/Fonti Web Software House OS]].



---


## Spec Kit Software Creation Protocol

**Source:** wiki\software-house\Spec Kit Software Creation Protocol.md


--- title: "Spec Kit Software Creation Protocol" type: protocol date: 2026-05-21 tags:


## Decisione

GitHub Spec Kit e' il flusso predefinito per creare software, prodotti, feature importanti, automazioni e progetti nuovi con Codex.

CLI installata: `specify 0.8.12`, installata da `github/spec-kit` release `v0.8.12`.


## Bootstrap

Usa lo script stabile:

```powershell
& "C:\Users\TAREK\Desktop\AGENTE WIKI\WIKI AGENTI\tools\new-speckit-project.ps1" -ProjectName "nome-progetto"
```

Per inizializzare la cartella corrente solo dopo aver ispezionato il contenuto:

```powershell
& "C:\Users\TAREK\Desktop\AGENTE WIKI\WIKI AGENTI\tools\new-speckit-project.ps1" -Here -ForceMerge
```

Lo script imposta `PYTHONUTF8=1`, `PYTHONIOENCODING=utf-8` e `NO_COLOR=1` per evitare errori Unicode/Rich in terminali Windows rediret


## Flusso Codex

Dopo `specify init`, avvia Codex nella root del progetto. Spec Kit installa le skill in `.agents/skills`.

Ordine standard:

1. `$speckit-constitution` — principi e vincoli del progetto.
2. `$speckit-specify` — specifica baseline.
3. `$speckit-clarify` — solo se i requisiti sono ambigui.
4. `$speckit-plan` — piano tecnico.
5. `$speckit-tasks` — task implementabili.
6. `$speckit-analyze` — controllo coerenza prima del codice.
7. `$speckit-implement` — implementazione.


## Regole operative

- Usa Spec Kit per progetti nuovi e feature non banali.
- Per bugfix piccoli o review-only, non forzare Spec Kit: lavora nel flusso repo esistente.
- Per repo esistenti, ispeziona prima struttura, test, stack e convenzioni. Usa `-Here -ForceMerge` solo quando ha senso integrare `.specify` e `.agents/skills`.
- Mantieni i quality gate del vault: test locali, review rischi, memoria in `wiki/log.md` e note rilevanti.


## Verifica 2026-05-21

Smoke test riuscito in:

`C:\Users\TAREK\Documents\Codex\2026-05-21\installa-configura-e-usa-sempre-questo\spec-kit-codex-smoke`

Output chiave:

- `specify 0.8.12`
- integrazione `codex`
- script type `ps`
- skills installate in `.agents/skills`
- workflow `speckit` installato

Skill generate:

`speckit-constitution`, `speckit-specify`, `speckit-plan`, `speckit-tasks`, `speckit-implement`, `speckit-clarify`, `speckit-analyze`, `speckit-checklist`, piu' skill git.


## Collegamenti Correlati
- [[../index.md|Wiki Index]] -- _Indice principale del vault_
- [[../Nexus_Omega_Master_Architecture|Nexus Omega Architecture]] -- _Architettura master Nexus Omega_



---


## Software-house

**Source:** wiki\software-house\_index.md


--- title: "Software-house" tags: [software-house, business, operations] type: index date: 2026-06-13



---

