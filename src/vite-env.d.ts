/// <reference types="vite/client" />
declare module "*.css" {
  const content: { [className: string]: string }
  export default content
}

declare module "swiper/css" {
  const anyContent: any
  export default anyContent
}
