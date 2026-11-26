export type Faq = { id: string; question: string; answer: string[]; topic: "allgemein" | "website" | "e-rechnung" | "barrierefreiheit" }

/**
 * Answers stay within what we know and offer. Anything about prices, contracts
 * or legal duties that is not settled yet is deliberately left out.
 */
export const faqs: Faq[] = [
  {
    id: "technik",
    topic: "allgemein",
    question: "Ich kenne mich mit Technik nicht aus. Ist das ein Problem?",
    answer: [
      "Nein. Wir erklären alles in Ruhe und ohne Fachbegriffe. Den technischen Teil übernehmen wir.",
    ],
  },
  {
    id: "fuer-wen",
    topic: "allgemein",
    question: "Für welche Praxen ist das Angebot gedacht?",
    answer: [
      "Für Heilmittelpraxen: Ergotherapie, Logopädie, Physiotherapie und Podologie. Wir kennen den Alltag dieser Praxen mit Verordnungen, Behandlungsserien und vollen Wartelisten.",
    ],
  },
  {
    id: "wer",
    topic: "allgemein",
    question: "Wer steckt hinter Praxis digital gemacht?",
    answer: [
      "Praxis digital gemacht ist ein Angebot von Studio Fi aus Detmold. Vertrag und Rechnung kommen deshalb von Studio Fi.",
    ],
  },
  {
    id: "ablauf",
    topic: "allgemein",
    question: "Wie läuft die Zusammenarbeit ab?",
    answer: [
      "Zuerst sprechen wir über Ihre Praxis: wie Ihr Alltag aussieht und was Sie brauchen. Dann richten wir Website, Terminanfrage und den Empfang von E-Rechnungen ein. Sie behandeln weiter.",
    ],
  },
  {
    id: "vorlesen",
    topic: "website",
    question: "Wie funktioniert die Vorlesefunktion?",
    answer: [
      "Auf jeder Seite gibt es einen Knopf „Vorlesen“. Er nutzt die Sprachausgabe, die im Browser Ihrer Patientinnen und Patienten schon eingebaut ist. Es wird nichts an einen fremden Dienst geschickt. Sie können es auf dieser Seite ausprobieren.",
      "Wie die Stimme klingt, hängt vom Gerät ab.",
    ],
  },
  {
    id: "terminanfrage",
    topic: "website",
    question: "Ist die Terminanfrage eine Online-Buchung?",
    answer: [
      "Nein, bewusst nicht. Patientinnen und Patienten schicken eine Anfrage, zum Beispiel mit ihrer Verordnung und den Zeiten, die ihnen passen. Sie sehen alles auf einen Blick und entscheiden selbst, welcher Termin passt.",
    ],
  },
  {
    id: "aendern",
    topic: "website",
    question: "Kann ich Inhalte später selbst ändern?",
    answer: [
      "Ja. Öffnungszeiten, Urlaub oder ein neues Teammitglied sollen Sie ohne IT-Kenntnisse selbst ändern können. Was genau dazugehört, besprechen wir im Gespräch.",
    ],
  },
  {
    id: "e-rechnung-schreiben",
    topic: "e-rechnung",
    question: "Muss meine Praxis jetzt E-Rechnungen schreiben?",
    answer: [
      "Für Heilbehandlungen in der Regel nicht. Sie sind nach § 4 Nr. 14 UStG von der Umsatzsteuer befreit und deshalb von der Pflicht zur E-Rechnung ausgenommen.",
      "Empfangen müssen Sie E-Rechnungen aber können, zum Beispiel von Lieferanten. Was genau für Ihre Praxis gilt, klären Sie am besten mit Ihrer Steuerberatung.",
    ],
  },
  {
    id: "e-rechnung-empfangen",
    topic: "e-rechnung",
    question: "Was brauche ich, um E-Rechnungen zu empfangen?",
    answer: [
      "Für den Anfang genügt ein E-Mail-Postfach. Wir richten Ihnen eine eigene Adresse für Rechnungen ein und zeigen Ihnen, wie Sie eine E-Rechnung öffnen und lesen.",
    ],
  },
  {
    id: "kassenabrechnung",
    topic: "e-rechnung",
    question: "Ändert sich etwas an der Abrechnung mit den Krankenkassen?",
    answer: [
      "Nein. Die Abrechnung mit den Krankenkassen läuft über ein eigenes Verfahren und ist etwas anderes als die E-Rechnung aus dem Umsatzsteuergesetz.",
    ],
  },
  {
    id: "barrierefrei",
    topic: "barrierefreiheit",
    question: "Ist die Website barrierefrei?",
    answer: [
      "Wir bauen barrierearm: einfache Sprache, gut lesbare Gestaltung, Vorlesefunktion. Was im Einzelnen umgesetzt ist, sagen wir Ihnen offen.",
    ],
  },
  {
    id: "datenschutz",
    topic: "barrierefreiheit",
    question: "Wie gehen Sie mit Daten um?",
    answer: [
      "So sparsam wie möglich. Auf dieser Website liegen die Schriften auf unserem eigenen Server, und es gibt kein Tracking. Deshalb brauchen wir auch keinen Cookie-Hinweis. Welche Dienste wir für Ihre Website einsetzen, besprechen wir mit Ihnen.",
    ],
  },
]

export const faqsByTopic = (topic: Faq["topic"]) => faqs.filter((f) => f.topic === topic)
export const faqsById = (ids: string[]) => ids.map((id) => faqs.find((f) => f.id === id)).filter((f): f is Faq => !!f)

export function faqJsonLd(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer.join(" ") },
    })),
  }
}
