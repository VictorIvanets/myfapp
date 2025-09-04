import { useEffect, useRef, memo } from "react"
import "./postlist.sass"
import type {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query"
import { Preloader } from "../preloaders/PreloaderBall"
import type { PostT } from "src/types/posts.types"
import PostCard from "../PostCard/PostCard"

interface ListProps {
  data: PostT[]
  label?: string
  hasNextPage?: boolean
  fetchNextPage?: (
    options?: FetchNextPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<{ data: PostT[]; nextCursor: string | null }, unknown>,
      Error
    >
  >
  isLoading?: boolean
  isFetchingNextPage?: boolean
}

const PostList = memo(
  ({
    data,
    label,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  }: ListProps) => {
    const observerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
      if (!hasNextPage || !fetchNextPage) return

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchNextPage()
          }
        },
        { threshold: 1 }
      )

      if (observerRef.current) {
        observer.observe(observerRef.current)
      }

      return () => {
        if (observerRef.current) {
          observer.unobserve(observerRef.current)
        }
      }
    }, [hasNextPage, fetchNextPage])

    return (
      <div className="postlistwrapper">
        {label && <h4 className="postlist__label">{label}</h4>}
        <div className="postlist">
          {data.map((i) => (
            <PostCard key={i._id} data={i} />
          ))}
          {(isLoading || isFetchingNextPage) && (
            <div className="postlistwrapper__loader">
              <Preloader />
            </div>
          )}

          {hasNextPage && (
            <div
              ref={observerRef}
              style={{ height: "1px", marginTop: "-1px" }}
            />
          )}
        </div>
      </div>
    )
  }
)

export default PostList
