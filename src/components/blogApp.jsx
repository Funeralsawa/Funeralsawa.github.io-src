import React from "react";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import "github-markdown-css/github-markdown.css";

// 自定义 slugify
function slugify(text) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

class BlogApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      markdownText: "",
      htmlContent: "",
      toc: [],
      activeId: "",
    };
    this.contentRef = React.createRef();

    // marked v16 用法
    const renderer = new marked.Renderer();
    renderer.heading = (token) => {
      const text = token.text || "";
      const id = slugify(text);
      return `<h${token.depth} id="${id}">${text}</h${token.depth}>`;
    };

    marked.setOptions({
      renderer,
      highlight: (code, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          return hljs.highlight(code, { language: lang }).value;
        }
        return hljs.highlightAuto(code).value;
      },
    });
  }

  componentDidMount() {
    fetch(`/posts/${this.state.name}`)
      .then((res) => {
        if (!res.ok) throw new Error("加载失败");
        return res.text();
      })
      .then((text) => {
        const toc = this.generateTOC(text);
        const htmlContent = marked.parse(text);
        this.setState({ markdownText: text, htmlContent, toc });

        window.addEventListener("scroll", this.handleScroll);
      })
      .catch(console.error);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  // 生成目录
  generateTOC(mdText) {
    const tokens = marked.lexer(mdText);
    return tokens
      .filter((t) => t.type === "heading" && t.depth <= 3)
      .map((t) => ({
        text: t.text,
        id: slugify(t.text),
        depth: t.depth,
      }));
  }

  handleScroll = () => {
    if (!this.contentRef.current) return;

    const { toc } = this.state;
    const scrollPosition = window.scrollY + 100;
    let currentId = "";

    for (const heading of toc) {
      const el = document.getElementById(heading.id);
      if (el && el.offsetTop <= scrollPosition) {
        currentId = heading.id;
      }
    }

    if (currentId !== this.state.activeId) {
      this.setState({ activeId: currentId });
    }
  };

  handleTOCClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  render() {
    const { htmlContent, toc, activeId } = this.state;
    return (
      <div style={{ display: "flex", gap: "1rem", paddingRight: "1rem" }}>
        {/* 目录 */}
        {/* <nav
          style={{
            width: 240,
            position: "sticky",
            top: "1rem",
            height: "calc(100vh - 2rem)",
            overflowY: "auto",
            borderRight: "1px solid #ddd",
            paddingRight: "1rem",
            display: window.innerWidth < 600 ? "none" : "block",
          }}
        >
          <h3>目录</h3>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            {toc.map(({ id, text, depth }) => (
              <li
                key={id}
                style={{
                  marginLeft: (depth - 1) * 12,
                  marginBottom: 6,
                  fontWeight: activeId === id ? "bold" : "normal",
                }}
              >
                <a
                  href={`#${id}`}
                  onClick={(e) => this.handleTOCClick(e, id)}
                  style={{
                    color: activeId === id ? "#0366d6" : "#333",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </nav> */}

        {/* Markdown 内容 */}
        <article
          ref={this.contentRef}
          className="markdown-body"
          style={{ flex: 1, overflowWrap: "break-word" }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    );
  }
}

export default BlogApp;
