import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import {
  List,
  Item,
  Text,
  Box,
  Anchor,
  Button,
} from "../../components/elements";
import {
  Breadcrumb,
  RoundAvatar,
  DivideTitle,
  DuelText,
} from "../../components";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/reviewRating.json";
import { hostedRatingReview } from "../../backendAxios/backendAxios";
import authHeader from "../../backendAxios/authHeader";
import PhoneIcon from "@mui/icons-material/Phone";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import { useQuery } from "../../backendAxios/backendAxios";
import { LoaderProvider } from "../../context/Preloader";
import { toast } from "react-toastify";

export default function UserProfile(props) {
  const query = useQuery();

  // const [ratingData, setRatingData] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRatingReview();
  }, [query.get("query_id")]);

  const getRatingReview = async () => {
    setLoading(true);
    const result = await hostedRatingReview.post(
      `getreviewandrating`,
      { pid: query.get("query_id") },
      {
        headers: authHeader(),
      }
    );
    setReviewData(result?.data?.result);
    (result?.data?.result);
    setLoading(false);
  };

  const BlockReview = async (pid, uid) => {
    await hostedRatingReview.post(
      `/block-review`,
      { pid: pid, uid: uid },
      {
        headers: authHeader(),
      }
    );
    setTimeout(() => {
      toast.success(`Review Blocked successfully`);
      window.location.reload();
    }, 2000);
  };
  return (
    <>
      {loading ? (
        <LoaderProvider />
      ) : (
        <PageLayout>
          <Row>
            <Col xl={12}>
              <CardLayout>
                <Breadcrumb title="Product Review">
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
            </Col>
            <Col xl={12}>
              <CardLayout>
                {/* <CardHeader title="user information" dotsMenu={data?.dotsMenu} /> */}
                {reviewData.length === 0 ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "200px",
                      fontSize: "24px",
                      fontWeight: "500",
                    }}
                  >
                    No Rating & Reviews
                  </div>
                ) : (
                  <Box className="mc-user-group">
                    <Box className="mb-4">
                      <List className="mc-user-metalist">
                        {reviewData?.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="d-flex align-items-start gap-4 border-top"
                            >
                              <div className="d-flex flex-column align-items-start gap-4">
                                <div className="d-flex justify-content-between align-items-start">
                                  <div className="d-flex flex-column mt-3">
                                    <p>
                                      <span className="fw-bold">Name </span> :{" "}
                                      {item?.userName}
                                    </p>
                                    <p>
                                      {" "}
                                      <span className="fw-bold">
                                        {" "}
                                        Rating{" "}
                                      </span>: {item?.rating}{" "}
                                    </p>
                                    <p>
                                      <span className="fw-bold">
                                        Review title{" "}
                                      </span>
                                      : {item?.review?.title}{" "}
                                    </p>
                                    <p className="pe-5">
                                      <span className="fw-bold">
                                        Review Description{" "}
                                      </span>
                                      : {item?.review?.review}
                                    </p>
                                    <Button
                                      type="button"
                                      className="btn btn-danger"
                                      style={{
                                        width: "100px",
                                        marginTop: "10px",
                                      }}
                                      onClick={() =>
                                        BlockReview(
                                          item?.pid,
                                          item?.review?.uid
                                        )
                                      }
                                    >
                                      Block
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </List>
                    </Box>
                  </Box>
                )}
              </CardLayout>
            </Col>
          </Row>
        </PageLayout>
      )}
    </>
  );
}
