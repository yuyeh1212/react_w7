import React from "react";
import Navbar from "./Navbar";
import AdminNavbar from "./AdminNavbar";

const NavbarController = ({ isAuth }) => {
  return isAuth ? <AdminNavbar /> : <Navbar />;
};

export default NavbarController;
