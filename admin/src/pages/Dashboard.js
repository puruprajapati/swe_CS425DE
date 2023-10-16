import * as React from "react";
import AdminDashboard from './AdminDashboard';
import LandlordDashboard from './LandlordDashboard';
import ROLE from "auth/Role";

const Dashboard = (props) => {
  return (
    <>
      {props.role === ROLE.Admin ? (<AdminDashboard />) : <LandlordDashboard />}
    </>
  )
}

export default Dashboard;

