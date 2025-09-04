import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toastError } from "src/components/Toasts/toasts"
import { commentPostServices } from "src/services/comment_post.services"
import { QUERY_KEY } from "src/types/constants"

const useDeletePostComment = (postId: string) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: commentPostServices.deleteComment,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.POST_GET_ALL],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.POST_COMMENTS_GET_ALL_BY_POST, postId],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.POST_GET_ONE, postId],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.POST_GET_ALL_BY_USER],
      })
    },
    onError: (error) => {
      toastError({ message: error.message })
    },
  })

  return {
    deleteComment: mutation.mutateAsync,
    isLoading: mutation.isPending,
  }
}

export default useDeletePostComment
