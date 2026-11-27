// Shared by the survey form and the server action, so the options can't drift apart.

export const zeitOptions = [
  "Das Telefon klingelt ständig",
  "Termine vergeben und verschieben",
  "Patienten sagen ab oder kommen nicht",
  "Die Warteliste im Blick behalten",
  "Rezepte prüfen und abrechnen",
  "Papierkram und Vorschriften",
  "Gutes Personal finden",
  "Etwas anderes",
] as const

export const sorgenOptions = [
  "Zu wenig Personal",
  "Zu wenig Zeit für die Patienten",
  "Immer mehr Vorschriften",
  "Steigende Kosten",
  "Neue Pflichten, bei denen ich nicht durchblicke",
  "Nichts Besonderes, es läuft gut",
] as const

export const fachrichtungOptions = ["Ergotherapie", "Logopädie", "Physiotherapie", "Podologie", "Andere"] as const

export const groesseOptions = ["Nur ich", "2 bis 5", "Mehr als 5"] as const
