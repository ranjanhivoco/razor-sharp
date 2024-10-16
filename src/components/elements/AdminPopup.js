/* eslint-disable no-sequences */
import React, { useState } from "react";
import { hostedAuthAxios } from "../../backendAxios/backendAxios";
import authHeader from "../../backendAxios/authHeader";
import { LoaderProvider } from "../../context/Preloader";
import "react-toastify/dist/ReactToastify.css";
import showPwdImg from "../../show-password.svg";
import hidePwdImg from "../../hide-password.svg";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";


export default function Popup(props) {
  const [loading, setLoading] = useState(false);
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [validated] = useState(false);
  const [popup, setPopup] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    permission: [],
  });
  const [inventory, setInventory] = useState({
    name: "",
    isRead: false,
    isWrite: false,
    isEdit: false,
  });
  const [userManager, setUserManger] = useState({
    name: "",
    isRead: false,
    isWrite: false,
    isEdit: false,
  });
  const [orderManager, setOrderManager] = useState({
    name: "",
    isRead: false,
    isWrite: false,
    isEdit: false,
  });
  const [categoryManager, setCategoryManager] = useState({
    name: "",
    isRead: false,
    isWrite: false,
    isEdit: false,
  });
  const [reportManager, setReportManager] = useState({
    name: "",
    isRead: false,
    isWrite: false,
    isEdit: false,
  });
  const [couponManager, setCouponManager] = useState({
    name: "",
    isRead: false,
    isWrite: false,
    isEdit: false,
  });
  const { openPopup, closePopup } = props;
  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (inventory.name) {
      popup.permission.push(inventory);
    }
    if (userManager.name) {
      popup.permission.push(userManager);
    }
    if (orderManager.name) {
      popup.permission.push(orderManager);
    }
    if (categoryManager.name) {
      popup.permission.push(categoryManager);
    }
    if (reportManager.name) {
      popup.permission.push(reportManager);
    }
    if (couponManager.name) {
      popup.permission.push(couponManager);
    }

    const result = await hostedAuthAxios.post("/admincreate", popup, {
      headers: authHeader(),
    });
    setLoading(false);
    closePopup();
    toast.success(` Admin ${result.data.name} is created successfully !`);
    setInterval(() => {
      window.location.reload();
    }, 2000)
    
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
            <Form validated={validated} onSubmit={handleCreateAdmin}>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  className=""
                  controlId="validationCustom03"
                >
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="name"
                    placeholder="Enter admin name"
                    draggable="true"
                    value={popup.name}
                    onChange={(e) =>
                      setPopup({ ...popup, name: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="validationCustom04">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="email"
                    placeholder="Enter admin email"
                    value={popup.email}
                    onChange={(e) =>
                      setPopup({ ...popup, email: e.target.value })
                    }
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  className="mt-3"
                  controlId="formGridNumber"
                >
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    placeholder="Enter admin number"
                    value={popup.phone}
                    onChange={(e) =>
                      setPopup({ ...popup, mobileNumber: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  style={{ position: "relative" }}
                  className="mt-3"
                  controlId="formGridPassword"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type={isRevealPwd ? "text" : "password"}
                    autoComplete="off"
                    placeholder="Enter admin password"
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
                      right: "22px",
                      top: "40px",
                    }}
                    alt="img"
                    className="hideAndShow"
                    title={isRevealPwd ? "Hide password" : "Show password"}
                    src={isRevealPwd ? hidePwdImg : showPwdImg}
                    onClick={() => setIsRevealPwd((prevState) => !prevState)}
                  />
                </Form.Group>
              </Row>

              <Row className="mt-5">
                <Form.Group
                  as={Col}
                  className="mt-3 d-flex justify-content-between"
                >
                  <Form.Label>PERMISSIONS</Form.Label>
                  <Form.Label>Read</Form.Label>
                  <Form.Label>Write</Form.Label>
                  <Form.Label>Edit</Form.Label>
                </Form.Group>
              </Row>
              <Col>
                <Form.Group as={Col} className="d-flex justify-content-between">
                  <Form.Check
                    type="checkbox"
                    label="Inventory"
                    checked={inventory?.name}
                    value="inventoryManager"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setInventory({
                          name: e.target.value,
                          isRead: true,
                          isWrite: true,
                          isEdit: true,
                        
                        });
                      } else {
                        setInventory({
                          name: popup.permission.pop(inventory),
                          isRead: false,
                          isWrite: false,
                          isEdit: false,
                          
                        });
                      }
                    }}
                  />
                  <Form.Check
                    type="checkbox"
                    checked={inventory?.isRead}
                    onChange={(e) => {
                      setInventory({ ...inventory, isRead: e.target.checked });
                    }}
                  />
                  <Form.Check
                    type="checkbox"
                    checked={inventory?.isWrite}
                    onChange={(e) => {
                      setInventory({ ...inventory, isWrite: e.target.checked });
                    }}
                  />
                  <Form.Check
                    type="checkbox"
                    checked={inventory?.isEdit}
                    onChange={(e) => {
                      setInventory({ ...inventory, isEdit: e.target.checked });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  as={Col}
                  className="d-flex justify-content-between "
                >
                  <Form.Check
                    type="checkbox"
                    label="Users"
                    checked={userManager?.name}
                    value="userManager"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setUserManger({
                          isRead: true,
                          isWrite: true,
                          isEdit: true,
                          name: e.target.value,
                        });
                      } else {
                        setUserManger({
                          isRead: false,
                          isWrite: false,
                          isEdit: false,
                          name: popup.permission.pop(userManager),
                        });
                      }
                    }}
                  />
                  <Form.Check
                    type="checkbox"
                    style={{ marginLeft: "26px" }}
                    checked={userManager?.isRead}
                    onChange={(e) =>
                      setUserManger({
                        ...userManager,
                        isRead: e.target.checked,
                      })
                    }
                  />
                  <Form.Check
                    type="checkbox"
                    checked={userManager?.isWrite}
                    onChange={(e) =>
                      setUserManger({
                        ...userManager,
                        isWrite: e.target.checked,
                      })
                    }
                  />
                  <Form.Check
                    type="checkbox"
                    checked={userManager?.isEdit}
                    onChange={(e) =>
                      setUserManger({
                        ...userManager,
                        isEdit: e.target.checked,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Col} className="d-flex justify-content-between">
                  <Form.Check
                    type="checkbox"
                    label="Orders"
                    value="orderManager"
                    checked={orderManager?.name}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setOrderManager({
                          isRead: true,
                          isWrite: true,
                          isEdit: true,
                          name: e.target.value,
                        });
                      } else {
                        setOrderManager({
                          isRead: false,
                          isWrite: false,
                          isEdit: false,
                          name: popup.permission.pop(orderManager),
                        });
                      }
                    }}
                  />
                  <Form.Check
                    type="checkbox"
                    style={{ marginLeft: "20px" }}
                    checked={orderManager?.isRead}
                    onChange={(e) =>
                      setOrderManager({
                        ...orderManager,
                        isRead: e.target.checked,
                      })
                    }
                  />
                  <Form.Check
                    type="checkbox"
                    checked={orderManager?.isWrite}
                    onChange={(e) =>
                      setOrderManager({
                        ...orderManager,
                        isWrite: e.target.checked,
                      })
                    }
                  />
                  <Form.Check
                    type="checkbox"
                    checked={orderManager?.isEdit}
                    onChange={(e) =>
                      setOrderManager({
                        ...orderManager,
                        isEdit: e.target.checked,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Col} className="d-flex justify-content-between">
                  <Form.Check
                    type="checkbox"
                    label="Category"
                    value="categoryManager"
                    checked={categoryManager?.name}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCategoryManager({
                          isRead: true,
                          isWrite: true,
                          isEdit: true,
                          name: e.target.value,
                        });
                      } else {
                        setCategoryManager({
                          isRead: false,
                          isWrite: false,
                          isEdit: false,
                          name: popup.permission.pop(categoryManager),
                        });
                      }
                    }}
                  />
                  <Form.Check
                    type="checkbox"
                    checked={categoryManager?.isRead}
                    onChange={(e) =>
                      setCategoryManager({
                        ...categoryManager,
                        isRead: e.target.checked,
                      })
                    }
                  />
                  <Form.Check
                    type="checkbox"
                    checked={categoryManager?.isWrite}
                    onChange={(e) =>
                      setCategoryManager({
                        ...categoryManager,
                        isWrite: e.target.checked,
                      })
                    }
                  />
                  <Form.Check
                    type="checkbox"
                    checked={categoryManager?.isEdit}
                    onChange={(e) =>
                      setCategoryManager({
                        ...categoryManager,
                        isEdit: e.target.checked,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Col} className="d-flex justify-content-between">
                  <Form.Check
                    type="checkbox"
                    label="Report"
                    value="reportManager"
                    checked={reportManager?.name}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setReportManager({
                          isRead: true,
                          isWrite: true,
                          isEdit: true,
                          name: e.target.value,
                        });
                      } else {
                        setReportManager({
                          isRead: false,
                          isWrite: false,
                          isEdit: false,
                          name: popup.permission.pop(reportManager),
                        });
                      }
                    }}
                    
                  />
                  <Form.Check
                    type="checkbox"
                    style={{ marginLeft: "20px" }}
                    checked={reportManager?.isRead}
                    onChange={(e) =>
                      setReportManager({
                        ...reportManager,
                        isRead: e.target.checked,
                      })
                    }
                  />
                  <Form.Check
                    type="checkbox"
                    checked={reportManager?.isWrite}
                    onChange={(e) =>
                      setReportManager({
                        ...reportManager,
                        isWrite: e.target.checked,
                      })
                    }
                  />
                  <Form.Check
                    type="checkbox"
                    checked={reportManager?.isEdit}
                    onChange={(e) =>
                      setReportManager({
                        ...reportManager,
                        isEdit: e.target.checked,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Col} className="d-flex justify-content-between">
                  <Form.Check
                    type="checkbox"
                    label="Coupons"
                    value="couponManager"
                    checked={couponManager?.name}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCouponManager({
                          isRead: true,
                          isWrite: true,
                          isEdit: true,
                          name: e.target.value,
                        });
                      } else {
                        setCouponManager({
                          isRead: false,
                          isWrite: false,
                          isEdit: false,
                          name: popup.permission.pop(couponManager),
                        });
                      }
                    }}
                  />
                  <Form.Check
                    type="checkbox"
                    style={{ marginLeft: "5px" }}
                    checked={couponManager?.isRead}
                    onChange={(e) =>
                      setCouponManager({
                        ...couponManager,
                        isRead: e.target.checked,
                      })
                    }
                  />
                  <Form.Check
                    type="checkbox"
                    checked={couponManager?.isWrite}
                    onChange={(e) =>
                      setCouponManager({
                        ...couponManager,
                        isWrite: e.target.checked,
                      })
                    }
                  />
                  <Form.Check
                    type="checkbox"
                    checked={couponManager?.isEdit}
                    onChange={(e) =>
                      setCouponManager({
                        ...couponManager,
                        isEdit: e.target.checked,
                      })
                    }
                  />
                </Form.Group>
              </Col>

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
