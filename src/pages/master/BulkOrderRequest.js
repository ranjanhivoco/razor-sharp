import React, { useState, useEffect } from "react";
import PageLayout from "../../layouts/PageLayout";
import { Col, Row } from "react-bootstrap";
import { Box } from "../../components/elements";
import { LoaderProvider } from "../../context/Preloader";
import { CardLayout } from "../../components/cards";
import ReactPaginate from "react-paginate";
import { Text, Input } from "../../components/elements";
import Anchor from "../../components/elements/Anchor";
import data from "../../data/master/bulkOrderList.json";
import { Breadcrumb } from "../../components";
import { FloatCard } from "../../components/cards";
import {
  Tr,
  Td,
  Th,
  Thead,
  Tbody,
  Table,
} from "../../components/elements/Table";
import { hostedBulkOrder } from "../../backendAxios/backendAxios";
import authHeader from "../../backendAxios/authHeader";

export default function UserList() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const [bulkOrderList, setBulkOrderList] = useState([]);
  const [bulkOrderCount, setBulkOrderCount] = useState(0);

  useEffect(() => {
    getOrderList();
  }, []);

  const getOrderList = async () => {
    setLoading(true);
    await hostedBulkOrder
      .get(`/getallrequest`, { headers: authHeader() })
      .then((response) => {
        if (response.status === 200) {
          setBulkOrderList(response?.data);
          setBulkOrderCount(response?.data?.length);
        }
      });
    setLoading(false);
  };

  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const displayUsers = bulkOrderList
    ?.slice(itemOffset, endOffset)
    // .filter((data) => data?.products?.map((item) => item?.product?.title.toUpperCase().includes(query)))
    ?.map((item, index) => {
      return (
        <Tr key={index}>
          <Td title={index + 1}>
            <Box className="mc-table-check">
              <Text>
                {Number(endOffset) - Number(itemsPerPage) + index + 1}
              </Text>
            </Box>
          </Td>
          <td>{item?.products?.map((item) => item?.product?.title)}</td>
          <td>{item?.products?.map((item) => item?.qty)}</td>
          <td>{item?.name}</td>

          <td>{item?.phone}</td>
          <td>
            <span
              style={{
                backgroundColor:
                  item?.status === "Accepted" ? "#63d263" : "#ff5d5d9e",
                padding: "7px",
                borderRadius: "12px",
              }}
            >
              {item?.status === "None" ? "Pending" : item?.status}
            </span>
          </td>
          <td>
            <Box className="mc-table-action">
              <Anchor
                href={`/bulk-order-view?query_id=${item?._id}`}
                title="View"
                className="material-icons view"
              >
                <img src="images/View.svg" alt="" />
              </Anchor>
            </Box>
          </td>
        </Tr>
      );
    });

  const pageCount = Math.ceil(bulkOrderList?.length / itemsPerPage);
  const changePage = (event) => {
    const newOffset = (event.selected * itemsPerPage) % bulkOrderList?.length;
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
                  digit={bulkOrderCount}
                  title="Pending Request"
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
                        placeholder=" product name"
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

                        <Th>Product name</Th>
                        <Th>Quantity</Th>
                        <Th>Customer Name</Th>
                        <Th>Number</Th>
                        <Th>Status</Th>
                        <Th>Actions</Th>
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
