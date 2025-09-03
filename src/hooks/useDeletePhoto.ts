import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useLoadingBar } from "react-top-loading-bar"
import { toastError, toastSuccess } from "src/components/Toasts/toasts"
import { loadingBarProps } from "src/helpers/loadBarProps"
import { photoServices } from "src/services/photo.services"
import { QUERY_KEY } from "src/types/constants"

const useDeletePhoto = (id: string) => {
  const queryClient = useQueryClient()
  const { start, complete } = useLoadingBar(loadingBarProps)

  const mutation = useMutation({
    mutationFn: async (dto: { photoId: string; setId: string }) => {
      start()

      return await photoServices.deletePhoto(dto)
    },
    onSuccess() {
      complete()
      toastSuccess({ message: "Фото видалено" })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_ONE_FISHING, id],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.LOAD_PHOTO, id],
      })
    },
    onError(err) {
      complete()
      toastError({ message: err.message })
    },
  })

  return {
    deletePhoto: mutation.mutateAsync,
  }
}

export default useDeletePhoto
