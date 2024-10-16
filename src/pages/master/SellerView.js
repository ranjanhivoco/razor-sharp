import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import {
  Anchor,
  Box,
  Item,
  Text,
  Icon,
  Image,
  Heading,
} from "../../components/elements";
import { Breadcrumb, DivideTitle } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import CardLayout from "../../components/cards/CardLayout";
import data from "../../data/master/sellerView.json";
import { hostedSellerAuthAxios } from "../../backendAxios/backendAxios";
import { useQuery } from "../../backendAxios/backendAxios";
import moment from "moment";
import { LoaderProvider } from "../../context/Preloader";
import authHeader from "../../backendAxios/authHeader";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ApiUrl = "http://localhost:3000";
// const ApiUrl = "http://localhost:3000";

export default function ProductView() {
  const query = useQuery();
  const navigate = useNavigate();
  const [sellerData, setSellerData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSellerById();
  }, [query.get("query_id")]);

  const getSellerById = async () => {
    setLoading(true);
    try {
      const result = await hostedSellerAuthAxios.get(
        `/seller/${query.get("query_id")}`
      );
      console.log("Fetched Seller Data:", result.data.data); // Debug: Log fetched data
      setSellerData(result?.data?.data);
    } catch (error) {
      console.error("Error fetching seller data:", error); // Debug: Log any errors
    } finally {
      setLoading(false);
    }
  };

  const verifySellerRequest = async () => {
    await hostedSellerAuthAxios
      .post(
        "/seller-acceptbyadmin",
        { sellerId: query.get("query_id"), email: query.get("email") },
        { headers: authHeader() }
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success("Seller request is approved");
          setTimeout(() => {
            navigate("/dropshipper-request");
          }, 2000);
        }
      });
  };
  const rejectSellerRequest = async () => {
    await hostedSellerAuthAxios
      .post(
        "/seller-declinebyadmin",
        { sellerId: query.get("query_id"), email: query.get("email") },
        { headers: authHeader() }
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success("Seller request is approved");
          setTimeout(() => {
            navigate("/dropshipper-request");
          }, 2000);
        }
      });
  };

  if (loading) {
    return <LoaderProvider />;
  }

  if (!sellerData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageLayout>
        <CardLayout className="mb-4">
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
        </CardLayout>
        <CardLayout className="p-lg-5">
          <Row>
            <Col xl={6}>
              <DivideTitle title="Seller ID Image" className="mb-4 " />
              <Box className="mc-product-view-gallery">
                {sellerData.idimg ? (
                  <Image
                    className="w-50"
                    src={`${ApiUrl}/static/images/${sellerData.idimg}`}
                    alt="ID Image"
                  />
                ) : (
                  <Text>No ID image available</Text>
                )}
              </Box>
              <DivideTitle
                title="Seller Signature Images"
                className="mb-2 mt-4"
              />
              <Box className="mc-product-view-gallery">
                {sellerData.signatureimg ? (
                  <Image
                    className="w-50"
                    src={`${ApiUrl}/static/images/${sellerData.signatureimg}`}
                    alt="Signature Image"
                  />
                ) : (
                  <Text>No signature image available</Text>
                )}
              </Box>
            </Col>
            <Col xl={6}>
              <DivideTitle title="Seller Details" className="mb-4" />
              <Box className="mc-product-view-info-group">
                <Box className="mc-product-view-meta">
                  <Icon type={data.specify[0].icon} />
                  <Heading as="h5">Name</Heading>
                  <Text as="span">:</Text>
                  <Text as="p">{sellerData.name ? sellerData.name : "__"}</Text>
                </Box>
                <Box className="mc-product-view-meta">
                  <Icon type={data.specify[0].icon} />
                  <Heading as="h5">Email</Heading>
                  <Text as="span">:</Text>
                  <Text as="p">
                    {sellerData.email ? sellerData.email : "__"}
                  </Text>
                </Box>
                <Box className="mc-product-view-meta">
                  <Icon type={data.specify[0].icon} />
                  <Heading as="h5">Mobile Number</Heading>
                  <Text as="span">:</Text>
                  <Text as="p" className="sellerview__data">
                    {sellerData.mobileNumber ? sellerData.mobileNumber : "__"}
                  </Text>
                </Box>
                <Box className="mc-product-view-meta">
                  <Icon type={data.specify[0].icon} />
                  <Heading as="h5">Driving License</Heading>
                  <Text as="span">:</Text>
                  <Text as="p">
                    {sellerData.idnumber ? sellerData.idnumber : "__"}
                  </Text>
                </Box>
                <Box className="mc-product-view-meta">
                  <Icon type={data.specify[0].icon} />
                  <Heading as="h5">EIN</Heading>
                  <Text as="span">:</Text>
                  <Text as="p">
                    {sellerData.store?.gstin ? sellerData.store.gstin : "__"}
                  </Text>
                </Box>
                <Box className="mc-product-view-meta">
                  <Icon type={data.specify[0].icon} />
                  <Heading as="h5">Store Name</Heading>
                  <Text as="span">:</Text>
                  <Text as="p">
                    {sellerData.store?.store_name
                      ? sellerData.store.store_name
                      : "__"}
                  </Text>
                </Box>
                <Box className="mc-product-view-meta">
                  <Icon type={data.specify[0].icon} />
                  <Heading as="h5">Store Display Name</Heading>
                  <Text as="span">:</Text>
                  <Text as="p">
                    {sellerData.store?.store_displayName
                      ? sellerData.store.store_displayName
                      : "__"}
                  </Text>
                </Box>
                <Box className="mc-product-view-meta">
                  <Icon type={data.specify[0].icon} />
                  <Heading as="h5">Store Description</Heading>
                  <Text as="span">:</Text>
                  <Text as="p">
                    {sellerData.store?.store_description
                      ? sellerData.store.store_description
                      : "__"}
                  </Text>
                </Box>
                <Box className="mc-product-view-meta">
                  <Icon type={data.specify[0].icon} />
                  <Heading as="h5">Store Pickup Details</Heading>
                  <Text as="span">:</Text>
                  <Text as="p">
                    {sellerData.store?.store_storeandpickupAddress
                      ? sellerData.store.store_storeandpickupAddress
                      : "__"}
                  </Text>
                </Box>
                <Box className="mc-product-view-meta">
                  <Icon type={data.specify[0].icon} />
                  <Heading as="h5">Category</Heading>
                  <Text as="span">:</Text>
                  <Text as="p">
                    {sellerData.sellersubcategory?.map((e, index) => (
                      <span
                        key={index}
                        style={{
                          border: "1px solid #d3d3d300",
                          background: "#d3d3d39e",
                          padding: "3px 5px 2px 6px",
                          borderRadius: "7px",
                          cursor: "pointer",
                          marginLeft: "0px",
                          textTransform: "capitalize",
                        }}
                      >
                        {e}
                      </span>
                    ))}
                  </Text>
                </Box>
                <Box className="mc-product-view-meta">
                  <Icon type={data.specify[0].icon} />
                  <Heading as="h5">Registered At</Heading>
                  <Text as="span">:</Text>
                  <Text as="p">
                    {moment(sellerData.createdAt).format("LL")
                      ? moment(sellerData.createdAt).format("LL")
                      : "__"}
                  </Text>
                </Box>
              </Box>
            </Col>
            <ToastContainer />
            <Col className="d-flex justify-content-center gap-3 ">
              <button
                variant="primary"
                type="submit"
                className="mt-5 btn btn-dark btn-md text-white"
                style={{
                  width: "20%",
                  background: "black",
                  borderRadius: "7px",
                  height: "50px",
                }}
                onClick={() => verifySellerRequest()}
              >
                Approve Request
              </button>
              <button
                variant="primary"
                type="submit"
                className="mt-5 btn btn-dark btn-md text-white"
                style={{
                  width: "20%",
                  background: "#8f1212",
                  height: "50px",
                }}
                onClick={() => rejectSellerRequest()}
              >
                Decline Request
              </button>
            </Col>
          </Row>
        </CardLayout>
      </PageLayout>
    </>
  );
}
