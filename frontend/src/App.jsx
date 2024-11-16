import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home, { allPostsLoader } from "./pages/Home";
import PostId, { loaderPostById } from "./pages/PostId";
import Create from "./pages/Create";
import { actionCreateEdit } from "./components/CreateEditForm";

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
        path: "/create",
        element: <Create />,
        action: actionCreateEdit
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
