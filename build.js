const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// Defina os caminhos
const templatesDir = path.join(__dirname, 'src', 'views');
const buildDir = path.join(__dirname, 'dist');

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
