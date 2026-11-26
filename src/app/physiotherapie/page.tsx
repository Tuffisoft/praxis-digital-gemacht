import { ProfessionPage, professionMetadata } from "@/components/site/profession-page"

export const metadata = professionMetadata("physiotherapie")

export default function Page() {
  return <ProfessionPage slug="physiotherapie" />
}
