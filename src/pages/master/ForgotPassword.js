import React, { useState } from "react";
import { hostedAuthAxios } from "../../backendAxios/backendAxios";
import {
  Box,
  Form,
  Heading,
  Button,
  Anchor,
  Image,
  Text,
} from "../../components/elements";
import IconField from "../../components/fields/IconField";
import Logo from "../../components/Logo";
import data from "../../data/master/forgot.json";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LoaderProvider } from "../../context/Preloader";

export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState("");

  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    await hostedAuthAxios
      .post("/forgetpassword", {
        username: username,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("number", username);
          navigate("/reset-password");
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast.error(err.response.data.error);
        }
        if (err.response.status === 403) {
          toast.error(err.response.data.error);
        }
        if (err.response.status === 401) {
          toast.error(err.response.data.error);
        }
      });
    setLoading(false);
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
              src={data?.logo.src}
              alt={data?.logo.alt}
              href={data?.logo.path}
              className="mc-auth-logo"
            />
            <Heading as="h4" className="mc-auth-title">
              {data?.title}
            </Heading>
            <Form className="mc-auth-form">
              <IconField
                type="text"
                placeholder="Enter email or number"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button
                className={`mc-auth-btn ${data?.button.fieldSize}`}
                type={data?.button.type}
                onClick={handleForgotPassword}
              >
                {data?.button.text}
              </Button>
              <ToastContainer />
            </Form>
            <Box className="mc-auth-navigate">
              <Text as="span">{data?.navigate.title}</Text>
              <Anchor href={data?.navigate.path}>{data?.navigate.text}</Anchor>
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
}
