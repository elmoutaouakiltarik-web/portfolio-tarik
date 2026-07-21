const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Update PATH section
const oldPath = `<!-- PATH / EDUCATION -->
    <section id="path">
      <div class="wrap">
        <div class="section-head reveal">
          <div>
            <div class="section-kicker">06 — Path</div>
            <h2>Formazione e percorso</h2>
          </div>
          <p>Percorso intensivo, certificato e orientato all'industria reale.
        </div>

        <div class="glass" style="padding: 2rem;">
          <div class="timeline">
            <div class="tl-item reveal">
              <div class="tl-date">Gen 2024 — Presente</div>
              <h4>Industrial AI Architect · Digital Twin Lead</h4>
              <div class="org">Progetto indipendente — Banco Lavoro Professionale CFD/ML</div>
              <p>Architetture AI per digital twin physics-driven, pipeline ML industriale, automazione CFD, bridge WSL-Windows e disaster recovery su dataset multi-TB. Founder di Nexus Omega Inc.</p
            </div>
            <div class="tl-item reveal reveal-d1">
              <div class="tl-date">2025 — 2026 · In corso</div>
              <h4>Tecnico Automazione Industriale con ML, AI e Manutenzione Predittiva</h4>
              <div class="org">CNAFOER Reggio Emilia · 500 ore · EQF 6</div>
              <p>Architetture integrate, robotica, protocolli industriali, cyber security OT, collaudo e machine learning industriale. Stage aziendale previsto.
            </div>
            <div class="tl-item reveal reveal-d2">
              <div class="tl-date">Nov 2024 — Feb 2025</div>
              <h4>Tecnico Automazione e Sistemi Robotizzati</h4>
              <div class="org">Ente formativo · 800 ore (project work + stage 300h)</div>
              <p>PLC-HMI, reti industriali, visione artificiale, robotica, pneumatica, azionamenti e innovazione d'impresa.
            </div>
            <div class="tl-item reveal reveal-d3">
              <div class="tl-date">2024 — 2025</div>
              <h4>Progettazione 3D & Sistemi Robotizzati</h4>
              <div class="org">PROJECT SRL / DISMI — Industria 5.0</div>
              <p>Modellazione meccanica, cablaggi, protocolli, diagnosi e collaudo funzionale di impianti automatizzati.
            </div>
            <div class="tl-item reveal reveal-d4">
              <div class="tl-date">2025</div>
              <h4>Certificazioni e specializzazioni</h4>
              <div class="org">Robotica · CAD · Data · PLC</div>
              <p>Programmazione robot antropomorfi (EQF 4, CEAR Brescia), Onshape Academy + Enterprise Release Workflows, Data Analyst Excel/Python (200h), Automazione e Domotica PLC (168h).</p
            </div>
          </div>
        </div>
      </div>
    </section>`;

const newPath = `<!-- PATH / EDUCATION -->
    <section id="path">
      <div class="wrap">
        <div class="section-head reveal">
          <div>
            <div class="section-kicker">06 — Path</div>
            <h2>Percorso certificato, orientato all'industria reale</h2>
          </div>
          <p>Specializzazione intensiva EQF 6 + 1.700+ ore + progetti reali su banco CFDML Enterprise.</p>
        </div>

        <div class="glass" style="padding: 2rem;">
          <div class="timeline">
            <div class="tl-item reveal card-animate">
              <div class="tl-date">Gen 2024 — Presente</div>
              <h4>Industrial AI Architect · Digital Twin Lead</h4>
              <div class="org">Progetto indipendente — Banco Lavoro Professionale CFD/ML</div>
              <p>Architetture AI per digital twin physics-driven, pipeline ML industriale, automazione CFD, bridge WSL-Windows e disaster recovery su dataset multi-TB. Founder di Nexus Omega Inc. <strong>53 solver CFD, 17 moduli Twin, 427 API routes, 224+ test, Ollama LLM locale + Hybrid RAG, 18 DB scientifici integrati.</strong></p>
            </div>
            <div class="tl-item reveal reveal-d1 card-animate">
              <div class="tl-date">2025 — 2026 · In corso</div>
              <h4>Tecnico Automazione Industriale con ML, AI e Manutenzione Predittiva</h4>
              <div class="org">CNAFOER Reggio Emilia · 500 ore · EQF 6</div>
              <p>Architetture integrate, robotica, protocolli industriali, cyber security OT, collaudo e machine learning industriale. Stage aziendale previsto su Digital Twin real-time.</p>
            </div>
            <div class="tl-item reveal reveal-d2 card-animate">
              <div class="tl-date">Nov 2024 — Feb 2025</div>
              <h4>Tecnico Automazione e Sistemi Robotizzati</h4>
              <div class="org">Ente formativo · 800 ore (project work + stage 300h)</div>
              <p>PLC-HMI, reti industriali, visione artificiale, robotica, pneumatica, azionamenti e innovazione d'impresa. Project work: cella robotizzata con predictive maintenance via Edge AI.</p>
            </div>
            <div class="tl-item reveal reveal-d3 card-animate">
              <div class="tl-date">2024 — 2025</div>
              <h4>Progettazione 3D & Sistemi Robotizzati</h4>
              <div class="org">PROJECT SRL / DISMI — Industria 5.0</div>
              <p>Modellazione meccanica, cablaggi, protocolli, diagnosi e collaudo funzionale di impianti automatizzati. Onshape parametric CAD, build123d STEP export.</p>
            </div>
            <div class="tl-item reveal reveal-d4 card-animate">
              <div class="tl-date">2025</div>
              <h4>Certificazioni e specializzazioni verticali</h4>
              <div class="org">Robotica · CAD · Data · PLC</div>
              <p>Programmazione robot antropomorfi (EQF 4, CEAR Brescia), Onshape Academy + Enterprise Release Workflows, Data Analyst Excel/Python (200h), Automazione e Domotica PLC (168h).</p>
            </div>
          </div>
        </div>
      </div>
    </section>`;

html = html.replace(oldPath, newPath);

// Update CONTACT section
const oldContact = `<!-- CONTACT -->
    <section id="contact">
      <div class="wrap">
        <div class="contact-shell reveal">
          <div>
            <div class="section-kicker">07 — Contact</div>
            <h2>Costruiamo il prossimo digital twin industriale</h2>
            <p>
              Disponibile per collaborazioni su AI industriale, gemelli digitali, automazione,
              IIoT e prototipazione CFD/ML in Europa. Parliamo di problemi reali, non di slide.
            </p>
            <div class="contact-links">
              <a class="contact-link magnetic" data-cursor="hover" href="mailto:Elmoutaouakiltarik@gmail.com">
                <div class="ico"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></div>
                <div class="meta"><small>Email</small><strong>Elmoutaouakiltarik@gmail.com</strong></div>
              </a>
              <a class="contact-link magnetic" data-cursor="hover" href="tel:+393755196466">
                <div class="ico"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6.5 3h3l1.5 5-2 1.5a12 12 0 0 0 5.5 5.5L16 13.5l5 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3z"/></svg></div>
                <div class="meta"><small>Telefono</small><strong>+39 375 519 6466</strong></div>
              </a>
              <a class="contact-link magnetic" data-cursor="hover" href="https://www.linkedin.com/in/tarik-el-moutaouakil-a832123b3/" target="_blank" rel="noopener">
                <div class="ico"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></div>
                <div class="meta"><small>LinkedIn</small><strong>tarik-el-moutaouakil</strong></div>
              </a>
              <div class="contact-link" style="cursor:default">
                <div class="ico"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg></div>
                <div class="meta"><small>Location</small><strong>Reggio Emilia, Italia</strong></div>
              </div>
            </div>
          </div>

          <div class="contact-aside">
            <div class="cta-card">
              <div class="avail"><i></i> Open to industrial collaborations</div>
              <h3>Cosa porto in azienda</h3>
              <p>
                Architettura digital twin, automazione CFD/ML, integrazione robot/PLC con AI,
                edge analytics e un sistema operativo multi-agente per delivery tecnica seria e ripetibile.
              </p>
              <a href="mailto:Elmoutaouakiltarik@gmail.com?subject=Collaborazione%20industriale%20—%20Tarik%20El%20Moutaouakil" class="btn btn-primary magnetic" data-cursor="hover" style="width:100%">Scrivimi ora</a>
            </div>
            <div class="glass" style="padding:1.2rem 1.3rem">
<div style="font-family:var(--font-mono);font-size:0.72rem;color:#94a3c4;margin-bottom:0.55rem;letter-spacing:0.08em;text-transform:uppercase">Lingue</div>
<div style="display:grid;gap:0.4rem;font-size:0.92rem;color:#c8d2ec;font-weight:500">
                <div><strong style="color:var(--text)">Italiano</strong> — professionale</div>
                <div><strong style="color:var(--text)">Arabo</strong> — professionale</div>
                <div><strong style="color:var(--text)">Inglese</strong> — tecnico professionale</div>
                <div><strong style="color:var(--text)">Francese</strong> — base</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`;

const newContact = `<!-- CONTACT -->
    <section id="contact">
      <div class="wrap">
        <div class="contact-shell reveal">
          <div>
            <div class="section-kicker">07 — Contact</div>
            <h2>Costruiamo il prossimo digital twin industriale</h2>
            <p>
              Disponibile per collaborazioni su AI industriale, gemelli digitali, automazione,
              IIoT e prototipazione CFD/ML in Europa. Parliamo di problemi reali, non di slide.
              <strong>Consegno codice testato, documentato, con quality gate automatici.</strong>
            </p>
            <div class="contact-links">
              <a class="contact-link magnetic" data-cursor="hover" href="mailto:Elmoutaouakiltarik@gmail.com">
                <div class="ico"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></div>
                <div class="meta"><small>Email</small><strong>Elmoutaouakiltarik@gmail.com</strong></div>
              </a>
              <a class="contact-link magnetic" data-cursor="hover" href="tel:+393755196466">
                <div class="ico"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6.5 3h3l1.5 5-2 1.5a12 12 0 0 0 5.5 5.5L16 13.5l5 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3z"/></svg></div>
                <div class="meta"><small>Telefono</small><strong>+39 375 519 6466</strong></div>
              </a>
              <a class="contact-link magnetic" data-cursor="hover" href="https://www.linkedin.com/in/tarik-el-moutaouakil-a832123b3/" target="_blank" rel="noopener">
                <div class="ico"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></div>
                <div class="meta"><small>LinkedIn</small><strong>tarik-el-moutaouakil</strong></div>
              </a>
              <div class="contact-link" style="cursor:default">
                <div class="ico"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg></div>
                <div class="meta"><small>Location</small><strong>Reggio Emilia, Italia</strong></div>
              </div>
            </div>
          </div>

          <div class="contact-aside">
            <div class="cta-card">
              <div class="avail"><i></i> Open to industrial collaborations</div>
              <h3>Cosa porto in azienda</h3>
              <p>
                Architettura digital twin physics-driven, automazione CFD/ML end-to-end, integrazione robot/PLC con AI,
                edge analytics real-time e <strong>sistema operativo multi-agente (Software House OS)</strong> per delivery tecnica seria, ripetibile e misurabile.
              </p>
              <a href="mailto:Elmoutaouakiltarik@gmail.com?subject=Collaborazione%20industriale%20—%20Tarik%20El%20Moutaouakil" class="btn btn-primary magnetic" data-cursor="hover" style="width:100%">Scrivimi ora</a>
            </div>
            <div class="glass" style="padding:1.2rem 1.3rem">
              <div style="font-family:var(--font-mono);font-size:0.72rem;color:#94a3c4;margin-bottom:0.55rem;letter-spacing:0.08em;text-transform:uppercase">Lingue</div>
              <div style="display:grid;gap:0.4rem;font-size:0.92rem;color:#c8d2ec;font-weight:500">
                <div><strong style="color:var(--text)">Italiano</strong> — professionale</div>
                <div><strong style="color:var(--text)">Arabo</strong> — professionale</div>
                <div><strong style="color:var(--text)">Inglese</strong> — tecnico professionale</div>
                <div><strong style="color:var(--text)">Francese</strong> — base</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`;

html = html.replace(oldPath, newPath);
html = html.replace(oldContact, newContact);

fs.writeFileSync('index.html', html);
console.log('Updates completed!');