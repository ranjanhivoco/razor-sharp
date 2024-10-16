/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import PageLayout from "../../layouts/PageLayout";
import { Row, Col } from "react-bootstrap";
import { Box } from "../../components/elements";
import { LoaderProvider } from "../../context/Preloader";
import { hostedPagesAxios } from "../../backendAxios/backendAxios";
import authHeader from "../../backendAxios/authHeader";
import { CardLayout } from "../../components/cards";
import ReactPaginate from "react-paginate";
import { Text, Input, Button } from "../../components/elements";
import data from "../../data/master/contactUs.json";
import { Breadcrumb } from "../../components";
import Anchor from "../../components/elements/Anchor";
import { FloatCard } from "../../components/cards";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import {
  Tr,
  Td,
  Th,
  Thead,
  Tbody,
  Table,
} from "../../components/elements/Table";

export default function Admin({ icon, text }) {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const [contactUs, setContactUs] = useState([]);
  const [queriesCount, setQueriesCount] = useState(0)

  useEffect(() => {
    getContactUsDetail();
  }, []);

  const getContactUsDetail = async () => {
    setLoading(true);
    await hostedPagesAxios
      .get(`/contact/getall`, {
        headers: authHeader(),
      })
      .then((response) => {
        setContactUs(response?.data);
        setQueriesCount(response?.data?.length)
      });
    setLoading(false);
  };

  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const displayUsers = contactUs
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
            {item?.name}
          </td>
          <td>{item?.email}</td>
          <td>{item?.message}</td>
          <td>{moment(item?.createdAt).format("LL")}</td>
          <td>
            <Box className="mc-table-action">
              <Anchor
                href={`/contactView?query_id=${item?._id}`}
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

  const pageCount = Math.ceil(contactUs.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % contactUs?.length;
    setItemOffset(newOffset);
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
              {data?.float.map((item, index) => (
                <Col xl={4} key={index}>
                  <FloatCard
                    variant={item.variant}
                    digit={queriesCount}
                    title={item.title}
                    icon={item.icon}
                  />
                </Col>
              ))}
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
                        placeholder="Name"
                        onChange={(e) => setQuery(e.target.value.toUpperCase())}
                        className="admin-search-field"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-xl-12" id="admin-data">
                  <Table className="mc-table product">
                    <Thead className="mc-table-head primary">
                      <Tr>
                        <Th>
                          <Box className="mc-table-check">
                            <Text>S.No</Text>
                          </Box>
                        </Th>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Message</Th>
                        <Th>Contacted At</Th>
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
                  onPageChange={handlePageClick}
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
