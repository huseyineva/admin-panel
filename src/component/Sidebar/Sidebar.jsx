import React from "react";
import "./sidebar.css";
import logo from "../../assets/img/brandygo.svg";
import home from "../../assets/img/icons/home.svg";
import homeActive from "../../assets/img/icons/bold/home.svg"; 
import domain from "../../assets/img/icons/domain.svg";
import domainActive from "../../assets/img/icons/bold/domain.svg";
import hosting from "../../assets/img/icons/hosting.svg";
import hostingActive from "../../assets/img/icons/bold/hosting.svg";
import sunucu from "../../assets/img/icons/sunucu.svg";
import sunucuActive from "../../assets/img/icons/bold/sunucu.svg";
import musteri from "../../assets/img/icons/musteri.svg";
import musteriActive from "../../assets/img/icons/bold/musteri.svg";
import rapor from "../../assets/img/icons/rapor.svg";
import raporActive from "../../assets/img/icons/bold/rapor.svg";
import profile from "../../assets/img/profile.jpg";
import settings from "../../assets/img/icons/settings.svg";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="brandygo" className="logo" />
      </Link>
      <ul>
      <Link to="/">
        <li className={location.pathname === "/" ? "active" : ""}>
            <img
              src={location.pathname === "/" ? homeActive : home}
              alt="Home"
            />
            Dashboard
        </li>
        </Link>
        <Link to="/domain">
        <li className={location.pathname === "/domain" ? "active" : ""}>
            <img
              src={location.pathname === "/domain" ? domainActive : domain}
              alt="Domain"
            />
            Domain
        </li>
        </Link>
        <Link to="/hosting">
        <li className={location.pathname === "/hosting" ? "active" : ""}>
            <img
              src={location.pathname === "/hosting" ? hostingActive : hosting}
              alt="Hosting"
            />
            Hosting
        </li>
        </Link>
        <Link to="/sunucu">
        <li className={location.pathname === "/sunucu" ? "active" : ""}>
            <img
              src={location.pathname === "/sunucu" ? sunucuActive : sunucu}
              alt="Sunucu"
            />
            Sunucu
        </li>
        </Link>
        <Link to="/musteri">
        <li className={location.pathname === "/musteri" ? "active" : ""}>
            <img
              src={location.pathname === "/musteri" ? musteriActive : musteri}
              alt="Müşteri"
            />
            Müşteri
        </li>
        </Link>
        <Link to="/rapor">
        <li className={location.pathname === "/rapor" ? "active" : ""}>
            <img
              src={location.pathname === "/rapor" ? raporActive : rapor}
              alt="Rapor"
            />
            Rapor
        </li>
        </Link>
      </ul>
      <div className="settings">
        <div className="profile-box">
          <img src={profile} alt="Profil" />
          <span>Brandygo Web</span>
        </div>
        <img src={settings} alt="Ayarlar" />
      </div>
    </div>
  );
}

export default Sidebar;