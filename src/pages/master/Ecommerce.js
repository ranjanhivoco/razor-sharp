import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Breadcrumb } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/ecommerce.json";
import { Box } from "../../components/elements";
import { EcommerceCard } from "../../components/cards";
// import authHeader from "../../backendAxios/authHeader";
// import {
//   hostedAuthAxios,
//   hostedCategoryAxios,
//   hostedCouponAxios,
//   hostedOrderAxios,
//   hostedSellerAuthAxios,
//   hostedSellerProductAxios,
// } from "../../backendAxios/backendAxios";
// import CustomBarChart from "../../components/charts/CustomBarChart";
// import DonutChart from "../../components/charts/DonutChart";
// import CustomPieChart from "../../components/charts/CustomPieChart";
// import CustomBubbleChart from "../../components/charts/CustomBubbleChart";
// import PastDatePicker from "../../components/elements/DateRangePicker";
// import DateRangePicker from "../../components/elements/DateRangePicker";
// import CustomDateRangePicker from "../../components/elements/DateRangePicker";
import CustomDropDown from "../../components/elements/CustomDropDown";
import WordCloudComponent from "../../components/elements/WordCloudComponent";
import StackChart from "../../components/charts/StackChart";
import AddNameAndDate from "../../components/elements/AddNameAndDate";
import DashBoardDonut from "../../components/elements/DashBoardDonut";
import DashBoardPieChart from "../../components/charts/DashBoardPieChart";
import axios from "axios";
import { useEffect } from "react";
import CustomFunnelChart from "../../components/charts/CustomFunnelChart";
import TimePeriodSelector from "../../components/elements/TimePeriodSelector";

export default function Ecommerce() {
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

  const [cardDetails, setCardDetails] = useState([]);

  const [selectedRange, setSelectedRange] = useState("7D");


  const getCardDetails = async () => {
    const url = "https://api.hongs.razorsharp.in";
    try {
      const tokenString = sessionStorage.getItem("token");
      const token = JSON.parse(tokenString);
      const response = await axios.get(
        `${url}/dashboard/cards/2304/${selectedRange.toLowerCase()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCardDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  

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
    // getCardsInfo();
    // getCardsInfo2();
    getCardDetails()
  }, [selectedRange]);

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

  // const getAllCouponsList = async () => {
  //   const result = await hostedCouponAxios.get("/get-all-coupon", {
  //     headers: authHeader(),
  //   });
  //   setCouponCount(result?.data?.length);
  // };

  return (
    <PageLayout>
      <Row>
        <CustomDropDown />

        <Col
          style={{ position: "sticky", top: "43px", zIndex: "1000" }}
          xl={12}
        >
          <Box
            style={{
              //  background: "#FFF5D580",
              borderRadius: "0px",
              background: "white",
            }}
            className="mc-card"
          >
            <Breadcrumb title={data?.pageTitle}>
              {/* {data?.breadcrumb?.map((item, index) => (
                <Item key={index} className="mc-breadcrumb-item">
                  {item.path ? (
                    <Anchor className="mc-breadcrumb-link" href={item.path}>
                      {item.text}
                    </Anchor>
                  ) : (
                    item.text
                  )}
                </Item>
              ))} */}

              <TimePeriodSelector
                selectedRange={selectedRange}
                setSelectedRange={setSelectedRange}
              />
            </Breadcrumb>
          </Box>
        </Col>

        <Col xs={12} sm={8} md={8} xl={8}>
          <Row xs={1} sm={2} md={2} xl={2}>
            <Col>
              <EcommerceCard
                icon="shopping_cart"
                title="total conversations"
                // number={usersCount}
                number={cardDetails?.conversation?.conversationCurrentSum || 0}
                percent={
                  Math.round(
                    cardDetails?.conversation?.conversationPercentageIncrease
                  ) + "%"
                }
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
                number={cardDetails?.customer?.customerCurrentSum || 0}
                percent={
                  Math.round(
                    cardDetails?.customer?.customerPercentageIncrease
                  ) + "%"
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
                number={
                  cardDetails?.upsell_attempted?.upsell_attemptedCurrentSum || 0
                }
                percent={
                  Math.round(
                    cardDetails?.upsell_attempted
                      ?.upsell_attemptedPercentageIncrease
                  ) + "%"
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
                number={
                  cardDetails?.upsell_successful?.upsell_successfulCurrentSum ||
                  0
                }
                percent={
                  Math.round(
                    cardDetails?.upsell_successful
                      ?.upsell_successfulPercentageIncrease
                  ) + "%"
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
                number={cardDetails?.notification?.notificationCurrentSum || 0}
                percent={
                  Math.round(
                    cardDetails?.notification?.notificationPercentageIncrease
                  ) + "%"
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

        <Col xl={12}>
          <Box
            style={{
              background: "#E5EEFF",
              borderRadius: "8px",
              height: "fitContent",
            }}
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

        <Col style={{ marginBottom: "10px" }} md={6}>
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
              <CustomFunnelChart  selectedRange={selectedRange}/>
            </Col>
          </Box>
        </Col>

        <Col style={{ marginBottom: "10px" }} md={6} xl={6}>
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
      </Row>
    </PageLayout>
  );
}
