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
          // (credentialResponse.credential);
          var decoded = jwt_decode(credentialResponse.credential);
          (decoded);
        }}
        onError={() => {
          ("Login Failed");
        }}
      />
    </div>
  );
};

export default GoogleAuth;
