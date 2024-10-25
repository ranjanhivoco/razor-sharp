import React, { useState } from "react";
import { hostedAuthAxios } from "../../backendAxios/backendAxios";
import {
  Box,
  Form,
  Heading,
  Button,
  Anchor,
  Image,
} from "../../components/elements";
import IconField from "../../components/fields/IconField";
import Logo from "../../components/Logo";
import data from "../../data/master/login.json";
import { useNavigate } from "react-router-dom";
import { LoaderProvider } from "../../context/Preloader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import showPwdImg from "../../show-password.svg";
import hidePwdImg from "../../hide-password.svg";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  // (login);


  const Login = async (e) => {
    const url =
      "https://api.hongs.razorsharp.in"
      // "http://192.168.1.44:8811"

    e.preventDefault();
    await hostedAuthAxios
      .post(`${url}/auth/login`, login)
      .then((response) => {
        const updatedResult = response.data;
        // (response.data)

        //   {
        //     "auth_id": 1,
        //     "email": "krishna@gmail.com",
        //     "name": "Krishna",
        //     "role": "super_admin",
        //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3VwZXJfYWRtaW4iLCJpYXQiOjE3Mjg5NzIwNjQsImV4cCI6MTcyOTA1ODQ2NH0.RrClcDOM4HMyf3F1gO6TeHCBkr23PNaOYgRYN6C1znw"
        // }

        sessionStorage.setItem("token", JSON.stringify(updatedResult.token));
        sessionStorage.setItem("name", JSON.stringify(updatedResult.name));
        sessionStorage.setItem("role", JSON.stringify(updatedResult.role));
        sessionStorage.setItem("id", updatedResult.auth_id);
        navigate("/");
      })
      .catch((err) => {
        (err);
      });
  };

  return (
    <div>
      {loading ? (
        <LoaderProvider />
      ) : (
        <Box className="mc-auth">
          {/* <Image
            src={data?.pattern.src}
            alt={data?.pattern.alt}
            className="mc-auth-pattern"
          /> */}
          
          {/* <img alt="" src={illustration}/> */}
          <Box className="mc-auth-group">
            <Logo
              src={data?.logo.src}
              alt={data?.logo.alt}
              href={data?.logo.path}
              className="mc-auth-logo"
            />
            <Heading as="h4" className="mc-auth-title">
              {data?.title}
            </Heading>
            <Form className="mc-auth-form" onSubmit={Login}>
              <div>
                <div>
                  <IconField
                    required
                    autoComplete="off"
                    type="text"
                    icon="email"
                    placeholder="Enter your email"
                    value={login.email}
                    onChange={(e) =>
                      setLogin({ ...login, email: e.target.value })
                    }
                  />
                  <div style={{ position: " relative" }}>
                    <IconField
                      required
                      autoComplete="off"
                      icon="lock"
                      placeholder="Enter your password"
                      type={isRevealPwd ? "text" : "password"}
                      value={login.password}
                      onChange={(e) =>
                        setLogin({ ...login, password: e.target.value })
                      }
                    />
                    <img
                      style={{
                        cursor: "pointer",
                        width: "20px",
                        position: "absolute",
                        right: "-4px",
                        top: "12px",
                      }}
                      alt="img"
                      className="hideAndShow"
                      title={isRevealPwd ? "Hide password" : "Show password"}
                      src={isRevealPwd ? hidePwdImg : showPwdImg}
                      onClick={() => setIsRevealPwd((prevState) => !prevState)}
                    />
                  </div>
                </div>
                <Button
                  className={`mc-auth-btn ${data?.button.fieldSize}`}
                  type="submit"
                >
                  {data?.button.text}
                </Button>
                <ToastContainer />

                {/* <Anchor className="mc-auth-forgot" href={data?.forgot.path}>
                  {data?.forgot.text}
                </Anchor> */}
              </div>
            </Form>
          </Box>
        </Box>
      )}
    </div>
  );
}
