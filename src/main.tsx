import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "src/sass/main_style.sass"
import { RouterProvider } from "react-router-dom"
import { router } from "./router/router.tsx"
import { Provider } from "react-redux"
import { store } from "./store/store.ts"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ToastContainer } from "react-toastify"
import { LoadingBarContainer } from "react-top-loading-bar"
const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoadingBarContainer>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ToastContainer />
          <RouterProvider router={router} />
        </Provider>
      </QueryClientProvider>
    </LoadingBarContainer>
  </StrictMode>
)
