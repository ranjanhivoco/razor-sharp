/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-sequences */
import React, { useEffect, useState } from "react";
import authHeader from "../../backendAxios/authHeader";
import { LoaderProvider } from "../../context/Preloader";
import "react-toastify/dist/ReactToastify.css";
import { hostedForumCategoryAxios } from "../../backendAxios/backendAxios";
import { ToastContainer, toast } from "react-toastify";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Box, Input, Label, Icon, Button } from "../elements";
import axios from "axios";
import PageLayout from "../../layouts/PageLayout";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../backendAxios/backendAxios";
import { TagsInput } from "react-tag-input-component";
import CloseIcon from "@mui/icons-material/Close";
import RichTextEditor from "../RichTextEditor";

const ApiUrl = "http://localhost:3000";
// const ApiUrl = "http://localhost:4001";

const users = [
  {
    userName: "JohnDoe",
    specialization: "Software Development",
    biography:
      "John is a full-stack developer with 10 years of experience in building web applications.",
  },
  {
    userName: "JaneSmith",
    specialization: "Graphic Design",
    biography:
      "Jane is a creative graphic designer with a passion for creating visually appealing designs.",
  },
  {
    userName: "MikeBrown",
    specialization: "Data Science",
    biography:
      "Mike is a data scientist who specializes in machine learning and data analysis.",
  },
  {
    userName: "AliceJohnson",
    specialization: "Digital Marketing",
    biography:
      "Alice is a digital marketer with expertise in SEO, SEM, and social media marketing.",
  },
  {
    userName: "ChrisWhite",
    specialization: "Cybersecurity",
    biography:
      "Chris is a cybersecurity expert with a focus on network security and ethical hacking.",
  },
];

export default function CardPopup(props) {
  const [loading, setLoading] = useState(false);
  const [subCategory, setSubcategory] = useState([]);
  const [othercontent, setOtherContent] = useState("");
  const [secondcontent, setSecondContent] = useState("");
  const [selected, setSelected] = useState([]);
  const [post, setPost] = useState({
    category: "",
    subcategory: "",
    question: "",
    title: "",
    // description: "",
    image: "",
    video: "",
    tagExpertCoAuthorized: false,
    userProfile: {},
  });
  const navigate = useNavigate();
  const query = useQuery();

  useEffect(() => {
    if (query.get("post_id")) {
      prefillPostData();
    }
    getSubCategory();
  }, [query.get("post_id")]);

  const handleCardCategory = (e) => {
    setPost({
      ...post,
      subcategory: e.target.value,
    });
  };
  const handleExpert = (e) => {
    setPost({ ...post, userProfile: JSON.parse(e.target.value) });
  };

  const getSubCategory = async () => {
    setLoading(true);
    const result = await hostedForumCategoryAxios.get("/subcategory-list");
    setSubcategory(result?.data);
    setLoading(false);
  };

  const handleVideo = (e) => {
    const file = e.target.files[0];
    setPost({ ...post, video: file });
  };

  const handleRemoveVideo = async () => {
    setPost({ ...post, video: "" });
  };

  const handleImage = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("img", file);

      // Send the formData to the API endpoint
      const result = await axios.post(
        "http://localhost:3000/common/url-generator",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPost({ ...post, image: result.data.url });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveImage = async () => {
    try {
      setPost({ ...post, image: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const prefillPostData = async () => {
    await hostedForumCategoryAxios
      .get(`/get-post-by-id/${query.get("post_id")}`)
      .then((response) => {
        setPost({
          ...post,
          category: response?.data?.category,
          subcategory: response?.data?.subcategory,
          question: response?.data?.question,
          title: response?.data?.title,
          // description: response?.data?.description,
          video: response?.data?.video,
          image: response?.data?.image,
          tagExpertCoAuthorized: response?.data?.tagExpertCoAuthorized,
          userProfile: response?.data?.userProfile,
        });
        setOtherContent(response.data.content1);
        setSecondContent(response.data.content2);
        setSelected(response?.data?.tags);
      });
  };

  const handleDelete = async () => {
    await hostedForumCategoryAxios.delete(
      `/deletePost/${query.get("post_id")}`,
      { headers: authHeader() }
    );
    // toast.success(` Admin ${result.data.name} is created successfully !`);
    navigate("/forum-post");
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    // setLoading(true);

    // Create FormData object and append all required fields
    const formData = new FormData();
    formData.append("category", post?.category?._id);
    formData.append("subcategory", post.subcategory._id);
    formData.append("question", post.question);
    formData.append("title", post.title);
    formData.append("image", post.image);
    formData.append("video", post.video);
    formData.append("tagExpertCoAuthorized", post.tagExpertCoAuthorized);
    selected.forEach((tag) => formData.append("tags", tag));
    formData.append("content1", othercontent);
    formData.append("content2", secondcontent);
    formData.append("userProfile[userName]", post.userProfile.userName);
    formData.append(
      "userProfile[specialization]",
      post.userProfile.specialization
    );
    formData.append("userProfile[biography]", post.userProfile.biography);

    try {
      const response = await axios({
        method: "PUT",
        url: `${ApiUrl}/forum/update-post-by-id/${query.get("post_id")}`,
        data: formData,
        headers: authHeader(),
      });

      if (response.status === 200) {
        toast.success("Post updated successfully!");
      }

      setTimeout(() => {
        window.location.reload();
      }, 2000);

      navigate("/forum-post");
    } catch (error) {
      (error);
      // Log the full error for debugging
      console.error("Error updating post:", error);

      // Handle different types of errors
      if (error.response) {
        // Server responded with a status other than 2xx
        const errorMessage = error.response.data.error;
        if (errorMessage === "Field value too long") {
          toast.error("Reduce the size of images in the description.");
        } else {
          toast.error(
            errorMessage || "An error occurred while updating the post."
          );
        }
      } else if (error.request) {
        // Request was made but no response was received
        toast.error("No response from the server. Please check your network.");
      } else {
        // Something happened while setting up the request
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <LoaderProvider />
      ) : (
        <PageLayout>
          <Row>
            <Form onSubmit={handleUpdatePost}>
              <Row className="mb-4">
                <Form.Group
                  as={Col}
                  style={{ position: "relative" }}
                  controlId="validationCustom07"
                >
                  <Form.Label className="single-product-label mt-3">
                    category
                  </Form.Label>
                  <select
                    className="singleProduct__dropdownField"
                    // onChange={handleCardCategory}
                    value={post?.category?._id}
                    disabled
                  >
                    <option value="">
                      {post?.category?.category
                        ? post?.category?.category
                        : "Select category"}
                    </option>
                    {/* {post.category?.map((e) => {
                      return (
                        <option key={e._id} value={e._id}>
                          {e?.category}
                        </option>
                      );
                    })} */}
                  </select>
                </Form.Group>

                <Form.Group
                  as={Col}
                  style={{ position: "relative" }}
                  controlId="validationCustom07"
                >
                  <Form.Label className="single-product-label mt-3">
                    Sub-Category
                  </Form.Label>
                  <select
                    className="singleProduct__dropdownField"
                    onChange={handleCardCategory}
                    value={post.subcategory._id}
                    disabled
                  >
                    <option value="">
                      {post.subcategory.subCategory
                        ? post.subcategory.subCategory
                        : "Select Subcategory"}
                    </option>
                    {subCategory?.map((e) => {
                      return (
                        <option key={e._id} value={e._id}>
                          {e?.subCategory}
                        </option>
                      );
                    })}
                  </select>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom05">
                  <Form.Label className="single-product-label">
                    Featured Image
                  </Form.Label>
                  <Box className={`mc-file-upload`}>
                    <Input type="file" id="avatar" onChange={handleImage} />

                    <Label htmlFor="avatar">
                      <Icon
                        style={{
                          position: "absolute",
                          top: "14px",
                          cursor: "pointer",
                        }}
                      >
                        {"add"}
                      </Icon>
                    </Label>
                  </Box>

                  {post.image ? (
                    <div style={{ position: "relative" }}>
                      <img
                        src={post.image}
                        alt="post-img"
                        style={{
                          height: "150px",
                          width: "150px",
                          cursor: "pointer",
                        }}
                      ></img>
                      <CloseIcon
                        onClick={handleRemoveImage}
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          top: "-12px",
                          left: "138px",
                          background: "#fed700",
                          borderRadius: "22px",
                        }}
                      ></CloseIcon>
                    </div>
                  ) : (
                    ""
                  )}
                </Form.Group>
                <Form.Group as={Col} controlId="validationCustom05">
                  <Form.Label className="single-product-label">
                    Featured Video
                  </Form.Label>
                  <Box className={`mc-file-upload`}>
                    <Input type="file" id="avatar1" onChange={handleVideo} />

                    <Label htmlFor="avatar1">
                      <Icon
                        style={{
                          position: "absolute",
                          top: "14px",
                          cursor: "pointer",
                        }}
                      >
                        {"add"}
                      </Icon>
                    </Label>
                  </Box>

                  {post.video ? (
                    <div style={{ position: "relative" }}>
                      <img
                        src="/images/video.svg"
                        alt="video-icon"
                        style={{
                          height: "80px",
                          marginLeft: "10px",
                          border: "2px solid #d3d3c3",
                          background: "#f3f3f3",
                          padding: "10px",
                          borderRadius: "6px",
                        }}
                      ></img>
                      <CloseIcon
                        onClick={handleRemoveVideo}
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          top: "-8px",
                          left: "78px",
                          background: "#fed700",
                          borderRadius: "22px",
                          height: "20px",
                          width: "20px",
                        }}
                      ></CloseIcon>
                    </div>
                  ) : (
                    ""
                  )}
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  style={{ position: "relative" }}
                  controlId="validationCustom07"
                >
                  <Form.Label className="single-product-label mt-3">
                    Expert
                  </Form.Label>
                  <select
                    className="singleProduct__dropdownField"
                    onChange={handleExpert}
                  >
                    <option value="">
                      {post.userProfile.userName
                        ? post.userProfile.userName
                        : "Select Expert"}
                    </option>
                    {users?.map((e) => {
                      return (
                        <option
                          key={e.id}
                          value={JSON.stringify({
                            userName: e.userName,
                            specialization: e.specialization,
                            biography: e.biography,
                          })}
                        >
                          {e?.userName}
                        </option>
                      );
                    })}
                  </select>
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="validationCustom03"
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    gap: "20px",
                    alignItems: "center",
                  }}
                >
                  <Form.Label className="single-product-label">
                    Expert co-authorized
                  </Form.Label>
                  <input
                    type="checkbox"
                    value="yes"
                    Label="Expert"
                    onChange={() =>
                      setPost({
                        ...post,
                        tagExpertCoAuthorized: !post.tagExpertCoAuthorized,
                      })
                    }
                    checked={post.tagExpertCoAuthorized}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="validationCustom03">
                  <Form.Label className="single-product-label">Tags</Form.Label>
                  <TagsInput
                    value={selected}
                    onChange={(newTag) => {
                      setSelected(newTag);
                    }}
                    name="sub-category"
                    placeHolder="Enter Brand name"
                  />
                </Form.Group>
              </Row>
              <Form.Group as={Col} controlId="validationCustom03">
                <Form.Label className="single-product-label">
                  Question
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  autoComplete="off"
                  placeholder="Enter Question"
                  draggable="true"
                  value={post.question}
                  onChange={(e) =>
                    setPost({ ...post, question: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group as={Col} controlId="validationCustom03">
                <Form.Label className="single-product-label">Title</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="Enter title"
                  draggable="true"
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom03">
                  <Form.Label className="single-product-label">
                    Content
                  </Form.Label>
                  <RichTextEditor
                    value={othercontent || ""}
                    onChange={(e) => setOtherContent(e)}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom03">
                  <Form.Label className="single-product-label">
                    References
                  </Form.Label>
                  <RichTextEditor
                    value={secondcontent}
                    onChange={(e) => setSecondContent(e)}
                  />
                </Form.Group>
              </Row>

              {/* <Row className="">
                {" "}
                <Form.Group as={Col} controlId="validationCustom03">
                  <Form.Label className="single-product-label">
                    Reference
                  </Form.Label>
                  <textarea
                    autoComplete="off"
                    type="text"
                    placeholder="Enter Reference links"
                    draggable="true"
                    className="faq__descriptionField"
                    value={post.description}
                    onChange={(e) =>
                      setPost({ ...post, description: e.target.value })
                    }
                  />
                </Form.Group>
              </Row> */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "60px",
                }}
              >
                <button
                  variant="primary"
                  type="submit"
                  className="btn btn-outline-warning btn-md text-black"
                  style={{ marginLeft: "30%", width: "40%" }}
                >
                  Submit
                </button>
                <Button
                  type="button"
                  onClick={handleDelete}
                  className="btn btn-danger"
                >
                  yes, delete
                </Button>
              </div>
              <ToastContainer />
            </Form>
          </Row>
        </PageLayout>
      )}
    </>
  );
}
