/* eslint-disable no-sequences */
import React, { useState } from "react";
import { hostedCategoryAxios } from "../../backendAxios/backendAxios";
import authHeader from "../../backendAxios/authHeader";
import { LoaderProvider } from "../../context/Preloader";
import "react-tagsinput/react-tagsinput.css";
import "react-toastify/dist/ReactToastify.css";
import { TagsInput } from "react-tag-input-component";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useEffect } from "react";

export default function Popup(props) {
  const [loading, setLoading] = useState(false);
  const [validated] = useState(false);
  const [selected, setSelected] = useState([]);
  const [subCategoryArray, setSubCategoryArray] = useState([]);
  const [attribute, setAttribute] = useState({
    name: "",
    subcategory: "",
  });

  useEffect(() => {
    getSubCategory();
  }, []);

  const getSubCategory = async () => {
    const result = await hostedCategoryAxios.get("getsubcategorylist");
    setSubCategoryArray(result.data);
  };

  const handleProductCategory = async (e) => {
    setAttribute({ ...attribute, subcategory: e.target.value });
  };

  const handleCreateAttribute = async (e) => {
    e.preventDefault();
    if (selected.length === 0) {
      toast.error("Please enter at least one Attribute.");
      return;
    } else {
      await hostedCategoryAxios
        .post(
          "/attributes",
          { ...attribute, values: selected },
          {
            headers: authHeader(),
          }
        )
        .then((response) => {
          if (response.status === 200) {
            toast.success("Attribute saved successfully");
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        });
    }
  };

  const { openPopup, closePopup } = props;

  return (
    <>
      {loading ? (
        <LoaderProvider />
      ) : (
        <Dialog open={openPopup} onClose={closePopup} fullWidth={true}>
          <DialogTitle className="formPopup__header">{props.title}</DialogTitle>
          <CloseIcon className="formPopup__crossBtn" onClick={closePopup} />
          <DialogContent>
            <Form validated={validated} onSubmit={handleCreateAttribute}>
              <Row style={{ marginBottom: "20px" }}>
                <Form.Group
                  style={{ position: "relative" }}
                  controlId="validationCustom07"
                >
                  <Form.Label className="single-product-label">
                    Product Sub-Category
                  </Form.Label>
                  <select
                    className="singleProduct__dropdownField"
                    onChange={handleProductCategory}
                    required
                  >
                    <option
                      className="field__optionDropdown"
                      style={{ fontSize: "12px" }}
                      value={attribute.category}
                    >
                      Select Product Sub-Category
                    </option>

                    {subCategoryArray?.map((e) => {
                      return (
                        <option key={e} id={e} value={e._id}>
                          {e.subCategory}
                        </option>
                      );
                    })}
                  </select>
                </Form.Group>
              </Row>

              <Row style={{ marginBottom: "20px" }}>
                <Form.Group as={Col}>
                  <Form.Label>Attribute</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="type"
                    placeholder="Enter Attribute type"
                    draggable="true"
                    value={attribute.name}
                    onChange={(e) =>
                      setAttribute({ ...attribute, name: e.target.value })
                    }
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>
                    Child category&nbsp;
                    <span
                      style={{
                        color: "#8f8c8c",
                        fontWeight: "600",
                        fontSize: "10px",
                      }}
                    >
                      (select multiple value)
                    </span>
                  </Form.Label>
                  <TagsInput
                    value={selected}
                    onChange={setSelected}
                    name="Attribute value"
                    placeHolder="Enter Attribute Value"
                  />
                </Form.Group>
              </Row>
              <button
                variant="primary"
                type="submit"
                className="mt-4 btn btn-outline-warning btn-md text-black"
                style={{ marginLeft: "30%", width: "40%" }}
              >
                Create
              </button>
              <ToastContainer />
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
