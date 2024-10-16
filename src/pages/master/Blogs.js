import React, { useState, useEffect } from "react";
import PageLayout from "../../layouts/PageLayout";
import { Box, Button, Image } from "../../components/elements";
import { LoaderProvider } from "../../context/Preloader";
import { hostedPagesAxios } from "../../backendAxios/backendAxios";
import authHeader from "../../backendAxios/authHeader";
import { CardLayout } from "../../components/cards";
import { Text, Input } from "../../components/elements";
import { Breadcrumb } from "../../components";
import Anchor from "../../components/elements/Anchor";
import data from "../../data/master/blogs.json";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Col } from "react-bootstrap";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import {
  Tr,
  Td,
  Th,
  Thead,
  Tbody,
  Table,
} from "../../components/elements/Table";

export default function Admin({ icon, text, Editor }) {
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [action, setAction] = useState(false);
  
  useEffect(() => {
    getAllBlogs();
  }, [action]);
  const [itemOffset, setItemOffset] = useState(0);

  const getAllBlogs = async () => {
    const result = await hostedPagesAxios.get("/blog/getallbycategory", {
      headers: authHeader(),
    });
    setBlog(result?.data?.blogs);
    setAction(false);
  };

  const handleDeleteBlog = async (id) => {
    await hostedPagesAxios.delete(`/blog/delete/${id}`, {
      headers: authHeader(),
    });
    toast.success(`Blog Deleted successfully`);
    setInterval(() => {
      window.location.reload();
    }, 2000);
  };

  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const displayUsers = blog
    // .filter((data) => data?.category?.category?.toLowerCase().includes(query))
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
          <td>
            <Image
              style={{
                display: "flex",
                margin: "auto",
                width: "35px",
                height: "35px",
              }}
              src={`${item?.blogimage}`}
              alt={item.alt}
            />
          </td>
          <td>{item?.title}</td>
          <td>{item?.category?.category}</td>
          <td>{moment(item?.createdAt).format("LL")}</td>
          <td>
            <Box className="mc-table-action">
              <Button
                title="Edit"
                className="material-icons edit"
                onClick={() => {
                  navigate(`/edit-blog?blog_id=${item._id}`);
                }}
              >
                <img src="images/Edit.svg" alt="" />
              </Button>
              <Button
                title="Enable/Disable"
                className="material-icons delete"
                onClick={() => {
                  handleDeleteBlog(item._id);
                }}
              >
                <img src="images/Delete.svg" alt="" />
              </Button>
            </Box>
          </td>
        </Tr>
      );
    });

  const pageCount = Math.ceil(blog?.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % blog?.length;
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
            <Box style={{ textAlign: "right" }}>
              <Button
                type="button"
                text="create blog"
                className="btn btn-outline-warning btn-sm text-black"
                onClick={() => {
                  navigate("/add-blog");
                }}
              />
            </Box>
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
                        placeholder="category"
                        onChange={(e) => setQuery(e.target.value)}
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

                        <Th>Featured Image</Th>
                        <Th>Title</Th>
                        <Th>Category</Th>
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
            </Box>
            {/* <AddBlogPopup
              updateBlogId={updateBlogId}
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
              closePopup={() => setOpenPopup(false)}
              Editor={Editor}
              title="Add new seller !"
            /> */}
            {/* <EditBlogPopup
              updateBlogId={updateBlogId}
              editBlogPopup={editBlogPopup}
              setEditBlogPopup={setEditBlogPopup}
              closePopup={() => setEditBlogPopup(false)}
              Editor={Editor}
              title="Edit !"
            /> */}
            <ToastContainer />
          </>
        )}
      </>
    </PageLayout>
  );
}
