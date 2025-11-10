import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from "gray-matter";
import pinyinRaw from "pinyin";

// 去除 markdown 语法字符
function stripMarkdown(md) {
  return md
    .replace(/```[\s\S]*?```/g, "")          // 移除代码块
    .replace(/`[^`]*`/g, "")                 // 移除行内代码
    .replace(/!\[.*?\]\(.*?\)/g, "")         // 移除图片
    .replace(/\[.*?\]\(.*?\)/g, "")          // 移除链接
    .replace(/[#>*\-+]+/g, "")               // 移除标题/列表符号
    .replace(/(\*|_|~|`)/g, "")              // 移除粗体/斜体/删除线符号
    .replace(/>\s*/g, "")                    // 移除引用符号
    .replace(/\r?\n|\r/g, "")                // 移除换行符
    .trim();
}


const pinyin = pinyinRaw.default || pinyinRaw;

function slugify(text) {
	return pinyin(text, { style: pinyin.STYLE_NORMAL })
		.flat()
		.join("-")
		.toLowerCase()
		.replace(/[^a-z0-9\-]/g, "")
		.replace(/\-+/g, "-")
		.replace(/^\-+|\-+$/g, "");
}

// ES Module 没有 __dirname，需要手动构造
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const postsDir = path.join(__dirname, '../src/assets/posts');

const filename = process.argv[2] || null;

if (filename) {
	const filepath = path.join(postsDir, `${filename}.md`);
	const content = `---
# 可以选择的标签有：全部，IT，生活，学习，旅行，梦话，其他
TAGS: []
AUTHOR:
TITLE:
ABSTRACT:
IMG:
---
在这里开始写正文内容...
	`;
	if (fs.existsSync(filepath)) {
    	console.log(`文件已存在：${filepath}`);
	} else {
		fs.writeFileSync(filepath, content, "utf-8");
		console.log(`✅ 已创建 Markdown: ${filepath}`);
		console.log("请在更新完文件之后重新生成文章配置文件");
	}
}

const files = fs.readdirSync(postsDir)
	.filter(f => f.endsWith('.md'))
	.map(f => {
		const filePath = path.join(postsDir, f);
		const stats = fs.statSync(filePath); // 获取文件信息
		const mtime = stats.mtime; // 最后修改时间
		const birthtime = stats.birthtime; // 创建时间
		const raw = fs.readFileSync(filePath, 'utf-8');
		const { content } = matter(raw);
		const cleanText = stripMarkdown(content);
		const fontNum = cleanText.length; //计算字数

		// 使用 gray-matter 解析 Front Matter
		const { data } = matter(raw);

		// 从 Front Matter 读取 TAGS 字段
		// 统一为数组，防止单个字符串造成错误
		const tags = Array.isArray(data.TAGS) ? data.TAGS : (data.TAGS ? [data.TAGS] : []);

		const title = data.TITLE?.trim() || f.replace(/\.md$/, "");
		const slug = slugify(title);

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
		url: `/posts/${slug}`,
		time: `${created}`,
		LastChangeTime: `${year}-${month}-${day} ${hour}:${minute}:${second}`,
		fontNum: fontNum,
		tags: tags
		};
	});

files.sort((a, b) => new Date(b.time) - new Date(a.time)); // 按时间降序排序

fs.writeFileSync(path.join(postsDir, 'posts.json'), JSON.stringify(files, null, 2));
console.log('posts.json 已生成');