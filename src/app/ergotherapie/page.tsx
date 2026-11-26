import { ProfessionPage, professionMetadata } from "@/components/site/profession-page"

export const metadata = professionMetadata("ergotherapie")

export default function Page() {
  return <ProfessionPage slug="ergotherapie" />
}
