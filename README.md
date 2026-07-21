# Portfolio — Tarik El Moutaouakil

Portfolio HTML professionale single-file, pronto per la pubblicazione.

## File

- `index.html` — sito completo (CSS + JS inline, zero dipendenze da build)

## Anteprima locale

Apri `index.html` nel browser, oppure:

```powershell
cd "$env:USERPROFILE\Desktop\portfolio-tarik"
python -m http.server 8080
```

Poi visita `http://localhost:8080`.

## Pubblicazione (opzioni rapide)

### GitHub Pages
1. Crea un repo `tarik-portfolio` (o `username.github.io`)
2. Carica `index.html` nella root
3. Settings → Pages → Deploy from branch `main` / root

### Netlify Drop
1. Vai su [app.netlify.com/drop](https://app.netlify.com/drop)
2. Trascina la cartella `portfolio-tarik`
3. Ottieni un URL pubblico immediato

### Vercel
```bash
npx vercel --yes
```

## Contenuti (fonti)

- **CV Europass** (Desktop, 05/02/2026): ruolo, contatti, formazione, competenze
- **LinkedIn**: https://www.linkedin.com/in/tarik-el-moutaouakil-a832123b3/
- **Second brain** `WIKI AGENTI`: CFDML, Digital Twin Engine, Nexus Omega, OpenClaw, FashionIntel OS, Software House OS

## Personalizzazione

Modifica in `index.html`:
- email / telefono / LinkedIn nella sezione `#contact`
- progetti nella sezione `#projects`
- metriche e case study se vuoi claim più conservativi o aggiornati
