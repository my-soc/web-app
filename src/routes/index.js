import React from "react";

import async from "../components/Async";

import {
  Briefcase,
  ShoppingCart,
  PieChart,
  Sliders,
  Users, Repeat
} from "react-feather";
import {
  AccountBalance,
  Business,
  Timer,
  MenuBook
} from "@material-ui/icons";

// Auth components
const SignIn = async(() => import("../pages/auth/SignIn"));
const SignUp = async(() => import("../pages/auth/SignUp"));
const ResetPassword = async(() => import("../pages/auth/ResetPassword"));
const Page404 = async(() => import("../pages/auth/Page404"));
const Page500 = async(() => import("../pages/auth/Page500"));

// Analytics components
const Charts = async(() => import("../pages/analytics/Charts"));

// Pages components
const Blank = async(() => import("../pages/pages/Blank"));
const StrategyBuilder = async(() => import("../pages/strategies/StrategyBuilder"));
const StrategiesList = async(() => import("../pages/strategies/StrategiesList"));
const Positions = async(() => import("../pages/Positions"));
const Pricing = async(() => import("../pages/pages/Pricing"));
const AccountsPage = async(() => import("../pages/accounts"));
const Settings = async(() => import("../pages/pages/Settings"));
const Tasks = async(() => import("../pages/pages/Tasks"));
const Connectors = async(() => import("../pages/connectors"));
const NoteBook = async(() => import("../pages/notebook"));
const Calendar = async(() => import("../pages/pages/Calendar"));


const analyticsRoutes = {
  id: "Analytics",
  path: "/analytics",
  icon: <PieChart />,
  containsHome: true,
  children: [
    {
      path: "/analytics/charts",
      name: "Charts",
      component: Charts
    }
  ]
};

const pagesRoutes = {
  id: "Settings",
  path: "/pages",
  icon: <Sliders />,
  children: [
    {
      path: "/pages/settings",
      name: "Settings",
      component: Settings
    },
    {
      path: "/pages/pricing",
      name: "Pricing",
      component: Pricing
    },
    {
      path: "/pages/blank",
      name: "Blank Page",
      component: Blank
    }
  ]
};

const accountRoutes = {
  id: "Account",
  path: "/",
  icon: <AccountBalance />,
  component: AccountsPage,
  children: null
};

const connectorsRoutes = {
  id: "Connectors",
  path: "/connectors",
  icon: <Briefcase />,
  badge: "8",
  component: Connectors,
  children: null
};

const notebookRoutes = {
  id: "Notebook",
  path: "/notebook",
  icon: <MenuBook />,
  component: NoteBook,
  children: null
};

const strategiesRoutes = {
  id: "Strategies",
  path: "/strategies",
  icon: <Repeat />,
  children: [
    {
      path: "/strategies/list",
      name: "List",
      component: StrategiesList
    },
    {
      path: "/strategies/builder",
      name: "Builder",
      component: StrategyBuilder
    }
  ]
};

const positionsRoutes = {
  id: "Positions",
  path: "/positions",
  icon: <ShoppingCart />,
  component: Positions,
  children: null
};

const tasksRoutes = {
  id: "Jobs",
  path: "/tasks",
  icon: <Timer />,
  badge: "17",
  component: Tasks,
  children: null
};

const calendarRoutes = {
  id: "Market",
  path: "/calendar",
  icon: <Business />,
  component: Calendar,
  children: null
};

const authRoutes = {
  id: "Users",
  path: "/auth",
  icon: <Users />,
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp
    },
    {
      path: "/auth/reset-password",
      name: "Reset Password",
      component: ResetPassword
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500
    }
  ]
};

export const ui = [
  accountRoutes,
  analyticsRoutes,
  notebookRoutes,
  positionsRoutes,
  strategiesRoutes,
  connectorsRoutes,
  calendarRoutes,
  tasksRoutes,
  pagesRoutes,
];

export const auth = [authRoutes];

export default [
  accountRoutes,
  analyticsRoutes,
  notebookRoutes,
  positionsRoutes,
  strategiesRoutes,
  connectorsRoutes,
  calendarRoutes,
  tasksRoutes,
  pagesRoutes,
  authRoutes,
];
