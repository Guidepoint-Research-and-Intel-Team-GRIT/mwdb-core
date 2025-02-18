import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";

import { faUsersCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ConfigContext } from "@mwdb-web/commons/config";
import { View, ShowIf } from "@mwdb-web/commons/ui";

function SettingsNav() {
    const config = useContext(ConfigContext);
    return (
        <div>
            <strong>
                <FontAwesomeIcon icon={faUsersCog} /> Administration
            </strong>
            <div className="nav sidenav flex-column">
                <NavLink end to="/settings" className="nav-link">
                    Overview
                </NavLink>
                <ShowIf condition={config.config["is_registration_enabled"]}>
                    <NavLink end to="/settings/pending" className="nav-link">
                        Pending registrations
                        {config.pendingUsers.length ? (
                            <span
                                className="badge badge-pill badge-warning"
                                style={{ marginLeft: "8px" }}
                            >
                                {config.pendingUsers.length}
                            </span>
                        ) : (
                            []
                        )}
                    </NavLink>
                </ShowIf>
                <NavLink end to="/settings/capabilities" className="nav-link">
                    Access control
                </NavLink>
                <NavLink end to="/settings/users" className="nav-link">
                    Users
                </NavLink>
                <NavLink end to="/settings/groups" className="nav-link">
                    Groups
                </NavLink>
                <NavLink end to="/settings/attributes" className="nav-link">
                    Attributes
                </NavLink>
                <ShowIf condition={config.config["is_oidc_enabled"]}>
                    <NavLink to="/settings/oauth" className="nav-link">
                        OpenID Connect
                    </NavLink>
                </ShowIf>
            </div>
            <hr />
        </div>
    );
}

export default function SettingsView() {
    return (
        <View ident="settings" fluid>
            <div className="row">
                <div className="col-sm-2">
                    <SettingsNav />
                </div>
                <div className="col-sm-8">
                    <div className="tab-content">
                        <Outlet />
                    </div>
                </div>
            </div>
        </View>
    );
}
