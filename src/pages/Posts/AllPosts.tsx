import "./posts.sass"
import { memo } from "react"
import Flex from "src/components/Flex/Flex"
import InputText from "src/components/Input/InputText"
import PostList from "src/components/PostList/PostList"
import useGetAllPost from "src/hooks/posts/useGetAllPosts"
const AllPostPage = memo(() => {
  const {
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    posts,
    valueDescription,
    setValueDescription,
  } = useGetAllPost()

  return (
    <>
      <Flex centerH className="allpost">
        <Flex column className="allpost__list">
          <InputText
            value={valueDescription}
            onChange={(e) => setValueDescription(e.target.value)}
            id="input_descriptoin_search"
            label="Пошук"
            searchLabel
          />
          <PostList
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isLoading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
            data={posts}
          />
          {isError && <h4>{error?.message}</h4>}
        </Flex>
      </Flex>
    </>
  )
})

export default AllPostPage
