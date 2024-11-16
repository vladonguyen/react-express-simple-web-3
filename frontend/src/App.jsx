import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home, { allPostsLoader } from "./pages/Home";
import PostId, { loaderPostById } from "./pages/PostId";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [{
        index: true,
        element: <Home />,
        loader: allPostsLoader
      },
      {
        path:"posts/:id",
        element: <PostId />,
        loader: loaderPostById

      }]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
