import React from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../utils/constants";

function Navbar() {
  return (
    <nav style={{display: 'flex', justifyContent: "space-between", padding: '3rem', border: 'solid #333'}}>
      
        {routes.map((route) => {
          const { path, component, name } = route;
          return (
            <NavLink key={path} to={path} style={{textTransform: "capitalize"}}>
              {name}
            </NavLink>
          );
        })}

    </nav>
  );
}

export default Navbar;
