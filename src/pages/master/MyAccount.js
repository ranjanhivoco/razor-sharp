import React, { useState, useEffect } from "react";
import { LegendField, IconField } from "../../components/fields";
import { Item, Anchor, Box, Button, Image } from "../../components/elements";
import { CardLayout, TabCard } from "../../components/cards";
import { Breadcrumb, FileUpload } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/myAccount.json";
import { hostedAuthAxios } from "../../backendAxios/backendAxios";
import authHeader from "../../backendAxios/authHeader";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import { Row, Col, Tab, Tabs } from "react-bootstrap";
import { LoaderProvider } from "../../context/Preloader";

export default function MyAccount() {
  const [loading, setLoading] = useState(false);
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    role: "",
  });

  // useEffect(() => {
  //   prefillAdminData();
  // }, []);

  const updateAdmin = async (e) => {
    e.preventDefault();
    const adminId = localStorage.getItem("id");
     await hostedAuthAxios.put(
      `/update-admin/${adminId}`,
      adminData,
      {
        headers: authHeader(),
      }
    );
    toast.success("Account updated successfully !");
    setInterval(() => {
      window.location.reload();
    }, 2000);
  };

  const prefillAdminData = async (e) => {
    setLoading(true);
    const adminId = localStorage.getItem("id");
    const result = await hostedAuthAxios.get(`/user/${adminId}`, {
      headers: authHeader(),
    });
    setAdminData(result?.data?.data);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <LoaderProvider />
      ) : (
        <PageLayout>
          <Row>
            <Col xl={12}>
              <Breadcrumb title={data?.pageTitle}>
                {data?.breadcrumb.map((item, index) => (
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
            </Col>
            <Col xl={12}>
              <CardLayout>
                <Tabs defaultActiveKey="profile" id="mc" className="mc-tabs">
                  <Tab
                    eventKey="profile"
     
                    className="mc-tabpane profile"
                  >
                    <TabCard title="Account information">
                      <Row>
                        <Col xl={4}>
                          <Box className="mc-user-avatar-upload">
                            <Box className="mc-user-avatar">
                              <Image src={data?.avatar.src} />
                            </Box>
                            {/* <FileUpload icon="cloud_upload" text="upload" /> */}
                          </Box>
                        </Col>
                        <Col xl={8}>
                          <Row>
                            <Col xl={6}>
                              <LegendField
                                title={data?.name.title}
                                value={adminData?.name}
                                onChange={(e) => {
                                  setAdminData({
                                    ...adminData,
                                    name: e.target.value,
                                  });
                                
                                }}
               
                              />
                            </Col>
                            <Col xl={6} className="disbaled_field">
                              <LegendField
                                title={data?.username.title}
                                value={adminData?.role}
                                onChange={(e) => {
                                  setAdminData({
                                    ...adminData,
                                    role: e.target.value,
                                  });
                                }}
                                
                                disabled
                              />
                            </Col>

                            <Col xl={6} className="disbaled_field" style={{ marginTop: "65px" }}>
                              <LegendField
                                title={data?.email.title}
                                value={adminData?.email}
                                onChange={(e) => {
                                  setAdminData({
                                    ...adminData,
                                    email: e.target.value,
                                  });
                                }}
                                
                                disabled
                              />
                            </Col>
                            <Col xl={6} className="disbaled_field" style={{ marginTop: "65px" }}>
                              <LegendField
                                title={data?.phone.title}
                                value={adminData?.mobileNumber}
                                onChange={(e) => {
                                  setAdminData({
                                    ...adminData,
                                    mobileNumber: e.target.value,
                                  });
                                }}
                                
                                disabled
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </TabCard>
                    {/* {adminData.role === "super admin" ? (
                      <TabCard title="Change password">
                        <Row xs={1} md={2}>
                          <Col xs={12} md={6}>
                            <IconField
                              icon="add_moderator"
                              type="password"
                              placeholder="New password"
                              classes="w-100 h-lg"
                              onChange={(e) => {
                                setAdminData({
                                  ...adminData,
                                  password: e.target.value,
                                });
                              }}
                              passwordVisible
                            />
                          </Col>
                        </Row>
                      </TabCard>
                    ) : null} */}

                    {/* {adminData.role === "super admin" ? (
                      <Button
                        className="mc-btn primary"
                        icon="verified"
                        text="save changes"
                        onClick={updateAdmin}
                      />
                    ) : null} */}

                    <ToastContainer />
                  </Tab>
                </Tabs>
              </CardLayout>
            </Col>
          </Row>
        </PageLayout>
      )}
    </>
  );
}
