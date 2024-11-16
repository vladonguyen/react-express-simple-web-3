import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home, { allPostsLoader } from "./pages/Home";
import PostId, { loaderPostById } from "./pages/PostId";
import Create from "./pages/Create";
import { actionCreateEdit } from "./components/CreateEditForm";
import Edit from "./pages/Edit";

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
        id: "postId",
        children: [{
          index: true,
          element: <PostId />,
          loader: loaderPostById,
        },
          {
            path: "edit",
            element: <Edit />,
            loader: loaderPostById,
            action: actionCreateEdit
          }
        ]
      }]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
