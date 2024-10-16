import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import jwt_decode from "jwt-decode";

const GoogleAuth = () => {
  return (
    <div className="googleAuth">
      <GoogleLogin
        theme="filled_blue"
        type="icon"
        logo_alignment="center"
        shape="circle"
        onSuccess={(credentialResponse) => {
          // console.log(credentialResponse.credential);
          var decoded = jwt_decode(credentialResponse.credential);
          console.log(decoded);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default GoogleAuth;
