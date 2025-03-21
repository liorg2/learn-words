import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '..', 'src', 'Services', 'sounds');
const targetDir = path.join(__dirname, '..', 'dist', 'Services', 'sounds');

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, {recursive: true});
}

// Copy all MP3 files
fs.readdirSync(sourceDir)
    .filter(file => file.endsWith('.mp3'))
    .forEach(file => {
        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join(targetDir, file);
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied ${file} to dist directory`);
    }); 