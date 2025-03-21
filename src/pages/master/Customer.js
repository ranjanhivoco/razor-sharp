import { Box } from "@mui/material";
import { LoaderProvider } from "../../context/Preloader";
import PageLayout from "../../layouts/PageLayout";
import { Col, Row } from "react-bootstrap";
import { Breadcrumb, DotsMenu, DropdownMenu } from "../../components";

import { Anchor, Item, Text } from "../../components/elements";
import data from "../../data/master/customer.json";
import { EcommerceCard, FloatCard } from "../../components/cards";
import {
  AnalyticsChart,
  DevicesChart,
  RevenueChart,
  SalesChart,
} from "../../components/charts";
import Analytics from "./Analytics";
import ReactPaginate from "react-paginate";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "../../components/elements/Table";
import DonutChart from "../../components/charts/DonutChart";
import { BarChart } from "recharts";
import CustomBarChart from "../../components/charts/CustomBarChart";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CustomDropDown from "../../components/elements/CustomDropDown";
import CustomDatePicker from "../../components/elements/CustomDatePicker";
import { BranchIDContext } from "../../components/context/branchID";

const Customer = () => {
  const [formattedDate, setFormattedDate] = useState("");

  const [customerData, setCustomerData] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const { branchID } = useContext(BranchIDContext);
  
  const itemsPerPage = 10;

  const endpoint = "https://api.hongs.razorsharp.in";
  const getCustomerData = async (page) => {
    const tokenString = sessionStorage.getItem("token");
    const token = JSON.parse(tokenString);
    try {
      const response = await axios.get(
        `${endpoint}/customer/get/${branchID}?page=${page}&filter_date=${
          formattedDate || ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        }
      );
      setCustomerData(response?.data);
    } catch (error) {
      console.error("Error fetching data:", error); // Handle errors
    }
  };

  useEffect(() => {
    getCustomerData(pageNumber);
  }, [formattedDate, pageNumber,branchID]);

  const handlePageClick = ({ selected }) => {
    // getCustomerData(selected + 1);
    setPageNumber(selected + 1);
  };

  const displayData = customerData?.result?.map((item, index) => {
    return (
      <Tr key={index}>
        <Td title={index + 1}>
          <Box className="mc-table-check">
            <Text>{(pageNumber - 1) * 10 + index + 1}</Text>
          </Box>
        </Td>
        <td>{item.male_count}</td>
        <td>{item.female_count}</td>
        <td>{Math.round(item.avg_group_size)}</td>
      </Tr>
    );
  });

  // const dropdownItems = [
  //   {
  //     href: "/profile",
  //     icon: "👤", // This could be an icon component
  //     text: "Profile",
  //     onClick: () => ("Profile clicked"),
  //   },
  //   {
  //     href: "/settings",
  //     icon: "⚙️",
  //     text: "Settings",
  //     onClick: () => ("Settings clicked"),
  //   },
  //   {
  //     href: "/log",
  //     text: "Log Out",
  //     icon: "🚪",
  //     onClick: () => ("Log Out clicked"),
  //   },
  // ];

  const loading = false;
  const pageCount = Math.ceil(customerData?.totalRows / itemsPerPage);

  return (
    <PageLayout>
      <div>
        {loading ? (
          <LoaderProvider />
        ) : (
          <Row>
            <CustomDropDown />
            <Col xl={12}>
              {/* <DotsMenu dots={""} dropdown={dropdownItems} /> */}

              <Box style={{ background: "#CFDEFF99" }} className="mc-card">
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

            <Col xs={12} xl={12}>
              <Row xs={1} sm={3}>
                <Col>
                  <EcommerceCard
                    icon="boy"
                    // title="9"
                    title={customerData?.count?.total_male_count}
                    titleStyle={{
                      fontFamily: "Inter",
                      fontSize: "28.8px",
                      fontWeight: 700,
                      lineHeight: "34.85px",
                      textAlign: "left",
                    }}
                    // number={usersCount}
                    variant="blue"
                    // percent="+ 95%"
                    compare="Male"
                  />{" "}
                </Col>

                <Col>
                  <EcommerceCard
                    icon="girl"
                    title={customerData?.count?.total_female_count}
                    titleStyle={{
                      fontFamily: "Inter",
                      fontSize: "28.8px",
                      fontWeight: 700,
                      lineHeight: "34.85px",
                      textAlign: "left",
                    }}
                    // number={usersCount}
                    variant="purple"
                    // percent="+ 95%"
                    compare="Female"
                  />{" "}
                </Col>

                <Col>
                  <DonutChart
                    maleCount={customerData?.count?.total_male_count}
                    femaleCount={customerData?.count?.total_female_count}
                  />
                </Col>

                <Col md={8}></Col>

                <Col md={4}>
                  <CustomDatePicker setFormattedDate={setFormattedDate} />
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
                          <Th>MALE COUNT</Th>
                          <Th>FEMALE COUNT</Th>
                          <Th>AVG GROUP SIZE</Th>
                        </Tr>
                      </Thead>
                      <Tbody className="mc-table-body even">
                        {displayData}
                      </Tbody>
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
            </Col>
          </Row>
        )}
      </div>
    </PageLayout>
  );
};

export default Customer;
