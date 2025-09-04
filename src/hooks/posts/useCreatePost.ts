import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QUERY_KEY } from "src/types/constants"
import { postsServices } from "src/services/posts.services"
import { toastError, toastSuccess } from "src/components/Toasts/toasts"
import { useLoadingBar } from "react-top-loading-bar"
import { loadingBarProps } from "src/helpers/loadBarProps"
import type { PostPayloadT } from "src/types/posts.types"

const useCreatePost = (setTab: (value: number) => void) => {
  const queryClient = useQueryClient()
  const { start, complete } = useLoadingBar(loadingBarProps)

  const mutation = useMutation({
    mutationFn: async (payload: PostPayloadT) => {
      start()
      return await postsServices.create(payload)
    },
    onError: (error) => {
      complete()
      toastError({ message: error.message })
    },
    onSuccess: () => {
      setTab(1)
      toastSuccess({ message: "Запис додано" })
      complete()
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.POST_GET_ALL],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.POST_GET_ALL_BY_USER],
      })
    },
  })

  return {
    create: mutation.mutate,
    isLoading: mutation.isPending,
  }
}

export default useCreatePost
