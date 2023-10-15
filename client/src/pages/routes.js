import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import HouseIcon from "@mui/icons-material/House";
import HistoryIcon from '@mui/icons-material/History';
import ROLE from '../auth/Role';

export const adminRoutes = [
  {
    route: "/admin",
    menu: "Dashboard",
    icon: <DashboardIcon />
  },
  {
    route: "/admin/properties",
    menu: "Properties",
    icon: <HouseIcon />
  },
  {
    route: "/admin/landlords",
    menu: "Landlords",
    icon: <ContactMailIcon />
  },
  {
    route: "/admin/tenants",
    menu: "Tenants",
    icon: <PeopleIcon />
  },
  {
    route: "/admin/reports",
    menu: "Reports",
    icon: <BarChartIcon />
  },
];

export const landlordRoutes = [
  {
    route: "/landlord",
    menu: "Dashboard",
    icon: <DashboardIcon />
  },
  {
    route: "/landlord/properties",
    menu: "Properties",
    icon: <HouseIcon />
  },
  {
    route: "/landlord/order",
    menu: "Orders",
    icon: <ShoppingCartIcon />
  }
]

export const tenantRoutes = [
  {
    route: "/tenant",
    menu: "Dashboard",
    icon: <DashboardIcon />
  },
  {
    route: "/tenant/order",
    menu: "Order",
    icon: <HouseIcon />
  },
  {
    route: "/tenant/history",
    menu: "History",
    icon: <HistoryIcon />
  }
]

export function getRoute(role) {
  if (role === ROLE.Admin) {
    return adminRoutes;
  }

  if (role === ROLE.Landlord) {
    return landlordRoutes;
  }

  if (role === ROLE.Tenant) {
    return tenantRoutes;
  }

  return [];
}