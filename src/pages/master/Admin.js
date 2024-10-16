/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import PageLayout from "../../layouts/PageLayout";
import { Row, Col } from "react-bootstrap";
import { Box, Button } from "../../components/elements";
import AdminPopup from "../../components/elements/AdminPopup";
import EditAdminPopup from "../../components/elements/EditAdminPopup";
import { LoaderProvider } from "../../context/Preloader";
import { hostedAuthAxios } from "../../backendAxios/backendAxios";
import authHeader from "../../backendAxios/authHeader";
import { CardLayout } from "../../components/cards";
import ReactPaginate from "react-paginate";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import { Text, Input } from "../../components/elements";
import moment from "moment";
import data from "../../data/master/admin.json";
import { Breadcrumb } from "../../components";
import Anchor from "../../components/elements/Anchor";
import { FloatCard } from "../../components/cards";
import { ToastContainer, toast } from "react-toastify";
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
  const [openPopup, setOpenPopup] = useState(false);
  const [editAdminPopup, setEditAdminPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState([]);
  const [query, setQuery] = useState("");
  const [action, setAction] = useState(false);
  const [adminCounter, setAdminCounter] = useState(0);
  const [updateAdminId, setUpdateAdminId] = useState(null);

  useEffect(() => {
    getAllAdmin();
    adminCount();
  }, [action]);
  const [itemOffset, setItemOffset] = useState(0);

  const getAllAdmin = async () => {
    const result = await hostedAuthAxios.get("/getalladmins", {
      headers: authHeader(),
    });
    setAdmin(result?.data);
    setAction(false);
  };

  const adminCount = async () => {
    const result = await hostedAuthAxios.get("/getalladmins", {
      headers: authHeader(),
    });
    setAdminCounter(result?.data.length);
    setAction(false);
  };

  const enableDisableAdmin = async (id, index) => {
    const result = await hostedAuthAxios.put(
      "/disableadmin",
      { id: id },

      {
        headers: authHeader(),
      }
    );
    {
      result?.data?.data?.isActive
        ? toast.success("Admin Is Now Enabled")
        : toast.error("Admin Is Now Disabled");
    }
    setAction(true);
    return result;
  };

  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const displayUsers = admin
    .slice(itemOffset, endOffset)
    .filter((data) => data?.userData?.name.toUpperCase().includes(query))
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
            {item?.userData?.name?.toString()}
          </td>

          <td style={{ fontSize: "14px", textTransform: "capitalize" }}>
            {item?.validPermission?.map((item, ind) => (
              <span key={ind}> {`${item?.permissionName},`}</span>
            ))}
          </td>
          {/* <td>{item.userData.isActive.toString()}</td> */}
          <td>{moment(item?.userData?.createdAt).format("LL")}</td>
          <td>
            <Box className="mc-table-action">
              <Button
                title="Edit"
                className="material-icons edit"
                onClick={() => {
                  setUpdateAdminId(item.userData._id);
                  setEditAdminPopup(true);
                }}
              >
                {/* <EditIcon /> */}
                <img src="images/Edit.svg" alt="" />
              </Button>
              <Button
                title="Enable/Disable"
                className="material-icons view"
                onClick={() => enableDisableAdmin(item.userData._id)}
              >
                {item?.userData?.isActive ? (
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

  const pageCount = Math.ceil(admin.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % admin?.length;
    setItemOffset(newOffset);
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
                text="create admin"
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
                    digit={adminCounter}
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
                        placeholder="Id / Name / Permissions"
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
                        <Th>Permissions</Th>
                        {/* <Th>Active</Th> */}
                        <Th>Created At</Th>
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
              <ToastContainer />
            </Box>
            <AdminPopup
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
              closePopup={() => setOpenPopup(false)}
              title="Add new admin and its permissions !"
            />
            <EditAdminPopup
              updateAdminId={updateAdminId}
              editAdminPopup={editAdminPopup}
              setEditAdminPopup={setEditAdminPopup}
              closePopup={() => setEditAdminPopup(false)}
              title="Edit the Admin and its Permissions !"
            />
          </>
        )}
      </>
    </PageLayout>
  );
}
