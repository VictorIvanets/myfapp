import type { PostT } from "src/types/posts.types"
import "./postcard.sass"
import colorSchemaCard from "src/shared/colorSchemaCard"
import Flex from "../Flex/Flex"
import normalizeMongoDate from "src/helpers/normalizeMongoDate"
import { BiCommentDetail } from "react-icons/bi"
import { colors } from "src/shared/colors"
import Button from "../Button/Button"
import { useSelector } from "react-redux"
import type { RootState } from "src/store/store"
import { useState } from "react"
import Comments from "./Commens/Commens"
import CkeckDeleteComment from "../CommentList/Delete/CkeckDeleteComment"
import useDeletePost from "src/hooks/posts/useDeletePost"
interface PostCardProps {
  data: PostT
}
const PostCard = ({ data }: PostCardProps) => {
  const { background, text } = colorSchemaCard(data.colorSchema)
  const userId = useSelector((s: RootState) => s.auth.userInfo?._id)
  const [commentsView, setComments] = useState(false)
  const [checkDel, setCheckDel] = useState(false)
  const { deletePost, isLoading } = useDeletePost()

  return (
    <Flex column center className="postcardwrwpper">
      <div style={{ backgroundColor: background }} className="postcard">
        <h1 style={{ color: text }}>{data.description}</h1>
      </div>
      <Flex centerV flex spredV className="postcard__footer">
        <p>Додав: {data.userLogin}</p>
        <Flex
          onClick={() => setComments(!commentsView)}
          className="postcard__comment"
          gap={4}
        >
          <p>{data.commentCount}</p>
          <BiCommentDetail color={colors.TEXT} size={15} />
        </Flex>
        <p>{normalizeMongoDate(data.createdAt)}</p>
        {userId === data.userId && (
          <Button
            disabled={isLoading}
            onClick={() => setCheckDel(true)}
            title="delete"
          />
        )}
      </Flex>
      {checkDel && (
        <CkeckDeleteComment
          titleCheck={"видалити запис?"}
          setDeleteItem={setCheckDel}
          deleteItem={() => deletePost(data._id)}
        />
      )}
      {commentsView && data && <Comments data={data} />}
    </Flex>
  )
}

export default PostCard
