import { Col, Row } from "react-bootstrap";
import { LoaderProvider } from "../../context/Preloader";
import PageLayout from "../../layouts/PageLayout";
import { Anchor, Box, Item, Text } from "../../components/elements";
import { Breadcrumb } from "../../components";

import data from "../../data/master/notification.json";
import ReactPaginate from "react-paginate";
import { Table, Tbody, Td, Th, Thead, Tr } from "../../components/elements/Table";
import CustomBarChart from "../../components/charts/CustomBarChart";
import CustomDropDown from "../../components/elements/CustomDropDown";
import { useEffect, useState } from "react";
import axios from "axios";

const Notification = () => {
  
  const [notificationData, setNotificationData] = useState([]);
  const [notificationGraphData, setNotificationGraphData] = useState([]);
  const endpoint = "https://api.hongs.razorsharp.in";
  const getNotificationData = async () => {
    const tokenString = sessionStorage.getItem("token");
    const token = JSON.parse(tokenString);
    try {
      const response = await axios.get(
        `${endpoint}/notification/show/2304`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        }
      );
      setNotificationData(response?.data);
    } catch (error) {
      console.error("Error fetching data:", error); // Handle errors
    }
  };
  const getNotificationGraphData= async () => {
    const tokenString = sessionStorage.getItem("token");
    const token = JSON.parse(tokenString);
    try {
      const response = await axios.get(
        `${endpoint}/notification/message-count/2304`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        }
      );
      setNotificationGraphData(response?.data);
    } catch (error) {
      console.error("Error fetching data:", error); // Handle errors
    }
  };

  useEffect(() => {
    getNotificationData(); 
    getNotificationGraphData()
  }, []);
 
    
  const displayTable = notificationData?.map((item, index) => {
    return (
      <Tr key={index}>
        <Td title={index + 1}>
          <Box className="mc-table-check">
            <Text>{index + 1}</Text>
          </Box>
        </Td>
        <Td>{item.today_date}</Td>
        <Td>{item.time_of_message}</Td>
        <Td>{item.message}</Td>
        <Td>{item.branch_name}</Td>
        <Td>{item.action_taken?item.action_taken:0}</Td>
      </Tr>
    );
  });
  
  const loading = false;
  return (
    <PageLayout>
      <div>
        {loading ? (
          <LoaderProvider />
        ) : (
          <Row>
             <CustomDropDown/>
            <Col xl={12}>
              <Box style={{ background: "#9A6ADB33 " }} className="mc-card">
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

            <Col xl={12}>
          
              <CustomBarChart background="#77DD7729" barColor="#3CAB00" data={notificationGraphData} />
            </Col>

            <Col xl={12}>
              <div class="col-xl-12" id="category-data">
                <Table className="mc-table product">
                  <Thead className="mc-table-head primary">
                    <Tr>
                      <Th>
                        <Box className="mc-table-check">
                          <Text>SR NO.</Text>
                        </Box>
                      </Th>
                      <Th>DATE</Th>
                      <Th>TIME</Th>
                      <Th>MESSAGE</Th>
                      <Th>BRANCH</Th>
                      <Th>ACTION TAKEN</Th>
                    </Tr>
                  </Thead>
                  <Tbody className="mc-table-body even">{displayTable}</Tbody>
                </Table>
              </div>

              <ReactPaginate
                previousLabel={"⟵"}
                nextLabel={"⟶"}
                // pageCount={pageCount}
                // onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousClassName={"pre"}
                nextClassName={"next"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              />
            </Col>
          </Row>
        )}
      </div>
    </PageLayout>
  );
};

export default Notification;
