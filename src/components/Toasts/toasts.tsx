import { Bounce, toast } from "react-toastify"
import "./toasts.sass"
import Flex from "../Flex/Flex"

type ToastProps = {
  message?: string
}

export const toastSuccess = ({ message }: ToastProps) =>
  toast.success(
    <Flex centerH column className="toastwrapper">
      <h2>Успіх!</h2>
      <p>{message}</p>
    </Flex>,
    {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    }
  )

export const toastError = ({ message }: ToastProps) =>
  toast.error(
    <Flex column centerH className="toastwrapper">
      <h2>Помилка!</h2>
      <p>{message}</p>
    </Flex>,
    {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    }
  )
