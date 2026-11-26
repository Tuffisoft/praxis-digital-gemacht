import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { Prose } from "@/components/site/blocks"

/** Renders Markdown from /content. Raw HTML is not rendered, only Markdown. */
export function Markdown({ children }: { children: string }) {
  if (!children.trim()) return null
  return (
    <Prose>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Content headings start below the page's h1.
          h1: ({ children }) => <h2>{children}</h2>,
          a: ({ href = "", children }) =>
            href.startsWith("http") ? (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ) : (
              <a href={href}>{children}</a>
            ),
          img: ({ src, alt }) =>
            // eslint-disable-next-line @next/next/no-img-element
            typeof src === "string" ? <img src={src} alt={alt ?? ""} loading="lazy" className="my-8 h-auto w-full rounded-xl" /> : null,
        }}
      >
        {children}
      </ReactMarkdown>
    </Prose>
  )
}
