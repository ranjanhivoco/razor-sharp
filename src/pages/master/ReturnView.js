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
import {
  hostedOrderAxios,
} from "../../backendAxios/backendAxios";
import { useQuery } from "../../backendAxios/backendAxios";
import moment from "moment";
import { LoaderProvider } from "../../context/Preloader";
import authHeader from "../../backendAxios/authHeader";
import { ToastContainer } from "react-toastify";

export default function ProductView() {
  const query = useQuery();
  const [loading, setLoading] = useState(false);
  const [returnOrderList, setReturnOrderList] = useState([]);

  useEffect(() => {
    getReturnOrderListById();
  }, []);

  const getReturnOrderListById = async () => {
    setLoading(true);
    await hostedOrderAxios
      .get(`/getreturnorreplaceitem/${query.get("oid")}/${query.get("pid")}`, {
        headers: authHeader(),
      })
      .then((response) => {
        if (response.status === 200) {
          setReturnOrderList(response?.data);
        }
      });
    setLoading(false);
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
                <Box className="mc-product-view-gallery d-flex">
                  {returnOrderList?.return?.images.map((item) => {
                    return (
                      <Image
                        style={{ width: "180px" }}
                        src={`${item}`}
                      />
                    );
                  })}
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
                      {returnOrderList?.products?.title
                        ? returnOrderList?.products?.title
                        : "__"}
                    </Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                    <Heading as="h5" className="bulkorderfield">
                      Type
                    </Heading>
                    <Text as="span">:</Text>
                    <Text as="p">
                      {returnOrderList?.status ? returnOrderList?.status : "__"}
                    </Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                    <Heading as="h5" className="bulkorderfield">
                      Reason
                    </Heading>
                    <Text as="span">:</Text>
                    <Text as="p" className="sellerview__data">
                      {returnOrderList?.return?.reason ||
                        returnOrderList?.replace?.reason ||
                        "__"}
                    </Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                    <Heading as="h5" className="bulkorderfield">
                      Message
                    </Heading>
                    <Text as="span">:</Text>
                    <Text as="p">
                      {returnOrderList?.return?.message ||
                        returnOrderList?.replace?.message ||
                        "__"}
                    </Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                    <Heading as="h5" className="bulkorderfield">
                      Return amount
                    </Heading>
                    <Text as="span">:</Text>
                    <Text as="p">
                      {returnOrderList?.return?.refund_amount
                        ? returnOrderList?.return?.refund_amount
                        : "__"}
                    </Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                    <Heading as="h5" className="bulkorderfield">
                      Customer Name
                    </Heading>
                    <Text as="span">:</Text>
                    <Text as="p">
                      {returnOrderList?.name ? returnOrderList?.name : "__"}
                    </Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                    <Heading as="h5" className="bulkorderfield">
                      Mobile Number
                    </Heading>
                    <Text as="span">:</Text>
                    <Text as="p">
                      {returnOrderList?.mobileNo
                        ? returnOrderList?.mobileNo
                        : "__"}
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
                      {returnOrderList?.shippingAddress?.address},&nbsp;
                      {returnOrderList?.shippingAddress?.city},&nbsp;
                      {returnOrderList?.shippingAddress?.state},&nbsp;
                      {returnOrderList?.shippingAddress?.zipCode}, &nbsp;
                      {returnOrderList?.shippingAddress?.country}
                    </Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                    <Heading as="h5" className="bulkorderfield">
                      Order Date
                    </Heading>
                    <Text as="span">:</Text>
                    <Text as="p">
                      {moment(returnOrderList?.createdAt).format("LL")}
                    </Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                    <Heading as="h5" className="bulkorderfield">
                      Return/Replace Date
                    </Heading>
                    <Text as="span">:</Text>
                    <Text as="p">
                      {moment(
                        returnOrderList?.return?.return_date ||
                          returnOrderList?.replace?.replace_date ||
                          "__"
                      ).format("LL")}
                    </Text>
                  </Box>
                </Box>
              </Col>
              <ToastContainer />

              {/* {bulkButton ? (
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
              )} */}
            </Row>
          </CardLayout>
        </PageLayout>
      )}
    </>
  );
}
