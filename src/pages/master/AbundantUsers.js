import React, { useState, useEffect } from "react";
import PageLayout from "../../layouts/PageLayout";
import { Col, Row } from "react-bootstrap";
import { Box, Button } from "../../components/elements";
import { LoaderProvider } from "../../context/Preloader";
import { CardLayout } from "../../components/cards";
import ReactPaginate from "react-paginate";
import { Text, Input, Icon, Heading } from "../../components/elements";
import Modal from "react-bootstrap/Modal";
import Anchor from "../../components/elements/Anchor";
import data from "../../data/master/abundantCart.json";
import { Breadcrumb } from "../../components";
import moment from "moment";
import { FloatCard } from "../../components/cards";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import {
  Tr,
  Td,
  Th,
  Thead,
  Tbody,
  Table,
} from "../../components/elements/Table";
import { hostedAuthAxios, hostedOrderAxios } from "../../backendAxios/backendAxios";
import authHeader from "../../backendAxios/authHeader";

export default function UserList() {
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [usersCount, setUsersCount] = useState(0);
  const [disabledUser, setDisabledUser] = useState(0);

  useEffect(() => {
    getAbundantUserData();
  }, []);
  const [itemOffset, setItemOffset] = useState(0);

  const getAbundantUserData = async () => {
    setLoading(true);
    const result = await hostedOrderAxios.get("/getAbundantCartUser", {
      headers: authHeader(),
    });
    setAllUsers(result?.data);
    setUsersCount(result?.data?.length);
    setLoading(false);
  };


  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const displayUsers = allUsers
    .slice(itemOffset, endOffset)
    .filter((data) => data?.name?.toUpperCase().includes(query))
    .map((item, index) => {
      return (
        <Tr key={index}>
          <Td title={index + 1}>
            <Box className="mc-table-check">
              <Text>
                {Number(endOffset) - Number(itemsPerPage) + index + 1}
              </Text>
            </Box>
          </Td>
          <td
            style={{
              textTransform: "uppercase",
              color: "black",
              fontSize: "14px",
            }}
          >
            {item.name}
          </td>
          <td>{item?.email}</td>
          <td>{moment(item?.createdAt).format("LL")}</td>
        </Tr>
      );
    });

  const pageCount = Math.ceil(allUsers.length / itemsPerPage);
  const changePage = (event) => {
    const newOffset = (event.selected * itemsPerPage) % allUsers?.length;
    setItemOffset(newOffset);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <PageLayout>
      <>
        {loading ? (
          <LoaderProvider />
        ) : (
          <>
            <Col xl={12}>
              <CardLayout>
                <Breadcrumb title={data?.pageTitle}>
                  {data?.breadcrumb.map((item, index) => (
                    <li key={index} className="mc-breadcrumb-item">
                      {item.path ? (
                        <Anchor className="mc-breadcrumb-link" href={item.path}>
                          {item.text}
                        </Anchor>
                      ) : (
                        item.text
                      )}
                    </li>
                  ))}
                </Breadcrumb>
              </CardLayout>
            </Col>
            <Row className="mt-2">
              <Col xl={4}>
                <FloatCard
                  variant="lg blue"
                  digit={usersCount}
                  title="total user"
                  icon={"check_circle"}
                />
              </Col>
            </Row>
            <Box>
              <CardLayout>
                <div
                  className="col"
                  style={{ display: "flex", justifyContent: "end" }}
                >
                  <div className="mc-label-field-group label-col">
                    <label className="mc-label-field-title">search by</label>
                    <div className="input-search-field">
                      <Input
                        type="search"
                        placeholder=" Name "
                        onChange={(e) => setQuery(e.target.value.toUpperCase())}
                        className="admin-search-field"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-xl-12" id="category-data">
                  <Table className="mc-table product">
                    <Thead className="mc-table-head primary">
                      <Tr>
                        <Th>
                          <Box className="mc-table-check">
                            <Text>uid</Text>
                          </Box>
                        </Th>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Created At</Th>
                        {/* <Th>Actions</Th> */}
                      </Tr>
                    </Thead>
                    <Tbody className="mc-table-body even">{displayUsers}</Tbody>
                  </Table>
                </div>
                <ReactPaginate
                  previousLabel={"⟵"}
                  nextLabel={"⟶"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"paginationBttns"}
                  previousClassName={"pre"}
                  nextClassName={"next"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
                />
              </CardLayout>
            </Box>
          </>
        )}
      </>
    </PageLayout>
  );
}
