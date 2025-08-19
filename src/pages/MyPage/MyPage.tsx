import { memo, useEffect } from "react"
import "./mypage.sass"
import FadeIn from "src/components/FadeIn/FadeIn"
import Flex from "src/components/Flex/Flex"
import { Preloader } from "src/components/preloaders/PreloaderBall"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "src/store/store"
import { userThunk } from "src/store/auth.slice"
import { SwipeTabs } from "src/components/SwipeTabs/SwipeTabs"
import { TABS } from "./constants"
import MaterialIcon from "src/shared/icons/Materialicons"
import { Link } from "react-router-dom"
import left from "/baner1.png"
import right from "/baner2.png"

const MyPage = memo(() => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((s: RootState) => s.auth.userInfo)

  useEffect(() => {
    user ?? dispatch(userThunk())
  }, [user])

  return (
    <FadeIn>
      <Flex relativ column centerV spredV className="mypage">
        <Flex center className="mypage__mainbox">
          <SwipeTabs render={TABS} />
        </Flex>
        <Flex absolute className="mypage__advertisement__left">
          <img className="mypage__advertisement__img" src={left} alt="left" />
        </Flex>
        <Flex absolute className="mypage__advertisement__right">
          <img className="mypage__advertisement__img" src={right} alt="right" />
        </Flex>
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
})

export default MyPage
