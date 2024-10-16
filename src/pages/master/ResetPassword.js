import React from "react";
import { useState } from "react";
import { hostedAuthAxios } from "../../backendAxios/backendAxios";
import { Box, Form, Heading, Button, Image } from "../../components/elements";
import IconField from "../../components/fields/IconField";
import Logo from "../../components/Logo";
import data from "../../data/master/login.json";
import { LoaderProvider } from "../../context/Preloader";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import authHeader from "../../backendAxios/authHeader";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState({
    code: "",
    password: "",
    confirmPassword: "",
    number: localStorage.getItem("number"),
  });
  const navigate = useNavigate();
  const [isOtpverify, setIsOtpverify] = useState(false);

  const verifyPassword = async (e) => {
    e.preventDefault();
    await hostedAuthAxios
      .post(`/verifyotp`, {
        otp: reset.code,
        username: reset.number,
      })
      .then((response) => {
        if (response.status === 200) {
          setIsOtpverify(true);
          toast.success("Otp is verified");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.error(`${err.response.data.error}`);
        }
      });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    await hostedAuthAxios
      .post(
        `/resetpassword`,
        { headers: authHeader() },
        {
          username: reset.number,
          password: reset.password,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success("Passwords reset successfully");
          setTimeout(() => {
            navigate(`/login`);
          }, 2000);
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          toast.error(`${err.response.data.error}`);
        }
      });
  };

  return (
    <div>
      {loading ? (
        <LoaderProvider />
      ) : (
        <Box className="mc-auth">
          <Image
            className="mc-auth-pattern"
            src={data?.pattern.src}
            alt={data?.pattern.alt}
          />
          <Box className="mc-auth-group">
            <Logo
              src="/images/favicon.ico"
              alt={data?.logo.alt}
              href={data?.logo.path}
              className="mc-auth-logo"
            />
            <Heading as="h4" className="mc-auth-title">
              Reset your password
            </Heading>
            <Form className="mc-auth-form">
              <IconField
                icon="code"
                placeholder="Enter code"
                type="number"
                classes="w-100 h-sm gray"
                value={reset.code}
                onChange={(e) => setReset({ ...reset, code: e.target.value })}
              />

              {isOtpverify ? (
                <>
                  {" "}
                  <IconField
                    icon="lock"
                    placeholder="Enter New Password"
                    type="password"
                    classes="w-100 h-sm gray"
                    value={reset.password}
                    onChange={(e) =>
                      setReset({ ...reset, password: e.target.value })
                    }
                  />
                  <IconField
                    icon="lock"
                    placeholder="Confirm password"
                    type="password"
                    classes="w-100 h-sm gray"
                    value={reset.confirmPassword}
                    onChange={(e) =>
                      setReset({ ...reset, confirmPassword: e.target.value })
                    }
                  />{" "}
                </>
              ) : (
                ""
              )}

              {isOtpverify ? (
                <Button
                  className={`mc-auth-btn ${data?.button.fieldSize}`}
                  type={data?.button.type}
                  onClick={handleResetPassword}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  className={`mc-auth-btn ${data?.button.fieldSize}`}
                  type={data?.button.type}
                  onClick={verifyPassword}
                >
                  Verify
                </Button>
              )}

              <ToastContainer />
            </Form>
          </Box>
        </Box>
      )}
    </div>
  );
}
