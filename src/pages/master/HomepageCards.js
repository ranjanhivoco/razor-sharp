import React, { useState, useEffect } from "react";
import PageLayout from "../../layouts/PageLayout";
import { Box, Button } from "../../components/elements";
import { LoaderProvider } from "../../context/Preloader";
import { CardLayout } from "../../components/cards";
import CardPopup from "../../components/elements/CardPopup";
import EditCardPopup from "../../components/elements/EditCardPopup";
import { Text, Input, Heading, Icon, Image } from "../../components/elements";
import data from "../../data/master/homepage_cards.json";
import { Breadcrumb } from "../../components";
import Anchor from "../../components/elements/Anchor";
import { FloatCard } from "../../components/cards";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import { Row, Col } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import {
  Tr,
  Td,
  Th,
  Thead,
  Tbody,
  Table,
} from "../../components/elements/Table";
import { hostedPagesAxios } from "../../backendAxios/backendAxios";
import authHeader from "../../backendAxios/authHeader";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";

const ApiUrl = "http://localhost:3000";
// const ApiUrl = "http://localhost:3000";

export default function HomepageCards({ icon, text }) {
  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [editCardPopup, setEditCardPopup] = useState(false);
  const [updateCardId, setUpdateCardId] = useState(null);
  const [cardCount, setCardCount] = useState(0);
  const [cardsData, setCardsData] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    getAllCards();
  }, []);

  const getAllCards = async (e) => {
    setLoading(true);
    await hostedPagesAxios.get("/card-category/getall").then((response) => {
      if (response.status === 200) {
        setCardsData(response?.data);
        setCardCount(response?.data?.length);
      }
    });
    setLoading(false);
  };

  const enableDisableCard = async (id) => {
    await hostedPagesAxios
      .get(`/card-category/change-status/${id}`, { headers: authHeader() })
      .then((response) => {
        if (response.status === 200) {
          response?.data?.isActive
            ? toast.success("Card Is Now enabled")
            : toast.error("Card Is Now Disabled");
        }
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
  };

  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const displayCoupon = cardsData
    .slice(itemOffset, endOffset)
    .filter((data) => data?.category?.toUpperCase().includes(query))

    .map((item, index) => {
      return (
        <Tr key={index}>
          <Td title={index + 1}>
            <Box className="mc-table-check">
              <Text>
                {" "}
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
            {item?.category}
          </td>
          <td>
            {" "}
            <p
              dangerouslySetInnerHTML={{
                __html: item?.title,
              }}
            />
          </td>

          <td>
            <Image
              style={{
                display: "flex",
                margin: "auto",
                width: "35px",
                height: "35px",
              }}
              src={`${item.catimage}`}
              alt={item.alt}
            />
          </td>
          <td className="text-center">
            {item?.featured ? item?.featured.toString() : "__"}
          </td>
          <td className="text-center">
            {item?.topproductfeatured
              ? item?.topproductfeatured.toString()
              : "__"}
          </td>
          <td className="text-center">
            {item?.sliderfeatured ? item?.sliderfeatured.toString() : "__"}
          </td>
          {/* <td className="text-center">
            {item?.bannerFeatured ? item?.bannerFeatured.toString() : "__"}
          </td> */}
          <td>
            <Box className="mc-table-action">
              <Button
                title="Edit"
                className="material-icons edit"
                onClick={() => {
                  setUpdateCardId(item._id);
                  setEditCardPopup(true);
                }}
              >
                <img src="images/Edit.svg" alt="" />
              </Button>

              <Button
                title="Enable/Disable"
                className="material-icons view"
                onClick={() => enableDisableCard(item._id)}
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

  const pageCount = Math.ceil(cardsData?.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % cardsData?.length;
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
            <Box style={{ display: "flex", justifyContent: "end" }}>
              <Button
                type="button"
                text="Add Card"
                className="btn btn-outline-warning btn-sm text-black"
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
                    digit={cardCount}
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
                        placeholder="name"
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
                            <Text>S.NO</Text>
                          </Box>
                        </Th>

                        <Th>Category</Th>
                        <Th>Title</Th>
                        <Th>category image</Th>
                        <Th>Top Card</Th>
                        <Th>Middle Card</Th>
                        <Th>Bottom Card</Th>
                        {/* <Th>Banner Card</Th> */}
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody className="mc-table-body even">
                      {displayCoupon}
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
              </CardLayout>
              <ToastContainer />
            </Box>
            <CardPopup
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
              closePopup={() => setOpenPopup(false)}
              title="Add new Card !"
            />
            <EditCardPopup
              updateCardId={updateCardId}
              editCardPopup={editCardPopup}
              setEditCardPopup={setEditCardPopup}
              closePopup={() => setEditCardPopup(false)}
              title="Edit !"
            />
          </>
        )}
      </>
    </PageLayout>
  );
}
