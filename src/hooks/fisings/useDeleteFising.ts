import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query"
import { useLoadingBar } from "react-top-loading-bar"
import { toastError, toastSuccess } from "src/components/Toasts/toasts"
import { loadingBarProps } from "src/helpers/loadBarProps"
import { fishingServices } from "src/services/fishing.services"
import { QUERY_KEY } from "src/types/constants"
import type { FishingResponseT } from "src/types/fishing"

const useDeleteFising = () => {
  const queryClient = useQueryClient()
  const { start, complete } = useLoadingBar(loadingBarProps)

  const mutation = useMutation({
    mutationFn: async (_id: string) => {
      start()
      return await fishingServices.deleteItem(_id)
    },

    onError: (error) => {
      toastError({ message: error.message })
      complete()
    },
    onSuccess(response) {
      complete()
      toastSuccess({ message: `Запис ${response.title} видалено` })
      queryClient.setQueryData<InfiniteData<FishingResponseT>>(
        [QUERY_KEY.ALL_FISH_USER],
        (prev) => {
          if (!prev) return prev

          const pages = prev?.pages.map((page) => ({
            ...page,
            data: page.data.filter((item) => response._id !== item._id),
          }))

          return { ...prev, pages }
        }
      )
      queryClient.setQueryData<InfiniteData<FishingResponseT>>(
        [QUERY_KEY.ALL_FISH],
        (prev) => {
          if (!prev) return prev

          const pages = prev?.pages.map((page) => ({
            ...page,
            data: page.data.filter((item) => response._id !== item._id),
          }))

          return { ...prev, pages }
        }
      )
    },
  })

  return {
    deleteItem: mutation.mutate,
    isLoading: mutation.isPending,
  }
}

export default useDeleteFising
