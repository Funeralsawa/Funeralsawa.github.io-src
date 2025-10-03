import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module 没有 __dirname，需要手动构造
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsDir = path.join(__dirname, '../assets/posts');

const files = fs.readdirSync(postsDir)
  .filter(f => f.endsWith('.md'))
  .map(f => {
    const filePath = path.join(postsDir, f);
    const stats = fs.statSync(filePath); // 获取文件信息
    const mtime = stats.mtime; // 最后修改时间

    // 格式化为 YYYY-MM-DD
    const year = mtime.getFullYear();
    const month = String(mtime.getMonth() + 1).padStart(2, '0');
    const day = String(mtime.getDate()).padStart(2, '0');

    return {
      file: f,
      url: `/posts/${f}`,
      time: `${year}-${month}-${day}`
    };
  });

fs.writeFileSync(path.join(postsDir, 'posts.json'), JSON.stringify(files, null, 2));
console.log('posts.json 已生成');