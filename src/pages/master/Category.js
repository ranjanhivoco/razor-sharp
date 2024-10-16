import React, { useState, useEffect } from "react";
import PageLayout from "../../layouts/PageLayout";
import { FloatCard } from "../../components/cards";
import CategoryPopup from "../../components/elements/CategoryPopup";
import EditCategoryPopup from "../../components/elements/EditCategoryPopup";
import { Box, Button } from "../../components/elements";
import { LoaderProvider } from "../../context/Preloader";
import { hostedCategoryAxios } from "../../backendAxios/backendAxios";
import authHeader from "../../backendAxios/authHeader";
import { CardLayout } from "../../components/cards";
import { Text, Input } from "../../components/elements";
import Anchor from "../../components/elements/Anchor";
import data from "../../data/master/category.json";
import { Breadcrumb } from "../../components";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
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

export default function Category({ icon, text }) {
  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [query, setQuery] = useState("");
  const [action, setAction] = useState(false);
  const [editCategoryPopup, setEditCategoryPopup] = useState(false);
  const [updateCategoryId, setUpdateCategoryId] = useState(null);
  const [categoryCount, setCategoryCount] = useState(0);
  const [activeCategoryCount, setActiveCategoryCount] = useState(0);

  useEffect(() => {
    getAllFazterCategory();
  }, [action]);
  const [itemOffset, setItemOffset] = useState(0);

  const getAllFazterCategory = async () => {
    setLoading(true);
    const result = await hostedCategoryAxios.get("/getallcategorysuper", {
      headers: authHeader(),
    });
    const activeCategory = result?.data?.map((e) => e?.isActive);
    setCategory(result?.data);
    setActiveCategoryCount(activeCategory?.filter(Boolean).length);
    setCategoryCount(result?.data?.length);
    setAction(false);
    setLoading(false);
  };

  const enableDisableCategory = async (id) => {
    await hostedCategoryAxios
      .get(`/category-status-change/${id}`, {
        headers: authHeader(),
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("category status changed");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      });
  };

  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const displayUsers = category
    .filter((data) => data?.category?.toUpperCase().includes(query))
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
            {item?.category}
          </td>

          <td>{item?.isActive?.toString()}</td>
          <td>{moment(item?.createdAt).format("LL")}</td>
          <td>
            <Box className="mc-table-action">
              <Button
                title="Edit"
                className="material-icons edit"
                onClick={() => {
                  setUpdateCategoryId(item?._id);
                  setEditCategoryPopup(true);
                }}
              >
                <img src="images/Edit.svg" alt="" />
              </Button>
              <Button
                title="Enable/Disable"
                className="material-icons view"
                onClick={() => enableDisableCategory(item._id)}
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

  const pageCount = Math.ceil(category?.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % category?.length;
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
                text="Add Category"
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
            <div className="mt-2 row">
              <Col sm={6} lg={4}>
                <FloatCard
                  variant="lg blue"
                  digit={categoryCount}
                  title="total category"
                  icon="pending"
                />
              </Col>

              <Col sm={6} lg={4}>
                <FloatCard
                  variant="lg blue"
                  digit={activeCategoryCount}
                  title="Active category"
                  icon="pending"
                />
              </Col>
              {/* <Col sm={6} lg={4}>
              <FloatCard
                variant="lg blue"
                digit={cards?.inactiveProducts}
                title="Disable product"
                icon="shopping_bag"
              />
            </Col> */}
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
                        placeholder="Category"
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

                        <Th>fazter Category</Th>
                        <Th>is Active</Th>
                        <Th>created At</Th>
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
            <CategoryPopup
              updateCategoryId={updateCategoryId}
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
              closePopup={() => setOpenPopup(false)}
              title="Add new fazter category  !"
            />
            <EditCategoryPopup
              updateCategoryId={updateCategoryId}
              editCategoryPopup={editCategoryPopup}
              setEditCategoryPopup={setEditCategoryPopup}
              closePopup={() => setEditCategoryPopup(false)}
              title="Edit !"
            />
            <ToastContainer />
          </>
        )}
      </>
    </PageLayout>
  );
}
