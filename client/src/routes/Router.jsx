import AllQuize from "@/pages/AllQuize";
import CreateQuize from "@/pages/CreateQuize";
import Dashboard from "@/pages/Dashboard";
import ErrorPage from "@/pages/ErrorPage";
import Login from "@/pages/Login";
import UpdateQuize from "@/pages/UpdateQuize";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";

const Router = () => {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <ErrorPage/>,
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
          path: "/dashboard/update-quize/:id",
          element: <UpdateQuize />,
          loader: ({ params }) =>
            fetch(`https://job-assignment-1.vercel.app/quizs/${params.id}`),
        },
      ],
    },
  ]);
  return <RouterProvider router={route} />;
};

export default Router;
