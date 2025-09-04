import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useLoadingBar } from "react-top-loading-bar"
import { toastError, toastSuccess } from "src/components/Toasts/toasts"
import { loadingBarProps } from "src/helpers/loadBarProps"
import { photoServices } from "src/services/photo.services"
import { QUERY_KEY } from "src/types/constants"

const useUploadPhoto = (id: string) => {
  const queryClient = useQueryClient()
  const { start, complete } = useLoadingBar(loadingBarProps)

  const mutation = useMutation({
    mutationFn: async (payload: { _id: string; formData: FormData }) => {
      start()
      return await photoServices.uploadPhoto(payload)
    },
    onSuccess() {
      complete()
      toastSuccess({ message: "Фото додано" })
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
    uploadPhoto: mutation.mutateAsync,
  }
}

export default useUploadPhoto
