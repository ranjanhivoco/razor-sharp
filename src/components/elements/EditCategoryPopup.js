/* eslint-disable array-callback-return */
/* eslint-disable no-sequences */
import React, { useState, useEffect } from "react";
import { hostedCategoryAxios } from "../../backendAxios/backendAxios";
import "react-toastify/dist/ReactToastify.css";
import authHeader from "../../backendAxios/authHeader";
import { LoaderProvider } from "../../context/Preloader";
import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { TagsInput } from "react-tag-input-component";

export default function Popup(props) {
  const [loading, setLoading] = useState(false);
  const [validated] = useState(false);
  const [category, setCategory] = useState([]);
  // const [subCategory, setSubCategory]= useState([]);
  const [selected, setSelected] = useState([]);
  const { editCategoryPopup, closePopup, updateCategoryId } = props;

  useEffect(() => {
    if (updateCategoryId) {
      prefillCategoryData();
      prefillSubCategoryData();
    }
  }, [updateCategoryId]);

  const prefillCategoryData = async () => {
    const result = await hostedCategoryAxios.get(
      `/getCategoryById/${updateCategoryId}`,
      {
        headers: authHeader(),
      }
    );
    setCategory(result?.data?.category);
  };

  const prefillSubCategoryData = async () => {
    const result = await hostedCategoryAxios.get(
      `/getSubCategoryBycategoryId/${updateCategoryId}`,
      {
        headers: authHeader(),
      }
    );
    setSelected(result?.data?.map((subCategory) => subCategory?.subCategory));
  };

  const updateCategory = async (e) => {
    const result =
      (await hostedCategoryAxios.put(
        `/updatecategory/${updateCategoryId}`,
        { category: category },
        {
          headers: authHeader(),
        }
      )) /
      // .then((response) => {if(response.status === 200) {
      //   closePopup();
      // toast.success(
      //   `category is updated successfully !`
      // );
      // setInterval(() => {
      //   window.location.reload();
      // }, 2000);
      // }})
      toast.success(`category is updated successfully !`);
    setInterval(() => {
      window.location.reload();
    }, 2000);
    return result;
  };

  // const handleCreateSubCategory = async (e) => {
  //   let result = await updateCategory();

  //   await hostedCategoryAxios.post(
  //     "/subcategoryarray",
  //     {
  //       categoryId: result?.data?._id,
  //       subCategoryName: selected,
  //     },
  //     {
  //       headers: authHeader(),
  //     }
  //   );

  //   toast.success(`${result.data.category} is updated successfully !`);
  //   setInterval(() => {
  //     window.location.reload();
  //   }, 2000);
  // };

  const updateFazterCategory = async (e) => {
    e.preventDefault();
    await updateCategory();
  };

  return (
    <>
      {loading ? (
        <LoaderProvider />
      ) : (
        <Dialog open={editCategoryPopup} onClose={closePopup} fullWidth={true}>
          <DialogTitle className="formPopup__header">{props.title}</DialogTitle>
          <CloseIcon className="formPopup__crossBtn" onClick={closePopup} />
          <DialogContent>
            <Form validated={validated} onSubmit={updateFazterCategory}>
              <Row style={{ marginBottom: "20px" }}>
                <Form.Group as={Col}>
                  <Form.Label>Category </Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="name"
                    placeholder="Enter category name"
                    draggable="true"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </Form.Group>
              </Row>
              {/* <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Sub-Category</Form.Label>

                  <TagsInput
                    value={selected}
                    onChange={setSelected}
                    name="sub-category"
                    placeHolder="Enter Sub-category"
                  />
                </Form.Group>
              </Row> */}

              <button
                variant="primary"
                type="submit"
                className="mt-4 btn btn-outline-warning btn-md text-black"
                style={{ marginLeft: "30%", width: "40%" }}
              >
                Update
              </button>
              <ToastContainer />
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
