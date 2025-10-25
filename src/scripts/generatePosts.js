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
    const birthtime = stats.birthtime; // 创建时间
    const fontNum = fs.readFileSync(filePath, 'utf-8').length; // 读取文件内容并计算字数

    // 修改事件，格式化为 YYYY-MM-DD
    const year = mtime.getFullYear();
    const month = String(mtime.getMonth() + 1).padStart(2, '0');
    const day = String(mtime.getDate()).padStart(2, '0');
    const hour = String(mtime.getHours()).padStart(2, '0');
    const minute = String(mtime.getMinutes()).padStart(2, '0');
    const second = String(mtime.getSeconds()).padStart(2, '0');

    // 创建时间，格式化为 YYYY-MM-DD
    const cYear = birthtime.getFullYear();
    const cMonth = String(birthtime.getMonth() + 1).padStart(2, '0');
    const cDay = String(birthtime.getDate()).padStart(2, '0');
    const cHour = String(birthtime.getHours()).padStart(2, '0');
    const cMinute = String(birthtime.getMinutes()).padStart(2, '0');
    const cSecond = String(birthtime.getSeconds()).padStart(2, '0');
    const created = `${cYear}-${cMonth}-${cDay} ${cHour}:${cMinute}:${cSecond}`;

    return {
      file: f,
      url: `/posts/${f}`,
      time: `${created}`,
      LastChangeTime: `${year}-${month}-${day} ${hour}:${minute}:${second}`,
      fontNum: fontNum
    };
  });

files.sort((a, b) => new Date(b.time) - new Date(a.time)); // 按时间降序排序

fs.writeFileSync(path.join(postsDir, 'posts.json'), JSON.stringify(files, null, 2));
console.log('posts.json 已生成');