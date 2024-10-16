import React, { useState, useEffect } from "react";
import PageLayout from "../../layouts/PageLayout";
import { Col, Row } from "react-bootstrap";
import { Box, Button } from "../../components/elements";
import { LoaderProvider } from "../../context/Preloader";
import { CardLayout, FloatCard } from "../../components/cards";
import ReactPaginate from "react-paginate";
import { Text, Input, Icon, Heading } from "../../components/elements";
import Anchor from "../../components/elements/Anchor";
import data from "../../data/master/sellerRequest.json";
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
import { hostedSellerAuthAxios } from "../../backendAxios/backendAxios";
import authHeader from "../../backendAxios/authHeader";

export default function SellerRequest() {
  const [loading, setLoading] = useState(false);
  const [sellerRequest, setSellerRequest] = useState([]);
  const [sellerRequestCount, setSellerRequestCount] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getSellerData();
  }, []);

  const getSellerData = async () => {
    setLoading(true);
    const result = await hostedSellerAuthAxios.get("/admin-request", {
      headers: authHeader(),
    });
    setSellerRequest(result?.data?.requests);
    setSellerRequestCount(result?.data?.requests?.length);
    setLoading(false);
  };

  const verifySellerRequest = async (id, email) => {
    await hostedSellerAuthAxios
      .post(
        "/seller-acceptbyadmin",
        { sellerId: id, email: email },
        { headers: authHeader() }
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success("seller requested is Approved");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      });
  };

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const displayUsers = sellerRequest
    // .filter((data) => data?.name?.toUpperCase().includes(query))
    .slice(itemOffset, endOffset)
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
          <td>{item?.mobileNumber}</td>
          <td>{moment(item?.createdAt).format("LL")}</td>
          <td>
            <Box className="mc-table-action">
              <Anchor
                title="View"
                className="material-icons view"
                href={`/seller-view?query_id=${item?._id}&name=${item?.name}&email=${item?.email}`}
              >
                <img src="images/View.svg" alt="" />
              </Anchor>

              <Button
                title="Accept"
                className="material-icons delete"
                onClick={() => verifySellerRequest(item?._id, item?.email)}
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

  const pageCount = Math.ceil(sellerRequest.length / itemsPerPage);
  const changePage = (event) => {
    const newOffset = (event.selected * itemsPerPage) % sellerRequest?.length;
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
                  digit={sellerRequestCount}
                  title="pending request"
                  icon="shopping_bag"
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
                        <Th>mobile Number</Th>
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
