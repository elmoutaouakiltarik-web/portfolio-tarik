# Portfolio — Tarik El Moutaouakil

Sito statico in una pagina (HTML, CSS e JavaScript senza dipendenze e senza build).

**Online:** https://elmoutaouakiltarik-web.github.io/portfolio-tarik/ (GitHub Pages, ramo `master`, cartella radice).

- **Contenuti:** solo dati verificabili. Ogni numero viene da un test eseguito; dove il codice è pubblico c’è il link al repository che lo riproduce.
- **Grafici:** SVG disegnati da `assets/js/charts.js` con i valori dei file di risultati dei repository (`physics-surrogate-benchmarks`, `hybrid-rag-mcp`, `agent-finops-router`). Tooltip al passaggio del mouse o al tocco; ogni grafico ha una descrizione testuale (`aria-label`). Palette verificata per daltonismo e contrasto in tema chiaro e scuro.
- **Lingue:** italiano (nel markup), inglese e francese caricati solo quando servono; scelta ricordata, oppure `?lang=en|fr|it`.
- **Privacy:** nessun cookie, nessun tracciamento, nessuna richiesta a terze parti (font self-hosted).

## Struttura

```
index.html                   pagina (italiano + chiavi data-i18n)
assets/css/main.css          stile: token colore, tema scuro, responsive, stampa
assets/js/i18n.js            motore delle traduzioni + stringhe italiane usate dai grafici
assets/js/lang/en.js, fr.js  dizionari EN/FR
assets/js/charts.js          grafici e schema del banco HIL
assets/cv/                   CV in PDF (inglese, francese)
assets/fonts/                Hanken Grotesk, IBM Plex Mono (SIL OFL, licenze incluse)
assets/img/                  ritratto, icone, immagine Open Graph
tools/check-i18n.js          chiavi mancanti, punteggiatura francese, apostrofi
tools/check-html.js          id duplicati, ancore e file mancanti, alt, rel=noopener
```

## Anteprima e controlli

```bash
python -m http.server 8080        # poi http://localhost:8080
node tools/check-i18n.js
node tools/check-html.js
```

## Modificare i contenuti

1. Testo italiano: direttamente in `index.html`, dentro l’elemento con `data-i18n="chiave"`.
2. Stessa chiave in `assets/js/lang/en.js` e `fr.js` (JSON valido; in francese spazio indivisibile prima di `: ; ? !`).
3. Dati dei grafici: costanti in cima a `assets/js/charts.js`, con il file di origine indicato nel commento.

## Licenze

Font: SIL Open Font License 1.1 (testi in `assets/fonts/`). Grafici, icone e immagini: generati per questo sito.
