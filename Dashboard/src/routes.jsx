import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  RectangleStackIcon,
  ChatBubbleLeftIcon,
  DocumentTextIcon,
  ArrowRightOnRectangleIcon,
  ShoppingBagIcon, // New import for product icon
} from "@heroicons/react/24/solid";
import { Home } from "@/pages/dashboard";
import Users from "@/pages/dashboard/Users";
import Message from "@/pages/dashboard/Message";
import Product from "./pages/dashboard/Product";
import { SignIn } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

const routeIconMap = {
  dashboard: <HomeIcon {...icon} />,
  users: <UserCircleIcon {...icon} />,
  business: <TableCellsIcon {...icon} />,
  "all service": <InformationCircleIcon {...icon} />,
  message: <ChatBubbleLeftIcon {...icon} />,
  "all reviews": <DocumentTextIcon {...icon} />,
  "business service": <TableCellsIcon {...icon} />,
  "all business service": <RectangleStackIcon {...icon} />,
  "review and replay": <InformationCircleIcon {...icon} />,
  logout: <ArrowRightOnRectangleIcon {...icon} />,
  product: <ShoppingBagIcon {...icon} />, // Updated icon for "product"
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: routeIconMap.dashboard,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: routeIconMap.users,
        name: "users",
        path: "/users",
        element: <Users />,
      },
      {
        icon: routeIconMap.product,
        name: "product",
        path: "/product",
        element: <Product />,
      },

      {
        icon: routeIconMap.message,
        name: "message",
        path: "/message",
        element: <Message />,
      },
      {
        icon: routeIconMap.logout,
        name: "logout",
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
