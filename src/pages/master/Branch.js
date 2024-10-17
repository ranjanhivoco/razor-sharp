import { Col, Dropdown, Row } from "react-bootstrap";
import { LoaderProvider } from "../../context/Preloader";
import PageLayout from "../../layouts/PageLayout";
import { Box } from "@mui/material";
import data from "../../data/master/branch.json";
import { Breadcrumb, DotsMenu, DropdownMenu } from "../../components";

import { Anchor, Item, Text } from "../../components/elements";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "../../components/elements/Table";
import ReactPaginate from "react-paginate";
import CustomDropDown from "../../components/elements/CustomDropDown";
import axios from "axios";
import { useEffect, useState } from "react";

const Branch = () => {
  const [branchData, setBranchData] = useState([]);

  const endpoint = "https://api.hongs.razorsharp.in";

  const getBranches = async () => {
    const tokenString = sessionStorage.getItem("token");
    const token = JSON.parse(tokenString);
    try {
      const response = await axios.get(`${endpoint}/common/get-branch`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      });
      setBranchData(response?.data);
    } catch (error) {
      console.error("Error fetching data:", error); // Handle errors
    }
  };

  useEffect(() => {
    getBranches();
  }, []); // Empty array ensures the effect runs once after the initial render

  // const mcdBranches = [
  //   { name: "Sec 63, Noida", location: "Noida, Uttar Pradesh" },
  //   { name: "Connaught Place", location: "New Delhi, Delhi" },
  //   { name: "Bandra West", location: "Mumbai, Maharashtra" },
  //   { name: "Brigade Road", location: "Bangalore, Karnataka" },
  //   { name: "Park Street", location: "Kolkata, West Bengal" },
  //   { name: "Viman Nagar", location: "Pune, Maharashtra" },
  //   { name: "Anna Nagar", location: "Chennai, Tamil Nadu" },
  //   { name: "Hitech City", location: "Hyderabad, Telangana" },
  //   { name: "Sector 17", location: "Chandigarh" },
  //   { name: "MG Road", location: "Gurugram, Haryana" },
  // ];

  const displayBranches = branchData?.map((branch, index) => {
    return (
      <Tr key={index}>
        <Td title={index + 1}>
          <Box className="mc-table-check">
            <Text>{index + 1}</Text>
          </Box>
        </Td>
        <td>{branch.branch_name}</td>
        <td>{branch.branch_id}</td>

        <td>{branch.location}</td>
      </Tr>
    );
  });

  const loading = false;
  return (
    <>
      {loading ? (
        <LoaderProvider />
      ) : (
        <PageLayout>
          <Row>
            <CustomDropDown />
            <Col xs={12} sm={12} md={12} xl={12}>
              <Box style={{ background: "#FFF5D580" }} className="mc-card">
                <Breadcrumb title={data.pageTitle}>
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

            <Col xs={12} sm={12} md={12} xl={12}>
              <div class="col-xl-12" id="category-data">
                <Table className="mc-table product">
                  <Thead className="mc-table-head primary">
                    <Tr>
                      <Th>
                        <Box className="mc-table-check">
                          <Text>S. NO.</Text>
                        </Box>
                      </Th>
                      <Th>Branch</Th>
                      <Th>Branch Code</Th>
                      <Th>LOCATION</Th>
                    </Tr>
                  </Thead>
                  <Tbody className="mc-table-body even">
                    {displayBranches}
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
        </PageLayout>
      )}
    </>
  );
};

export default Branch;
