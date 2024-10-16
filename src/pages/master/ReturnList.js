import React, { useState, useEffect } from "react";
import PageLayout from "../../layouts/PageLayout";
import { Col, Row } from "react-bootstrap";
import { Box } from "../../components/elements";
import { LoaderProvider } from "../../context/Preloader";
import { CardLayout } from "../../components/cards";
import ReactPaginate from "react-paginate";
import { Text, Input } from "../../components/elements";
import Anchor from "../../components/elements/Anchor";
import data from "../../data/master/returnOrderList.json";
import { Breadcrumb } from "../../components";
import moment from "moment";
import { FloatCard } from "../../components/cards";
import {
  Tr,
  Td,
  Th,
  Thead,
  Tbody,
  Table,
} from "../../components/elements/Table";
import { hostedOrderAxios } from "../../backendAxios/backendAxios";
import authHeader from "../../backendAxios/authHeader";

const ApiUrl = "http://localhost:3000";
// const ApiUrl = "http://localhost:3000";

export default function ReturnList() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const [returnOrderList, setReturnOrderList] = useState([]);

  useEffect(() => {
    getReturnOrderList();
  }, []);

  const getReturnOrderList = async () => {
    await hostedOrderAxios
      .get(`/getreturnandreplaceorder`, { headers: authHeader() })
      .then((response) => {
        setReturnOrderList(response.data);
        // console.log(response.data)
      });
  };

  const handleDownloadInvoice = async (id) => {
    // await hostedCommonModule.get(`/download-pdf/${query.get("_id")}`);
    try {
      const response = await fetch(`${ApiUrl}/common/download-pdf/${id}`, {
        method: "GET",
        headers: authHeader(),
      });

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const displayUsers = returnOrderList
    ?.slice(itemOffset, endOffset)
    .filter((data) => data?._id?.toUpperCase().includes(query))
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
          <td>{item.orderId}</td>
          <td>{item?.products?.title}</td>
          <td>{item?.name}</td>
          <td>{item?.status}</td>
          <td>{item?.return?.reason || item?.replace?.reason}</td>
          {/* <td>
            {item?.product_array
              ?.map((item) => item.status)
              .filter(
                (status, index, array) => array.indexOf(status) === index
              )}
          </td> */}
          <td>{moment(item?.createdAt).format("LL")}</td>

          <td>
            <Box className="mc-table-action">
              <Anchor
                href={`/return-details?oid=${item?.orderId}&pid=${item?.products?._id}`}
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

  const pageCount = Math.ceil(returnOrderList?.length / itemsPerPage);
  const changePage = (event) => {
    const newOffset = (event.selected * itemsPerPage) % returnOrderList?.length;
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
                        placeholder=" Order Id "
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
                        <Th>Order Id</Th>
                        <Th>Product Name</Th>
                        <Th>Customer Name</Th>
                        <Th>Order status </Th>
                        <Th>Reason</Th>
                        <Th>Order Date</Th>
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
