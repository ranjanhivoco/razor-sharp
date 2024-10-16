import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { List, Item, Icon, Text, Box, Anchor } from "../../components/elements";
import {
  Breadcrumb,
  RoundAvatar,
  DivideTitle,
  DuelText,
} from "../../components";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/contactView.json";
import { hostedPagesAxios } from "../../backendAxios/backendAxios";
import authHeader from "../../backendAxios/authHeader";
import { useQuery } from "../../backendAxios/backendAxios";
import { LoaderProvider } from "../../context/Preloader";

export default function UserProfile(props) {
  const query = useQuery();
  const [loading, setLoading] = useState(false);
  const [queryMessage, setQueryMessage] = useState([]);

  useEffect(() => {
    getMessage();
  }, [query.get("query_id")]);

  const getMessage = async () => {
    setLoading(true);
    await hostedPagesAxios
      .get(`/forum/get-customer-question/${query.get("query_id")}`, {
        headers: authHeader(),
      })
      .then((response) => {
        if (response.status === 200) {
          setQueryMessage(response?.data);
        }
      });
    setLoading(false);
  };

  console.log(queryMessage);

  return (
    <>
      {loading ? (
        <LoaderProvider />
      ) : (
        <PageLayout>
          <Row>
            <Col xl={12}>
              <CardLayout>
                <Breadcrumb title="Forum Queries">
                 
                </Breadcrumb>
              </CardLayout>
            </Col>
            <Col xl={5} style={{ position: "relative", left: "28%" }}>
              <CardLayout>
                {/* <CardHeader title="user information" dotsMenu={data?.dotsMenu} /> */}
                <Box className="mc-user-group">
                  <Box className="mc-user-profile">
                    <RoundAvatar
                      src={data?.profile.src}
                      alt={data?.profile.alt}
                      size={data?.profile.size}
                    />
                    <DuelText
                      descrip={`${queryMessage?.email}`}
                      // size={ data?.profile.size }
                    />
                  </Box>
                  <Box className="mb-4">
                    <DivideTitle title="Query" className="mb-4" />
                    <List
                      className="mc-user-metalist"
                      style={{
                        border: "1px solid #d4d4d4",
                        padding: "10px 10px 80px 10px",
                        borderRadius: "4px",
                      }}
                    >
                      <Item>
                        <Text style={{ fontWeight: "500" }} as="span">
                          {queryMessage?.question}
                        </Text>
                      </Item>
                    </List>
                  </Box>
                </Box>
              </CardLayout>
            </Col>
          </Row>
        </PageLayout>
      )}
    </>
  );
}