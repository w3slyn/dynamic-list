const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// Defina os caminhos
const templatesDir = path.join(__dirname, 'views');
const buildDir = path.join(__dirname, 'dist');
const publicDir = path.join(__dirname, 'public');

// Crie a pasta de build se não existir
if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
}

// Processa os arquivos EJS
fs.readdir(templatesDir, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        if (path.extname(file) === '.ejs') {
            const templatePath = path.join(templatesDir, file);
            const buildPath = path.join(buildDir, path.basename(file, '.ejs') + '.html');

            ejs.renderFile(templatePath, {}, (err, str) => {
                if (err) throw err;
                fs.writeFileSync(buildPath, str);
                console.log(`Built ${buildPath}`);
            });
        }
    });
});

// Copie arquivos estáticos
const copyFiles = (src, dest) => {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const files = fs.readdirSync(src);
    files.forEach(file => {
        const currentSrc = path.join(src, file);
        const currentDest = path.join(dest, file);
        if (fs.lstatSync(currentSrc).isDirectory()) {
            copyFiles(currentSrc, currentDest);
        } else {
            fs.copyFileSync(currentSrc, currentDest);
        }
    });
};

copyFiles(publicDir, buildDir);
console.log('Copied static files');
