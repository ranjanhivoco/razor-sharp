/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-sequences */
import React, { useEffect, useMemo, useState } from "react";
import authHeader from "../../backendAxios/authHeader";
import { LoaderProvider } from "../../context/Preloader";
import "react-toastify/dist/ReactToastify.css";
import { hostedForumCategoryAxios } from "../../backendAxios/backendAxios";
import { ToastContainer, toast } from "react-toastify";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Box, Input, Label, Icon } from "../elements";
import axios from "axios";
import PageLayout from "../../layouts/PageLayout";
import { useNavigate } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";
import CloseIcon from "@mui/icons-material/Close";
import RichTextEditor from "../RichTextEditor";

const ApiUrl = "http://localhost:3000";
// const ApiUrl = "http://localhost:4001";

const users = [
  {
    userName: "John Doe",
    specialization: "Software Development",
    biography:
      "John is a full-stack developer with 10 years of experience in building web applications.",
  },
  {
    userName: "Jane Smith",
    specialization: "Graphic Design",
    biography:
      "Jane is a creative graphic designer with a passion for creating visually appealing designs.",
  },
  {
    userName: "Mike Brown",
    specialization: "Data Science",
    biography:
      "Mike is a data scientist who specializes in machine learning and data analysis.",
  },
  {
    userName: "Alice Johnson",
    specialization: "Digital Marketing",
    biography:
      "Alice is a digital marketer with expertise in SEO, SEM, and social media marketing.",
  },
  {
    userName: "Chris White",
    specialization: "Cybersecurity",
    biography:
      "Chris is a cybersecurity expert with a focus on network security and ethical hacking.",
  },
];

export default function CardPopup(_props) {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
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

  useEffect(() => {
    if (post.category) {
      getSubCategory();
    }
    getCategory();
  }, [post.category]);

  const handleCardCategory = (e) => {
    setPost({
      ...post,
      category: e.target.value,
    });
  };

  const handleCardSubCategory = (e) => {
    setPost({
      ...post,
      subcategory: e.target.value,
    });
  };

  const handleExpert = (e) => {
    setPost({ ...post, userProfile: JSON.parse(e.target.value) });
  };

  const getCategory = async () => {
    setLoading(true);
    const result = await hostedForumCategoryAxios.get("/get-all-categories");
    setCategory(result?.data);
    setLoading(false);
  };

  const getSubCategory = async () => {
    setLoading(true);
    const result = await hostedForumCategoryAxios.get(
      `/subcategory-by-categoryId/${post?.category}`
    );
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
  const handleCreateCard = async (e) => {
    e.preventDefault();
    // setLoading(true);
    var formData = new FormData();
    formData.append("category", post.category);
    formData.append("subcategory", post.subcategory);
    formData.append("question", post.question);
    formData.append("title", post.title);
    // formData.append("description", post.description);
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

    await axios({
      method: "POST",
      url: `${ApiUrl}/forum/add-post`,
      data: formData,
      dataType: "jsonp",
      headers: authHeader(),
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("post added");
        }
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        navigate("/forum-post");
      })
      .catch((response) => {
        if (response.response.data.error === "Field value too long") {
          toast.error("Reduce the size of images in description");
        } else toast.error(response.response.data.error);
      });

    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <LoaderProvider />
      ) : (
        <PageLayout>
          <Row>
            <Form onSubmit={handleCreateCard}>
              <Row className="mb-4">
                <Form.Group
                  as={Col}
                  style={{ position: "relative" }}
                  controlId="validationCustom07"
                >
                  <Form.Label className="single-product-label mt-3">
                    Category
                  </Form.Label>
                  <select
                    className="singleProduct__dropdownField"
                    onChange={handleCardCategory}
                    value={post.category}
                  >
                    <option value="">Select category</option>
                    {category?.map((e) => {
                      return (
                        <option key={e._id} value={e._id}>
                          {e?.category}
                        </option>
                      );
                    })}
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
                    onChange={handleCardSubCategory}
                    value={post.subcategory}
                  >
                    <option value="">Select subcategory</option>
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
                        style={{ height: "150px", width: "150px" }}
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
                    Video
                  </Form.Label>
                  <Box className={`mc-file-upload`}>
                    <Input type="file" id="avatar-" onChange={handleVideo} />

                    <Label htmlFor="avatar-">
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
                    <div
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <img
                        src="/images/video.svg"
                        alt="video-icon"
                        style={{
                          height: "80px",
                          border: "2px solid #d3d3c3",
                          background: "#f3f3f3",
                          padding: "10px",
                          borderRadius: "6px",
                        }}
                      />
                      <CloseIcon
                        onClick={handleRemoveVideo}
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          top: "0",
                          right: "-10px", // Adjust the position as needed
                          background: "#fed700",
                          borderRadius: "50%",
                          height: "20px",
                          width: "20px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      />
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
                    <option value="">Select Expert</option>
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
                    alignItems: "center",
                  }}
                >
                  <Form.Label className="single-product-label">
                    Expert co-authorized
                  </Form.Label>
                  <input
                    type="checkbox"
                    name="C"
                    value="yes"
                    Label="Expert"
                    style={{ marginTop: "10px" }}
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
                    References
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
              <button
                variant="primary"
                type="submit"
                className="mt-4 btn btn-outline-warning btn-md text-black"
                style={{ marginLeft: "30%", width: "40%" }}
              >
                Submit
              </button>
              <ToastContainer />
            </Form>
          </Row>
        </PageLayout>
      )}
    </>
  );
}
