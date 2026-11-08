import type { ReactNode } from "react"

/**
 * Minimal Markdown renderer for the built-in blog posts.
 *
 * The post bodies are a small, fixed subset of Markdown (h2/h3 headings,
 * unordered and ordered lists, bold spans). Rendering them as React nodes
 * avoids the previous `dangerouslySetInnerHTML` call, which injected the raw
 * Markdown into the DOM so readers saw literal `##` and `**` characters.
 */

type Block =
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }

function parse(content: string): Block[] {
  const blocks: Block[] = []
  let paragraph: string[] = []
  let list: { kind: "ul" | "ol"; items: string[] } | null = null

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      blocks.push({ kind: "p", text: paragraph.join(" ") })
      paragraph = []
    }
  }

  const flushList = () => {
    if (list) {
      blocks.push(list)
      list = null
    }
  }

  for (const rawLine of content.replace(/\r\n/g, "\n").split("\n")) {
    const line = rawLine.trim()

    if (!line) {
      flushParagraph()
      flushList()
      continue
    }

    const heading = /^(#{2,4})\s+(.*)$/.exec(line)
    if (heading) {
      flushParagraph()
      flushList()
      blocks.push({
        kind: heading[1].length === 2 ? "h2" : "h3",
        text: heading[2],
      })
      continue
    }

    const bullet = /^[-*]\s+(.*)$/.exec(line)
    if (bullet) {
      flushParagraph()
      if (!list || list.kind !== "ul") {
        flushList()
        list = { kind: "ul", items: [] }
      }
      list.items.push(bullet[1])
      continue
    }

    const numbered = /^\d+\.\s+(.*)$/.exec(line)
    if (numbered) {
      flushParagraph()
      if (!list || list.kind !== "ol") {
        flushList()
        list = { kind: "ol", items: [] }
      }
      list.items.push(numbered[1])
      continue
    }

    flushList()
    paragraph.push(line)
  }

  flushParagraph()
  flushList()
  return blocks
}

/** Renders `**bold**` spans; everything else is plain text. */
function withEmphasis(text: string): ReactNode[] {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, index) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={index} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      ) : (
        <span key={index}>{part}</span>
      )
    )
}

export function Markdown({ content }: { content: string }) {
  const blocks = parse(content)

  return (
    <>
      {blocks.map((block, index) => {
        switch (block.kind) {
          case "h2":
            return <h2 key={index}>{withEmphasis(block.text)}</h2>
          case "h3":
            return <h3 key={index}>{withEmphasis(block.text)}</h3>
          case "ul":
            return (
              <ul key={index}>
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{withEmphasis(item)}</li>
                ))}
              </ul>
            )
          case "ol":
            return (
              <ol key={index}>
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{withEmphasis(item)}</li>
                ))}
              </ol>
            )
          default:
            return <p key={index}>{withEmphasis(block.text)}</p>
        }
      })}
    </>
  )
}

export default Markdown
