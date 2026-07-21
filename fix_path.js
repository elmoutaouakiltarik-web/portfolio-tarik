const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Fix the first timeline item with enhanced content
const oldPathItem = `<div class="tl-item reveal card-animate">
              <div class="tl-date">Gen 2024 — Presente</div>
              <h4>Industrial AI Architect · Digital Twin Lead</h4>
              <div class="org">Progetto indipendente — Banco Lavoro Professionale CFD/ML</div>
              <p>Architetture AI per digital twin physics-driven, pipeline ML industriale, automazione CFD, bridge WSL-Windows e disaster recovery su dataset multi-TB. Founder di Nexus Omega Inc.</p>
            </div>`;

const newPathItem = `<div class="tl-item reveal card-animate">
              <div class="tl-date">Gen 2024 — Presente</div>
              <h4>Industrial AI Architect · Digital Twin Lead</h4>
              <div class="org">Progetto indipendente — Banco Lavoro Professionale CFD/ML</div>
              <p>Architetture AI per digital twin physics-driven, pipeline ML industriale, automazione CFD, bridge WSL-Windows e disaster recovery su dataset multi-TB. Founder di Nexus Omega Inc. <strong>53 solver CFD, 17 moduli Twin, 427 API routes, 224+ test, Ollama LLM locale + Hybrid RAG, 18 DB scientifici integrati.</strong></p>
            </div>`;

html = html.replace(oldPathItem, newPathItem);

fs.writeFileSync('index.html', html);
console.log('Path section updated!');