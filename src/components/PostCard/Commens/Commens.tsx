import Flex from "src/components/Flex/Flex"
import "./comments.sass"
import type { PostT } from "src/types/posts.types"
import CommentPostCard from "src/components/CommentPostCard/CommentCard"
import { useSelector } from "react-redux"
import type { RootState } from "src/store/store"
import { Preloader } from "src/components/preloaders/PreloaderBall"
import useGetPostComments from "src/hooks/comment_post/useGetPostComments"
import AddPostComment from "./addComment"
interface CommentsProps {
  data: PostT
}

const Comments = ({ data }: CommentsProps) => {
  const userId = useSelector((s: RootState) => s.auth.userInfo?._id)

  const { comments, isLoading } = useGetPostComments(data._id)

  return (
    <Flex column gap={10} className="commentspost">
      <Flex column>
        {!isLoading && !comments?.length && (
          <Flex column flex center>
            <p>Коментарі відсутні. Напишіть коментар для цього запису</p>
            <p></p>
          </Flex>
        )}
        {isLoading && <Preloader />}
        {!isLoading &&
          comments &&
          comments.map((i) => (
            <CommentPostCard
              postId={data._id}
              userId={userId}
              key={i._id}
              data={i}
            />
          ))}
      </Flex>

      <AddPostComment data={data} />
    </Flex>
  )
}

export default Comments
