import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import {
  Box,
  Text,
  List,
  Item,
  Image,
  Anchor,
  Heading,
  Button,
} from "../../components/elements";
import {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from "../../components/elements/Table";
import CardLayout from "../../components/cards/CardLayout";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/invoiceDetails.json";
import { useQuery } from "../../backendAxios/backendAxios";
import { hostedOrderAxios } from "../../backendAxios/backendAxios";

import authHeader from "../../backendAxios/authHeader";

const ApiUrl = "http://localhost:3000";
// const ApiUrl = "http://localhost:3000"

export default function InvoiceDetails() {
  const [orderDetails, setOrderDetails] = useState([]);
  const query = useQuery();

  // useEffect(() => {
  //   getOrderDetails();
  // }, [query.get("_id")]);

  const getOrderDetails = async () => {
    await hostedOrderAxios
      .get(`/getallorderbyorderidadmin/${query.get("_id")}`, {
        headers: authHeader(),
      })
      .then((response) => {
        setOrderDetails(response?.data?.order);
      });
  };

  const couponsum = orderDetails.map((i) => i.coupon_discount);
  let couponsum1 = 0;
  for (let i = 0; i < couponsum.length; i++) {
    couponsum1 += couponsum[i];
  }

  const TotalCartSum = orderDetails.map((i) => i.current_sales_price);
  let TotalCartSum1 = 0;
  for (let i = 0; i < TotalCartSum.length; i++) {
    TotalCartSum1 += TotalCartSum[i];
  }

  const cartSubTotal = orderDetails.map(
    (item) => item?.products?.salesprice * item?.qty
  );
  let cartSubTotal1 = 0;
  for (let i = 0; i < cartSubTotal.length; i++) {
    cartSubTotal1 += cartSubTotal[i];
  }

  const handleDownloadInvoice = async () => {
    // await hostedCommonModule.get(`/download-pdf/${query.get("_id")}`);
    try {
      const response = await fetch(
        `${ApiUrl}/common/download-pdf/${query.get("_id")}`,
        {
          method: "GET",
          headers: authHeader(),
        }
      );

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <PageLayout>
      <Row>
        <Col xl={12}>
          <CardLayout>
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
        </Col>
        <Col xl={12}>
          <CardLayout className="p-md-5">
            <Box className="mc-invoice-head">
              <Heading as="h4">
                Order Id :{" "}
                {orderDetails
                  .map((item) => item?.orderId)
                  .filter(
                    (orderId, index, array) => array.indexOf(orderId) === index
                  )}
              </Heading>
              <Image src={data?.logo.src} alt={data?.logo.alt} />
            </Box>
            <Box className="mc-invoice-group">
              <Box className="mc-invoice-recieved">
                <Heading as="h6">{data?.recieved.title}</Heading>
                <Text>
                  {orderDetails[0]?.billingAddress?.address},{" "}
                  {orderDetails[0]?.billingAddress?.address2},{" "}
                  {orderDetails[0]?.billingAddress?.city}, <br></br>
                  {orderDetails[0]?.billingAddress?.state},{" "}
                  {orderDetails[0]?.billingAddress?.country},{" "}
                  {orderDetails[0]?.billingAddress?.zipCode}, <br></br>
                  {orderDetails[0]?.billingAddress?.mobileNumber}, <br></br>
                  {orderDetails[0]?.billingAddress?.email}{" "}
                </Text>
              </Box>
              <Box className="mc-invoice-shipment">
                <Heading as="h6">{data?.shipment.title}</Heading>
                <Text>
                  {" "}
                  {orderDetails[0]?.billingAddress?.address},{" "}
                  {orderDetails[0]?.shippingAddress?.address2},{" "}
                  {orderDetails[0]?.shippingAddress?.city}, <br></br>
                  {orderDetails[0]?.shippingAddress?.state},{" "}
                  {orderDetails[0]?.shippingAddress?.country},{" "}
                  {orderDetails[0]?.shippingAddress?.zipCode}, <br></br>
                  {orderDetails[0]?.shippingAddress?.mobileNumber}, <br></br>
                  {orderDetails[0]?.shippingAddress?.email}{" "}
                </Text>
              </Box>
            </Box>
            <Box className="mc-table-responsive">
              <Table className="mc-table">
                <Thead className="mc-table-head">
                  <Tr>
                    {data?.table.thead.map((item, index) => (
                      <Th key={index}>{item}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody className="mc-table-body">
                  {orderDetails?.map((item, index) => (
                    <Tr key={index}>
                      <Td>
                        <Box className="mc-table-product sm">
                          <Text>{item?.products?.title}</Text>
                        </Box>
                      </Td>
                      <Td>{`${
                        item?.sellerID?.store?.store_displayName
                          ? item?.sellerID?.store?.store_displayName
                          : "--"
                      }`}</Td>
                      <Td>{`$${
                        item?.products?.salesprice?.toFixed()
                          ? item?.products?.salesprice?.toFixed()
                          : item?.totalPrice
                      }`}</Td>
                      <Td>{`$${item?.coupon_discount?.toFixed()}`}</Td>
                      <Td>{item?.qty}</Td>
                      <Td>{item?.status}</Td>
                      <Td>{`$${item?.current_sales_price?.toFixed()}`}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            <Box className="mc-invoice-list-group">
              <List className="mc-invoice-list">
                <Item>
                  <Text as="span" className="title">
                    subtotal
                  </Text>
                  <Text as="span" className="clone">
                    :
                  </Text>

                  <Text as="span">{`$${cartSubTotal1.toFixed()}`}</Text>
                </Item>
                <Item>
                  <Text as="span" className="title">
                    Discount
                  </Text>
                  <Text as="span" className="clone">
                    :
                  </Text>

                  <Text as="span">{`$${couponsum1.toFixed()}`}</Text>
                </Item>

                <Item>
                  <Text as="span" className="title">
                    Shipping
                  </Text>
                  <Text as="span" className="clone">
                    :
                  </Text>

                  <Text as="span" className="fw-bold">
                    Free
                  </Text>
                </Item>
                <Item>
                  <Text as="span" className="title">
                    Total
                  </Text>
                  <Text as="span" className="clone">
                    :
                  </Text>

                  <Text as="span">
                    {/* {orderDetails.map((item) => item?.)} */}
                    {`$${TotalCartSum1.toFixed()}`}
                  </Text>
                </Item>
                <Item>
                  <Text as="span" className="title">
                    Payment
                  </Text>
                  <Text as="span" className="clone">
                    :
                  </Text>
                  <Text as="span" className="invoiceDetail__card">
                    Card
                  </Text>
                </Item>
              </List>
            </Box>
            <Text className="mc-invoice-note">{data?.note}</Text>
            <Box className="mc-invoice-btns">
              {data?.button.map((item, index) => (
                <Button
                  className={item.classes}
                  onClick={() => handleDownloadInvoice()}
                  icon={item.icon}
                  text="Download"
                />
              ))}
            </Box>
          </CardLayout>
        </Col>
      </Row>
    </PageLayout>
  );
}
