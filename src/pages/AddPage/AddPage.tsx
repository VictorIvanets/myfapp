import { useNavigate } from "react-router-dom"
import "./addpage.sass"
import Flex from "src/components/Flex/Flex"
import FadeIn from "src/components/FadeIn/FadeIn"
import { useLocation } from "react-router-dom"
import type { LatLngLiteral } from "leaflet"
import { getWeatherApi } from "src/services/getWeather"
import { useEffect, useState } from "react"
import type { WeatherT } from "src/types/weather.types"
import {
  addFishingSchema,
  type AddFishingSchemaDataFields,
} from "./addFishingSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Button from "src/components/Button/Button"
import type {
  FishingPayloadT,
  OneFishingT,
  PaidFishingT,
} from "src/types/fishing"
import MaterialIcon from "src/shared/icons/Materialicons"
import InputField from "src/components/Input/InputField"
import useCreateFising from "src/hooks/useCreateFising"
import useUpdateFising from "src/hooks/useUpdateFising"
import { cleanStr } from "src/helpers/cleanObjectStrings"
import { useSelector } from "react-redux"
import type { RootState } from "src/store/store"
import { Preloader } from "src/components/preloaders/PreloaderBall"

type LocationState = {
  data?: OneFishingT
  position?: LatLngLiteral
}

const AddPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LocationState
  const currentUser = useSelector((s: RootState) => s.auth.userInfo?.login)

  const [weather, setWeather] = useState<WeatherT | undefined>()
  const [createPaid, setCreatePaid] = useState(false)
  const { create, isLoading } = useCreateFising()
  const { updete, isLoading: updateisLoading } = useUpdateFising(
    state.data?._id || ""
  )

  const getWeather = async () => {
    const result = state.position && (await getWeatherApi(state.position))
    setWeather(result)
  }

  useEffect(() => {
    !weather && getWeather()
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<AddFishingSchemaDataFields>({
    resolver: zodResolver(addFishingSchema),
    defaultValues: {
      title: state.data ? state.data?.title : "",
      description: state.data ? state.data?.description : "",
      score: state.data ? state.data?.score : 0,
      date: state.data ? state.data?.date : "",
      paidTitle: state.data && state.data.paid ? state.data.paid?.title : "",
      paidOwner: state.data && state.data.paid ? state.data.paid?.owner : "",
      paidPrise: state.data && state.data.paid ? state.data.paid?.price : 0,
      paidContact:
        state.data && state.data.paid
          ? state.data.paid?.contact.join(", ")
          : "",
    },
  })

  const submit = async (data: {
    title: string
    description: string
    score: number
    date: string
    paidTitle: string
    paidOwner: string
    paidPrise: number
    paidContact: string
  }) => {
    if (weather && state.position && state.position.lat && state.position.lng) {
      const paidFishing: PaidFishingT = {
        title: data.paidTitle,
        price: data.paidPrise,
        owner: data.paidOwner,
        contact: cleanStr(data.paidContact).split(", "),
      }

      const paramsFishing: FishingPayloadT = {
        title: cleanStr(data.title),
        description: cleanStr(data.description),
        score: data.score,
        date: data.date,
        coords: [state.position.lat, state.position.lng],
        img: [],
        weather: weather,
        paid:
          currentUser && currentUser === "admin" && data.paidTitle !== ""
            ? paidFishing
            : undefined,
      }
      create(paramsFishing)
      // navigate(`/mypage`)
    }
    reset()
  }

  const update = async (data: {
    title: string
    description: string
    score: number
    date: string
    paidTitle: string
    paidOwner: string
    paidPrise: number
    paidContact: string
  }) => {
    if (state.data) {
      const paidFishing: PaidFishingT = {
        title: data.paidTitle,
        price: data.paidPrise,
        owner: data.paidOwner,
        contact: cleanStr(data.paidContact).split(", "),
      }

      const updateParamsFishing: Omit<
        FishingPayloadT,
        "coords" | "img" | "weather"
      > = {
        title: cleanStr(data.title),
        description: cleanStr(data.description),
        score: data.score,
        date: data.date,
        paid:
          currentUser && currentUser === "admin" && data.paidTitle !== ""
            ? paidFishing
            : undefined,
      }

      const _id = state.data?._id || ""
      const payload = { ...state.data, ...updateParamsFishing }
      updete({ _id, payload })
      navigate(`/details/${_id}`)
    }
    reset()
  }

  return (
    <FadeIn>
      <Flex column centerV spredV className="addpage">
        {state.data ? (
          <Flex column center>
            <h1 className="tacenter">Оновлення даних</h1>
            <p className="tacenter">
              Ви можете оновити тільки назву, опис, оцінку та дату
            </p>
            <p className="tacenter">
              Координати та погодні умови не змінюються
            </p>
          </Flex>
        ) : (
          <Flex column center>
            <h1 className="tacenter">Створіть запис про рибалку</h1>
            <p>Додайте назву, опис, оцінку та дату</p>
            <p className="tacenter">
              В описі, бажано, перерахувати що ловилося, та на що
            </p>
            <p className="tacenter">
              Опис бажано робити українською, <br /> щоб був коректний пошук
              ("короп", "товстолоб")
            </p>
          </Flex>
        )}
        <form
          onSubmit={handleSubmit(state.data ? update : submit)}
          className="login__submitform addpage__submitform"
        >
          <Flex center column gap={25}>
            <Flex className="login__submitform__input" column gap={10}>
              <InputField
                id="input_title_add"
                label="Назва"
                {...register("title")}
                error={errors.title?.message}
              />
              <p className="addpage__descriptionarea">
                Опис. Наишіть що ловили, на що, чим...
              </p>
              <InputField
                id="input_description_add"
                {...register("description")}
                error={errors.description?.message}
                as="textarea"
                heightArea={170}
              />
              <Flex gap={10}>
                <InputField
                  id="input_score_add"
                  label="Оцінка"
                  type="number"
                  min="0"
                  max="10"
                  {...register("score", { valueAsNumber: true })}
                  error={errors.score?.message}
                />
                <InputField
                  ibackground
                  id="input_date_add"
                  label="Дата"
                  type="datetime-local"
                  {...register("date")}
                  error={errors.date?.message}
                />
              </Flex>
            </Flex>
            <Flex flex center gap={5}>
              <Button
                isValid={isValid}
                type="submit"
                appearence="big"
                title={!state.data ? "СТВОРИТИ" : "ОНОВИТИ"}
              />
              {currentUser === "admin" && (
                <Button
                  type="button"
                  appearence="big"
                  title={"PAID"}
                  onClick={() => setCreatePaid(!createPaid)}
                />
              )}
            </Flex>
          </Flex>
          {createPaid && (
            <Flex absolute className="addpage__paidform" column gap={10}>
              <InputField
                id="input_title_add_paid"
                label="Точна назва місця"
                {...register("paidTitle")}
              />
              <InputField
                id="input_price_add_paid"
                label="Ціна"
                type="number"
                {...register("paidPrise", { valueAsNumber: true })}
              />

              <InputField
                id="input_owner_add_paid"
                label="Власник, або охоронець"
                {...register("paidOwner")}
              />
              <InputField
                id="input_contact_add_paid"
                label="Контактні дані (через кому ', ')"
                {...register("paidContact")}
              />
            </Flex>
          )}
          {(updateisLoading || isLoading) && (
            <Flex absolute className="addpage__preloader" column gap={10}>
              <Preloader />
            </Flex>
          )}
        </form>

        <Flex className="addpage__back" onClick={() => navigate(-1)}>
          <h1>
            <MaterialIcon name="MdArrowBackIos" />
          </h1>
        </Flex>
      </Flex>
    </FadeIn>
  )
}

export default AddPage
