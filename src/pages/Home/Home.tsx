import { memo, useEffect, useLayoutEffect, useState } from "react"
import "./home.sass"
import FadeIn from "src/components/FadeIn/FadeIn"
import Flex from "src/components/Flex/Flex"
import Logo from "/logoMf.svg"
import Fon from "/homefone.svg"
import { enterServices } from "src/services/enter.services"
import { Preloader } from "src/components/preloaders/PreloaderBall"
import { useNavigate } from "react-router-dom"
import { canvasScript } from "./canvas"

const Home = memo(() => {
  const [server, setServer] = useState<string | undefined>()
  const navigate = useNavigate()

  const checkServerRunning = async () => {
    setServer(undefined)
    const response = await enterServices.checkLoadingServer()
    if (response) {
      setServer(response)
    } else {
      setServer("Server is not running")
    }
  }

  document.addEventListener("mousemove", (event) => {
    Object.assign(document.documentElement, {
      style: `
    --move-x: ${(event.clientX - window.innerWidth / 2) * -0.003}deg;
    --move-y: ${(event.clientY - window.innerHeight / 2) * -0.008}deg;
    `,
    })
  })

  useEffect(() => {
    server !== "Server is running" && checkServerRunning()
  }, [])

  useLayoutEffect(() => {
    canvasScript()
  }, [])

  return (
    <FadeIn className="layers">
      <canvas
        id="waveCanvas"
        style={{ position: "absolute", zIndex: -2 }}
      ></canvas>
      <Flex column spredV centerV className="home">
        {server && server !== "Server is running" && (
          <Flex gap={30} onClick={checkServerRunning} className="serverload">
            <Preloader />
            <p>
              Сервер не активний!
              <br />
              <br />
              {server} <br />
              <span>
                Зачекайте 30 секунд,
                <br />
                та натисніть сюди
              </span>
            </p>
          </Flex>
        )}
        <h1 className="home__maintext">СВІТ ТВОЄЇ ПРИСТРАСТІ</h1>

        <div onClick={() => navigate("/mypage")} className="home__logobox">
          <img className="home__logobox__logo" src={Logo} alt="logo" />
        </div>
        <Flex column className="home__text">
          <h1>Моя рибалка</h1>
          <p>
            Тут Ви зможете зробити записи про Ваші рибалки, <br /> та
            переглянути, що і де ловлять інші.
          </p>
          <p>
            Ви зможете переглянути місця, відгуки, фото та коментарі по всіх
            місцях котрі додали інші користувачі. Уся інформація доступна тільки
            зареєстрованим користувачам.
          </p>
          <p onClick={() => navigate("/about")}>
            Перед тим як розпочати, ознайомтеся з правилами.
          </p>
          <a href="https://drive.google.com/uc?export=download&id=1Y2wW5GQHoS6rQPeWc1N6XQtnRVhpFW3W">
            download android apk
          </a>
        </Flex>
        <Flex center className="home__fone">
          <img src={Fon} alt="Fon" />
        </Flex>
      </Flex>
    </FadeIn>
  )
})

export default Home
