import * as React from "react";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import { hostedSellerProductAxios } from "../../backendAxios/backendAxios";
import { Box, Text, Image, Heading } from "../../components/elements";
import { DivideTitle } from "../../components";
import { Row, Col } from "react-bootstrap";
import EditInventoryPopup from "./EditInventoryPopup";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductSearchPopup(props) {
  const [productData, setProductData] = useState();
  const { openProductPopup, closePopup, productId } = props;
  const [editInventoryPopup, setEditInventoryPopup] = useState(false);
  const [updatedIventoryId, setUpdatedIventoryId] = useState(null);

  useEffect(() => {
    if (productId) {
      handleSingleProduct();
    }
  }, [productId]);

  const handleSingleProduct = async () => {
    await hostedSellerProductAxios
      .get(`/product-by-productid/${productId}`)
      .then((response) => {
        if (response.status === 200) {
          setProductData(response?.data);
        }
      });
  };
  return (
    <div>
      <Dialog
        open={openProductPopup}
        TransitionComponent={Transition}
        keepMounted
        onClose={closePopup}
        aria-describedby="alert-dialog-slide-description"
      >
        <CloseIcon className="formPopup__crossBtn" onClick={closePopup} />
        <DialogTitle className="formPopup__header">
          {"Product Details"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Row style={{ padding: "20px" }}>
              <Col xl={12}>
                <DivideTitle title="Product Images" className="mb-4 " />
                <div
                  style={{
                    display: "flex",
                    gap: "38px",
                    marginTop: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  {" "}
                  {(productData?.images || [])
                    .filter((url) => url !== "NA" && url !== "")
                    .map((url, index) => (
                      <img
                        style={{ width: "130px", height: "130px" }}
                        alt=""
                        src={`${url}`}
                      />
                    ))}
                </div>
              </Col>
              <Col xl={12}>
                <DivideTitle title="Product details" className="mb-4" />
                <Box className="mc-bulk-order-view-info-group">
                  <Box className="mc-product-view-meta">
                    <Heading as="h5" className="bulkorderfield">
                      Product Name
                    </Heading>
                    <Text as="span">:</Text>
                    <Text as="p">
                      {productData?.title ? productData?.title : "__"}
                    </Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                    <Heading as="h5" className="bulkorderfield">
                      Category
                    </Heading>
                    <Text as="span">:</Text>
                    <Text as="p">
                      {productData?.category ? productData?.category : "__"}
                    </Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                    <Heading as="h5" className="bulkorderfield">
                      Sub-catgeory
                    </Heading>
                    <Text as="span">:</Text>
                    <Text as="p" className="sellerview__data">
                      {productData?.subcategory
                        ? productData?.subcategory
                        : "__"}
                    </Text>
                  </Box>

                  <Box className="mc-product-view-meta">
                    <Heading as="h5" className="bulkorderfield">
                      Sku
                    </Heading>
                    <Text as="span">:</Text>
                    <Text as="p">
                      {productData?.sku ? productData?.sku : "__"}
                    </Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                    <Heading as="h5" className="bulkorderfield">
                      Model
                    </Heading>
                    <Text as="span">:</Text>
                    <Text as="p">
                      {productData?.model ? productData?.model : "__"}
                    </Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                    <Heading as="h5" className="bulkorderfield">
                      Stock
                    </Heading>
                    <Text as="span">:</Text>
                    <Text as="p">
                      {productData?.stock ? productData?.stock : "__"}
                    </Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                    <Heading as="h5" className="bulkorderfield">
                      Product Status
                    </Heading>
                    <Text as="span">:</Text>
                    <Text as="p">
                      {productData?.status ? "Active" : "Inactive"}
                    </Text>
                  </Box>

                  <Box className="mc-product-view-meta">
                    <Heading as="h5" className="bulkorderfield">
                      Price
                    </Heading>
                    <Text as="span">:</Text>
                    <Text as="p">
                      {productData?.price ? productData?.price : "__"}
                    </Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                    <Heading as="h5" className="bulkorderfield">
                      sale Price
                    </Heading>
                    <Text as="span">:</Text>
                    <Text as="p">
                      {productData?.salesprice ? productData?.salesprice : "__"}
                    </Text>
                  </Box>
                </Box>
              </Col>

              <Col xl={12}>
                <button
                  variant="primary"
                  type="submit"
                  className="mt-5 btn btn-dark btn-md text-white"
                  style={{
                    width: "20%",
                    height: "50px",
                    marginLeft: "40%",
                  }}
                  onClick={() => {
                    setEditInventoryPopup(true);
                    setUpdatedIventoryId(productData?._id);
                  }}
                >
                  Edit
                </button>
              </Col>
            </Row>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <EditInventoryPopup
        updatedIventoryId={updatedIventoryId}
        editInventoryPopup={editInventoryPopup}
        setEditInventoryPopup={setEditInventoryPopup}
        closePopup={() => setEditInventoryPopup(false)}
        title="Edit !"
      />
    </div>
  );
}
