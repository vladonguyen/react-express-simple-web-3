import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home, { allPostsLoader } from "./pages/Home";

function App() {
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{
      index: true,
      element: <Home />,
      loader: allPostsLoader
    }]
  }
])

  return (
  <RouterProvider router={router} />
  )
}

export default App
