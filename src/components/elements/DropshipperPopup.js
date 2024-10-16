/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-sequences */
import React, { useState, useEffect } from "react";
import {
  hostedCategoryAxios,
  hostedProductAxios,
} from "../../backendAxios/backendAxios";
import authHeader from "../../backendAxios/authHeader";
import { LoaderProvider } from "../../context/Preloader";
import "react-toastify/dist/ReactToastify.css";
import showPwdImg from "../../show-password.svg";
import hidePwdImg from "../../hide-password.svg";
import { ToastContainer, toast } from "react-toastify";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Multiselect } from "multiselect-react-dropdown";

export default function Popup(props) {
  const [loading, setLoading] = useState(false);
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [popup, setPopup] = useState({
    dropShiperName: "",
    email: "",
    phoneNumber: "",
    password: "",
    primaryKey: "",
    csvCategoryFeild: "",
    title: "",
    price: "",
    stock: "",
    markupPercentage: "",
    weight: "",
    fixedAmount: "",
    upcCode: "",
    cats: "",
  });
  const [selected, setSelected] = useState([]);

  const { openPopup, closePopup } = props;

  const handleCreateDropshipper = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await hostedProductAxios.post(
      "/adddropshiper",
      { ...popup, cats: selected },
      {
        headers: authHeader(),
      }
    );
    setLoading(false);
    closePopup();
    toast.success(`${result?.data?.dropshiperName} is created successfully !`);
    setInterval(() => {
      window.location.reload();
    }, 2000);
  };

  // useEffect(() => {
  //   getCsvCategory();
  // }, []);

  // const getCsvCategory = async () => {
  //   const result = await hostedCategoryAxios.get(`/find-all-subcategory`);
  //   setPopup({ ...popup, cats: result?.data });
  // };

  const handleMultiSelectChange = (e) => {
    setSelected(e);
  };

  return (
    <>
      {loading ? (
        <LoaderProvider />
      ) : (
        <Dialog open={openPopup} onClose={closePopup} fullWidth={true}>
          <DialogTitle
           className="formPopup__header"
          >
            {props.title}
          </DialogTitle>
          <CloseIcon
            className="formPopup__crossBtn"
            onClick={closePopup}
          />
          <DialogContent>
            <Form onSubmit={handleCreateDropshipper}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom01">
                  <Form.Label >
                    Dropshipper Name
                  </Form.Label>
                  <Form.Control
                    // required
                    autoComplete="off"
                    type="text"
                    placeholder="Enter seller name"
                    draggable="true"
                    value={popup.dropshipperName}
                    onChange={(e) =>
                      setPopup({ ...popup, dropShiperName: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="validationCustom02">
                  <Form.Label >Email</Form.Label>
                  <Form.Control
                    // required
                    autoComplete="off"
                    type="text"
                    placeholder="Enter seller email"
                    draggable="true"
                    value={popup.email}
                    onChange={(e) =>
                      setPopup({ ...popup, email: e.target.value })
                    }
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom03">
                  <Form.Label >
                    Phone Number
                  </Form.Label>
                  <Form.Control
                    // required
                    autoComplete="off"
                    type="number"
                    placeholder="Enter seller number"
                    draggable="true"
                    value={popup.phoneNumber}
                    onChange={(e) =>
                      setPopup({ ...popup, phoneNumber: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="validationCustom04" style={{position: "relative"}}>
                  <Form.Label >Password</Form.Label>
                  <Form.Control
                    // required
                    autoComplete="off"
                    type={isRevealPwd ? "text" : "password"}
                    placeholder="Enter dropshipper password"
                    draggable="true"
                    value={popup.password}
                    onChange={(e) =>
                      setPopup({ ...popup, password: e.target.value })
                    }
                  />
                   <img
                    style={{
                      cursor: "pointer",
                      width: "20px",
                      position: "absolute",
                      right: "20px",
                      top: "42px",
                    }}
                    alt="img"
                    className="hideAndShow"
                    title={isRevealPwd ? "Hide password" : "Show password"}
                    src={isRevealPwd ? hidePwdImg : showPwdImg}
                    onClick={() => setIsRevealPwd((prevState) => !prevState)}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom05">
                  <Form.Label >
                    Primary Key
                  </Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    placeholder="Enter primary key"
                    draggable="true"
                    value={popup.primaryKey}
                    onChange={(e) =>
                      setPopup({ ...popup, primaryKey: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="validationCustom06">
                  <Form.Label >
                    CSV category field
                  </Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    placeholder="Enter category field name"
                    draggable="true"
                    value={popup.csvCategoryField}
                    onChange={(e) =>
                      setPopup({ ...popup, csvCategoryFeild: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  style={{ position: "relative" }}
                  controlId="validationCustom07"
                >
                  <Form.Label >Title</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    autoComplete="off"
                    placeholder="Enter title"
                    draggable="true"
                    value={popup.title}
                    onChange={(e) =>
                      setPopup({ ...popup, title: e.target.value })
                    }
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom08">
                  <Form.Label >Price</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    autoComplete="off"
                    placeholder="Enter the price"
                    draggable="true"
                    value={popup.price}
                    onChange={(e) =>
                      setPopup({ ...popup, price: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="validationCustom09">
                  <Form.Label >Stock</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    autoComplete="off"
                    placeholder="Enter the stock"
                    draggable="true"
                    value={popup.stock}
                    onChange={(e) =>
                      setPopup({ ...popup, stock: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="validationCustom10">
                  <Form.Label >Weight</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    autoComplete="off"
                    placeholder="Enter product weight"
                    draggable="true"
                    value={popup.weight}
                    onChange={(e) =>
                      setPopup({ ...popup, weight: e.target.value })
                    }
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="validationCustom11">
                  <Form.Label >UPC code</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    autoComplete="off"
                    placeholder="Enter Upc code"
                    draggable="true"
                    value={popup.upcCode}
                    onChange={(e) =>
                      setPopup({ ...popup, upcCode: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="validationCustom12">
                  <Form.Label >
                    Markup percentage
                  </Form.Label>
                  <Form.Control
                    required
                    type="number"
                    autoComplete="off"
                    placeholder="Enter markup percentage"
                    draggable="true"
                    value={popup.markupPercentage}
                    onChange={(e) =>
                      setPopup({ ...popup, markupPercentage: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="validationCustom13">
                  <Form.Label >
                    Fixed amount
                  </Form.Label>
                  <Form.Control
                    required
                    type="number"
                    autoComplete="off"
                    placeholder="Enter fixed amount"
                    draggable="true"
                    value={popup.fixedAmount}
                    onChange={(e) =>
                      setPopup({ ...popup, fixedAmount: e.target.value })
                    }
                  />
                </Form.Group>
              </Row>
              <Row className="mt-1 mb-4">
                <Form.Group as={Col}>
                  <Form.Label >Category</Form.Label>
                  <Multiselect
                   
                    placeholder="Select Category For Seller"
                    options={popup.cats}
                    isObject={false}
                    value={selected}
                    onSelect={handleMultiSelectChange}
                  />
                </Form.Group>
              </Row>
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
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
