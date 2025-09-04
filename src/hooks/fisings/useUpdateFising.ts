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
import type { FishingPayloadT, FishingResponseT } from "src/types/fishing"

const useUpdateFising = (_id: string) => {
  const { start, complete } = useLoadingBar(loadingBarProps)
  const mutation = useMutation({
    mutationFn: async (data: { _id: string; payload: FishingPayloadT }) => {
      start()
      return await fishingServices.update(data)
    },
    onError: (error) => {
      complete()
      toastError({ message: error.message })
    },
    onSuccess(response) {
      toastSuccess({ message: `Запис ${response.title} оновлено` })
      complete()
      queryClient.setQueryData<InfiniteData<FishingResponseT>>(
        [QUERY_KEY.ALL_FISH],
        (prev) => {
          if (!prev) return prev

          const pages = prev?.pages.map((page) => ({
            ...page,

            data: page.data.map((item) =>
              response._id === item._id ? response : item
            ),
          }))

          return { ...prev, pages }
        }
      )
      queryClient.setQueryData<InfiniteData<FishingResponseT>>(
        [QUERY_KEY.ALL_FISH_USER],
        (prev) => {
          if (!prev) return prev

          const pages = prev?.pages.map((page) => ({
            ...page,

            data: page.data.map((item) =>
              response._id === item._id ? response : item
            ),
          }))

          return { ...prev, pages }
        }
      )
    },
  })
  const queryClient = useQueryClient()

  return {
    updete: mutation.mutate,
    isLoading: mutation.isPending,
  }
}

export default useUpdateFising
