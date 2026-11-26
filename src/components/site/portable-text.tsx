import Image from "next/image"
import { PortableText as PortableTextRenderer, type PortableTextComponents } from "@portabletext/react"

import { Prose } from "@/components/site/blocks"
import { imageUrl, type SanityImage } from "@/lib/sanity"

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImage }) => {
      const src = imageUrl(value, 1400)
      if (!src) return null
      return (
        <figure className="my-8">
          <Image src={src} alt={value.alt ?? ""} width={1400} height={800} className="h-auto w-full rounded-xl" />
        </figure>
      )
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#"
      const external = href.startsWith("http")
      return (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </a>
      )
    },
  },
}

export function PortableText({ value }: { value?: unknown[] }) {
  if (!value?.length) return null
  return (
    <Prose>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <PortableTextRenderer value={value as any} components={components} />
    </Prose>
  )
}
