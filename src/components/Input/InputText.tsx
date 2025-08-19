import { type ForwardedRef, forwardRef, type InputHTMLAttributes } from "react"
import "./inputtext.sass"
import MaterialIcon from "src/shared/icons/Materialicons"
import Flex from "../Flex/Flex"

type InputPropsT = {
  id: string
  label?: string
  error?: string | undefined
  appearance?: "small" | "standart" | undefined
  ibackground?: boolean
  searchLabel?: boolean
} & InputHTMLAttributes<HTMLInputElement>

const InputText = forwardRef<HTMLInputElement, InputPropsT>(function InputText(
  {
    id,
    label,
    error,
    disabled,
    className,
    ibackground = false,
    appearance = "small",
    searchLabel,
    ...rest
  }: InputPropsT,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div
      className={`inputtext__${appearance} ${className || ""} ${
        error && "input-error"
      }`}
    >
      <input
        style={{
          background: ibackground ? "#ffffff1d" : "",
        }}
        className={`${error && "input-error"}`}
        disabled={disabled}
        ref={ref}
        id={id}
        {...rest}
        placeholder=" "
      />
      {searchLabel && label ? (
        <label htmlFor={id} className="input-label-search">
          <Flex gap={10} centerV className="input-label-box-search">
            {label}
            <span className="search-icon">
              <MaterialIcon name="MdSearch" />
            </span>
          </Flex>
        </label>
      ) : (
        label && (
          <label htmlFor={id} className={`${error && "input-label-error"}`}>
            {label}
          </label>
        )
      )}
      {error && <p className="input-message-error">{error}</p>}
    </div>
  )
})

export default InputText
