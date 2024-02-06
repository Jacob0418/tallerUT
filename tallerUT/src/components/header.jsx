import { Link } from "react-router-dom";
import { useAuth } from "../api/context/AuthContext";
import  NavBarNoMecanico  from '../NavBar/HeaderNoLog'; 
import  NavBarMecanico from '../NavBar/HeaderLog'
import NavbarAdmin from "../Admin/NavAdmin";
export default function Navbar() {


  const { isAuthenticatedMecanico, isAuthenticatedAdmin } = useAuth();

  const userLinks = isAuthenticatedMecanico && (
    <NavBarMecanico />
  );


  const guestLinks = !isAuthenticatedMecanico && !isAuthenticatedAdmin  && (
    <NavBarNoMecanico/>
  );

  const adminLinks = isAuthenticatedAdmin && (
    <NavbarAdmin/>
  )

  return (
      
      <>
        {userLinks}
        {guestLinks}
        {adminLinks}
      </>
  );
}