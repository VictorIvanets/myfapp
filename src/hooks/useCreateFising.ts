import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { fishingServices } from "src/services/fishing.services"
import { QUERY_KEY } from "src/types/constants"

const useCreateFising = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: fishingServices.create,
    onError: (error) => {
      console.log(error)
    },
    onSuccess: (response) => {
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
