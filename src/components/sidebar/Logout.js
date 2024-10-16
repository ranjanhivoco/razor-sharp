import React from "react";
import { Box, Anchor } from "../elements";

export default function Logout({ data }) {

    const handleLogout = () => {
        sessionStorage.clear();
      }
    return (
        <Box className="mc-sidebar-logout text-center">
            <Anchor 
                href = { data?.path } 
                icon = { data?.icon } 
                text = { data?.text } 
                className = "mc-btn primary sm"
                onClick={handleLogout}
            />
        </Box>
    )
}