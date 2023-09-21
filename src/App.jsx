import Home from "./Pages/Home";
import Login from "./Pages/Login";
import NotFoundPage from "./Pages/NotFoundPage";
import SignUp from './Pages/SignUp'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import {Outlet} from 'react-router-dom'
// import { AuthContext } from "./Context/AuthContext";
// import { RequireAuth } from "./Pages/RequireAuth";


function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
      // element: <RequireAuth><Home /></RequireAuth>
    },
    {
      path: "/signup",
      element: <SignUp />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/*",
      element: <NotFoundPage />
    }
  ]);

  return (
    <>
      {/* <AuthContext> */}
        <RouterProvider router={router} />
      {/* </AuthContext> */}
    </>
  );
}

export default App;
