import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Breadcrumb } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/ecommerce.json";
import { Box, Item, Anchor } from "../../components/elements";
import { EcommerceCard, SalesCard, ProductsCard } from "../../components/cards";
import authHeader from "../../backendAxios/authHeader";
import {
  hostedAuthAxios,
  hostedCategoryAxios,
  hostedCouponAxios,
  hostedOrderAxios,
  hostedSellerAuthAxios,
  hostedSellerProductAxios,
} from "../../backendAxios/backendAxios";
import CustomBarChart from "../../components/charts/CustomBarChart";
import DonutChart from "../../components/charts/DonutChart";
import CustomPieChart from "../../components/charts/CustomPieChart";
import CustomBubbleChart from "../../components/charts/CustomBubbleChart";
import PastDatePicker from "../../components/elements/DateRangePicker";
import DateRangePicker from "../../components/elements/DateRangePicker";
import CustomDateRangePicker from "../../components/elements/DateRangePicker";
import CustomDropDown from "../../components/elements/CustomDropDown";
import WordCloudComponent from "../../components/elements/WordCloudComponent";
import StackChart from "../../components/charts/StackChart";
import AddNameAndDate from "../../components/elements/AddNameAndDate";
import DashBoardDonut from "../../components/elements/DashBoardDonut";
import { faL } from "@fortawesome/free-solid-svg-icons";
import DashBoardPieChart from "../../components/charts/DashBoardPieChart";
import axios from "axios";
import { useEffect } from "react";
import { createContext } from "react";
import Chat from "../../components/elements/Chat";
import Message from "./Message";
import CustomFunnelChart from "../../components/charts/CustomFunnelChart";

export default function Ecommerce() {
  const [couponCount, setCouponCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [selllerProductCount, setSellerProductCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [sellerCount, setSellerCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  const [lastMonthSalesCount, setLastMonthSalesCount] = useState(0);
  const [cardsInfo, setCardsInfo] = useState([]);
  const [cardsInfo2, setCardsInfo2] = useState([]);

  const [satisficationDateRange, setSatisficationDateRange] = useState({
    startDate: "10/01/2024",
    endDate: "10/08/2024",
  });

  const [customerDateRange, setCustomerDateRange] = useState({
    startDate: "10/01/2024",
    endDate: "10/08/2024",
  });

  const [upSellAttemptsDateRange, setUpSellAttemptsDateRange] = useState({
    startDate: "10/01/2024",
    endDate: "10/08/2024",
  });

  const [customerGraphData, setCustomerGraphData] = useState();

  const mockData = [
    { date: "01/10/24", message_count: 30 },
    { date: "02/10/24", message_count: 50 },
    { date: "03/10/24", message_count: 40 },
    { date: "04/10/24", message_count: 80 },
    { date: "05/10/24", message_count: 60 },
    { date: "06/10/24", message_count: 90 },
    { date: "07/10/24", message_count: 70 },
    { date: "08/10/24", message_count: 100 },
    { date: "09/10/24", message_count: 50 },
    { date: "10/10/24", message_count: 65 },
  ];

  const mcdBranches = [
    { name: "Sec 63, Noida", location: "Noida, Uttar Pradesh" },
    { name: "Connaught Place", location: "New Delhi, Delhi" },
    { name: "Bandra West", location: "Mumbai, Maharashtra" },
    { name: "Brigade Road", location: "Bangalore, Karnataka" },
    { name: "Park Street", location: "Kolkata, West Bengal" },
    { name: "Viman Nagar", location: "Pune, Maharashtra" },
    { name: "Anna Nagar", location: "Chennai, Tamil Nadu" },
    { name: "Hitech City", location: "Hyderabad, Telangana" },
    { name: "Sector 17", location: "Chandigarh" },
    { name: "MG Road", location: "Gurugram, Haryana" },
  ];

  const getCardsInfo = async () => {
    try {
      const tokenString = sessionStorage.getItem("token");
      const token = JSON.parse(tokenString);
      const response = await axios.get(
        "https://api.hongs.razorsharp.in/common/dashboard-card-info-1/2304",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCardsInfo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCardsInfo2 = async () => {
    try {
      const tokenString = sessionStorage.getItem("token");
      const token = JSON.parse(tokenString);
      const response = await axios.get(
        "  https://api.hongs.razorsharp.in/common/dashboard-card-info-2/2304",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCardsInfo2(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCustomerSatisfactionData = async () => {
    try {
      const tokenString = sessionStorage.getItem("token");
      const token = JSON.parse(tokenString);
      const response = await axios.get(
        `https://api.hongs.razorsharp.in/customer/dashboard/2304?start_date=${satisficationDateRange.startDate}&end_date=${satisficationDateRange.endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCardsInfo();
    getCardsInfo2();
  }, []);

  useEffect(() => {
    if (satisficationDateRange.startDate && satisficationDateRange.endDate) {
      getCustomerSatisfactionData();
    }
  }, [satisficationDateRange]);

  const getCustomerGraphData = async () => {
    try {
      const tokenString = sessionStorage.getItem("token");
      const token = JSON.parse(tokenString);
      const response = await axios.get(
        `https://api.hongs.razorsharp.in/customer/dashboard/2304?start_date=${customerDateRange.startDate}&end_date=${customerDateRange.endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCustomerGraphData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (customerDateRange.startDate && customerDateRange.endDate) {
      getCustomerGraphData();
    }
  }, [customerDateRange]);

  console.log(customerDateRange);

  // useEffect(() => {
  //   getAllCouponsList();
  //   getTotalCategoryCount();
  //   getTotalProductCount();
  //   getUserData();
  //   getAllSellers();
  //   getAllOrder();
  //   getTotalSales();
  // }, []);

  // useEffect(() => {

  // },[])

  const getAllCouponsList = async () => {
    const result = await hostedCouponAxios.get("/get-all-coupon", {
      headers: authHeader(),
    });
    setCouponCount(result?.data?.length);
  };

  const getTotalCategoryCount = async () => {
    const result = await hostedCategoryAxios.get("/getallcategory", {
      headers: authHeader(),
    });
    setCategoryCount(result?.data?.length);
  };

  const getTotalProductCount = async () => {
    await hostedSellerProductAxios.get(`/getallproduct`).then((response) => {
      setSellerProductCount(response?.data?.count);
    });
  };

  const getUserData = async () => {
    const result = await hostedAuthAxios.get("/users", {
      headers: authHeader(),
    });

    setUsersCount(result?.data?.data?.length);
  };

  const getAllSellers = async () => {
    const result = await hostedSellerAuthAxios.get("/sellers", {
      headers: authHeader(),
    });
    setSellerCount(result?.data?.data?.length);
  };

  const getAllOrder = async () => {
    const result = await hostedOrderAxios.get(`/getallorderbysuperadmin`, {
      headers: authHeader(),
    });
    setOrderCount(result?.data?.order?.length);
  };

  const getTotalSales = async () => {
    const result = await hostedOrderAxios.get(`/getdatacurrentmonth`, {
      headers: authHeader(),
    });
    const result2 = await hostedOrderAxios.get(`/getdatalastnmonths/1`, {
      headers: authHeader(),
    });
    setSalesCount(result?.data?.total_nonreturned_sales_price);
    setLastMonthSalesCount(result2.data?.total_nonreturned_sales_price);
  };

  const salesPercentageCard = (salesCount / lastMonthSalesCount) * 100;

  return (
    <PageLayout>
      <Row>
        <CustomDropDown />
        <Col xl={12}>
          <Box style={{ background: "#FFF5D580" }} className="mc-card">
            <Breadcrumb title={data?.pageTitle}>
              {data?.breadcrumb?.map((item, index) => (
                <Item key={index} className="mc-breadcrumb-item">
                  {item.path ? (
                    <Anchor className="mc-breadcrumb-link" href={item.path}>
                      {item.text}
                    </Anchor>
                  ) : (
                    item.text
                  )}
                </Item>
              ))}
            </Breadcrumb>
          </Box>
        </Col>

        <Col xs={12} sm={8} md={8} xl={8}>
          <Row xs={1} sm={2} md={2} xl={2}>
            <Col>
              <EcommerceCard
                // icons are not getting centered
                icon="shopping_cart"
                // icon="account_circle"

                title="total conversations"
                // number={usersCount}
                number={cardsInfo?.order?.current_month_total||0}
                percent={Math.round(cardsInfo?.order?.percentage_change) + "%"}
                variant="purple"
                compare="last month"
              />
            </Col>

            <Col>
              <EcommerceCard
                icon="person"
                // icon="person_outline_outlined"
                title="Total Customers"
                // number={orderCount}
                number={cardsInfo2?.customer?.current_month_total || 0}
                percent={
                  Math.round(cardsInfo2?.customer?.percentage_change) + "%"
                }
                variant="blue"
                compare="last month"
              />
            </Col>

            <Col>
              <EcommerceCard
                icon="trending_up"
                title="Upsell Attempts"
                // number={selllerProductCount}
                number={cardsInfo?.upsell_attempted?.current_month_total || 0}
                percent={
                  Math.round(cardsInfo?.upsell_attempted?.percentage_change) +
                  "%"
                }
                variant="pink"
                compare="last month"
              />
            </Col>

            <Col>
              <EcommerceCard
                icon="trending_flat"
                title="Successful Upsell"
                // number={categoryCount}
                number={cardsInfo2?.upsell_successful?.current_month_total || 0} 
                percent={
                  Math.round(cardsInfo2?.upsell_successful?.percentage_change) +
                  "%"
                }
                variant="yellow"
                compare="last month"
              />
            </Col>

            <Col>
              <EcommerceCard
                icon="notifications_none"
                title="Total Notifications"
                // number={sellerCount}
                number={cardsInfo?.notification?.current_month_total}
                percent={
                  Math.round(cardsInfo?.notification?.percentage_change) + "%"
                }
                variant="blue"
                compare="last month"
              />
            </Col>

            <Col>
              <EcommerceCard
                icon="store"
                title="Total Branches"
                // number={sellerCount}
                number={1}
                variant="purple"
                percent="0%"
                compare="last month"
              />
            </Col>
          </Row>
        </Col>

        <Col xs={12} sm={4} md={4} xl={4}>
          <WordCloudComponent />
        </Col>

        <Col style={{height:"100%"}} xl={12}>
          <Box
            style={{ background: "#E5EEFF", borderRadius: "8px",height:"fitContent" }}
            className="mc-card"
          >
            <Row>
              <Col md={12}>
                <AddNameAndDate
                  title={"Customer Satisfaction"}
                  range={satisficationDateRange}
                  setRange={setSatisficationDateRange}
                />
              </Col>
              <Col md={12}>
                <StackChart />
              </Col>
            </Row>
          </Box>
        </Col>

        <Col style={{marginBottom:"10px"}} md={6}>
          <Box
            style={{
              borderRadius: "8px",
              background: "#9A6ADB33",
              height: "100%",
            }}
            className="mc-card"
          >
            <AddNameAndDate
              hideDate={false}
              title={"Upsell Attempts"}
              range={upSellAttemptsDateRange}
              setRange={setUpSellAttemptsDateRange}
            />

            <Col style={{ height: "", marginTop: "60px" }} xs={12} md={12}>
              <CustomFunnelChart />
            </Col>
          </Box>
        </Col>

        <Col style={{marginBottom:"10px"}} md={6} xl={6}>
          <Box
            style={{
              borderRadius: "8px",
              background: "#FFF5D5",
              height: "48%",
            }}
            className="mc-card"
          >
            <AddNameAndDate
              hideDate={false}
              title={"Customer"}
              range={customerDateRange}
              setRange={setCustomerDateRange}
            />

            <Col style={{ height: "200px" }} xs={12} md={12}>
              {console.log(customerGraphData)}
              <DashBoardDonut
                maleCount={customerGraphData?.male?.total_male_count}
                femaleCount={customerGraphData?.female?.total_female_count}
              />
            </Col>
          </Box>

          <Box
            style={{
              borderRadius: "8px",
              background: "#9A6ADB29",
              height: "48%",
            }}
            className="mc-card"
          >
            <AddNameAndDate
              range={upSellAttemptsDateRange}
              setRange={setUpSellAttemptsDateRange}
              hideDate={false}
              title={"3-Step Summary"}
            />

            <Col style={{ height: "200px" }} xs={12} md={12}>
              <DashBoardPieChart
              // attempted={156} successfull={125}
              />
            </Col>
          </Box>
        </Col>

        {/* <Col md={6} xl={6}>
          <Box
            style={{ borderRadius: "8px", background: "#9A6ADB29" }}
            className="mc-card"
          >
            <AddNameAndDate
              range={upSellAttemptsDateRange}
              setRange={setUpSellAttemptsDateRange}
              hideDate={false}
              title={"Upsell Attempts"}
            />

            <Col style={{ height: "260px" }} xs={12} md={12}>
              <DashBoardPieChart attempted={156} successfull={125} />
            </Col>
          </Box>
        </Col> */}

        {/* <Col xl={12}>
          <Row xs={1} sm={2} md={2} lg={2}>
            <Col style={{ height: "260px" }} xs={12} md={6}>
              <DonutChart maleCount={10} femaleCount={6} />
            </Col>

            <Col style={{ height: "260px" }} xs={12} md={6}>
              <CustomPieChart attempted={156} successfull={125} />
            </Col>
          </Row>
        </Col> */}

        {/* <Col xl={12}>
          <Row xs={1} sm={1} md={1} lg={1}>
            <CustomBubbleChart />
          </Row>
        </Col> */}

        {/* <Col lg={6}></Col>
        <Col lg={6}>
          <DateRangePicker />
        </Col> */}

        {/* <Chat /> */}
        {/* <Message/> */}
      </Row>
    </PageLayout>
  );
}
