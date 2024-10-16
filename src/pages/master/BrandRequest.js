import React, { useState, useEffect } from "react";
import PageLayout from "../../layouts/PageLayout";
import { FloatCard } from "../../components/cards";
import { Col, Row } from "react-bootstrap";
import { Box, Button } from "../../components/elements";
import { LoaderProvider } from "../../context/Preloader";
import { CardLayout } from "../../components/cards";
import ReactPaginate from "react-paginate";
import { Text, Input, Icon, Heading } from "../../components/elements";
import Modal from "react-bootstrap/Modal";
import Anchor from "../../components/elements/Anchor";
import data from "../../data/master/brandRequest.json";
import { Breadcrumb } from "../../components";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import {
  Tr,
  Td,
  Th,
  Thead,
  Tbody,
  Table,
} from "../../components/elements/Table";
import { hostedSellerProductAxios } from "../../backendAxios/backendAxios";
import authHeader from "../../backendAxios/authHeader";

export default function UserList() {
  const [loading, setLoading] = useState(false);
  const [brandRequest, setBrandRequest] = useState([]);
  const [brandRequestCount, setBrandRequestCount] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getBrandRequest();
  }, []);

  const getBrandRequest = async () => {
    setLoading(true);
    await hostedSellerProductAxios
      .get("/admin-request-for-brand", { headers: authHeader() })
      .then((response) => {
        setBrandRequest(response.data.product);
        setBrandRequestCount(response.data.count);
      })
      .catch((response) => {
        if (response.status === 404) {
          toast.error("Something went wrong");
        }
      });
    setLoading(false);
  };

  const verifySellerRequest = async (id) => {
    await hostedSellerProductAxios
      .get(`/admin-request-accept-brand/${id}`, { headers: authHeader() })
      .then((response) => {
        if (response.status === 200) {
          toast.success("New Brand was successfully accepted");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch((response) => {
        if (response.status === 404) {
          toast.error("Something went wrong");
        }
      });
  };

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const displayUsers = brandRequest
    .slice(itemOffset, endOffset)
    .filter((data) => data?.otherbrand?.toUpperCase().includes(query))
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
            {item.otherbrand}
          </td>

          <td>{item?.title}</td>
          <td>{item?.subcategory}</td>
          <td>{moment(item?.createdAt).format("LL")}</td>
          <td>
            <Box className="mc-table-action">
              <Button
                title="Accept"
                className="material-icons delete"
                onClick={() => verifySellerRequest(item?._id)}
              >
                <img
                  src="images/check.png"
                  style={{ padding: "3px", cursor: "pointer" }}
                  alt=""
                />
              </Button>
            </Box>
          </td>
        </Tr>
      );
    });

  const pageCount = Math.ceil(brandRequest.length / itemsPerPage);
  const changePage = (event) => {
    const newOffset = (event.selected * itemsPerPage) % brandRequest?.length;
    setItemOffset(newOffset);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
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
            <div className="mt-2 row">
              <Col sm={6} lg={4}>
                <FloatCard
                  variant="lg blue"
                  digit={brandRequestCount}
                  title="brand request"
                  icon="pending"
                />
              </Col>
            </div>
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
                        placeholder="Brand Name "
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
                        <Th>Brand name</Th>
                        <Th>Product name</Th>
                        <Th>sub category</Th>
                        <Th>Request date</Th>
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
        <ToastContainer />
      </>
    </PageLayout>
  );
}
