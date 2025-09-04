import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useLoadingBar } from "react-top-loading-bar"
import { toastError, toastSuccess } from "src/components/Toasts/toasts"
import { loadingBarProps } from "src/helpers/loadBarProps"
import { postsServices } from "src/services/posts.services"
import { QUERY_KEY } from "src/types/constants"

const useDeletePost = () => {
  const queryClient = useQueryClient()
  const { start, complete } = useLoadingBar(loadingBarProps)

  const mutation = useMutation({
    mutationFn: async (_id: string) => {
      start()
      return await postsServices.deleteById(_id)
    },
    onError: (error) => {
      complete()
      toastError({ message: error.message })
    },
    onSuccess() {
      complete()
      toastSuccess({ message: "Запис видалено" })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.POST_GET_ALL],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.POST_GET_ALL_BY_USER],
      })
    },
  })

  return {
    deletePost: mutation.mutate,
    isLoading: mutation.isPending,
  }
}

export default useDeletePost
