import AllQuize from "@/pages/AllQuize";
import CreateQuize from "@/pages/CreateQuize";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import UpdateQuize from "@/pages/UpdateQuize";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";

const Router = () => {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "all-quize",
          element: <AllQuize />,
        },
        {
          path: "create-quize",
          element: <CreateQuize />,
        },
        {
          path: '/dashboard/update-quize/:id',
          element: <UpdateQuize />,
          loader: ({params}) => fetch(`http://localhost:5000/quizs/${params.id}`)
        }
      ],
    },
  ]);
  return <RouterProvider router={route} />;
};

export default Router;
