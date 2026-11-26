import { ProfessionPage, professionMetadata } from "@/components/site/profession-page"

export const metadata = professionMetadata("logopaedie")

export default function Page() {
  return <ProfessionPage slug="logopaedie" />
}
