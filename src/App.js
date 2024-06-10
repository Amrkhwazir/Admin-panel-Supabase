import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Login from "./pages/login/Login"
import NewUser from "./pages/newUser/NewUser"
import Topbar from "./components/topbar/Topbar"
import Sidebar from "./components/sidebar/Sidebar"
import User from "./pages/user/User"
import Home from "./pages/home/Home"
import Product from "./pages/product/Product"
import ProductList from "./pages/productList/ProductList"
import NewProduct from "./pages/newProduct/NewProduct"
import UserList from "./pages/userList/UserList"

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <><Topbar /><div className="container"><Sidebar /> <Home /></div></>,
  },
  {
    path: "/users",
    element: <> <Topbar /><div className="container"><Sidebar /> <UserList /></div></>,
  },
  {
    path: "/user/:userId",
    element: <> <Topbar /><div className="container"><Sidebar /> <User /></div></>,
  },
  {
    path: "/newUser",
    element: <> <Topbar /><div className="container"><Sidebar /> <NewUser /></div></>,
  },
  {
    path: "/products",
    element: <> <Topbar /><div className="container"><Sidebar /> <ProductList /></div></>,
  },
  {
    path: "/product/:productId",
    element: <> <Topbar /><div className="container"><Sidebar /> <Product /></div></>,
  },
  {
    path: "/newproduct",
    element: <> <Topbar /><div className="container"><Sidebar /> <NewProduct /></div></>,
  },
]);

function App() {

  return (
   <RouterProvider router={router} />
  );
}

export default App;
