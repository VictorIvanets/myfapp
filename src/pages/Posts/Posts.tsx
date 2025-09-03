import "./posts.sass"
import Flex from "src/components/Flex/Flex"
import FadeIn from "src/components/FadeIn/FadeIn"
import Button from "src/components/Button/Button"
import { toastError, toastSuccess } from "src/components/Toasts/toasts"
import { useLoadingBar } from "react-top-loading-bar"
import { ThemeColor } from "src/sass/themeColor"

interface PostsProps {}
const Posts = ({}: PostsProps) => {
  const notify1 = () => toastSuccess({ message: "Успішна операція!" })

  const notify2 = () => toastError({ message: "Щось пішло не так!" })

  const { start, complete } = useLoadingBar({
    color: ThemeColor.$COLORACCENT,
    height: 5,
  })

  return (
    <FadeIn>
      <Flex column centerV spredV className="posts">
        <Button onClick={notify1} appearence="big" title="SUCCESS" />
        <Button onClick={notify2} appearence="big" title="ERROR" />
        <Button onClick={() => start()} appearence="big" title="Start" />
        <Button onClick={() => complete()} appearence="big" title="Complite" />
      </Flex>
    </FadeIn>
  )
}

export default Posts
