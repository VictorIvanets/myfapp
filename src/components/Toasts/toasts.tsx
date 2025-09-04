import { Bounce, toast } from "react-toastify"
import "./toasts.sass"

type ToastProps = {
  message?: string
}

export const toastSuccess = ({ message }: ToastProps) =>
  toast.success(
    <div className="toastwrapper">
      <h2>Успіх!</h2>
      <p>{message}</p>
    </div>,
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
    <div className="toastwrapper">
      <h2>Помилка!</h2>
      <p>{message}</p>
    </div>,
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
