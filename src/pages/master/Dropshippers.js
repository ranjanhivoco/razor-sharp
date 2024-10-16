import React, { useState, useEffect } from "react";
import PageLayout from "../../layouts/PageLayout";
import { Box, Button } from "../../components/elements";
import DropshipperPopup from "../../components/elements/DropshipperPopup";
import { LoaderProvider } from "../../context/Preloader";
import { hostedSellerAuthAxios } from "../../backendAxios/backendAxios";
import authHeader from "../../backendAxios/authHeader";
import { CardLayout, FloatCard } from "../../components/cards";
import { Text, Input } from "../../components/elements";
import EditDropshipperPopup from "../../components/elements/EditDropshipperPopup";
import { Breadcrumb } from "../../components";
import Anchor from "../../components/elements/Anchor";
import data from "../../data/master/dropshipper.json";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ReactPaginate from "react-paginate";
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

export default function Admin({ icon, text }) {
  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dropshipper, setdropshipper] = useState([]);
  const [dropshiperCount, setDropshipperCount] = useState([]);
  const [editDropshipperPopup, setEditDropshipperPopup] = useState(false);
  const [query, setQuery] = useState("");
  const [action, setAction] = useState(false);
  const [updateDropshipperId, setUpdateDropshipperId] = useState(null);
  const [alertModal, setAlertModal] = useState(false);

  useEffect(() => {
    getAllDropshippers();
  }, [action]);
  const [itemOffset, setItemOffset] = useState(0);

  const getAllDropshippers = async () => {
    setLoading(true);
    const result = await hostedSellerAuthAxios.get("/sellers", {
      headers: authHeader(),
    });
    setdropshipper(result?.data?.data);
    setDropshipperCount(result?.data?.data?.length);
    setAction(false);
    setLoading(false);
  };

  const enableDisableSeller = async (id) => {
    const result = await hostedSellerAuthAxios.get(`/enableDisable/${id}`, {
      headers: authHeader(),
    });
    toast.success(`${result.data.name} is updated successfully`);
    setInterval(() => {
      window.location.reload();
    }, 2000);
  };

  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const displayUsers = dropshipper
    .filter((data) => data?.name?.toUpperCase().includes(query))
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

          <td style={{ fontSize: "14px" }}>{item?.email}</td>
          <td>{item.mobileNumber}</td>
          <td>{item.store.store_name}</td>
          <td>{item.isActiveEmail.toString()}</td>
          <td>{item.isActiveNumber.toString()}</td>
          <td>
            <Box className="mc-table-action">
              <Button
                title="Edit"
                className="material-icons edit"
                onClick={() => {
                  setUpdateDropshipperId(item?._id);
                  setEditDropshipperPopup(true);
                }}
              >
                <img src="images/Edit.svg" alt="" />
              </Button>
              <Button
                title="Enable/Disable"
                className="material-icons delete"
                onClick={() => {
                  enableDisableSeller(item?._id);
                  setAlertModal(true);
                }}
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

  const pageCount = Math.ceil(dropshipper?.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % dropshipper?.length;
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
                  {data?.breadcrumb?.map((item, index) => (
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
                  digit={dropshiperCount}
                  title="total seller"
                  icon="pending"
                />
              </Col>
            </div>
            <Box>
              <CardLayout id="boxer">
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
                <div class="col-xl-12" id="dropshipper-data">
                  <Table className="mc-table product">
                    <Thead className="mc-table-head primary">
                      <Tr>
                        <Th>
                          <Box className="mc-table-check">
                            <Text>S.NO</Text>
                          </Box>
                        </Th>

                        <Th>Name</Th>
                        <Th>Email </Th>
                        <Th>Contact No.</Th>
                        <Th>Store Name</Th>
                        <Th>Verify Email</Th>
                        <Th>Verify Number</Th>
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
            <DropshipperPopup
              updateDropshipperId={updateDropshipperId}
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
              closePopup={() => setOpenPopup(false)}
              title="Add new seller !"
            />
            <EditDropshipperPopup
              updateDropshipperId={updateDropshipperId}
              editDropshipperPopup={editDropshipperPopup}
              setEditDropshipperPopup={setEditDropshipperPopup}
              closePopup={() => setEditDropshipperPopup(false)}
              title="Edit !"
            />
            <ToastContainer />
          </>
        )}
      </>
    </PageLayout>
  );
}
