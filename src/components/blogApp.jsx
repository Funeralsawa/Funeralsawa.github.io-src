import React from "react";
import { marked } from "marked";
import hljs from "highlight.js";
import pinyin from "pinyin";
import "highlight.js/styles/github.css";
import "github-markdown-css/github-markdown.css";
import { setToc } from "../redux/action.js";
import { setID } from "../redux/action.js";
import { connect } from "react-redux";
import { createPortal } from "react-dom";

// 自定义 slugify
function slugify(text) {
  if (!text) return "";
  // 如果包含中文，就先转拼音
  if (/[\u4e00-\u9fa5]/.test(text)) {
    text = pinyin(text, { style: pinyin.STYLE_NORMAL })
      .flat()
      .join("-"); // 你好 世界 → ni-hao-shi-jie
  }
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
    this.containerRef = React.createRef();

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
        this.props.setToc(toc);

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
      this.props.setID(currentId);
    }
  };

  render() {
    const { htmlContent } = this.state;
    return (
      <div className="md-content">
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

const mapStateToProps = (state) => ({
  targetNode: state.targetNode,
});

const mapDispatchToProps = {
  setToc,
  setID
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogApp);
