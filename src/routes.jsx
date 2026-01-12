import {
  HomeIcon,
  PhotoIcon,
  DocumentTextIcon,
  Squares2X2Icon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

import { Home } from "@/pages/dashboard";
import ImageToImage from "@/pages/dashboard/ImageToImage";
// import TextToImage from "./pages/Dashboard/TextToImage";
import TextToImage from "./pages/dashboard/TextToImage";
// import TextToImage from "@/pages/Dashboard/TextToImage";
import Gallery from "@/pages/dashboard/gallery";
import { SignIn, SignUp } from "@/pages/auth";
import Users from "@/pages/dashboard/users";
import ApiConfigPage from "@/pages/dashboard/ApiConfigPage";

import PrivateRoute from "@/components/PrivateRoute";
import PublicRoute from "@/components/PublicRoute";
import UsersRoute from "@/components/AdminRoute";
import { TrashIcon } from "@heroicons/react/24/solid";
import DeleteAccount from "@/pages/dashboard/DeleteAccount";
import LandingPage from "@/pages/dashboard/landing";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  // Landing page route
  {
    layout: "landing",
    pages: [
      {
        path: "/",
        element: <LandingPage />,
      },
    ],
  },
  {
    layout: "dashboard",
    pages: [
      // {
      //   icon: <HomeIcon {...icon} />,
      //   name: "dashboard",
      //   path: "/home",
      //   element: (
      //     <PrivateRoute>
      //       <Home />
      //     </PrivateRoute>
      //   ),
      // },
      {
        icon: <Squares2X2Icon {...icon} />,
        name: "gallery",
        path: "/gallery",
        element: (
          <PrivateRoute>
            <Gallery />
          </PrivateRoute>
        ),
      },
      {
        icon: <PhotoIcon {...icon} />,
        name: "image to image",
        path: "/image-to-image",
        element: (
          <PrivateRoute>
            <ImageToImage />
          </PrivateRoute>
        ),
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "text to image",
        path: "/text-to-image",
        element: (
          <PrivateRoute>
            <TextToImage />
          </PrivateRoute>
        ),
      },
      {
        icon: <TrashIcon {...icon} />,
        name: "delete account",
        path: "/delete-account",
        element: (
          <PrivateRoute>
            <DeleteAccount />
          </PrivateRoute>
        ),
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Website",
        path: "/landing",
        element: (
          <PrivateRoute>
            <LandingPage />
          </PrivateRoute>
        ),
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "Users",
        path: "/Users",
        element: (
          <UsersRoute>
            <Users />
          </UsersRoute>
        ),
      },
      {
        icon: <Cog6ToothIcon {...icon} />,
        name: "API Config",
        path: "/api-config",
        element: (
          <UsersRoute>
            <ApiConfigPage />
          </UsersRoute>
        ),
      }
    ],

  },
  {
    layout: "auth",
    pages: [
      {
        path: "/sign-in",
        element: (
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        ),
      },
      {
        path: "/sign-up",
        element: (
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        ),
      },
    ],
  },
];

export default routes;
