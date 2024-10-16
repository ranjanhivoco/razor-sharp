import React, { useContext, useState, useRef, useEffect } from "react";
import {
  WidgetDropdown,
  ProfileDropdown,
  LanguageDropdown,
} from "../components/header";
import { Button, Section, Box } from "../components/elements";
import { DrawerContext } from "../context/Drawer";
// import { ThemeContext } from "../context/Themes";
import { Logo } from "../components";
import data from "../data/master/header.json";
import {
  hostedOrderAxios,
  hostedSellerProductAxios,
} from "../backendAxios/backendAxios";
import authHeader from "../backendAxios/authHeader";
import { Input } from "@mui/material";
import ProductSearchPopup from "../components/elements/productSearchPopup";

export default function Header() {
  const { drawer, toggleDrawer } = useContext(DrawerContext);
  // const { theme, toggleTheme } = useContext(ThemeContext);
  const searchRef = useRef();
  const [scroll, setScroll] = useState("fixed");
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [orderNotification, setOrderNotification] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchPopup, setSearchPopup] = useState(false);
  const [orderCountNumber, setOrderCountNumber] = useState(0);
  const [openProductPopup, setOpenProductPopup] = useState(false);
  const [productId, setProductId] = useState("");

  // useEffect(() => {
  //   getNewOrderNotification();
  // }, []);

  // useEffect(() => {
  //   let timeoutId;
  //   timeoutId = setTimeout(searchProduct, 1000);
  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, [searchQuery]);

  const searchProduct = async () => {
    if (searchQuery.trim() !== "") {
      try {
        await hostedSellerProductAxios
          .post(`/search?s=${searchQuery}`)
          .then((response) => {
            if (response.status === 200) {
              setSearchResult(response?.data?.products);
              setSearchPopup(true);
            }
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const getNewOrderNotification = async () => {
    await hostedOrderAxios
      .get(`/new-orders`, { headers: authHeader() })
      .then((response) => {
        if (response.status === 200) {
          setOrderNotification(response?.data);
          setOrderCountNumber(response?.data?.length);
        }
      });
  };

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 0) setScroll("sticky");
    else setScroll("fixed");
  });

  document.addEventListener("mousedown", (event) => {
    if (!searchRef.current?.contains(event.target)) {
      setSearch("");
      setSearchPopup(false);
    }
  });

  return (
    <Section stye as="header" className={`mc-header ${scroll}`}>
      <Logo
        src={data?.logo.src}
        alt={data?.logo.alt}
        // name = { data?.logo.name }
        href={data?.logo.path}
      />


      <Box className="mc-header-group">
        <Box className="mc-header-left" style={{ marginLeft: "20px" }}>
          <Button
            icon={data?.search.icon}
            className="mc-header-icon search"
            onClick={() => setSearch("show")}
          />

          {/* resize  */}
          <Button
            icon={drawer ? "menu_open" : "menu"}
            className="mc-header-icon toggle "
            onClick={toggleDrawer}
          />

          <Box className={`mc-header-search-group ${search}`}>
            {/* <form className="mc-header-search">
              <Button className="material-icons">{data?.search.icon}</Button>
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ borderBottom: "none" }}
                placeholder="Search products.."
              />
            </form> */}
          </Box>
        </Box>
        {searchPopup ? (
          <div className="search-popup" ref={searchRef}>
            {searchResult?.map((product, index) => (
              <li
                style={{
                  display: "flex",
                  marginBottom: "20px",
                  gap: "12px",
                  cursor: "pointer",
                }}
                key={index}
                onClick={() => {
                  setOpenProductPopup(true);
                  setProductId(product?._id);
                }}
              >
                <span>
                  {" "}
                  <img
                    style={{ width: "50px", borderRadius: "6px" }}
                    src={product?.images[0]}
                    alt={product?.name}
                  />
                </span>

                <p style={{ fontSize: "13px", lineHeight: "23px" }}>
                  {product?.title}
                </p>
              </li>
            ))}
          </div>
        ) : (
          ""
        )}

        <Box className="mc-header-right">
          {/* <Button
            icon={theme}
            title={data.theme.title}
            onClick={toggleTheme}
            className={`mc-header-icon ${data.theme.addClass}`}
          /> */}
          {/* <LanguageDropdown
            icon={data.language.icon}
            title={data.language.title}
            addClass={data.language.addClass}
            dropdown={data.language.dropdown}
          /> */}
          {/* <WidgetDropdown
            icon={data.cart.icon}
            title={data.cart.title}
            badge={data.cart.badge}
            addClass={data.cart.addClass}
            dropdown={data.cart.dropdown}
          /> */}
          {/* <WidgetDropdown
            icon={data.message.icon}
            title={data.message.title}
            badge={data.message.badge}
            addClass={data.message.addClass}
            dropdown={data.message.dropdown}
          /> */}


{/* notification icon */}

                <WidgetDropdown
                  icon={data.notify.icon}
                  title={data.notify.title}
                  badge={orderNotification}
                  addClass={data.notify.addClass}
                  dropdown={orderNotification?.map((item) => item?.product_array[0])}
                />
                


          <ProfileDropdown
            name={data.profile.name}
            image={data.profile.image}
            username={data.profile.username}
            dropdown={data.profile.dropdown}
          />

          <ProductSearchPopup
            openProductPopup={openProductPopup}
            setOpenProductPopup={setOpenProductPopup}
            closePopup={() => setOpenProductPopup(false)}
            productId={productId}
            title="Product Details !"
          />
        </Box>
      </Box>
    </Section>
  );
}
