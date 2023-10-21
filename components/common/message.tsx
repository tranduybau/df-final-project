import { useState } from "react"
import Image from "next/image"
import chatGptImage from "@/assets/images/chatgpt.webp"
import Markdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import rehypeDomStringify from "rehype-dom-stringify"
import rehypeFormat from "rehype-format"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import remarkToc from "remark-toc"

import { cn } from "@/lib/utils"

export interface MessageProps {
  me?: string
  markdownText: string
  hiddenShadow?: boolean
}

export const testMarkdownText = `
# Tiêu đề

Đây là một đoạn mã nguồn:
- HTML code:

\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Bookstore</title>

    <!-- Embed font -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
      rel="stylesheet"
    />

    <!-- Font awesome -->
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
      integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay"
      crossorigin="anonymous"
    />

    <!-- Internal CSS -->
    <link href="./assets/styles/reset.css" rel="stylesheet" type="text/css" />
    <link href="./assets/styles/style.css" rel="stylesheet" type="text/css" />

    <!-- Placing the script tag here with "defer" attribute helps improve performance -->
    <!-- Reference links: https://www.freecodecamp.org/news/javascript-performance-async-defer/ -->
    <script src="./js/script.js" type="module" defer></script>
  </head>

  <body>
    <header>
      <div class="container">
        <div class="header__wrapper">
          <div class="logo">
            <a href="/">Bookstore</a>
          </div>

          <div class="user">
            <div class="user__image">
              <img src="./assets/images/user.png" alt="logo" />
            </div>
            <div class="user__name">Khang Dev</div>
          </div>
        </div>
      </div>
    </header>

    <main>
      <div class="container">
        <div class="search__wrapper">
          <div class="search__bar">
            <input
              type="text"
              class="search__input input-field"
              id="search-input"
              placeholder="Search books"
            />
            <button class="btn" id="add-book-btn">Add book</button>
          </div>
        </div>

        <table class="table" id="book-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Topic</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <!-- Book list will be displayed here -->
          </tbody>
        </table>
      </div>
    </main>
  </body>
</html>
\`\`\`

- Javascript code

\`\`\`javascript
function createStyleObject(classNames, style) {
  return classNames.reduce((styleObject, className) => {
    return {...styleObject, ...style[className]};
  }, {});
}

function createClassNameString(classNames) {
  return classNames.join(' ');
}

// this comment is here to demonstrate an extremely long line length, well beyond what you should probably allow in your own code, though sometimes you'll be highlighting code you can't refactor, which is unfortunate but should be handled gracefully

function createChildren(style, useInlineStyles) {
  let childrenCount = 0;
  return children => {
    childrenCount += 1;
    return children.map((child, i) => createElement({
      node: child,
      style,
      useInlineStyles,
      key: 'code-segment-\${childrenCount}-\${i}'
    }));
  }
}

function createElement({ node, style, useInlineStyles, key }) {
  const { properties, type, tagName, value } = node;
  if (type === "text") {
    return value;
  } else if (tagName) {
    const TagName = tagName;
    const childrenCreator = createChildren(style, useInlineStyles);
    const props = (
      useInlineStyles
      ? { style: createStyleObject(properties.className, style) }
      : { className: createClassNameString(properties.className) }
    );
    const children = childrenCreator(node.children);
    return <TagName key={key} {...props}>{children}</TagName>;
  }
}
\`\`\`
  `

export default function Message({
  me,
  markdownText,
  hiddenShadow = false,
}: MessageProps) {
  return (
    <div
      className={cn("col-end-13 rounded-lg p-3", {
        "col-start-4": me,
        "col-start-1": !me,
      })}
    >
      <div
        className={cn("flex items-start", {
          "flex-row-reverse": me,
          "flex-row": !me,
        })}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-400">
          {me ? me : <Image src={chatGptImage} alt="chat-gpt-image" />}
        </div>
        <div
          className={cn(
            "relative w-full overflow-x-auto rounded-md px-4 py-2 text-sm",
            {
              "mr-3 bg-indigo-100 dark:bg-indigo-900": me,
              "ml-3 bg-white dark:bg-slate-800": !me,
              shadow: !hiddenShadow,
            }
          )}
        >
          <Markdown
            rehypePlugins={[rehypeFormat, rehypeDomStringify]}
            remarkPlugins={[remarkParse, remarkToc, remarkGfm, remarkRehype]}
            components={{
              // @ts-ignore
              pre: Pre,
              code(props: any) {
                const { children, className, node, ...rest } = props
                const match = /language-(\w+)/.exec(className || "")
                return match ? (
                  <SyntaxHighlighter
                    {...rest}
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                )
              },
            }}
          >
            {markdownText}
          </Markdown>
        </div>
      </div>
    </div>
  )
}

function Pre({ children }: any) {
  return (
    <pre className="relative">
      <CodeCopyBtn>{children}</CodeCopyBtn>
      {children}
    </pre>
  )
}

function CodeCopyBtn({ children }: any) {
  const [copyOk, setCopyOk] = useState(false)

  const handleClick = () => {
    navigator.clipboard.writeText(children?.props?.children)

    setCopyOk(true)
    setTimeout(() => {
      setCopyOk(false)
    }, 500)
  }

  return (
    <button
      className="absolute right-3 top-3 z-10 rounded-md bg-slate-500 p-2 text-white hover:bg-slate-300"
      onClick={handleClick}
    >
      {copyOk ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-check"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-copy"
        >
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      )}
    </button>
  )
}
