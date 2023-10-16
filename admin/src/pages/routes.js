import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import HistoryIcon from '@mui/icons-material/History';
import ContactMailIcon from "@mui/icons-material/ContactMail";
import HouseIcon from "@mui/icons-material/House";
import ROLE from "../auth/Role";

const adminRoutes = [
  {
    route: "/",
    menu: "Dashboard",
    icon: <DashboardIcon />,
  },
  // {
  //   route: "/properties",
  //   menu: "Properties",
  //   icon: <HouseIcon />
  // },
  {
    route: "/landlords",
    menu: "Landlords",
    icon: <ContactMailIcon />,
  },
  {
    route: "/tenants",
    menu: "Tenants",
    icon: <PeopleIcon />,
  },
  // {
  //   route: "/reports",
  //   menu: "Reports",
  //   icon: <BarChartIcon />
  // },
];

export const landlordRoute = [
  {
    route: "/",
    menu: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    route: "/properties",
    menu: "Properties",
    icon: <HouseIcon />,
  },
  {
    route: "/rent",
    menu: "Rent History",
    icon: <HistoryIcon />
  }
];

export function getRoute(role) {
  if (role === ROLE.Admin) {
    return adminRoutes;
  } else if (role === ROLE.Landlord) {
    return landlordRoute;
  }
  return [];
}
