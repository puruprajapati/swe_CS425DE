import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from 'react-router-dom';

export const mainMenu = (routes) => {
  return <React.Fragment>
    {routes.map(r => (
      <Link key={r.route} to={r.route} style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItemButton>
          <ListItemIcon>
            {r.icon}
          </ListItemIcon>
          <ListItemText primary={r.menu} />
        </ListItemButton>
      </Link>
    ))}
  </React.Fragment>
  
};
