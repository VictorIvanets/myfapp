import "./addpoast.sass"
import { memo, useState } from "react"
import Button from "src/components/Button/Button"
import Flex from "src/components/Flex/Flex"
import useCreatePost from "src/hooks/posts/useCreatePost"
import { ColorsKey, schemaColorCrard } from "src/shared/colorSchemaCard"
import ColorCard from "./ColorCard"
import { useForm } from "react-hook-form"
import { postSchema, type PostSchemaDataFields } from "./postSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import InputField from "src/components/Input/InputField"

type Props = { setTab: (value: number) => void }
const CreatePost = memo(({ setTab }: Props) => {
  const [colorValue, setColorValue] = useState<ColorsKey>(ColorsKey.TEXTGRAY)

  const { create } = useCreatePost(setTab)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostSchemaDataFields>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      post: "",
    },
  })

  const submit = (data: { post: string }) => {
    create({ description: data.post, colorSchema: colorValue })
    reset()
  }

  return (
    <>
      <Flex gap={10} center column className="createpost">
        <Flex column center gap={5}>
          <h2>Додайте запис</h2>
          <p>(Питання, оголошення, тощо)</p>
        </Flex>
        <Flex className="createpost__textarea">
          <InputField
            as="textarea"
            heightArea={100}
            id="input_title_add"
            {...register("post")}
            error={errors.post?.message}
          />
        </Flex>
        <Flex center row gap={10} className="createpost__color">
          {schemaColorCrard.map((i) => (
            <ColorCard
              colorValue={colorValue}
              setColorValue={setColorValue}
              key={i.name}
              name={i.name}
              background={i.background}
              text={i.text}
            />
          ))}
        </Flex>
        <Button
          onClick={handleSubmit(submit)}
          appearence="big"
          title="створити"
        />
      </Flex>
    </>
  )
})

export default CreatePost
