import React, { useState, useEffect } from "react";
import PageLayout from "../../layouts/PageLayout";
import { Box, Button } from "../../components/elements";
import { LoaderProvider } from "../../context/Preloader";
import { CardLayout } from "../../components/cards";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Col } from "react-bootstrap";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";
import { hostedAuthAxios } from "../../backendAxios/backendAxios";
import { hostedOrderAxios } from "../../backendAxios/backendAxios";
import authHeader from "../../backendAxios/authHeader";

// const data1 = [
//   { name: "Page A", uv: 400 },
//   { name: "Page B", uv: 200 },
//   { name: "Page C", uv: 300 },
// ];

export default function Admin({ icon, text }) {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(true);
  const [customer, setCustomer] = useState(false);
  const [buttonState, setButtonState] = useState(true);
  const [customerData, setCustomerData] = useState({
    sevenDays: "",
    thisMonth: "",
    lastMonth: "",
    year: "",
  });
  const [data, setData] = useState({
    sevenDays: "",
    thisMonth: "",
    lastMonth: "",
    year: "",
  });

  useEffect(() => {
    handleLastSevenDays();
    handleCustomerLastSevenDays();
  }, []);

  const buttonStyle = {
    backgroundColor: order ? "#ffc107" : "",
  };
  const buttonStyle1 = {
    backgroundColor: customer ? "#ffc107" : "",
  };

  const buttonStyle2 = {
    backgroundColor: buttonState ? "gray" : "",
  };

  const handleYearData = async () => {
    await hostedOrderAxios
      .get(`getdatalastnmonths/12`, { headers: authHeader() })
      .then((response) => {
        if (response.status === 200) {
          setData({
            ...data,
            year: response?.data,
            sevenDays: "",
            thisMonth: "",
            lastMonth: "",
          });
        }
      });
  };
  const handlelastMonth = async () => {
    await hostedOrderAxios
      .get(`getdatalastnmonths/1`, { headers: authHeader() })
      .then((response) => {
        if (response.status === 200) {
          setData({
            ...data,
            lastMonth: response?.data,
            sevenDays: "",
            thisMonth: "",
            year: "",
          });
        }
      });
  };
  const handleThisMonth = async () => {
    await hostedOrderAxios
      .get(`/getdatacurrentmonth`, { headers: authHeader() })
      .then((response) => {
        if (response.status === 200) {
          setData({
            ...data,
            thisMonth: response?.data,
            sevenDays: "",
            lastMonth: "",
            year: "",
          });
        }
      });
  };

  const handleLastSevenDays = async () => {
    await hostedOrderAxios
      .get(`/getdatalastndays/1`, { headers: authHeader() })
      .then((response) => {
        if (response.status === 200) {
          setData({
            ...data,
            sevenDays: response?.data,
            thisMonth: "",
            lastMonth: "",
            year: "",
          });
        }
      });
  };

  const handleCustomerYearData = async () => {
    await hostedAuthAxios
      .get(`/getdatalastnmonths/12`, { headers: authHeader() })
      .then((response) => {
        if (response.status === 200) {
          setCustomerData({
            ...customerData,
            year: response?.data,
            sevenDays: "",
            thisMonth: "",
            lastMonth: "",
          });
        }
      });
  };
  const handleCustomerlastMonth = async () => {
    await hostedAuthAxios
      .get(`getdatalastnmonths/1`, { headers: authHeader() })
      .then((response) => {
        if (response.status === 200) {
          setCustomerData({
            ...customerData,
            lastMonth: response?.data,
            sevenDays: "",
            thisMonth: "",
            year: "",
          });
        }
      });
  };
  const handleCustomerThisMonth = async () => {
    await hostedAuthAxios
      .get(`/getdatacurrentmonth`, { headers: authHeader() })
      .then((response) => {
        if (response.status === 200) {
          setCustomerData({
            ...customerData,
            thisMonth: response?.data,
            sevenDays: "",
            lastMonth: "",
            year: "",
          });
        }
      });
  };

  const handleCustomerLastSevenDays = async () => {
    await hostedAuthAxios
      .get(`/getuserlastndays/1`, { headers: authHeader() })
      .then((response) => {
        if (response.status === 200) {
          setCustomerData({
            ...customerData,
            sevenDays: response?.data,
            thisMonth: "",
            lastMonth: "",
            year: "",
          });
        }
      });
  };

  return (
    <PageLayout>
      <>
        {loading ? (
          <LoaderProvider />
        ) : (
          <>
            <Box style={{ display: "flex", justifyContent: "end" }}>
              <Button
                type="button"
                text="order"
                className="btn btn-outline-warning btn-sm text-black me-3"
                style={buttonStyle}
                onClick={() => {
                  setOrder(true);
                  setCustomer(false);
                }}
              />
              <Button
                type="button"
                text="Customer"
                className="btn btn-outline-warning btn-sm text-black "
                style={buttonStyle1}
                onClick={() => {
                  setCustomer(true);
                  setOrder(!order);
                  //   setTimeline(true);
                }}
              />
            </Box>

            <Col xl={12}>
              <CardLayout>
                <div>
                  <Button
                    onClick={() => {
                      handleYearData();
                      handleCustomerYearData();
                      setButtonState(false);
                    }}
                    className="btn btn-outline-secondary btn-sm text-black me-3 border-right"
                  >
                    Year
                  </Button>
                  | &nbsp;
                  <Button
                    onClick={() => {
                      handlelastMonth();
                      handleCustomerlastMonth();
                      setButtonState(false);
                    }}
                    className="btn btn-outline-secondary btn-sm text-black me-3 border-right"
                  >
                    Last month
                  </Button>
                  | &nbsp;
                  <Button
                    onClick={() => {
                      handleThisMonth();
                      handleCustomerThisMonth();
                      setButtonState(false);
                    }}
                    className="btn btn-outline-secondary btn-sm text-black me-3 border-right"
                  >
                    This month
                  </Button>
                  | &nbsp;
                  <Button
                    onClick={() => {
                      handleLastSevenDays();
                      handleCustomerLastSevenDays();
                    }}
                    style={buttonStyle2}
                    className="btn btn-outline-secondary btn-sm text-black"
                  >
                    Last 7 days
                  </Button>
                </div>
              </CardLayout>
            </Col>

            {order ? (
              <Box>
                <CardLayout>
                  <div className="col" style={{ display: "flex", gap: "20px" }}>
                    <div class="col" id="admin-data">
                      <div
                        class="card"
                        style={{
                          width: "100%",
                          marginBottom: "12px",
                          cursor: "pointer",
                        }}
                      >
                        <div class="card-body">
                          <h5 class="card-title">
                            $
                            {data?.thisMonth?.total_nonreturned_current_sales_price?.toFixed() ||
                            data?.sevenDays?.total_nonreturned_current_sales_price?.toFixed() ||
                            data?.lastMonth?.total_nonreturned_current_sales_price?.toFixed() ||
                            data?.year?.total_nonreturned_current_sales_price?.toFixed()
                              ? data?.thisMonth?.total_nonreturned_current_sales_price?.toFixed() ||
                                data?.sevenDays?.total_nonreturned_current_sales_price?.toFixed() ||
                                data?.lastMonth?.total_nonreturned_current_sales_price?.toFixed() ||
                                data?.year?.total_nonreturned_current_sales_price?.toFixed()
                              : 0}
                          </h5>
                          <p class="card-text">Gross sales in this period</p>
                        </div>
                      </div>
                      <div
                        class="card"
                        style={{
                          width: "100%",
                          marginBottom: "12px",
                          cursor: "pointer",
                        }}
                      >
                        <div class="card-body">
                          <h5 class="card-title">
                            $
                            {data?.thisMonth?.total_nonreturned_sales_price?.toFixed() ||
                            data?.sevenDays?.total_nonreturned_sales_price?.toFixed() ||
                            data?.lastMonth?.total_nonreturned_sales_price?.toFixed() ||
                            data?.year?.total_nonreturned_sales_price?.toFixed()
                              ? data?.thisMonth?.total_nonreturned_sales_price?.toFixed() ||
                                data?.sevenDays?.total_nonreturned_sales_price?.toFixed() ||
                                data?.lastMonth?.total_nonreturned_sales_price?.toFixed() ||
                                data?.year?.total_nonreturned_sales_price?.toFixed()
                              : 0}{" "}
                          </h5>
                          <p class="card-text">Net sale in this period</p>
                        </div>
                      </div>
                      <div
                        class="card"
                        style={{
                          width: "100%",
                          marginBottom: "12px",
                          cursor: "pointer",
                        }}
                      >
                        <div class="card-body">
                          <h5 class="card-title">
                            {data?.thisMonth?.allOrder?.length ||
                            data?.sevenDays?.allOrder?.length ||
                            data?.lastMonth?.allOrder?.length ||
                            data?.year?.allOrder?.length
                              ? data?.thisMonth?.allOrder?.length ||
                                data?.sevenDays?.allOrder?.length ||
                                data?.lastMonth?.allOrder?.length ||
                                data?.year?.allOrder?.length
                              : 0}
                          </h5>
                          <p class="card-text">Order placed</p>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div
                        class="card"
                        style={{
                          width: "100%",
                          marginBottom: "12px",
                          cursor: "pointer",
                        }}
                      >
                        <div class="card-body">
                          <h5 class="card-title">
                            {data?.thisMonth?.total_sold_item?.toFixed() ||
                            data?.sevenDays?.total_sold_item?.toFixed() ||
                            data?.lastMonth?.total_sold_item?.toFixed() ||
                            data?.year?.total_sold_item?.toFixed()
                              ? data?.thisMonth?.total_sold_item?.toFixed() ||
                                data?.sevenDays?.total_sold_item?.toFixed() ||
                                data?.lastMonth?.total_sold_item?.toFixed() ||
                                data?.year?.total_sold_item?.toFixed()
                              : 0}
                          </h5>
                          <p class="card-text">Item purchased</p>
                        </div>
                      </div>
                      <div
                        class="card"
                        style={{
                          width: "100%",
                          marginBottom: "12px",
                          cursor: "pointer",
                        }}
                      >
                        <div class="card-body">
                          <h5 class="card-title">
                            {data?.thisMonth?.total_returned_item?.toFixed() &&
                            data?.sevenDays?.total_returned_item?.toFixed() &&
                            data?.year?.total_returned_item?.toFixed() &&
                            data?.lastMonth?.total_returned_item?.toFixed()
                              ? data?.thisMonth?.total_returned_item?.toFixed() &&
                                data?.sevenDays?.total_returned_item?.toFixed() &&
                                data?.year?.total_returned_item?.toFixed() &&
                                data?.lastMonth?.total_returned_item?.toFixed()
                              : 0}
                          </h5>
                          <p class="card-text">Refunded order</p>
                        </div>
                      </div>
                      <div
                        class="card"
                        style={{
                          width: "100%",
                          marginBottom: "12px",
                          cursor: "pointer",
                        }}
                      >
                        <div class="card-body">
                          <h5 class="card-title">
                            $
                            {data?.thisMonth?.total_nonreturned_discount_price?.toFixed() ||
                            data?.year?.total_nonreturned_discount_price?.toFixed() ||
                            data?.lastMonth?.total_nonreturned_discount_price?.toFixed() ||
                            data?.sevenDays?.total_nonreturned_discount_price?.toFixed()
                              ? data?.thisMonth?.total_nonreturned_discount_price?.toFixed() ||
                                data?.year?.total_nonreturned_discount_price?.toFixed() ||
                                data?.lastMonth?.total_nonreturned_discount_price?.toFixed() ||
                                data?.sevenDays?.total_nonreturned_discount_price?.toFixed()
                              : 0}
                          </h5>
                          <p class="card-text">Worth of coupon used</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardLayout>
                <ToastContainer />
              </Box>
            ) : (
              ""
            )}

            {customer ? (
              <Box>
                <CardLayout>
                  <div className="col" style={{ display: "flex", gap: "20px" }}>
                    <div class="col" id="admin-data">
                      <div
                        class="card"
                        style={{
                          width: "100%",
                          marginBottom: "12px",
                          cursor: "pointer",
                        }}
                      >
                        <div class="card-body">
                          <h5 class="card-title">
                            {customerData?.thisMonth?.allusers?.length ||
                            customerData?.lastMonth?.allusers?.length ||
                            customerData?.sevenDays?.allusers?.length ||
                            customerData?.year?.allusers?.length
                              ? customerData?.thisMonth?.allusers?.length ||
                                customerData?.lastMonth?.allusers?.length ||
                                customerData?.sevenDays?.allusers?.length ||
                                customerData?.year?.allusers?.length
                              : 0}
                          </h5>
                          <p class="card-text">Signup in the period</p>
                        </div>
                      </div>
                      <div
                        class="card"
                        style={{
                          width: "100%",
                          marginBottom: "12px",
                          cursor: "pointer",
                        }}
                      >
                        <div class="card-body">
                          <h5 class="card-title">
                            $
                            {customerData?.thisMonth?.total_users_salesprice?.toFixed() ||
                            customerData?.lastMonth?.total_users_salesprice?.toFixed() ||
                            customerData?.sevenDays?.total_users_salesprice?.toFixed() ||
                            customerData?.year?.total_users_salesprice?.toFixed()
                              ? customerData?.thisMonth?.total_users_salesprice?.toFixed() ||
                                customerData?.lastMonth?.total_users_salesprice?.toFixed() ||
                                customerData?.sevenDays?.total_users_salesprice?.toFixed() ||
                                customerData?.year?.total_users_salesprice?.toFixed()
                              : 0}
                          </h5>
                          <p class="card-text">Customer sales</p>
                        </div>
                      </div>
                    </div>
                    <div className="col" id="admin-data">
                      <div
                        class="card"
                        style={{
                          width: "100%",
                          marginBottom: "12px",
                          cursor: "pointer",
                        }}
                      >
                        <div class="card-body">
                          <h5 class="card-title">
                            $
                            {customerData?.thisMonth?.total_guests_salesprice?.toFixed() ||
                            customerData?.lastMonth?.total_guests_salesprice?.toFixed() ||
                            customerData?.sevenDays?.total_guests_salesprice?.toFixed() ||
                            customerData?.year?.total_guests_salesprice?.toFixed()
                              ? customerData?.thisMonth?.total_guests_salesprice?.toFixed() ||
                                customerData?.lastMonth?.total_guests_salesprice?.toFixed() ||
                                customerData?.sevenDays?.total_guests_salesprice?.toFixed() ||
                                customerData?.year?.total_guests_salesprice?.toFixed()
                              : 0}
                          </h5>
                          <p class="card-text">Guest sales</p>
                        </div>
                      </div>
                    </div>
                    {/* <div class="col-xl-9" id="admin-data">
                      {order ? (
                        <ResponsiveContainer width="99%" height="100%">
                          <BarChart data={data1}>
                            <XAxis dataKey="name" stroke="#8884d8" />
                            <YAxis />
                            <Tooltip />
                            <CartesianGrid
                              stroke="#ccc"
                              strokeDasharray="5 5"
                            />
                            <Bar dataKey="uv" fill="#8884d8" barSize={30} />
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        ""
                      )}

                      {customer ? (
                        <ResponsiveContainer width="99%" height="100%">
                          <BarChart data={data1}>
                            <XAxis dataKey="name" stroke="#8884d8" />
                            <YAxis />
                            <Tooltip />
                            <CartesianGrid
                              stroke="#ccc"
                              strokeDasharray="5 5"
                            />
                            <Bar dataKey="uv" fill="#8884d8" barSize={30} />
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        ""
                      )}
                    </div> */}
                  </div>
                </CardLayout>
                <ToastContainer />
              </Box>
            ) : (
              ""
            )}
          </>
        )}
      </>
    </PageLayout>
  );
}
