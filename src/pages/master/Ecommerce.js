import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Breadcrumb } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/ecommerce.json";
import { Box } from "../../components/elements";
import { EcommerceCard } from "../../components/cards";
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

  function getTimePeriodText(period) {
    period = period.toLowerCase();
    if (period === "7d") {
      return "Last week";
    } else if (period === "14d") {
      return "Last fortnight";
    } else if (period === "1m") {
      return "Last month";
    } else if (period === "3m") {
      return "Last quarter";
    } else {
      return "Invalid period";
    }
  }

  useEffect(() => {
    getCardDetails();
  }, [selectedRange]);

  return (
    <PageLayout>
      <Row>
        <CustomDropDown />

        <Col
          style={{ position: "sticky", top: "43px", zIndex: "400" }}
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
                selectedRange={selectedRange.toLowerCase()}
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
                compare={getTimePeriodText(selectedRange)}
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
                compare={getTimePeriodText(selectedRange)}
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
                compare={getTimePeriodText(selectedRange)}
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
                compare={getTimePeriodText(selectedRange)}
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
                compare={getTimePeriodText(selectedRange)}
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
                compare={getTimePeriodText(selectedRange)}
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
                <AddNameAndDate title={"Customer Satisfaction"} />
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
            <AddNameAndDate hideDate={false} title={"Upsell Attempts"} />

            <Col style={{ height: "", marginTop: "60px" }} xs={12} md={12}>
              <CustomFunnelChart selectedRange={selectedRange} />
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
            <AddNameAndDate hideDate={false} title={"Customer"} />

            <Col style={{ height: "200px" }} xs={12} md={12}>
              <DashBoardDonut selectedRange={selectedRange} />
            </Col>
          </Box>

          <Box
            style={{
              borderRadius: "8px",
              background: "#77DD7729",
              height: "48%",
            }}
            className="mc-card"
          >
            <AddNameAndDate hideDate={false} title={"3-Step Summary"} />

            <Col style={{ height: "200px" }} xs={12} md={12}>
              <DashBoardPieChart selectedRange={selectedRange} />
            </Col>
          </Box>
        </Col>
      </Row>
    </PageLayout>
  );
}
