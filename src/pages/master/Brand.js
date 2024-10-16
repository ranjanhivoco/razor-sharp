import React, { useState, useEffect } from "react";
import PageLayout from "../../layouts/PageLayout";
import { FloatCard } from "../../components/cards";
import BrandPopup from "../../components/elements/BrandPopup";
import EditBrandPopup from "../../components/elements/EditBrandPopup";
import { Box, Button } from "../../components/elements";
import { LoaderProvider } from "../../context/Preloader";
import { hostedCategoryAxios } from "../../backendAxios/backendAxios";
import { CardLayout } from "../../components/cards";
import { Text, Input } from "../../components/elements";
import Anchor from "../../components/elements/Anchor";
import data from "../../data/master/brand.json";
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
import authHeader from "../../backendAxios/authHeader";

export default function Brand({ icon, text }) {
  const [openPopup, setOpenPopup] = useState(false);
  const [editBrandPopup, setEditBrandPopup] = useState(false);
  const [updateBrandId, setUpdateBrandId] = useState();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const [brandCount, setBrandCount] = useState(0);

  const [brand, setBrand] = useState([]);

  useEffect(() => {
    getAllBrand();
  }, []);

  const getAllBrand = async () => {
    setLoading(true);
    await hostedCategoryAxios.get("/getallbrand").then((response) => {
      setBrand(response?.data);
      setBrandCount(response?.data?.length);
    });
    setLoading(false);
  };
  const deleteBrand = async (id) => {
    setLoading(true);
    await hostedCategoryAxios
      .delete(`/deleteBrand/${id}`, { headers: authHeader() })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Brand deleted successfully");
        }
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
    setLoading(false);
  };
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const displayUsers = brand
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
            {item?.name}
          </td>

          <td>{item?.isActive.toString()}</td>
          <td>
            <Box className="mc-table-action">
              <Button
                title="Edit"
                className="material-icons delete"
                onClick={() => {
                  setEditBrandPopup(true);
                  setUpdateBrandId(item?._id);
                }}
              >
                <img src="images/Edit.svg" alt="" />
              </Button>
              <Button
                title="Delete"
                className="material-icons delete"
                onClick={() => {
                  deleteBrand(item?._id);
                }}
              >
                <img src="images/Delete.svg" alt="" />
              </Button>
            </Box>
          </td>
        </Tr>
      );
    });

  const pageCount = Math.ceil(brand?.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % brand?.length;
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
                text="Add Brands"
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
                    digit={brandCount}
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
                        placeholder="Brand"
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
                        <Th>Brand</Th>
                        <Th>Active</Th>
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
            <BrandPopup
              updateBrandId={updateBrandId}
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
              closePopup={() => setOpenPopup(false)}
              title="Add new Brands  !"
            />
            <EditBrandPopup
              updateBrandId={updateBrandId}
              editBrandPopup={editBrandPopup}
              setEditBrandPopup={setEditBrandPopup}
              closePopup={() => setEditBrandPopup(false)}
              title="Edit  !"
            />
            <ToastContainer />
          </>
        )}
      </>
    </PageLayout>
  );
}
