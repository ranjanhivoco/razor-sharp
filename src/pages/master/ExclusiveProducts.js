/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { CardLayout, FloatCard } from "../../components/cards";
import Form from "react-bootstrap/Form";
import { Breadcrumb } from "../../components";
import Anchor from "../../components/elements/Anchor";
import Button from "../../components/elements/Button";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/inventoryList.json";
import { Text, Input, Box, Image } from "../../components/elements";
import { hostedSellerProductAxios } from "../../backendAxios/backendAxios";
import InventoryPopup from "../../components/elements/InventoryPopup";
import EditInventoryPopup from "../../components/elements/EditInventoryPopup";
import AddSingleProductPopup from "../../components/elements/AddSingleProductPopup";
import ReactPaginate from "react-paginate";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import { ToastContainer, toast } from "react-toastify";
import {
  Tr,
  Td,
  Th,
  Thead,
  Tbody,
  Table,
} from "../../components/elements/Table";
import { LoaderProvider } from "../../context/Preloader";
import authHeader from "../../backendAxios/authHeader";

export default function InventoryList() {
  const [loading, setLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [openProductPopup, setOpenProductPopup] = useState(false);
  const [editInventoryPopup, setEditInventoryPopup] = useState(false);
  const [updatedIventoryId, setUpdatedIventoryId] = useState(null);
  const [itemOffset, setItemOffset] = useState(0);
  const [exclusiveProducts, setexclusiveProducts] = useState([]);
  const [exclusiveCount, setExclusiveCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [action, setAction] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchexclusiveProducts(pageNumber);
  }, [action, pageNumber]);

  const fetchexclusiveProducts = async (page) => {
    // setLoading(true);
    await hostedSellerProductAxios
      .get(`/allproduct-by-subcategory/Exclusive-Products?page=${page}&limit=20`)
      .then((response) => {
        if (response.status === 200) {
          setexclusiveProducts(response?.data?.products);
          setExclusiveCount(response?.data);
        }
      });
    // setLoading(false);
  };

  const updateProduct = async (id) => {
    const result = await hostedSellerProductAxios.get(`/enableDisable/${id}`, {
      headers: authHeader(),
    });
    {
      result?.data?.status
        ? toast.success("Product Is Now enabled")
        : toast.error("Product Is Now Disabled");
    }
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    setAction(!action);
    return result;
  };

  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const displayUsers = exclusiveProducts
    .filter((data) => data?.title?.toUpperCase().includes(query))
    // ?.slice(itemOffset, endOffset)
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
            <Image
              style={{ height: "35px", width: "35px", marginRight: "6px" }}
              src={item.images[0]}
              alt={item.alt}
            />
            {item?.product?.name ? item?.product?.name : item?.title}
          </td>
          <td>{item?.sku}</td>
          <td>{item?.category ? item?.category : "__"}</td>
          <td>{item?.subcategory}</td>
          <td>${item?.price}</td>
          <td>{item?.stock}</td>
          <td>
            <Box className="mc-table-action">
              <Button
                title="Edit"
                className="material-icons edit"
                onClick={() => {
                  setUpdatedIventoryId(item?._id);
                  setEditInventoryPopup(true);
                }}
              >
                {/* <EditIcon /> */}
                <img src="images/Edit.svg" alt="" />
              </Button>
              <Button
                title="Enable/Disable"
                className="material-icons edit"
                onClick={() => {
                  updateProduct(item?._id, item?.status);
                }}
              >
                {item?.status ? (
                  <ToggleOnIcon style={{ color: "#000" }} />
                ) : (
                  <ToggleOffIcon style={{ color: "lightGray" }} />
                )}
              </Button>
            </Box>
          </td>
        </Tr>
      );
    });

  const pageCount = Math.ceil(exclusiveCount?.totalCount / itemsPerPage);
  console.log(pageCount);
  const handlePageClick = async (selected) => {
    const selectedPage = parseInt(selected.selected, 10);
    const newOffset =
      (selectedPage * itemsPerPage) % exclusiveCount?.totalCount;
    setItemOffset(newOffset);
    setPageNumber(selectedPage + 1);
    await fetchexclusiveProducts(selectedPage + 1);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  // const handlePageClick = async (selected) => {
  //   const selectedPage = parseInt(selected.selected, 10);
  //   const newOffset = (selectedPage * itemsPerPage) % cards?.totalProducts;
  //   setItemOffset(newOffset);
  //   setPageNumber(selectedPage + 1);
  //   await fetchProducts(selectedPage + 1);
  //   window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  // };

  return (
    <>
      {loading ? (
        <LoaderProvider />
      ) : (
        <PageLayout>
          <Box style={{ display: "flex", justifyContent: "end" }}>
            {/* <Anchor
                href="/dropshippers"
                className="btn btn-outline-warning btn-sm text-black me-3"
                text="Dropshipper"
              /> */}
            {/* <Button
              type="button"
              text="Add Product"
              className="btn btn-outline-warning btn-sm text-black me-3"
              onClick={() => setOpenProductPopup(true)}
            />
            <Button
              type="button"
              text="Upload CSV"
              className="btn btn-outline-warning btn-sm text-black"
              onClick={() => setOpenPopup(true)}
            /> */}
          </Box>

          <Col xl={12}>
            <CardLayout>
              <Breadcrumb title={"Exclusive List"}>
                {data?.breadcrumb.map((item, index) => (
                  <li key={index} className="mc-breadcrumb-item">
                    {item?.path ? (
                      <Anchor className="mc-breadcrumb-link" href={item?.path}>
                        {item?.text}
                      </Anchor>
                    ) : (
                      item?.text
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
                digit={exclusiveCount?.totalCount}
                title="total product"
                icon="shopping_bag"
              />
            </Col>
          </div>
          <Col xl={12}>
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
                      <Th>Sku</Th>
                      <Th>Category </Th>
                      <Th>Sub Category </Th>
                      <Th>Price</Th>
                      <Th>Stock</Th>
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
          </Col>

          <InventoryPopup
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            closePopup={() => setOpenPopup(false)}
            title="Add product csv file !"
          />
          <AddSingleProductPopup
            openProductPopup={openProductPopup}
            setOpenProductPopup={setOpenProductPopup}
            closePopup={() => setOpenProductPopup(false)}
            title="Add single product !"
          />
          <EditInventoryPopup
            updatedIventoryId={updatedIventoryId}
            editInventoryPopup={editInventoryPopup}
            setEditInventoryPopup={setEditInventoryPopup}
            closePopup={() => setEditInventoryPopup(false)}
            title="Edit !"
          />
        </PageLayout>
      )}
    </>
  );
}
