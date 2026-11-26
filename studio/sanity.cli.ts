import { defineCliConfig } from "sanity/cli"

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "",
    dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  },
  // Studio URL after `npm run deploy`: https://praxis-digital-gemacht.sanity.studio
  studioHost: "praxis-digital-gemacht",
})
