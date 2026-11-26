import { ProfessionPage, professionMetadata } from "@/components/site/profession-page"

export const metadata = professionMetadata("podologie")

export default function Page() {
  return <ProfessionPage slug="podologie" />
}
