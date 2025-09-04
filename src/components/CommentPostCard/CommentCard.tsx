import { memo, useState } from "react"
import Flex from "../Flex/Flex"
import "./commentCard.sass"
import MaterialIcon from "src/shared/icons/Materialicons"
import normalizeMongoDate from "src/helpers/normalizeMongoDate"
import CkeckDeleteComment from "./Delete/CkeckDeleteComment"
import type { CommentPostT } from "src/types/posts.types"
import useDeletePostComment from "src/hooks/comment_post/useDeletePostComment"

interface CardProps {
  data: CommentPostT
  userId: string | undefined
  postId: string
}

const CommentPostCard = memo(({ data, userId, postId }: CardProps) => {
  const { deleteComment, isLoading } = useDeletePostComment(postId)
  const [checkDel, setCheckDel] = useState(false)

  return (
    <Flex className="postcommentcard_wrapper">
      <Flex flex className="postcommentcard">
        <p>{data.comment}</p>
        <Flex gap={5} className="postcommentcard__name">
          <p>{data.login}</p> <p>{normalizeMongoDate(data.createdAt)}</p>
        </Flex>
      </Flex>
      {!isLoading && userId === data.useId && (
        <h1
          onClick={() => setCheckDel(true)}
          className="postcommentcard__delete"
        >
          <MaterialIcon name="MdDeleteForever" />
        </h1>
      )}
      {isLoading && userId === data.useId && (
        <h1 className="postcommentcard__delete">
          <MaterialIcon name="MdAutoDelete" />
        </h1>
      )}
      {checkDel && (
        <CkeckDeleteComment
          titleCheck={"видалити коментар?"}
          setDeleteItem={setCheckDel}
          deleteItem={() => deleteComment({ commentId: data._id, postId })}
        />
      )}
    </Flex>
  )
})

export default CommentPostCard
