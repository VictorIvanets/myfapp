import Flex from "src/components/Flex/Flex"
import InputField from "src/components/Input/InputField"
import { commentSchema, type CommentSchemaDataFields } from "./commentSchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "src/components/Button/Button"
import { useSelector } from "react-redux"
import type { RootState } from "src/store/store"
import type { CommentPostPayloadT, PostT } from "src/types/posts.types"
import useCreatePostComment from "src/hooks/comment_post/useCreatePostComment"

interface AddCommentProps {
  data: PostT
}
const AddPostComment = ({ data }: AddCommentProps) => {
  const { create } = useCreatePostComment()
  const userInfo = useSelector((s: RootState) => s.auth?.userInfo)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CommentSchemaDataFields>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  })

  const submit = (comm: { comment: string }) => {
    const payload: CommentPostPayloadT = {
      postId: data._id,
      comment: comm.comment,
    }
    create(payload)
    reset()
  }

  return (
    <Flex column className="addpostcomment">
      <h4 className="tacenter">Напишіть коментар</h4>
      <form onSubmit={handleSubmit(submit)}>
        <InputField
          id="input_comment"
          {...register("comment")}
          error={errors.comment?.message}
          as="textarea"
          heightArea={50}
        />
        {userInfo && (
          <Button
            className="addpostcomment__btn"
            isValid={isValid}
            type="submit"
            appearence="big"
            title={"відправити"}
          />
        )}
      </form>
    </Flex>
  )
}

export default AddPostComment
