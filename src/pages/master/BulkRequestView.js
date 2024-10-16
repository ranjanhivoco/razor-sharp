import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import {
  Anchor,
  Box,
  Item,
  Text,
  Image,
  Heading,
} from "../../components/elements";
import { Breadcrumb, DivideTitle } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import CardLayout from "../../components/cards/CardLayout";
import data from "../../data/master/bulkRequestView.json";
import { hostedBulkOrder } from "../../backendAxios/backendAxios";
import { useQuery } from "../../backendAxios/backendAxios";
import moment from "moment";
import { LoaderProvider } from "../../context/Preloader";
import authHeader from "../../backendAxios/authHeader";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ProductView() {
  const query = useQuery();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [bulkOrderList, setBulkOrderList] = useState([]);
  const [bulkButton, setBulkButton] = useState([]);

  useEffect(() => {
    getOrderListById();
  }, [query.get("query_id")]);

  const getOrderListById = async () => {
    setLoading(true);
    await hostedBulkOrder
      .get(`/get/${query.get("query_id")}`, { headers: authHeader() })
      .then((response) => {
        if (response.status === 200) {
          setBulkOrderList(response?.data);
          setBulkButton(response?.data?.status === "None");
        }
      });
    setLoading(false);
  };

  const AcceptOrderRequest = async () => {
    await hostedBulkOrder
      .get(`/accept-request/${query.get("query_id")}`, {
        headers: authHeader(),
      })
      .then((response) => {
        if (response.status === 200) {
          //   toast.success("seller requested is Approved");
          setTimeout(() => {
            navigate("/bulk-order-list");
          }, 2000);
        }
      });
  };
  const RejectOrderRequest = async () => {
    await hostedBulkOrder
      .get(`/reject-request/${query.get("query_id")}`, {
        headers: authHeader(),
      })
      .then((response) => {
        if (response.status === 200) {
          setTimeout(() => {
            navigate("/bulk-order-list");
          }, 2000);
        }
      });
  };

  return (
    <>
      {loading ? (
        <LoaderProvider />
      ) : (
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
              <Col xl={12}>
                <DivideTitle title="Product Images" className="mb-4 " />
                <Box className="mc-product-view-gallery">
                  <Image
                    style={{ width: "180px" }}
                    src={`${bulkOrderList?.products?.map(
                      (item) => item?.product?.images
                    )}`}
                  />
                </Box>
              </Col>
              <Col xl={12}>
                <DivideTitle title="Product details" className="mb-4" />
                <Box className="mc-bulk-order-view-info-group">
                  <Box className="mc-product-view-meta">
                    <Heading as="h5" className="bulkorderfield">
                      Product Name
                    </Heading>
                    <Text as="span">:</Text>
                    <Text as="p">
                      {bulkOrderList?.products?.map(
                        (item) => item?.product?.title
                      )
                        ? bulkOrderList?.products?.map(
                            (item) => item?.product?.title
                          )
                        : "__"}
                    </Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                    <Heading as="h5" className="bulkorderfield">
                      Quantity
                    </Heading>
                    <Text as="span">:</Text>
                    <Text as="p">
                      {bulkOrderList?.products?.map((item) => item?.qty)
                        ? bulkOrderList?.products?.map((item) => item?.qty)
                        : "__"}
                    </Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                    <Heading as="h5" className="bulkorderfield">
                      Customer Name
                    </Heading>
                    <Text as="span">:</Text>
                    <Text as="p" className="sellerview__data">
                      {bulkOrderList?.name ? bulkOrderList?.name : "__"}
                    </Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                    <Heading as="h5" className="bulkorderfield">
                      Customer Email
                    </Heading>
                    <Text as="span">:</Text>
                    <Text as="p">
                      {bulkOrderList?.email ? bulkOrderList?.email : "__"}
                    </Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                    <Heading as="h5" className="bulkorderfield">
                      Customer Number
                    </Heading>
                    <Text as="span">:</Text>
                    <Text as="p">
                      {bulkOrderList?.phone ? bulkOrderList?.phone : "__"}
                    </Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                    <Heading as="h5" className="bulkorderfield">
                      Message
                    </Heading>
                    <Text as="span">:</Text>
                    <Text as="p">
                      {bulkOrderList?.message ? bulkOrderList?.message : "__"}
                    </Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                    <Heading as="h5" className="bulkorderfield">
                      Shipping Address
                    </Heading>
                    <Text as="span">:</Text>
                    <Text as="p">
                      {/* {bulkOrderList?.store?.store_displayName
                        ? bulkOrderList?.store?.store_displayName
                        : "__"} */}
                      {bulkOrderList?.shippingAddress?.address},&nbsp;
                      {bulkOrderList?.shippingAddress?.city},&nbsp;
                      {bulkOrderList?.shippingAddress?.state},&nbsp;
                      {bulkOrderList?.shippingAddress?.zipCode}, &nbsp;
                      {bulkOrderList?.shippingAddress?.country}
                    </Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                    <Heading as="h5" className="bulkorderfield">
                      Order Date
                    </Heading>
                    <Text as="span">:</Text>
                    <Text as="p">
                      {moment(bulkOrderList?.createdAt).format("LL")}
                    </Text>
                  </Box>
                </Box>
              </Col>
              <ToastContainer />

              {bulkButton ? (
                <Col xl={12}>
                  <button
                    variant="primary"
                    type="submit"
                    className="mt-5 btn btn-dark btn-md text-white"
                    style={{
                      width: "20%",
                      height: "50px",
                      marginLeft: "25%",
                    }}
                    onClick={() => AcceptOrderRequest()}
                  >
                    Accept
                  </button>
                  <button
                    variant="primary"
                    type="submit"
                    className="mt-5 btn btn-dark btn-md text-white"
                    style={{
                      width: "20%",
                      height: "50px",
                      marginLeft: "5%",
                      background: "#b20505",
                      border: "#b20505",
                    }}
                    onClick={() => RejectOrderRequest()}
                  >
                    Decline
                  </button>
                </Col>
              ) : (
                ""
              )}
            </Row>
          </CardLayout>
        </PageLayout>
      )}
    </>
  );
}
