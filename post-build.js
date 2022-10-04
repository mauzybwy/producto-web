const fs = require('fs');

let css = fs.readFileSync('./build/main.css').toString();
css = css.replace(/url\(\/static\/media\//g, `url(chrome-extension://jlocmelkpbekapkplfohppkmolgcfgcc/static/media/`);

//!blw: skip for now!
/* fs.writeFileSync('./build/main.css', css); */
