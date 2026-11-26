import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Faq } from "@/content/faq"

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <Accordion className="max-w-3xl rounded-xl border bg-card px-5">
      {items.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id}>
          <AccordionTrigger className="py-5 text-lg">{faq.question}</AccordionTrigger>
          <AccordionContent className="space-y-3 text-base leading-relaxed text-muted-foreground">
            {faq.answer.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
