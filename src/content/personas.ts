import type { Profession } from "./professions"

export type Persona = {
  profession: Profession["slug"]
  name: string
  role: string
  gender: "f" | "m"
  image: string
  alt: string
  /** One line for cards: who they are. */
  tagline: string
  story: string[]
  passion: string
  pains: string[]
  fixes: string[]
}

/**
 * Illustrated, invented characters that stand for typical practice owners.
 * They are never quoted and never presented as customers: the site says so openly.
 * "fixes" only list what Praxis digital gemacht offers today.
 */
export const personas: Persona[] = [
  {
    profession: "ergotherapie",
    name: "Anna",
    gender: "f",
    role: "Ergotherapeutin",
    image: "/team/anna.webp",
    alt: "Zeichnung von Anna, Ergotherapeutin, im Poloshirt mit Klemmbrett und Igelball in der Hand",
    tagline: "Führt eine kleine Praxis mit zwei Kolleginnen.",
    story: [
      "Anna führt eine kleine Ergotherapie-Praxis mit zwei Kolleginnen. Zu ihr kommen Kinder mit ihren Eltern, Erwachsene nach einem Unfall und ältere Menschen, die im Alltag wieder sicherer werden möchten.",
      "Zwischen zwei Behandlungen bleiben ihr oft nur ein paar Minuten. Genau dann klingelt das Telefon.",
    ],
    passion: "Die Momente, in denen jemand etwas wieder selbst schafft.",
    pains: [
      "Eltern rufen mehrmals an, um nach einem Platz auf der Warteliste zu fragen.",
      "Das Telefon klingelt, während sie behandelt.",
      "Die alte Website erklärt nicht, wie die erste Stunde abläuft oder was zur Verordnung gehört.",
      "Abends liegen noch Rechnungen und Post auf dem Schreibtisch.",
    ],
    fixes: [
      "Eine verständliche Website, auf der Eltern alles Wichtige finden.",
      "Eine Terminanfrage online, statt immer wieder anzurufen.",
      "Den Empfang von E-Rechnungen eingerichtet und erklärt.",
    ],
  },
  {
    profession: "logopaedie",
    name: "Kalli",
    gender: "m",
    role: "Logopäde",
    image: "/team/kalli.webp",
    alt: "Zeichnung von Kalli, Logopäde, mit Brille, Klemmbrett und einer Bildkarte in der Hand",
    tagline: "Arbeitet mit Kindern und Erwachsenen.",
    story: [
      "Kalli ist Logopäde und hat seine Praxis vor einigen Jahren übernommen. Er arbeitet mit Kindern, die Laute üben, und mit Erwachsenen, denen das Sprechen schwerfällt.",
      "Viele seiner Patientinnen und Patienten telefonieren nicht gern. Manche können es gar nicht.",
    ],
    passion: "Dass sich Menschen wieder verständigen können.",
    pains: [
      "Ausgerechnet seine Patientinnen und Patienten tun sich am Telefon schwer.",
      "Die Texte auf seiner Website sind lang und kompliziert.",
      "Eltern fragen immer wieder dasselbe: Wie läuft die Behandlung ab, was muss ich mitbringen?",
      "Zwischen Behandlungen und Berichten bleibt kaum Zeit für den Rest.",
    ],
    fixes: [
      "Eine Terminanfrage online, ganz ohne Telefonat.",
      "Texte in einfacher Sprache und eine Vorlesefunktion auf jeder Seite.",
      "Antworten auf die häufigsten Fragen der Eltern, gut auffindbar.",
    ],
  },
  {
    profession: "physiotherapie",
    name: "Hektor",
    gender: "m",
    role: "Physiotherapeut",
    image: "/team/hektor.webp",
    alt: "Zeichnung von Hektor, Physiotherapeut, im Poloshirt mit Tape am Gürtel und einem Theraband in der Hand",
    tagline: "Leitet eine Praxis mit sechs Mitarbeitenden.",
    story: [
      "Hektor leitet eine Physiotherapie-Praxis mit sechs Mitarbeitenden. Seine Tage sind eng getaktet, eine Behandlung folgt auf die nächste.",
      "Fast jede Patientin und jeder Patient kommt mit einer Verordnung über mehrere Termine.",
    ],
    passion: "Menschen wieder in Bewegung zu bringen.",
    pains: [
      "Ganze Behandlungsserien am Telefon zu planen, kostet viel Zeit.",
      "Abgesagte Termine fallen erst auf, wenn es zu spät ist.",
      "Gute Therapeutinnen und Therapeuten zu finden, ist schwer, und seine Website hilft dabei nicht.",
      "Auf dem Smartphone ist seine Website kaum zu bedienen.",
    ],
    fixes: [
      "Eine Terminanfrage, bei der Patientinnen und Patienten gleich angeben, was auf der Verordnung steht.",
      "Eine Website, die auf dem Smartphone gut funktioniert.",
      "Eine klare Seite zu Team und Stellen, die Bewerberinnen und Bewerber anspricht.",
    ],
  },
  {
    profession: "podologie",
    name: "Thea",
    gender: "f",
    role: "Podologin",
    image: "/team/thea.webp",
    alt: "Zeichnung von Thea, Podologin, im hellen Kasack mit Namensschild und Klemmbrett",
    tagline: "Behandelt viele ältere Menschen.",
    story: [
      "Thea ist Podologin mit eigener Praxis. Viele ihrer Patientinnen und Patienten sind älter, einige haben Diabetes und kommen regelmäßig, Monat für Monat.",
      "Manche sehen schlecht, andere sind mit dem Internet nicht vertraut.",
    ],
    passion: "Sorgfältige Arbeit, die man im Alltag spürt.",
    pains: [
      "Kleine Schrift und unübersichtliche Seiten schrecken ihre Patientinnen und Patienten ab.",
      "Komplizierte Online-Formulare werden abgebrochen, also wird doch wieder angerufen.",
      "Lieferanten schicken Rechnungen inzwischen als E-Rechnung, und keiner weiß, wie man sie öffnet.",
    ],
    fixes: [
      "Große Schrift, klare Kontraste und eine Vorlesefunktion.",
      "Eine einfache Terminanfrage mit wenigen Feldern.",
      "Den Empfang von E-Rechnungen eingerichtet, mit einer kurzen Anleitung.",
    ],
  },
]

export const getPersona = (profession: Profession["slug"]) => {
  const persona = personas.find((p) => p.profession === profession)
  if (!persona) throw new Error(`No persona for ${profession}`)
  return persona
}
