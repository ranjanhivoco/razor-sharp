import { Col, Row } from "react-bootstrap";
import PageLayout from "../../layouts/PageLayout";
import CustomDropDown from "../../components/elements/CustomDropDown";
import { EcommerceCard } from "../../components/cards";
import CustomDatePicker from "../../components/elements/CustomDatePicker";
import { Table, Tbody, Td, Th, Thead, Tr } from "../../components/elements/Table";
import { Box } from "@mui/material";
import { Anchor, Item, Text } from "../../components/elements";
import ReactPaginate from "react-paginate";
import data from "../../data/master/ThreeStepProcess.json";
import { Breadcrumb } from "../../components";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { convertDateFormat } from "../../components/helper/helper";

const ThreeStepProcess = () => {
  const [formattedDate, setFormattedDate] = useState("");
  const [processData, setProcessData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  console.log(processData,'process data');
  

  const itemsPerPage = 10;
  const endpoint = "https://api.hongs.razorsharp.in";
  const getStepsData = async (page) => {
    const tokenString = sessionStorage.getItem("token");
    const token = JSON.parse(tokenString);
    try {
      const response = await axios.get(
        `${endpoint}/procedure/get-info/2304?page=${page}&filter_date=${formattedDate || ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        }
      );
      setProcessData(response?.data);
    } catch (error) {
      console.error("Error fetching data:", error); // Handle errors
    }
  };

  const handlePageClick = ({ selected }) => {
    getStepsData(selected + 1);
    setPageNumber(selected + 1);
  };

  const displayTable = processData?.result?.map((item, index) => {
    return (
      <Tr key={index}>
        <Td title={index + 1}>
          <Box className="mc-table-check">
            <Text>{(pageNumber - 1) * 10 + index + 1}</Text>
          </Box>
        </Td>
        <Td>{convertDateFormat(item.today_date)}</Td>
        <Td>{item?.all_step_followed}</Td>
        <Td>{item?.partially_step_followed}</Td>
        <Td>{item?.no_step_followed}</Td>
      </Tr>
    );
  });

  useEffect(() => {
    getStepsData(pageNumber);
  }, [formattedDate]);

  const pageCount = Math.ceil(processData?.totalRows / itemsPerPage) || 0;
  return (
    <PageLayout>
      <Row>
        <CustomDropDown />
        <Col xl={12}>
          <Box style={{ background: "#DFFFCE" }} className="mc-card">
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
      </Row>

      <Col style={{ marginTop: "16px" }} xs={12} xl={12}>
        <Row xs={1} sm={3}>
          <Col>
            <EcommerceCard
              icon="done_all"
              title={processData?.count?.all_step_followed || 0}
              titleStyle={{
                fontFamily: "Inter",
                fontSize: "28.8px",
                fontWeight: 700,
                lineHeight: "34.85px",
                textAlign: "left",
              }}
              // number={usersCount}
              variant="mint"
              // percent="+ 95%"
              compare="All Steps Followed"
            />{" "}
          </Col>

          <Col>
            <EcommerceCard
              icon="done"
              title={processData?.count?.partially_step_followed || 0}
              titleStyle={{
                fontFamily: "Inter",
                fontSize: "28.8px",
                fontWeight: 700,
                lineHeight: "34.85px",
                textAlign: "left",
              }}
              // number={usersCount}
              variant="cream"
              // percent="+ 95%"
              compare="Partial Steps Followed"
            />
          </Col>

          <Col>
            <EcommerceCard
              icon="highlight_off"
              title={processData?.count?.no_step_followed || 0}
              titleStyle={{
                fontFamily: "Inter",
                fontSize: "28.8px",
                fontWeight: 700,
                lineHeight: "34.85px",
                textAlign: "left",
              }}
              // number={usersCount}
              variant="lilac"
              // percent="+ 95%"
              compare="None"
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
                    <Th>Date</Th>
                    <Th>All Steps Followed</Th>
                    <Th>Partially Followed Steps</Th>
                    <Th>No Steps Followed</Th>
                  </Tr>
                </Thead>
                <Tbody className="mc-table-body even">
                  {displayTable?.length === 0 ? "no data available" : displayTable}
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
    </PageLayout>
  );
};

export default ThreeStepProcess;
