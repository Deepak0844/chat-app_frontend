import { lazy } from "react";

const Chat = lazy(() => import("../Pages/Chat/Chat"));
const Profile = lazy(() => import("../Pages/Profile/Profile"));

export const ToProtect = [
  {
    path: "/",
    component: Chat,
    exact: true,
  },
  {
    path: "/profile",
    component: Profile,
    exact: true,
  },
];
