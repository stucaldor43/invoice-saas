import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserSvg from "../icons/UserSvg";
import DashboardSvg from "../icons/DashboardSvg";
import ClientsSvg from "../icons/ClientsSvg";
import DraftSvg from "../icons/DraftSvg";
import InvoiceSvg from "../icons/InvoiceSvg";
import SettingsSvg from "../icons/SettingsSvg";
import { useAuth } from "../../hooks/useProvideAuth";
import "./styles.css";

export function Navigation({ isOpen }) {
  const auth = useAuth();

  return (
    <nav className={isOpen ? "nav--isOpen" : "nav--isClosed"}>
      <div>
        <div className="navigation-linkContainer">
          <Link className="navigation-link" to="/">
            <DashboardSvg />
            <span>Dashboard</span>
          </Link>
        </div>
        <ul>
          <li className="navigation-linkContainer">
            <Link className="navigation-link" to="/invoices">
              <InvoiceSvg />
              <span>Invoices</span>
            </Link>
          </li>
          <li className="navigation-linkContainer">
            <Link className="navigation-link" to="/drafts">
              <DraftSvg />
              <span>Drafts</span>
            </Link>
          </li>
          <li className="navigation-linkContainer">
            <Link className="navigation-link" to="/clients">
              <ClientsSvg />
              <span>Customers</span>
            </Link>
            <ul className="navigation-customerSubmenu">
              {/* <Link to="/users">First</Link> */}
            </ul>
          </li>
          <li className="navigation-linkContainer">
            <Link className="navigation-link" to="/settings">
              <SettingsSvg />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>
      {auth.user ? (
        <div
          className="navigation-linkContainer"
          onClick={() => auth.signOut()}
        >
          <button className="navigation-logoutButton">
            <UserSvg />
            <span>Log Out</span>
          </button>
        </div>
      ) : null}
    </nav>
  );
}
