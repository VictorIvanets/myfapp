import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useLoadingBar } from "react-top-loading-bar"
import { toastError, toastSuccess } from "src/components/Toasts/toasts"
import { loadingBarProps } from "src/helpers/loadBarProps"
import { fishingServices } from "src/services/fishing.services"
import { QUERY_KEY } from "src/types/constants"
import type { FishingPayloadT } from "src/types/fishing"

const useCreateFising = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { start, complete } = useLoadingBar(loadingBarProps)

  const mutation = useMutation({
    mutationFn: async (payload: FishingPayloadT) => {
      start()
      return await fishingServices.create(payload)
    },
    onError: (error) => {
      complete()
      toastError({ message: error.message })
    },
    onSuccess: (response) => {
      toastSuccess({ message: `Запис ${response.title} додано` })
      complete()
      navigate(`/details/${response._id}`)

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ALL_FISH],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.PAID],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ALL_FISH_USER],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.ALL_FISH_FOR_MAP],
      })
    },
  })

  return {
    create: mutation.mutate,
    isLoading: mutation.isPending,
  }
}

export default useCreateFising
