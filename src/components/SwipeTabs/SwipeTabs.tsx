import { useEffect, useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import type { Swiper as SwiperType } from "swiper"
import "./swiper.sass"

type SwipeTabsProps = {
  render: TabsT[]
}

export const ACTIVE_TAB = "activeTabMyFishing"

export type TabsT = {
  title: string
  components: React.ReactNode
}

export const SwipeTabs = ({ render }: SwipeTabsProps) => {
  const [activeTab, setActiveTab] = useState(
    sessionStorage.getItem(ACTIVE_TAB) || 0
  )
  const swiperRef = useRef<SwiperType | null>(null)

  useEffect(() => {
    const saved = sessionStorage.getItem(ACTIVE_TAB)
    if (saved !== null) {
      setActiveTab(Number(saved))
      swiperRef.current?.slideTo(Number(saved))
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem(ACTIVE_TAB, String(activeTab))
  }, [activeTab])

  const handleTabClick = (index: number) => {
    setActiveTab(index)
    swiperRef.current?.slideTo(index)
  }

  return (
    <div className="swipercontainer">
      <div className="swipercontainer__tabs">
        {render.map((i, idx) => (
          <button
            key={idx}
            className="swipertabs"
            onClick={() => handleTabClick(idx)}
            style={{
              borderBottom:
                activeTab === idx
                  ? "1px solid #008db8"
                  : "1px solid transparent",
              color: activeTab === idx ? "#008db8" : "#adadad",
              fontSize: "1.4rem",
              fontWeight: activeTab === idx ? 600 : 400,
            }}
          >
            {i.title}
          </button>
        ))}
      </div>
      <Swiper
        className="swiperwrapper"
        onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
          swiper.slideTo(activeTab, 0)
        }}
        slidesPerView={1}
        spaceBetween={20}
      >
        {render.map((i, index) => (
          <SwiperSlide key={index}>
            <div style={{ height: "100%" }}>{i.components}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
