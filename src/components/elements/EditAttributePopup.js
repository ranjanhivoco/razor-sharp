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
  const [name, setName] = useState([]);
  const [attribute, setAttribute] = useState({
    subcategory: "",
  });
  const { openAttributePopup, closePopup, updateAttributeId } = props;

  useEffect(() => {
    if (updateAttributeId) {
      prefillAttributeData();
    }
  }, [updateAttributeId]);

  const prefillAttributeData = async () => {
    const result = await hostedCategoryAxios(
      `/getattributesbyid/${updateAttributeId}`
    );
    setAttribute({
      ...attribute,
      subcategory: result?.data?.subcategory?.subCategory,
    });
    setName(result?.data?.name);
    setSelected(result?.data?.values);
  };

  const handleUpdateAttribute = async (e) => {
    e.preventDefault();
    if (selected.length === 0) {
      toast.error("Please enter at least one Attribute.");
      return;
    } else {
      await hostedCategoryAxios
        .put(
          `/updateattributes/${updateAttributeId}`,
          { name, values: selected },
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

  return (
    <>
      {loading ? (
        <LoaderProvider />
      ) : (
        <Dialog open={openAttributePopup} onClose={closePopup} fullWidth={true}>
          <DialogTitle className="formPopup__header">{props.title}</DialogTitle>
          <CloseIcon className="formPopup__crossBtn" onClick={closePopup} />
          <DialogContent>
            <Form validated={validated} onSubmit={handleUpdateAttribute}>
              <Row style={{ marginBottom: "20px" }}>
                <Form.Group
                  style={{ position: "relative" }}
                  controlId="validationCustom07"
                >
                  <Form.Label className="single-product-label">
                    Product SubCategory
                  </Form.Label>
                  <Form.Control
                    type="text"
                    autoComplete="off"
                    draggable="true"
                    className="disbaled_field"
                    disabled
                    value={attribute.subcategory}
                  />
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
