import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import {
  Anchor,
  Box,
  Item,
  Text,
  Icon,
  List,
  Image,
  Heading,
  Button,
} from "../../components/elements";
import ApiIcon from "@mui/icons-material/Api";
import { Breadcrumb, DivideTitle } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import CardLayout from "../../components/cards/CardLayout";
import data from "../../data/master/productView.json";
import { hostedProductAxios } from "../../backendAxios/backendAxios";
import { useQuery } from "../../backendAxios/backendAxios";
import moment from "moment";
import { LoaderProvider } from "../../context/Preloader";

export default function ProductView() {
  const query = useQuery();
  const [singleproduct, setSingleproduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProductById();
  }, [query.get("query_id")]);

  const getProductById = async () => {
    setLoading(true);
    const result = await hostedProductAxios.post(
      `/productById/${query.get("query_id")}`
    );
    setSingleproduct(result?.data);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <LoaderProvider />
      ) : (
        <PageLayout>
          <CardLayout className="mb-4">
            <Breadcrumb title={data?.pageTitle}>
              {data?.breadcrumb.map((item, index) => (
                <Item key={index} className="mc-breadcrumb-item">
                  {item.path ? (
                    <Anchor className="mc-breadcrumb-link" href={item.path}>
                      {item.text}
                    </Anchor>
                  ) : (
                    item.text
                  )}
                </Item>
              ))}
            </Breadcrumb>
          </CardLayout>
          <CardLayout className="p-lg-5">
            <Row>
              <Col xl={5}>
                <DivideTitle title="product gallery" className="mb-4" />
                <Box className="mc-product-view-gallery">
                  {data?.gallery?.map((item, index) => (
                    <Image
                      key={index}
                      src={
                        singleproduct?.product?.image_1_url
                          ? singleproduct?.product?.image_1_url
                          : singleproduct?.product?.original_image_url
                      }
                      alt={item.alt}
                    />
                  ))}
                </Box>
              </Col>
              <Col xl={7}>
                <DivideTitle title="product details" className="mb-4" />
                <Box className="mc-product-view-info-group">
                  <Heading as="h2" className="mc-product-view-info-title">
                    <p>
                      {singleproduct?.product?.name
                        ? singleproduct?.product?.name
                        : singleproduct?.title}
                    </p>
                  </Heading>
                  <Box className="mc-product-view-meta">
                    <Icon type={data.specify[0].icon} />
                    <Heading as="h5">Sku</Heading>
                    <Text as="span">:</Text>
                    <Text as="p">{singleproduct?.SKU}</Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                  <Icon type={data.specify[0].icon} />
                    <Heading as="h5">Category</Heading>
                    <Text as="span">:</Text>
                    <Text as="p">{singleproduct?.categoryName}</Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                  <Icon type={data.specify[0].icon} />
                    <Heading as="h5">Seller</Heading>
                    <Text as="span">:</Text>
                    <Text as="p">{singleproduct?.dropshiperName}</Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                  <Icon type={data.specify[0].icon} />
                    <Heading as="h5">Stock</Heading>
                    <Text as="span">:</Text>
                    <Text as="p">{singleproduct?.stock}</Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                  <Icon type={data.specify[0].icon} />
                    <Heading as="h5">Price</Heading>
                    <Text as="span">:</Text>
                    <Text as="p">{singleproduct?.price}</Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                  <Icon type={data.specify[0].icon} />
                    <Heading as="h5">Fazter Price</Heading>
                    <Text as="span">:</Text>
                    <Text as="p">{singleproduct?.calculatedPrice}</Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                  <Icon type={data.specify[0].icon} />
                    <Heading as="h5">Weight</Heading>
                    <Text as="span">:</Text>
                    <Text as="p">{singleproduct?.weight}</Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                  <Icon type={data.specify[0].icon} />
                    <Heading as="h5">Warranty</Heading>
                    <Text as="span">:</Text>
                    <Text as="p">{singleproduct?.product?.Warranty}</Text>
                  </Box>
                  {/* <Box className="mc-product-view-meta">
                    <Heading as="h5">Returnable</Heading>
                    <Text as="span" style={{ marginLeft: "28px" }}>
                      :
                    </Text>
                    <Text
                      as="p"
                      style={{
                        wordSpacing: "2px",
                        lineHeight: "20px",
                        textTransform: "initial",
                      }}
                    >
                      {singleproduct?.product?.returnable}
                    </Text>
                  </Box> */}
                  <Box className="mc-product-view-meta">
                  <Icon type={data.specify[0].icon} />
                    <Heading as="h5">Trending</Heading>
                    <Text as="span">:</Text>
                    <Text
                      as="p"
                      style={{
                        border: "1px solid #d3d3d300",
                        background: "#d3d3d39e",
                        padding: "3px 5px 2px 6px",
                        borderRadius: "7px",
                        cursor: "pointer",
                      }}
                    >
                      {singleproduct?.tranding?.toString()}
                    </Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                  <Icon type={data.specify[0].icon} />
                    <Heading as="h5">Inventory</Heading>
                    <Text as="span">:</Text>
                    <Text
                      as="p"
                      style={{
                        border: "1px solid #d3d3d300",
                        background: "#d3d3d39e",
                        padding: "3px 5px 2px 6px",
                        borderRadius: "7px",
                        cursor: "pointer",
                      }}
                    >
                      {singleproduct?.inventory?.toString()}
                    </Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                  <Icon type={data.specify[0].icon} />
                    <Heading as="h5">Created At</Heading>
                    <Text as="span">:</Text>
                    <Text as="p">
                      {moment(singleproduct?.createdAt).format("LL")}
                    </Text>
                  </Box>
                  <Box className="mc-product-view-meta">
                  <Icon type={data.specify[0].icon} />
                    <Heading as="h5">Updated At</Heading>
                    <Text as="span">:</Text>
                    <Text as="p">
                      {moment(singleproduct?.updatedAt).format("LL")}
                    </Text>
                  </Box>

                  {/* {data?.specify.map((item, index) => (
                    <Box key={index} className="mc-product-view-meta">
                      <Icon type={item.icon} />
                      <Heading as="h5">{item.title}</Heading>
                      <Text as="span">:</Text>
                      {item.text && <Text as="p">{item.text}</Text>}
                      {item.price && (
                        <Text as="p">
                          {item.price.now} <del>{item.price.old}</del>
                        </Text>
                      )}
                      {item.list && (
                        <List>
                          {item.list.map((item, index) => (
                            <Item key={index}>{item}</Item>
                          ))}
                        </List>
                      )}
                    </Box>
                  ))} */}
                </Box>
              </Col>
              <Col xl={12}>
                <DivideTitle
                  title="product description"
                  className="mt-5 mb-4"
                />
                <Box className="mc-product-view-descrip">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: singleproduct?.product?.Description,
                    }}
                  />
                </Box>
              </Col>
              {/* <Col xl={12}>
                <DivideTitle title="rating analytics" className="mt-5 mb-4" />
                <RatingAnalytics
                  graphLine={data?.rating.item}
                  graphScore={data?.rating.score}
                  graphStar={data?.rating.icon}
                  grapTitle={data?.rating.total}
                  graphText={data?.rating.text}
                />
              </Col> */}
              {/* <Col xl={12}>
                <DivideTitle title="customer reviews" className="mt-5 mb-4" />
                <CustomerReview data={data?.review} />
              </Col>
              <Col xl={12}>
                <DivideTitle title="review reply form" className="mt-3 mb-4" />
                <LabelTextarea
                  placeholder="Write here..."
                  fieldSize="w-100 h-text-xl"
                />
                <Button className="mc-btn mc-review-form-btn primary">
                  drop your replies
                </Button>
              </Col> */}
            </Row>
          </CardLayout>
        </PageLayout>
      )}
    </>
  );
}
