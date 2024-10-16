import React from "react";
import { Dropdown } from "react-bootstrap";
import { DuelText, RoundAvatar } from "..";
import { Anchor, Button } from "../elements";
import { useNavigate } from "react-router-dom";

export default function ProfileDropdown({ image, dropdown }) {
  const name = JSON.parse(sessionStorage?.getItem("name"));
  const role = JSON.parse(sessionStorage?.getItem("role")?.toUpperCase());



  // const name ="ranjan"
  // const role ="super admin"

  const navigate = useNavigate();
  return (
    <Dropdown className="mc-header-user">
      <Dropdown.Toggle className="mc-dropdown-toggle">
        <RoundAvatar src={image} alt="avatar" size="xs" />
        <DuelText title={name} descrip={role} size="xs" />
      </Dropdown.Toggle>
      {/* <Dropdown.Menu align="end" className="mc-dropdown-paper">
        <Button
          icon={"person"}
          text={"my account"}
          className="mc-dropdown-menu"
          onClick={() => navigate("/my-account")}
        />
        <Button
          icon={"lock"}
          text={"logout"}
          className="mc-dropdown-menu"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        />
      </Dropdown.Menu> */}
    </Dropdown>
  );
}
