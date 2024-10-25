import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { List, Item, Text, Box, Anchor } from "../../components/elements";
import {
  Breadcrumb,
  RoundAvatar,
  DivideTitle,
  DuelText,
} from "../../components";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/userProfile.json";
import {
  hostedAuthAxios,
  hostedOrderAxios,
} from "../../backendAxios/backendAxios";
import authHeader from "../../backendAxios/authHeader";
import PhoneIcon from "@mui/icons-material/Phone";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import { useQuery } from "../../backendAxios/backendAxios";
import { LoaderProvider } from "../../context/Preloader";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "../../components/elements/Table";

const ApiUrl = "http://localhost:3000";
// const ApiUrl = "http://localhost:4001";
export default function UserProfile(props) {
  const query = useQuery();

  const [userData, setUserData] = useState([]);
  const [userOrderData, setUserOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ("query_id") {
      getUser();
      getUserOrder();
    }
  }, [query.get("query_id")]);

  const getUser = async () => {
    setLoading(true);
    const result = await hostedAuthAxios.get(`/user/${query.get("query_id")}`, {
      headers: authHeader(),
    });
    setUserData(result?.data?.data);
    setLoading(false);
  };

  const getUserOrder = async () => {
    setLoading(true);
    const result = await hostedOrderAxios.get(
      `/getallorderbysuperadminbyuserid/${query.get("query_id")}`,
      {
        headers: authHeader(),
      }
    );
    setUserOrderData(result?.data?.order);
  };

  const handleDownloadInvoice = async (id) => {
    try {
      const response = await fetch(`${ApiUrl}/common/download-pdf/${id}`, {
        method: "GET",
        headers: authHeader(),
      });

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

  const displayUsers = userOrderData.map((item, index) => {
    return (
      <Tr key={index}>
        <Td title={index + 1}>
          <Box className="mc-table-check">
            <Text>{index + 1}</Text>
          </Box>
        </Td>
        <td
          style={{
            textTransform: "uppercase",
            color: "black",
            fontSize: "14px",
          }}
        >
          {item.orderId}
        </td>
        <td>{item?.products?.title}</td>
        <td>({item?.qty}) item</td>
        <td>${item?.current_sales_price}</td>
        <td>{item?.transaction}</td>
        <td>
          <Box className="mc-table-action">
            <Anchor
              href={`/invoice-details?_id=${item?.orderId}`}
              title="View"
              className="material-icons view"
            >
              <img src="images/View.svg" alt="" />
            </Anchor>
            <button onClick={() => handleDownloadInvoice(item?.orderId)}>
              <img src="images/download.svg" alt="" />
            </button>
          </Box>
        </td>
      </Tr>
    );
  });

  (displayUsers);

  return (
    <>
      {loading ? (
        <LoaderProvider />
      ) : (
        <PageLayout>
          <Row>
            <Col xl={12}>
              <CardLayout>
                <Breadcrumb title="user profile">
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
            <Col>
              <CardLayout>
                {/* <CardHeader title="user information" dotsMenu={data?.dotsMenu} /> */}
                <Box className="mc-user-group">
                  <Box className="mc-user-profile">
                    <RoundAvatar
                      src={data?.profile.src}
                      alt={data?.profile.alt}
                      size={data?.profile.size}
                    />
                    <DuelText
                      title={userData?.name}
                      descrip={`@${userData?.role}`}
                      // size={ data?.profile.size }
                    />
                  </Box>
                  <Box className="mb-4">
                    <DivideTitle title="communication" className="mb-4" />
                    <List className="mc-user-metalist">
                      <Item>
                        <Anchor>
                          <PhoneIcon />
                        </Anchor>
                        <Text style={{ fontWeight: "bold" }} as="span">
                          {userData.mobileNumber ? userData.mobileNumber : "__"}
                        </Text>
                      </Item>
                      <Item>
                        <Anchor>
                          <MarkEmailUnreadIcon />
                        </Anchor>
                        <Text style={{ fontWeight: "bold" }} as="span">
                          {userData.email ? userData.email : "__"}
                        </Text>
                      </Item>
                    </List>
                  </Box>
                  <Box className="mb-4">
                    <DivideTitle title="More Details" className="mb-3" />
                    <Text className="mc-user-bio mb-2 text-capitalize">
                      Email Subscription :{" "}
                      <strong>
                        {`${userData?.emailSubscription}`.toString()}
                      </strong>
                    </Text>
                    <Text className="mc-user-bio mb-2 text-capitalize">
                      Is Active :{" "}
                      <strong> {`${userData?.isActive}`.toString()}</strong>
                    </Text>
                    <Text className="mc-user-bio mb-2 text-capitalize">
                      Is Active Number :{" "}
                      <strong>
                        {" "}
                        {`${userData?.isActiveNumber}`.toString()}{" "}
                      </strong>
                    </Text>
                    <Text className="mc-user-bio mb-2 text-capitalize">
                      Is Active Email :{" "}
                      <strong>
                        {" "}
                        {`${userData?.isActiveEmail}`.toString()}{" "}
                      </strong>
                    </Text>
                  </Box>
                  <DivideTitle title="order list" className="mb-4" />
                  <div class="col-xl-12" id="category-data">
                    {displayUsers.length === 0 ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "50px",
                          margin: "30px",
                          fontSize: "22px",
                          fontWeight: 500,
                        }}
                      >
                        No Recent Order
                      </div>
                    ) : (
                      <Table className="mc-table product">
                        <Thead className="mc-table-head primary">
                          <Tr>
                            <Th>
                              <Box className="mc-table-check">
                                <Text>uid</Text>
                              </Box>
                            </Th>
                            <Th>order id</Th>
                            <Th>Product name</Th>
                            <Th>Quantity</Th>
                            <Th>Amount</Th>
                            <Th>payment status</Th>
                            <Th>order date</Th>
                          </Tr>
                        </Thead>
                        <Tbody className="mc-table-body even">
                          {displayUsers}
                        </Tbody>
                      </Table>
                    )}
                  </div>
                </Box>
              </CardLayout>
            </Col>
          </Row>
        </PageLayout>
      )}
    </>
  );
}
