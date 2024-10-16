import { Col, Row } from "react-bootstrap";
import { LoaderProvider } from "../../context/Preloader";
import PageLayout from "../../layouts/PageLayout";
import { Breadcrumb, DotsMenu } from "../../components";
import { Box } from "@mui/material";
import { Anchor, Item, Text } from "../../components/elements";
import { EcommerceCard } from "../../components/cards";
import { Table, Tbody, Td, Th, Thead, Tr } from "../../components/elements/Table";
import ReactPaginate from "react-paginate";

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import data from "../../data/master/UpSelling.json";
import CustomPieChart from "../../components/charts/CustomPieChart";
import axios from "axios";
import { useEffect, useState } from "react";
import CustomDropDown from "../../components/elements/CustomDropDown";


const UpSelling = () => {
  const [upsellData, setUpsellData] = useState();
  const endpoint = "https://api.hongs.razorsharp.in";
  const getUpsellingData = async () => {
    const tokenString = sessionStorage.getItem("token");
    const token = JSON.parse(tokenString);
    try {
      const response = await axios.get(
        `${endpoint}/upselling/get-info/2304`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        }
      );
      setUpsellData(response?.data);
    } catch (error) {
      console.error("Error fetching data:", error); // Handle errors
    }
  };


  useEffect(() => {
    getUpsellingData(); 
  }, []);

     // const mockData = [
    //     {
    //       date: "2024-10-01",
    //       upsellingAttempts: 15,
    //       upsellingNonAttempts: 5
    //     },
    //     {
    //       date: "2024-10-02",
    //       upsellingAttempts: 20,
    //       upsellingNonAttempts: 3
    //     },
    //     {
    //       date: "2024-10-03",
    //       upsellingAttempts: 10,
    //       upsellingNonAttempts: 8
    //     },
    //     {
    //       date: "2024-10-04",
    //       upsellingAttempts: 18,
    //       upsellingNonAttempts: 6
    //     },
    //     {
    //       date: "2024-10-05",
    //       upsellingAttempts: 25,
    //       upsellingNonAttempts: 4
    //     },
    //     {
    //       date: "2024-10-06",
    //       upsellingAttempts: 12,
    //       upsellingNonAttempts: 7
    //     },
    //     {
    //       date: "2024-10-07",
    //       upsellingAttempts: 30,
    //       upsellingNonAttempts: 2
    //     },
    //     {
    //       date: "2024-10-08",
    //       upsellingAttempts: 22,
    //       upsellingNonAttempts: 3
    //     },
    //     {
    //       date: "2024-10-09",
    //       upsellingAttempts: 28,
    //       upsellingNonAttempts: 5
    //     },
    //     {
    //       date: "2024-10-10",
    //       upsellingAttempts: 16,
    //       upsellingNonAttempts: 6
    //     },
    //     {
    //       date: "2024-10-11",
    //       upsellingAttempts: 14,
    //       upsellingNonAttempts: 5
    //     },
    //     {
    //       date: "2024-10-12",
    //       upsellingAttempts: 19,
    //       upsellingNonAttempts: 4
    //     },
    //     {
    //       date: "2024-10-13",
    //       upsellingAttempts: 23,
    //       upsellingNonAttempts: 6
    //     },
    //     {
    //       date: "2024-10-14",
    //       upsellingAttempts: 27,
    //       upsellingNonAttempts: 3
    //     },
    //     {
    //       date: "2024-10-15",
    //       upsellingAttempts: 21,
    //       upsellingNonAttempts: 4
    //     },
    //     {
    //       date: "2024-10-16",
    //       upsellingAttempts: 13,
    //       upsellingNonAttempts: 7
    //     },
    //     {
    //       date: "2024-10-17",
    //       upsellingAttempts: 24,
    //       upsellingNonAttempts: 5
    //     },
    //     {
    //       date: "2024-10-18",
    //       upsellingAttempts: 17,
    //       upsellingNonAttempts: 6
    //     },
    //     {
    //       date: "2024-10-19",
    //       upsellingAttempts: 29,
    //       upsellingNonAttempts: 4
    //     },
    //     {
    //       date: "2024-10-20",
    //       upsellingAttempts: 26,
    //       upsellingNonAttempts: 3
    //     }
    //   ];

    const displayTable = upsellData?.result?.map((item, index) => {
      return (
        <Tr key={index}>
          <Td title={index + 1}>
            <Box className="mc-table-check">
              <Text>{index + 1}</Text>
            </Box>
          </Td>
          <Td>{item?.today_date}</Td>
          <Td>{item?.upsell_attempted}</Td>
          <Td>{item?.upsell_successful}</Td>
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
              <Box style={{ background: "#FFF5D580" }} className="mc-card">
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
                    icon="thumb_up"
                    // use this syntax for two word iconName (icon_name)
                    title={upsellData?.count?.total_upsell_attempted}
                    titleStyle={{
                      fontFamily: "Inter",
                      fontSize: "28.8px",
                      fontWeight: 700,
                      lineHeight: "34.85px",
                      textAlign: "left",
                    }}
                    // number={usersCount}
                    variant="green"
                    // percent="+ 95%"
                    compare="Upselling Attempts"
                  />{" "}
                </Col>

                <Col>
                  <EcommerceCard
                    icon="thumb_down"
                    title={upsellData?.count?.total_upsell_successful}
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
                    compare="upsell successfull"
                  />{" "}
                </Col>

                <Col>
                  <CustomPieChart attempted ={upsellData?.count?.total_upsell_attempted} successfull={upsellData?.count?.total_upsell_successful} />
                </Col>

                <Col xs={4} sm={12} xl={12}>
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
                          <Th>UPSELLING ATTEMPTS</Th>
                          <Th>UPSELLING SUCCESSFULL</Th>
                        </Tr>
                      </Thead>
                      <Tbody className="mc-table-body even">
                        {displayTable}
                      </Tbody>
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
            </Col>
          </Row>
        )}
      </div>
    </PageLayout>
  );
};

export default UpSelling;