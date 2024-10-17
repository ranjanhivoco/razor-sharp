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

export default function Ecommerce() {
  const [couponCount, setCouponCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [selllerProductCount, setSellerProductCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [sellerCount, setSellerCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  const [lastMonthSalesCount, setLastMonthSalesCount] = useState(0);

  const mockData = [
    { message: "January", message_count: 30 },
    { message: "February", message_count: 50 },
    { message: "March", message_count: 40 },
    { message: "April", message_count: 80 },
    { message: "May", message_count: 60 },
    { message: "June", message_count: 90 },
    { message: "July", message_count: 70 },
    { message: "August", message_count: 100 },
    { message: "September", message_count: 50 },
    { message: "October", message_count: 65 },
    { message: "November", message_count: 85 },
    { message: "December", message_count: 95 },
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

        <Col xs={4} sm={8} md={8} xl={8}>
          <Row xs={1} sm={2} md={2} xl={2}>
            <Col>
              <EcommerceCard
                // icons are not getting centered
                icon="shopping_cart"
                // icon="account_circle"
                title="total orders"
                // number={usersCount}
                number={8}
                variant="purple"
                percent="+ 95%"
                compare="last month"
              />
            </Col>

            <Col>
              <EcommerceCard
                icon="person"
                // icon="person_outline_outlined"
                title="Total Customers"
                // number={orderCount}
                number={10}
                variant="blue"
                percent="- 35%"
                compare="last month"
              />
            </Col>

            <Col>
              <EcommerceCard
                icon="trending_up"
                title="Total Upsell Attempts"
                // number={selllerProductCount}
                number={2}
                variant="pink"
                percent="- 25%"
                compare="last month"
              />
            </Col>

            <Col>
              <EcommerceCard
                icon="trending_down"
                title="Total Upsell Non Attempts"
                // number={categoryCount}
                number={8}
                variant="yellow"
                percent="+ 95%"
                compare="last month"
              />
            </Col>

            <Col>
              <EcommerceCard
                icon="notifications_none"
                title="Total Notifications"
                // number={sellerCount}
                number={1}
                variant="blue"
                percent="+ 95%"
                compare="last month"
              />
            </Col>

            <Col>
              <EcommerceCard
                icon="store"
                title="Total Branches"
                // number={sellerCount}
                number={2}
                variant="purple"
                percent="+ 95%"
                compare="last month"
              />
            </Col>
          </Row>
        </Col>

        <Col xs={4} sm={4} md={4} xl={4}>
          <WordCloudComponent />
        </Col>

        <Col xl={12}>
          <CustomBarChart
            background="#FFF5D5"
            barColor="#F8BC00"
            data={mockData}
          />
        </Col>

        <Col xl={12}>
          <Row xs={1} sm={2} md={2} lg={2}>
            <Col style={{ height: "260px" }} xs={12} md={6}>
              <DonutChart maleCount={10} femaleCount={6} />
            </Col>
            <Col style={{ height: "260px" }} xs={12} md={6}>
              <CustomPieChart attempted={156} successfull={125} />
            </Col>
          </Row>
        </Col>

        <Col xl={12}>
          <Row xs={1} sm={1} md={1} lg={1}>
            <CustomBubbleChart />
          </Row>
        </Col>

        {/* <Col lg={6}></Col>
        <Col lg={6}>
          <DateRangePicker />
        </Col> */}
      </Row>
    </PageLayout>
  );
}
