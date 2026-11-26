export type Profession = {
  slug: "ergotherapie" | "logopaedie" | "physiotherapie" | "podologie"
  name: string
  practice: string
  metaTitle: string
  metaDescription: string
  lead: string
  needsTitle: string
  needs: { title: string; text: string }[]
}

/**
 * Copy describes who each profession works with in general terms and what that means for a website.
 * No health claims, no promises of results (Heilmittelwerbegesetz).
 */
export const professions: Profession[] = [
  {
    slug: "ergotherapie",
    name: "Ergotherapie",
    practice: "Ergotherapie-Praxen",
    metaTitle: "Website für Ergotherapie-Praxen",
    metaDescription:
      "Websites für Ergotherapie-Praxen: gut lesbar, mit Vorlesefunktion und Terminanfrage. Für Eltern, Erwachsene und ältere Menschen verständlich.",
    lead: "In Ihre Praxis kommen Kinder mit ihren Eltern, Erwachsene und ältere Menschen. Ihre Website sollte für alle verständlich sein. Wir bauen sie so, dass sie das ist.",
    needsTitle: "Was Ihre Patientinnen und Patienten online brauchen",
    needs: [
      {
        title: "Eltern finden schnell, was sie suchen",
        text: "Schwerpunkte, Ablauf der ersten Stunde, was zur Verordnung gehört: klar gegliedert und in einfacher Sprache.",
      },
      {
        title: "Ältere Menschen kommen gut zurecht",
        text: "Große, gut lesbare Schrift, klare Kontraste und eine Vorlesefunktion auf jeder Seite.",
      },
      {
        title: "Anfragen kommen geordnet an",
        text: "Mit der Terminanfrage sehen Sie auf einen Blick, worum es geht, auch wenn die Warteliste lang ist.",
      },
    ],
  },
  {
    slug: "logopaedie",
    name: "Logopädie",
    practice: "Logopädie-Praxen",
    metaTitle: "Website für Logopädie-Praxen",
    metaDescription:
      "Websites für Logopädie-Praxen: einfache Sprache, Vorlesefunktion und Terminanfrage. Damit Kontakt auch ohne Telefon gelingt.",
    lead: "Viele Ihrer Patientinnen und Patienten haben Mühe mit Sprechen, Lesen oder Verstehen. Ihre Website kann ihnen den ersten Schritt leichter machen.",
    needsTitle: "Was Ihre Patientinnen und Patienten online brauchen",
    needs: [
      {
        title: "Kontakt ohne Telefonat",
        text: "Wer ungern telefoniert, schickt eine Terminanfrage online. Sie melden sich, wenn es passt.",
      },
      {
        title: "Texte, die man versteht",
        text: "Kurze Sätze, einfache Sprache und eine Vorlesefunktion für alle, die lieber zuhören.",
      },
      {
        title: "Eltern wissen, was sie erwartet",
        text: "Wie eine Behandlung abläuft und was Eltern mitbringen sollten: übersichtlich auf einer Seite.",
      },
    ],
  },
  {
    slug: "physiotherapie",
    name: "Physiotherapie",
    practice: "Physiotherapie-Praxen",
    metaTitle: "Website für Physiotherapie-Praxen",
    metaDescription:
      "Websites für Physiotherapie-Praxen: gut lesbar, mit Vorlesefunktion und Terminanfrage für Behandlungsserien.",
    lead: "Ihre Patientinnen und Patienten kommen mit einer Verordnung über mehrere Termine. Ihre Website sollte genau das abbilden, ohne Umwege.",
    needsTitle: "Was Ihre Praxis online braucht",
    needs: [
      {
        title: "Anfragen für ganze Behandlungsserien",
        text: "Patientinnen und Patienten geben an, was auf der Verordnung steht und wann sie können. Sie planen danach.",
      },
      {
        title: "Gut lesbar auf dem Smartphone",
        text: "Die meisten suchen unterwegs. Klare Schrift, große Schaltflächen und eine Vorlesefunktion helfen allen.",
      },
      {
        title: "Ein guter Eindruck bei Bewerbern",
        text: "Auch Therapeutinnen und Therapeuten schauen sich Ihre Website an. Eine klare Seite zu Team und Stellen gehört dazu.",
      },
    ],
  },
  {
    slug: "podologie",
    name: "Podologie",
    practice: "Podologie-Praxen",
    metaTitle: "Website für Podologie-Praxen",
    metaDescription:
      "Websites für Podologie-Praxen: große Schrift, klare Kontraste, Vorlesefunktion und Terminanfrage. Für Patientinnen und Patienten jeden Alters.",
    lead: "Viele Ihrer Patientinnen und Patienten sind älter, manche sehen schlecht. Ihre Website sollte sich danach richten.",
    needsTitle: "Was Ihre Patientinnen und Patienten online brauchen",
    needs: [
      {
        title: "Große Schrift, klare Kontraste",
        text: "Gut lesbar auch ohne Brille, und die Schrift wächst mit, wenn jemand sie im Browser vergrößert.",
      },
      {
        title: "Zuhören statt lesen",
        text: "Die Vorlesefunktion liest jede Seite vor. Ganz ohne zusätzliche App.",
      },
      {
        title: "Einfach einen Termin anfragen",
        text: "Wenige Felder, klare Beschriftungen. Sie melden sich mit einem passenden Termin.",
      },
    ],
  },
]

export const getProfession = (slug: Profession["slug"]) => {
  const profession = professions.find((p) => p.slug === slug)
  if (!profession) throw new Error(`Unknown profession: ${slug}`)
  return profession
}
