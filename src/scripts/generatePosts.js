import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

function getTime() {
    const date = new Date;

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDay();

    return `${year}-${month}-${day}`
}

// ES Module 没有 __dirname，需要手动构造
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsDir = path.join(__dirname, '../../public/posts');
const files = fs.readdirSync(postsDir)
    .filter(f => f.endsWith('.md'))
    .map(f => ({ file: f, url: `/posts/${f}`, time: getTime()}));

fs.writeFileSync(path.join(postsDir, 'posts.json'), JSON.stringify(files, null, 2));
console.log('posts.json 已生成');