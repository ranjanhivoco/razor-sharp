import React, { useRef } from "react";
import { useState } from "react";
import { hostedAuthAxios } from "../../backendAxios/backendAxios";
// import axios from 'axios';
import {
  Box,
  Form,
  Heading,
  Button,
  Image,
  Input,
  Label,
  Text,
  Anchor,
  Icon,
} from "../../components/elements";
import IconField from "../../components/fields/IconField";
import Logo from "../../components/Logo";
import data from "../../data/master/login.json";
// import GoogleAuth from "../../components/GoogleAuth";
import { useNavigate } from "react-router-dom";
import { LoaderProvider } from "../../context/Preloader";
import ReCAPTCHA from "react-google-recaptcha";
import showPwdImg from "../../show-password.svg";
import hidePwdImg from "../../hide-password.svg";
// import authHeader from "../../backendAxios/authHeader";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [register, setRegister] = useState({
    name: "",
    mobileNumber: "",
    password: "",
    email: "",
    emailSubscription: true,
  });

  const ApiUrl = "http://localhost:3000";
  // const ApiUrl = "http://localhost:3000"

  const handleRegister = async (e) => {
    e.preventDefault();
    // setLoading(true);
    try {
      const result = await hostedAuthAxios.post("/register", register);
      localStorage.setItem("number", result.data.mobileNumber);
      navigate("/register/otp-verification");
    } catch (error) {
      return error;
    }
    // setLoading(false);
  };

  const handleCaptchaChange = async (e, value) => {
    const token = captchaRef.current.getValue();
    // captchaRef.current.reset();
    console.log("token:", token);

    // await axios
    //   .post("https://localhost:3000", { token })
    //   .then((res) => console.log(res))
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  const captchaRef = useRef(null);

  // const handleGoogleAuth = async() => {

  //  }

  return (
    <div>
      {loading ? (
        <LoaderProvider />
      ) : (
        <div>
          <Box className="mc-auth">
            <Image
              src="/images/background.png"
              alt={data?.pattern.alt}
              className="mc-auth-pattern"
            />
            <Box className="mc-auth-group">
              <Logo
                src={data?.logo?.src}
                alt={data?.logo.alt}
                href={data?.logo.path}
                className="mc-auth-logo"
              />
              <Heading as="h4" className="mc-auth-title">
                Register a new account
              </Heading>
              <Form className="mc-auth-form" onSubmit={handleRegister}>
                <IconField
                  required
                  autoComplete="off"
                  icon="account_circle"
                  placeholder="Enter your name"
                  type="text"
                  classes="w-100 h-sm gray"
                  value={register.name}
                  onChange={(e) =>
                    setRegister({ ...register, name: e.target.value })
                  }
                />
                <IconField
                  required
                  autoComplete="off"
                  icon="phone"
                  placeholder="Enter your mobile number"
                  type="number"
                  classes="w-100 h-sm gray"
                  value={register.mobileNumber}
                  onChange={(e) =>
                    setRegister({ ...register, mobileNumber: e.target.value })
                  }
                />
                <IconField
                  required
                  autoComplete="off"
                  icon="email"
                  placeholder="Enter you Email"
                  type="text"
                  classes="w-100 h-sm gray"
                  value={register.email}
                  onChange={(e) =>
                    setRegister({ ...register, email: e.target.value })
                  }
                />
                <div style={{ position: " relative" }}>
                  <IconField
                    required
                    autoComplete="off"
                    icon="lock"
                    placeholder="Enter your password"
                    type={isRevealPwd ? "text" : "password"}
                    classes="w-100 h-sm gray"
                    value={register.password}
                    onChange={(e) =>
                      setRegister({ ...register, password: e.target.value })
                    }
                  />
                  <img
                    style={{
                      cursor: "pointer",
                      width: "20px",
                      position: "absolute",
                      right: "8px",
                      top: "12px",
                    }}
                    alt="img"
                    className="hideAndShow"
                    title={isRevealPwd ? "Hide password" : "Show password"}
                    src={isRevealPwd ? hidePwdImg : showPwdImg}
                    onClick={() => setIsRevealPwd((prevState) => !prevState)}
                  />
                </div>
                <Box className="mc-auth-checkbox">
                  <Input
                    type="checkbox"
                    id="checkbox"
                    defaultChecked={true}
                    onChange={(e) =>
                      setRegister({
                        ...register,
                        emailSubscription: e.target.checked,
                      })
                    }
                  />
                  <Label
                    text="I agree with the Terms and Conditions, Email subscription"
                    htmlFor="checkbox"
                  />
                </Box>

                <ReCAPTCHA
                  className="recap"
                  id="captcha"
                  style={{ marginLeft: "-9px" }}
                  sitekey="6LdoL0EjAAAAAD1RF6gy2r6_vTrCVE6iZ8XKkC-m "
                  size="normal"
                  theme=""
                  onChange={handleCaptchaChange}
                  ref={captchaRef}
                />

                <Button
                  className={`mc-auth-btn ${data?.button.fieldSize} mt-3`}
                  type={data?.button.type}
                  // onClick={handleRegister}
                >
                  Register
                </Button>
                <Box className="mc-auth-divide">
                  <Text as="span">{data?.divide.text}</Text>
                </Box>
                <Box className="mc-auth-connect">
                  {data?.connect.map((item, index) => (
                    <Anchor
                      key={index}
                      href={item.path}
                      className={item.classes}
                      onClick={() =>
                        window.location.assign(`${ApiUrl}/auth/google`)
                      }
                    >
                      <Icon className={item.icon}></Icon>
                      <Button as="span" type="submit">
                        {item.text}
                      </Button>
                    </Anchor>
                  ))}
                </Box>
              </Form>
              <Box className="mc-auth-navigate">
                <Text as="span">Already have a Accounts? </Text>
                <Anchor href="/login">Login</Anchor>
              </Box>
            </Box>
          </Box>
        </div>
      )}
    </div>
  );
}
