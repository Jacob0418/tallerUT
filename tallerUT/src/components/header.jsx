import { Link } from "react-router-dom";
import { useAuth } from "../api/context/AuthContext";
import  NavBarNoMecanico  from '../NavBar/HeaderNoLog'; 
import  NavBarMecanico from '../NavBar/HeaderLog'
export default function Navbar() {

  const {user} = useAuth();
  const { isAuthenticatedMecanico } = useAuth();
  // Elementos de Navbar para usuarios autenticados no administradores
  const userLinks = isAuthenticatedMecanico && (
    <NavBarMecanico />
  );


  // Elementos de Navbar para usuarios no autenticados
  const guestLinks = !isAuthenticatedMecanico  && (
    <NavBarNoMecanico/>
  );

  return (
      
      <>
        {userLinks}
        {guestLinks}
      </>
  );
}