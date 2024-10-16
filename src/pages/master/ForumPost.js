import React, { useState, useEffect } from "react";
import PageLayout from "../../layouts/PageLayout";
import { Box, Button, Image } from "../../components/elements";
import { LoaderProvider } from "../../context/Preloader";
import { hostedForumCategoryAxios } from "../../backendAxios/backendAxios";
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
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
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
  const [post, setPost] = useState([]);
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [action, setAction] = useState(false);
  const [subCategory, setSubcategory] = useState();
  const [subCatgeoryId, setSubcategoryId] = useState();

  useEffect(() => {
    getAllPosts();
    getSubCategory();
  }, [action, subCatgeoryId]);
  const [itemOffset, setItemOffset] = useState(0);

  const getAllPosts = async (pg = 1, lim = 20) => {
    const result = await hostedForumCategoryAxios.get(
      `/get-all-post?subcategory=${
        subCatgeoryId ? subCatgeoryId : ""
      }&page=${pg}&limit=${lim}`,
      {
        headers: authHeader(),
      }
    );
    setPost(result?.data);
    setAction(false);
  };

  const getSubCategory = async () => {
    setLoading(true);
    const result = await hostedForumCategoryAxios.get("/subcategory-list");
    setSubcategory(result?.data);
    setLoading(false);
  };

  const handleOptionChange = (e) => {
    setSubcategoryId(e.target.value);
  };

  const handlePostStatus = async (id) => {
    await hostedForumCategoryAxios.post(`/toggle-post-status/${id}`, {
      headers: authHeader(),
    });
    toast.success(`Post updated successfully`);
    setInterval(() => {
      window.location.reload();
    }, 2000);
  };

  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const displayUsers = post
    .filter((data) => data?.question.toLowerCase().includes(query))
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
          <td>{item?.subcategory?.subCategory}</td>
          <td>{item?.question}</td>
          <td>{item?.title}</td>
          <td>{item?.tagExpertCoAuthorized ? "Yes" : "No"}</td>
          <td>{moment(item?.createdAt).format("LL")}</td>
          <td>
            <Box className="mc-table-action">
              <Button
                title="Edit"
                className="material-icons edit"
                onClick={() => {
                  navigate(`/edit-post?post_id=${item._id}`);
                }}
              >
                <img src="images/Edit.svg" alt="" />
              </Button>
              <Button
                title="Enable/Disable"
                className="material-icons view"
                onClick={() => handlePostStatus(item._id)}
              >
                {item?.isActive ? (
                  <ToggleOnIcon style={{ color: "#000" }} />
                ) : (
                  <ToggleOffIcon style={{ color: "#85818b" }} />
                )}
              </Button>
              {/* <Button
                title="Enable/Disable"
                className="material-icons delete"
                onClick={() => {
                  // handleDeleteBlog(item._id);
                }}
              >
                <img src="images/Delete.svg" alt="" />
              </Button> */}
            </Box>
          </td>
        </Tr>
      );
    });

  const pageCount = Math.ceil(post?.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % post?.length;
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
                text="create post"
                className="btn btn-outline-warning btn-sm text-black"
                onClick={() => {
                  navigate("/add-post");
                }}
              />
            </Box>
            <Col xl={12}>
              <CardLayout>
                <Breadcrumb title={"posts"}>
                  {data?.breadcrumb?.map((item, index) => (
                    <li key={index} className="mc-breadcrumb-item">
                      {item.path ? (
                        <Anchor className="mc-breadcrumb-link" href={item.path}>
                          {item.text}
                        </Anchor>
                      ) : (
                        "Posts"
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
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "10px",
                  }}
                >
                  <div className="mc-label-field-group label-col">
                    <label className="mc-label-field-title">search by</label>
                    <div className="input-search-field">
                      <Input
                        type="search"
                        placeholder="Question"
                        onChange={(e) => setQuery(e.target.value)}
                        className="admin-search-field"
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "20%",
                      gap: "8px",
                    }}
                  >
                    <label className="mc-label-field-title">Filter by</label>
                    <select
                      className="seller__dropdownField"
                      style={{ background: "#f2f2f2", height: "34px" }}
                      onChange={handleOptionChange}
                      value={subCatgeoryId}
                    >
                      <option value="">select subcategory</option>
                      {subCategory?.map((subcategory, key) => {
                        return (
                          <option key={key} value={subcategory._id}>
                            {subcategory?.subCategory}
                          </option>
                        );
                      })}
                    </select>
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

                        <Th>SubCategory</Th>
                        <Th>Question</Th>
                        <Th>Title</Th>
                        <Th>Expert Authorized</Th>
                        <Th>Cretaed At</Th>
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
            <ToastContainer />
          </>
        )}
      </>
    </PageLayout>
  );
}
