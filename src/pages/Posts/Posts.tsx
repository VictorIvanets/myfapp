import "./posts.sass"
import Flex from "src/components/Flex/Flex"
import FadeIn from "src/components/FadeIn/FadeIn"
import { TABS } from "./constants"
import { SwipeTabs } from "src/components/SwipeTabs/SwipeTabs"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Preloader } from "src/components/preloaders/PreloaderBall"
import MaterialIcon from "src/shared/icons/Materialicons"
import { userThunk } from "src/store/auth.slice"
import type { AppDispatch, RootState } from "src/store/store"
// import left from "/baner1.png"
// import right from "/baner2.png"

interface PostsProps {}
const Posts = ({}: PostsProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((s: RootState) => s.auth.userInfo)
  const [tab, setTab] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (tab === 1) setTab(undefined)
  }, [tab])

  useEffect(() => {
    user ?? dispatch(userThunk())
  }, [user])

  return (
    <FadeIn>
      <Flex relativ column centerV spredV className="mypage">
        <Flex center className="mypage__mainbox">
          <SwipeTabs onTab={tab} render={TABS(setTab)} />
        </Flex>
        {/* <Flex absolute className="mypage__advertisement__left">
          <img className="mypage__advertisement__img" src={left} alt="left" />
        </Flex>
        <Flex absolute className="mypage__advertisement__right">
          <img className="mypage__advertisement__img" src={right} alt="right" />
        </Flex> */}
        <Flex className="mypage__footer">
          {!user ? (
            <Preloader />
          ) : (
            <Flex center gap={12} padding>
              <p className="COLORACCENT">
                {user?.name} {user?.subname} ○ {user?.city} ► {user?.country}
              </p>
            </Flex>
          )}
        </Flex>
        <Flex title="MAP" gap={7} centerV className="mypage__link">
          <Link to={"/mappage"}>
            <h1>
              <MaterialIcon name="MdOutlineMap" />
            </h1>
          </Link>
        </Flex>
      </Flex>
    </FadeIn>
  )
}

export default Posts
