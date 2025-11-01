import React, { useEffect, useRef, useState } from "react";
import { marked } from "marked";
import hljs from "highlight.js";
import pinyin from "pinyin";
import "highlight.js/styles/github.css";
import "github-markdown-css/github-markdown.css";
import { setToc, setID } from "../redux/action.js";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import posts from '../assets/posts/posts.json';

// 中文 → 拼音 slug
function slugify(text) {
	if (!text) return "";
	if (/[\u4e00-\u9fa5]/.test(text)) {
		text = pinyin(text, { style: pinyin.STYLE_NORMAL }).flat().join("-");
	}
	return text
		.toLowerCase()
		.trim()
		.replace(/[\s]+/g, "-")
		.replace(/[^\w\-]+/g, "")
		.replace(/\-\-+/g, "-")
		.replace(/^-+/, "")
		.replace(/-+$/, "");
}

// 去掉 front-matter 部分
function removeFrontMatter(text) {
	return text.replace(/^---[\s\S]*?---/, "").trim();
}

// marked 配置（只初始化一次）
const renderer = new marked.Renderer();
renderer.heading = (token) => {
	const id = slugify(token.text);
	return `<h${token.depth} id="${id}">${token.text}</h${token.depth}>`;
};

marked.setOptions({
	renderer,
	highlight(code, lang) {
		if (lang && hljs.getLanguage(lang)) {
			return hljs.highlight(code, { language: lang }).value;
		}
		return hljs.highlightAuto(code).value;
	}
});

function BlogApp({ name, navigate, setToc, setID, htmlContent: injectedHTML = "", toc: injectedTOC = [] }) {
	const contentRef = useRef(null);

	const [htmlContent, setHtmlContent] = useState(injectedHTML);
	const [toc, setTOCState] = useState(injectedTOC);

	// 生成 TOC
	const generateTOC = (mdText) => {
		const tokens = marked.lexer(mdText);
		return tokens
			.filter((t) => t.type === "heading" && t.depth <= 3)
			.map((t) => ({
				text: t.text,
				id: slugify(t.text),
				depth: t.depth
			}));
	};

	// 本地开发模式：运行时加载 .md
	useEffect(() => {
		const modules = import.meta.glob("../assets/posts/*.md", { as: "raw" });
		const post = posts.find(p => p.url === `/posts/${name}`);
		const target = `../assets/posts/${post.file}`;

		if (!modules[target]) {
			navigate("/404");
			return;
		}

		modules[target]().then((text) => {
			const clean = removeFrontMatter(text);
			const newTOC = generateTOC(clean);
			const newHTML = marked.parse(clean);

			setHtmlContent(newHTML);
			setTOCState(newTOC);
			setToc(newTOC);
		});
	}, [name]);

	// 滚动高亮目录
	useEffect(() => {
		const handleScroll = () => {
			for (const h of toc) {
				const el = document.getElementById(h.id);
				if (el && el.getBoundingClientRect().top >= -10) {
					setID(h.id);
					return;
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [toc]);

	return (
		<article
			ref={contentRef}
			className="markdown-body"
			style={{ flex: 1, overflowWrap: "break-word" }}
			dangerouslySetInnerHTML={{ __html: htmlContent }}
		/>
	);
}

const BlogWrapper = (props) => {
	const { name } = useParams();
	const navigate = useNavigate();
	return <BlogApp {...props} name={name} navigate={navigate} />;
};

export default connect(null, { setToc, setID })(BlogWrapper);