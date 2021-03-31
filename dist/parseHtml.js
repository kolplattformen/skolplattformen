"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMarkdown = exports.clean = void 0;
const h2m = __importStar(require("h2m"));
const js_htmlencode_1 = require("js-htmlencode");
const he_1 = require("he");
const node_html_parser_1 = require("node-html-parser");
const noChildren = ['strong', 'b', 'em', 'i', 'u', 's'];
const trimNodes = [...noChildren, 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'a'];
const cleanText = (node, parentType) => {
    const text = parentType && trimNodes.includes(parentType.toLowerCase())
        ? node.rawText.trim()
        : node.rawText;
    return new node_html_parser_1.TextNode(text, node.parentNode);
};
const deepClean = (node) => {
    const attributes = Object.entries(node.attributes)
        .map(([key, val]) => {
        if (key === 'href' && val) {
            // eslint-disable-next-line no-param-reassign
            val = val.replace(/ /g, '%20');
        }
        return `${key}="${val}"`;
    })
        .join(' ');
    const cleaned = new node_html_parser_1.HTMLElement(node.tagName, {}, attributes, node.parentNode);
    node.childNodes.forEach((childNode) => {
        if (childNode instanceof node_html_parser_1.HTMLElement) {
            if (node.tagName && noChildren.includes(node.tagName.toLowerCase())) {
                cleaned.childNodes.push(cleanText(new node_html_parser_1.TextNode(childNode.innerText, childNode), node.tagName));
            }
            else {
                cleaned.childNodes.push(deepClean(childNode));
            }
        }
        else if (childNode instanceof node_html_parser_1.TextNode) {
            cleaned.childNodes.push(cleanText(childNode, node.tagName));
        }
    });
    return cleaned;
};
const clean = (html = '') => deepClean(node_html_parser_1.parse(he_1.decode(html))).outerHTML;
exports.clean = clean;
const converter = 'MarkdownExtra';
const overides = {
    a: (node) => `[${node.md}](${node.attrs.href})`,
};
const toMarkdown = (html) => {
    const trimmed = exports.clean(html);
    const markdown = h2m(trimmed, { overides, converter });
    const decoded = js_htmlencode_1.htmlDecode(markdown);
    return decoded;
};
exports.toMarkdown = toMarkdown;
//# sourceMappingURL=parseHtml.js.map