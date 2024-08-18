import { createBrowserRouter } from "react-router-dom";
import NFT from "../pages/NFT/index";
import Main from "../pages/Main/index";
import Page_404 from "../pages/404/404";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "NFT/:NFTAddress",
    element: <NFT />,
  },
  { path: "*", element: <Page_404 /> },
]);
