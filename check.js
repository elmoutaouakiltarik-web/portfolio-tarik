const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const idx = html.indexOf('<section id="projects">');
console.log(html.substring(idx, idx + 3000));