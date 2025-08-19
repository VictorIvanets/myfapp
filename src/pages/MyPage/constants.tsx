import type { TabsT } from "src/components/SwipeTabs/SwipeTabs"
import { Start } from "../Start"
import { AllFishingPage } from "../AllFishingPage"
import { PaidPlace } from "../PaidPlace"

export const TABS: TabsT[] = [
  {
    title: "мої рибалки",
    components: <Start />,
  },
  {
    title: "всі рибалки",
    components: <AllFishingPage />,
  },
  {
    title: "платні водойми",
    components: <PaidPlace />,
  },
]
