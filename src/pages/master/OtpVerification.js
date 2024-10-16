import React from "react";
import { useState } from "react";
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
import data from "../../data/master/login.json";
import { useNavigate } from "react-router-dom";
import { LoaderProvider } from "../../context/Preloader";

export default function OTPverification() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [otpVerify, setOtpVerify] = useState({
    otp: "",
    mobileNumber: localStorage.getItem("number"),
  });

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await hostedAuthAxios.post("/otpverify", otpVerify);

    setLoading(false);
    if (result.status === "success") {
      navigate("/login");
    }
  };

  const handleResendOtp = async () => {
    await hostedAuthAxios.post("/otpresend", {
      number: otpVerify.mobileNumber,
    });
  };

  return (
    <div>
      {loading ? (
        <LoaderProvider />
      ) : (
        <Box className="mc-auth">
          <Image
            src="/images/pattern.webp"
            alt={data?.pattern.alt}
            className="mc-auth-pattern"
          />
          <Box className="mc-auth-group">
            <Logo
              src="/images/favicon.ico"
              alt={data?.logo.alt}
              href={data?.logo.path}
              className="mc-auth-logo"
            />
            <Heading as="h4" className="mc-auth-title">
              Verify Your OTP
            </Heading>
            <Form className="mc-auth-form">
              <IconField
                icon="email"
                placeholder="Enter OTP"
                type="text"
                classes="w-100 h-sm gray"
                value={otpVerify.otp}
                onChange={(e) =>
                  setOtpVerify({ ...otpVerify, otp: e.target.value })
                }
              />

              <Button
                className={`mc-auth-btn ${data?.button.fieldSize}`}
                type={data?.button.type}
                onClick={handleOtpVerification}
              >
                Verify OTP
              </Button>
              <Anchor href="" onClick={handleResendOtp}>
                Resend OTP
              </Anchor>
            </Form>
            <Box className="mc-auth-navigate">
              <Text as="span">Another Accounts? </Text>
              <Anchor href="/login">Login</Anchor>
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
}
