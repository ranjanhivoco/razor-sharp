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
import { convertDateFormat } from "../../components/helper/helper";
import CustomDatePicker from "../../components/elements/CustomDatePicker";

const Notification = () => {
  
  const [formattedDate, setFormattedDate] = useState('');
    const [notificationData, setNotificationData] = useState([]);
    
  const [notificationGraphData, setNotificationGraphData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 10;


  const endpoint = "https://api.hongs.razorsharp.in";
  const getNotificationData = async (page) => {
    const tokenString = sessionStorage.getItem("token");
    const token = JSON.parse(tokenString);
    try {
      const response = await axios.get(
        `${endpoint}/notification/show/2304?page=${page}&filter_date=${formattedDate}`,
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



  const handlePageClick = ({ selected }) => {
    setPageNumber(selected + 1);
    getNotificationData(selected + 1);
  };
    
  useEffect(() => {
    getNotificationData(); 
    getNotificationGraphData()
  }, []);

  useEffect(()=>{
    getNotificationData(pageNumber)

  },[formattedDate])
  
  
  const displayTable = notificationData?.rows?.map((item, index) => {
    return (
      <Tr key={index}>
        <Td title={index + 1}>
          <Box className="mc-table-check">
            <Text>{(pageNumber - 1) * 10 + index + 1}</Text>
          </Box>
        </Td>
        <Td>{convertDateFormat(item.today_date)}</Td>
        <Td>{item.time_of_message}</Td>
        <Td>{item.message}</Td>
        <Td>{item.branch_name}</Td>
        <Td>{item.action_taken ? "Yes" : "No"}</Td>
      </Tr>
    );
  });
  
  const pageCount = Math.ceil(notificationData?.totalRows / itemsPerPage);
  const loading = false;
  return (
    <PageLayout>
      <div>
        {loading ? (
          <LoaderProvider />
        ) : (
          <Row>
            <CustomDropDown />
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
              <CustomBarChart
                background="#77DD7729"
                barColor="#3CAB00"
                data={notificationGraphData}
              />
            </Col>

            <Col md={8}></Col>

            <Col md={4}>
              <CustomDatePicker setFormattedDate={setFormattedDate}/>
            </Col>

            <Col xs={12} sm={12} xl={12}>
              <div class="col-xl-12" id="category-data">
                <Table className="mc-table product">
                  <Thead className="mc-table-head primary">
                    <Tr>
                      <Th>
                        <Box className="mc-table-check">
                          <Text>S. NO.</Text>
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
                pageCount={pageCount}
                onPageChange={handlePageClick}
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
