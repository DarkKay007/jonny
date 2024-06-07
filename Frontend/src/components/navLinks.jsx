import { FaHome } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { Link } from "react-router-dom";
import React from "react";

const NavLinks = () => {
  return (
    <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-md space-y-4 gap-8">
      <Link
        to={"/"}
        className="text-white hover:text-yellow-300 transition-colors duration-300"
      >
        salir
        <IoLogIn className="text-2xl" />
      </Link>

      <Link
        to={"/dashboard/list-empleados"}
        className="text-white hover:text-yellow-300 transition-colors duration-300"
      > empleados
        <FaHome className="text-2xl" />
      </Link>

      <Link
        to={"/dashboard/list-aspirant"}
        className="text-white hover:text-yellow-300 transition-colors duration-300"
      >aspirntes
        <BsFillPersonLinesFill className="text-2xl" />
      </Link>
      <Link
        to={"/dashboard/DashboardUsuarios"}
        className="text-white hover:text-yellow-300 transition-colors duration-300"
      >Usuarios
        <BsFillPersonLinesFill className="text-2xl" />
      </Link>


      <Link
        to={"/notificaciones"}
        className="text-white hover:text-yellow-300 transition-colors duration-300"
      >notificaciones
        <FaBell className="text-2xl" />
      </Link>

      <Link
        to={"/creaaenotificaciones"}
        className="text-white hover:text-yellow-300 transition-colors duration-300"
      > crear notificaacionn
        <FaBell className="text-2xl" />
      </Link>
    </div>
  );
};

export default NavLinks;
