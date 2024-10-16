import React, { useState, useEffect } from "react";
import PageLayout from "../../layouts/PageLayout";
import { FloatCard } from "../../components/cards";
import EditSubCategoryPopup from "../../components/elements/EditSubCategoryPopup";
import SubCategoryPopup from "../../components/elements/SubCategoryPopup";
import { Box, Button } from "../../components/elements";
import { LoaderProvider } from "../../context/Preloader";
import { hostedCategoryAxios } from "../../backendAxios/backendAxios";
import { CardLayout } from "../../components/cards";
import { Text, Input } from "../../components/elements";
import Anchor from "../../components/elements/Anchor";
import data from "../../data/master/subcategory.json";
import { Breadcrumb } from "../../components";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { Col, Row } from "react-bootstrap";
import {
  Tr,
  Td,
  Th,
  Thead,
  Tbody,
  Table,
} from "../../components/elements/Table";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import authHeader from "../../backendAxios/authHeader";

export default function SubCategory({ icon, text }) {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [editSubCategoryPopup, setEditSubCategoryPopup] = useState(false);
  const [subCategoryPopup, setSubCategoryPopup] = useState(false);
  const [updateCategoryId, setUpdateCategoryId] = useState(null);
  const [categoryCount, setCategoryCount] = useState(0);
  const [subCategoryArray, setSubCategoryArray] = useState([]);

  const [findInFast, setFindInFast] = useState([]);

  useEffect(() => {
    getSubCategory();
  }, []);

  const getSubCategory = async () => {
    setLoading(true);
    const result = await hostedCategoryAxios.get("/fastsearch_subcategory");
    setCategoryCount(result?.data?.length);
    setFindInFast(result?.data);
    setLoading(false);
  };

  const enableDisableSubCategory = async (id) => {
    await hostedCategoryAxios
      .get(`/subcategory-status-change/${id}`, {
        headers: authHeader(),
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("sub-category status changed");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      });
  };

  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const displayUsers = findInFast
    .filter((data) =>
      data?.categoryId?.category?.toUpperCase()?.includes(query)
    )
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
            {item?.categoryId?.category}
          </td>
          <td
            style={{
              textTransform: "uppercase",
              color: "black",
              fontSize: "14px",
            }}
          >
            {item?.subCategory}
          </td>
          <td>
            <Box className="mc-table-action">
              <Button
                title="Edit"
                className="material-icons edit"
                onClick={() => {
                  setUpdateCategoryId(item?._id);
                  setEditSubCategoryPopup(true);
                }}
              >
                <img src="images/Edit.svg" alt="" />
              </Button>
              <Button
                title="Enable/Disable"
                className="material-icons view"
                onClick={() => enableDisableSubCategory(item._id)}
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

  const pageCount = Math.ceil(subCategoryArray?.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % subCategoryArray?.length;
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
            {/* <Box style={{ textAlign: "right" }}>
              <Button
                type="button"
                text="Add Sub-Category"
                className="btn btn-outline-warning btn-sm text-black"
                onClick={() => setSubCategoryPopup(true)}
              />
            </Box> */}
            <Col xl={12}>
              <CardLayout>
                <Breadcrumb title={"Find In Fast"}>
                  {data?.breadcrumb.map((item, index) => (
                    <li key={index} className="mc-breadcrumb-item">
                      {item.path ? (
                        <Anchor className="mc-breadcrumb-link" href={item.path}>
                          {item.text}
                        </Anchor>
                      ) : (
                        "category"
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
                  digit={categoryCount}
                  title="total category"
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
                        placeholder="Category Name"
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
                        <Th>Category</Th>
                        <Th>SubCategory</Th>
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

            <SubCategoryPopup
              updateCategoryId={updateCategoryId}
              subCategoryPopup={subCategoryPopup}
              setEditSubCategoryPopup={setEditSubCategoryPopup}
              closePopup={() => setSubCategoryPopup(false)}
              title="Add Sub-Category !"
            />

            <EditSubCategoryPopup
              updateCategoryId={updateCategoryId}
              editSubCategoryPopup={editSubCategoryPopup}
              setEditSubCategoryPopup={setEditSubCategoryPopup}
              closePopup={() => setEditSubCategoryPopup(false)}
              title="Edit !"
            />
            <ToastContainer />
          </>
        )}
      </>
    </PageLayout>
  );
}
