# Portfolio — Tarik El Moutaouakil

Sito statico (HTML + CSS + JavaScript senza dipendenze e senza build), pensato per essere veloce, accessibile e facile da modificare.
Si apre anche con un doppio clic su `index.html`.

**Sito online:** https://elmoutaouakiltarik-web.github.io/portfolio-tarik/ (GitHub Pages, ramo `master`, cartella radice; ogni aggiornamento di `master` va online da solo in circa un minuto).

- **Lingue:** italiano (sorgente), inglese, francese — cambio lingua istantaneo, scelta ricordata.
- **Prestazioni:** ~220 KB totali al primo caricamento su telefono (con compressione del server), font self-hosted, nessuna richiesta a terze parti, animazioni di pagina solo `transform`/`opacity` (unica eccezione: il tratteggio che scorre nel disegno del PLC quando ci passi sopra con il mouse), sfondo WebGL che parte dopo il primo paint e si ferma da solo quando serve.
- **Accessibilità:** audit automatico axe-core a zero violazioni (WCAG 2.1 AA) a 390, 768 e 1440 px in IT/EN/FR; navigazione da tastiera, `skip link`, menu mobile con focus trap, tab ARIA, `prefers-reduced-motion`.
- **Telefono:** le serie di card diventano strisce scorrevoli con `scroll-snap` (pagina ~30% più corta).
- **Stampa / PDF:** il pulsante "Salva il profilo in PDF" produce un CV compatto di ~7 pagine A4 (fondo chiaro, senza decorazioni).

## Struttura

```
index.html                 pagina (testi in italiano, chiavi data-i18n per le traduzioni) e sprite delle icone
.nojekyll                  file vuoto: GitHub Pages pubblica i file così come sono, senza passare da Jekyll
assets/css/main.css        stile (token, componenti, responsive, stampa)
assets/js/main.js          interazioni (menu, scroll spy, reveal, tab, carousel, form, audio)
assets/js/flow.js          sfondo WebGL "flow field" (si adatta al dispositivo)
assets/js/i18n.js          motore di traduzione + stringhe italiane usate dal JavaScript
assets/js/lang/en.js, fr.js  dizionari EN/FR (caricati solo quando servono)
assets/fonts/              Bricolage Grotesque, Hanken Grotesk, IBM Plex Mono (SIL OFL, licenze incluse)
assets/img/                icone, immagine Open Graph, foto
assets/img/photos/         foto ottimizzate (WebP, 640–1000 px)
tools/check-i18n.js        verifica chiavi/traduzioni
tools/check-html.js        verifica id, ancore, file locali, alt, rel=noopener
site.webmanifest, robots.txt
```

## Anteprima in locale

```bash
python3 -m http.server 8080      # poi apri http://localhost:8080
```

## Come modificare i contenuti

1. **Testi:** modifica direttamente `index.html`. Ogni elemento traducibile ha `data-i18n="chiave"`; il testo dentro il tag è l'italiano.
2. **Traduzioni:** la stessa chiave va aggiornata in `assets/js/lang/en.js` e `assets/js/lang/fr.js`. Per testi usati dal JavaScript (messaggi del form, meta description) la versione italiana sta in cima a `assets/js/i18n.js`.
3. **Controllo automatico** (nessuna installazione, serve solo Node):
   ```bash
   node tools/check-i18n.js     # chiavi mancanti, chiavi inutilizzate, punteggiatura francese
   node tools/check-html.js     # id duplicati, link rotti, immagini senza alt
   ```
4. **Sigla «AI» nei titoli:** in Bricolage Grotesque la «I» maiuscola e la «l» minuscola sono identiche, e «AI» si legge «Al». Per questo ogni «AI» (e «IA» in francese) è racchiusa in `<span class="ai">…</span>`: nei titoli il CSS usa il font di testo, dove la «l» ha un'asticella. Se aggiungi nuovi titoli con «AI», riusa lo stesso span.
5. **Icone:** sono simboli SVG duotone disegnati su misura, in cima a `index.html` (`<symbol id="i-nome">`). Si usano con `<svg class="ico" width="20" height="20" aria-hidden="true"><use href="#i-nome"/></svg>`: il tratto principale prende `currentColor`, i tratti secondari la variabile `--ico-2` (nei riquadri `.domain__ico` è una tinta più chiara dell'accento).
6. **Numeri e claim:** i numeri in evidenza (solver, endpoint, R², latenza…) sono in `index.html`; aggiornali quando i progetti cambiano.

## Form di contatto

Di default **apre il client di posta** con il messaggio già compilato (`mailto:`), quindi funziona ovunque senza backend.
Per ricevere i messaggi direttamente nella casella, senza aprire il client:

1. crea una chiave gratuita su [web3forms.com](https://web3forms.com) (basta l'email);
2. in `index.html` inserisci la chiave in `<form id="contactForm" data-access-key="LA-TUA-CHIAVE">`
   (oppure un tuo endpoint in `data-endpoint="https://..."`).

La chiave Web3Forms è pensata per essere pubblica. Il campo honeypot `_honeypot` filtra i bot più semplici.

## Pubblicazione

| Dove | Come |
| --- | --- |
| **GitHub Pages** | Settings → Pages → *Deploy from a branch* → `master` / root (già attivo per questo repository) |
| **Netlify** | trascina la cartella su [app.netlify.com/drop](https://app.netlify.com/drop) |
| **Cloudflare Pages / Vercel** | collega il repository, nessun comando di build, cartella di output `/` |

Dopo la pubblicazione:

- **Anteprima social (Open Graph) e indirizzo canonico:** sono già impostati sull'indirizzo di GitHub Pages (`link rel="canonical"`, `og:url`, `og:image`, `twitter:image` e `url` nei dati strutturati in `index.html`). Se passi a un dominio personalizzato, sostituisci `https://elmoutaouakiltarik-web.github.io/portfolio-tarik/` con il nuovo indirizzo in quei punti.
- Aggiungi un `sitemap.xml` se vuoi (una sola pagina: basta l'URL della home).

## Crediti e licenze

- **Font:** Bricolage Grotesque, Hanken Grotesk, IBM Plex Mono — SIL Open Font License 1.1 (testi di licenza in `assets/fonts/`).
- **Foto:** provengono da Unsplash (licenza Unsplash: uso libero, anche commerciale, attribuzione non obbligatoria). Gli identificativi sono nei nomi dei file originali; per citare gli autori, cercali su unsplash.com/photos/<ID>:

  | Foto in `assets/img/photos/` | ID Unsplash |
  | --- | --- |
  | `manufacturing` | 1581092334651-ddf26d9a09d0 |
  | `energy` | 1497435334941-8c899ee9e8e9 |
  | `cfd` | 1541701494587-cb58502866ab |
  | `secure` | 1558494949-ef010cbdcc31 |
  | `team` | 1516321318423-f06f85e504b3 |
  | `earth` | 1451187580459-43490279c0fa |
  | `drawings` | 1581092160562-40aa08e78837 |
  | `retail` | file `fashionintel-os.jpg` della vecchia cartella `images/` (ID Unsplash non registrato; la cartella è stata rimossa ma resta nella cronologia git) |

  Le altre immagini in `assets/img/` (`ot-machine`, `it-datacenter`, `onprem-network`, `finops-dashboard`) derivano dai file Unsplash 1581091226825, 1573164713988, 1544197150 e 1551288049.
- **Illustrazioni tecniche** (profilo alare con flusso potenziale, griglia body-fitted, sezione PMSM, knowledge graph, matrice di dipendenze, DAG degli agenti, ladder PLC, zone e condotti IEC 62443, pipeline CI/CD con metriche DORA…): generate da codice, nessuna licenza esterna.
- **Icone:** set di 49 simboli SVG duotone disegnati per questo sito (nessuna libreria di icone, nessuna licenza esterna).
- **Strumenti open-source citati** nella sezione *Ecosistema* (Supertonic, Supervision, build123d, Spec Kit, Agent Reach, PDFCraft, LiteLLM, Ollama…): il merito resta ai progetti originali; verifica che i nomi e le licenze indicate corrispondano a ciò che usi davvero.

## Note di manutenzione

- Le vecchie versioni del sito (`index.html.backup-*`), gli script di migrazione, la cartella `images/` e i frammenti `sections*/` sono stati rimossi dalla radice: non servono al sito.
- **Riservatezza:** il repository è pubblico, quindi non vanno committati esportazioni della knowledge base (`wiki_*.md`), log, file `.env`, chiavi, appunti interni o percorsi del tuo computer: il `.gitignore` li esclude già. Se un file riservato viene pubblicato per errore, cancellarlo non basta (resta nella cronologia di git): cambia le credenziali coinvolte e riscrivi la cronologia oppure rendi privato il repository.
