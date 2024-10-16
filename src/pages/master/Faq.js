import React, { useState, useEffect } from "react";
import PageLayout from "../../layouts/PageLayout";
import { FloatCard } from "../../components/cards";
import AddFaqPopup from "../../components/elements/AddFaqPopup";
import EditFaqPopup from "../../components/elements/EditFaqPopup";
import { Box, Button } from "../../components/elements";
import { LoaderProvider } from "../../context/Preloader";
import { hostedPagesAxios } from "../../backendAxios/backendAxios";
import { CardLayout } from "../../components/cards";
import { Text, Input } from "../../components/elements";
import Anchor from "../../components/elements/Anchor";
import data from "../../data/master/faq.json";
import { Breadcrumb } from "../../components";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import { Col, Row } from "react-bootstrap";
import {
  Tr,
  Td,
  Th,
  Thead,
  Tbody,
  Table,
} from "../../components/elements/Table";

export default function Category({ icon, text }) {
  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [action, setAction] = useState(false);
  const [updateFaqId, setUpdateFaqId] = useState(null);
  const [editFaqPopup, setEditFaqPopup] = useState(false);
  const [faq, setFaq] = useState([]);
  const [faqCount, setFaqCount] = useState([]);

  useEffect(() => {
    getAllFaq();
  }, [action]);

  const getAllFaq = async (e) => {
    setLoading(true);
    await hostedPagesAxios.get(`/faq/questions`).then((response) => {
      if (response.status === 200) {
        setFaq(response?.data);
        setFaqCount(response?.data?.length);
      }
    });
    setLoading(false);
  };

  const updateStatus = async (id) => {
    await hostedPagesAxios
      .get(`/faq/update-faq-status/${id}`)
      .then((response) => {
        if (response.status === 200) {
          window.location.reload();
        }
      });
  };

  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const displayUsers = faq
    .filter((data) => data?.category?.category?.toUpperCase().includes(query))
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
            {item?.question}
          </td>

          <td>{item?.category?.category}</td>
          <td>
            <Box className="mc-table-action">
              <Button
                title="Edit"
                className="material-icons edit"
                onClick={() => {
                  setUpdateFaqId(item?._id);
                  setEditFaqPopup(true);
                }}
              >
                <img src="images/Edit.svg" alt="" />
              </Button>
              <Button
                title="Enable/Disable"
                className="material-icons view"
                onClick={() => updateStatus(item._id)}
              >
                {item?.isActive ? (
                  <ToggleOnIcon style={{ color: "#000" }} />
                ) : (
                  <ToggleOffIcon style={{ color: "#85818b" }} />
                )}
              </Button>
            </Box>
          </td>
        </Tr>
      );
    });

  const pageCount = Math.ceil(faq?.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % faq?.length;
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
            <Box style={{ textAlign: "right" }}>
              <Button
                type="button"
                text="Add Question"
                className="btn btn-outline-warning btn-sm text-black me-3"
                onClick={() => setOpenPopup(true)}
              />
            </Box>
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
                    digit={faqCount}
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
                        placeholder="Catgeory"
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
                            <Text>S.NO</Text>
                          </Box>
                        </Th>

                        <Th>Question</Th>
                        <Th>Category</Th>
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
            <AddFaqPopup
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
              closePopup={() => setOpenPopup(false)}
              title="Add new question  !"
            />
            <EditFaqPopup
              updateFaqId={updateFaqId}
              editFaqPopup={editFaqPopup}
              setEditFaqPopup={setEditFaqPopup}
              closePopup={() => setEditFaqPopup(false)}
              title="Edit !"
            />
            <ToastContainer />
          </>
        )}
      </>
    </PageLayout>
  );
}
