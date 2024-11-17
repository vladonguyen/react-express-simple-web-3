import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home, { allPostsLoader } from "./pages/Home";
import PostId, { askBeforeDelete, loaderPostById } from "./pages/PostId";
import Create from "./pages/Create";
import { actionCreateEdit } from "./components/CreateEditForm";
import Edit from "./pages/Edit";
import Register, { registerAction } from "./pages/Register";


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
        path: "/register",
        element: <Register />,
        action: registerAction
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
          action: askBeforeDelete
        },
          {
            path: "edit",
            element: <Edit />,
            loader: loaderPostById,
            action: actionCreateEdit
          },
          // {
          //   path: "delete",
          //   // element: <Edit />,
          //   loader: deletePost
          // }
        ]
      }]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
