import type { TabsT } from "src/components/SwipeTabs/SwipeTabs"
import AllPosts from "./AllPosts"
import MyPosts from "./MyPosts"
import CreatePost from "./CreatePost/CreatePost"

export const TABS = (setTab: (value: number) => void): TabsT[] => [
  {
    title: "Дошка",
    components: <AllPosts />,
  },
  {
    title: "Мої записи",
    components: <MyPosts />,
  },
  {
    title: "Створити",
    components: <CreatePost setTab={setTab} />,
  },
]
