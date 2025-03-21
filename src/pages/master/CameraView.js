import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const CCTVUI = () => {
  const thumbnails = [
    {
      id: 1,
      label: "Counter Area",
      image:
        "https://s3-alpha-sig.figma.com/img/54d1/8d8a/740fe120ccfff511f5090173f9eb880c?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=R6dLNH-ooQVKU1Syg8aaIx3mZ9QJu23IpRDvUr7IVA2RPK5kLc7Nnr-or6mbV0ufu3YSTzOtq2lU0p9QsnWDWy1ALoCppLvot8K7lTZKVpnwJr~3ytVok6ZbcXr23e7NPyh1qeA9192ymgQWJs-j-ox1JymrA6CMFMGGPGbKl5o8mkFNHXG9wVRGGO8lM4niM4EF5RMyDCZ34GRXzoj5tnF0TD7o7~iDOBAsy2Lckpm9ocHpBKOHuYijYtdPCuwLe6QEimczJ7KhtdGRX3gSY8aR0GznHeZY5nZ7P0nyaz1eH-Mw--DyF40gPXquyjNcOXha66SHi4xfHXT-oNhLWw__",
    },
    {
      id: 2,
      label: "Back Counter",
      image:
        "https://s3-alpha-sig.figma.com/img/9289/6e76/46b0e870475e764e703dd17efbbcfed6?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YT7nY33~W0bA1EIOJ~mE5LPVyHT~18vzepRXaTucnoZHH1yVBwNPXjdKYMj4rsXRxf05gk~TlftWLZNg4QlrSbTBHaN8GZubdVIrYXJTNmrhvB0ehwlRsHJoKtjTtoUl~SloTMq00ktKxQ4iYFCUV0CbmYT6VCjiAiSP81CLeqTFiOBIcAtRPXgsIFm39btuuwsPf6~MqcX04-5oiVTt5JjIDTzWYJ58VINZkobykcKb83IZXOw0bV1YhWFZoDD76SausEfDbuu6ksz5ZBkEobPyPaP9lshWdWLveiKIC-D5~5ffJl2UHtmeJy6U~3W3zfERjho7KAMWGyej5pcOEw__",
    },
    {
      id: 3,
      label: "Counter-2",
      image:
        "https://s3-alpha-sig.figma.com/img/cf00/f6a3/e7c99f53297047956933741a66a33594?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OCDxjO-9oBy-AnH7kCJUqSA3srm2XIsMvTKPwiKq5XZ4TWLw181KpLbk0Kwk4sHstYc7pHQAZkFcE9XZ6aSWmpZRBbrpcoyDad6sVJYQ74cNmMAiZAvf0t6v-wGCkQglk6Qvdm5OAeeknXhgGGkQBlMlT0qs69dy06YJaoeg7~qGMUn68-b9V8gD4nO2QGiSIRkUZg3AqERHdIy~Ob8vd2AmwwHgsKgptz3eVea5GIuulw6Vhk6pSR7uIqPuZH44~Tnhn7yqB6~pGpZ6rwItvXeXNttn3CkIrcyxV2eIK0g3rPjOixplF4-Z030DdxbvXykF5U6eUXvP12qGPNnA9Q__",
    },
    {
      id: 4,
      label: "Counter-3",
      image:
        "https://s3-alpha-sig.figma.com/img/cf00/f6a3/e7c99f53297047956933741a66a33594?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OCDxjO-9oBy-AnH7kCJUqSA3srm2XIsMvTKPwiKq5XZ4TWLw181KpLbk0Kwk4sHstYc7pHQAZkFcE9XZ6aSWmpZRBbrpcoyDad6sVJYQ74cNmMAiZAvf0t6v-wGCkQglk6Qvdm5OAeeknXhgGGkQBlMlT0qs69dy06YJaoeg7~qGMUn68-b9V8gD4nO2QGiSIRkUZg3AqERHdIy~Ob8vd2AmwwHgsKgptz3eVea5GIuulw6Vhk6pSR7uIqPuZH44~Tnhn7yqB6~pGpZ6rwItvXeXNttn3CkIrcyxV2eIK0g3rPjOixplF4-Z030DdxbvXykF5U6eUXvP12qGPNnA9Q__",
    },
    {
      id: 5,
      label: "Front Counter",
      image:
        "https://s3-alpha-sig.figma.com/img/9289/6e76/46b0e870475e764e703dd17efbbcfed6?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YT7nY33~W0bA1EIOJ~mE5LPVyHT~18vzepRXaTucnoZHH1yVBwNPXjdKYMj4rsXRxf05gk~TlftWLZNg4QlrSbTBHaN8GZubdVIrYXJTNmrhvB0ehwlRsHJoKtjTtoUl~SloTMq00ktKxQ4iYFCUV0CbmYT6VCjiAiSP81CLeqTFiOBIcAtRPXgsIFm39btuuwsPf6~MqcX04-5oiVTt5JjIDTzWYJ58VINZkobykcKb83IZXOw0bV1YhWFZoDD76SausEfDbuu6ksz5ZBkEobPyPaP9lshWdWLveiKIC-D5~5ffJl2UHtmeJy6U~3W3zfERjho7KAMWGyej5pcOEw__",
    },
    {
      id: 6,
      label: "Front Counter",
      image:
        "https://s3-alpha-sig.figma.com/img/9289/6e76/46b0e870475e764e703dd17efbbcfed6?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YT7nY33~W0bA1EIOJ~mE5LPVyHT~18vzepRXaTucnoZHH1yVBwNPXjdKYMj4rsXRxf05gk~TlftWLZNg4QlrSbTBHaN8GZubdVIrYXJTNmrhvB0ehwlRsHJoKtjTtoUl~SloTMq00ktKxQ4iYFCUV0CbmYT6VCjiAiSP81CLeqTFiOBIcAtRPXgsIFm39btuuwsPf6~MqcX04-5oiVTt5JjIDTzWYJ58VINZkobykcKb83IZXOw0bV1YhWFZoDD76SausEfDbuu6ksz5ZBkEobPyPaP9lshWdWLveiKIC-D5~5ffJl2UHtmeJy6U~3W3zfERjho7KAMWGyej5pcOEw__",
    },
    {
      id: 7,
      label: "Front Counter",
      image:
        "https://s3-alpha-sig.figma.com/img/9289/6e76/46b0e870475e764e703dd17efbbcfed6?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YT7nY33~W0bA1EIOJ~mE5LPVyHT~18vzepRXaTucnoZHH1yVBwNPXjdKYMj4rsXRxf05gk~TlftWLZNg4QlrSbTBHaN8GZubdVIrYXJTNmrhvB0ehwlRsHJoKtjTtoUl~SloTMq00ktKxQ4iYFCUV0CbmYT6VCjiAiSP81CLeqTFiOBIcAtRPXgsIFm39btuuwsPf6~MqcX04-5oiVTt5JjIDTzWYJ58VINZkobykcKb83IZXOw0bV1YhWFZoDD76SausEfDbuu6ksz5ZBkEobPyPaP9lshWdWLveiKIC-D5~5ffJl2UHtmeJy6U~3W3zfERjho7KAMWGyej5pcOEw__",
    },
    {
      id: 8,
      label: "Front Counter",
      image:
        "https://s3-alpha-sig.figma.com/img/9289/6e76/46b0e870475e764e703dd17efbbcfed6?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YT7nY33~W0bA1EIOJ~mE5LPVyHT~18vzepRXaTucnoZHH1yVBwNPXjdKYMj4rsXRxf05gk~TlftWLZNg4QlrSbTBHaN8GZubdVIrYXJTNmrhvB0ehwlRsHJoKtjTtoUl~SloTMq00ktKxQ4iYFCUV0CbmYT6VCjiAiSP81CLeqTFiOBIcAtRPXgsIFm39btuuwsPf6~MqcX04-5oiVTt5JjIDTzWYJ58VINZkobykcKb83IZXOw0bV1YhWFZoDD76SausEfDbuu6ksz5ZBkEobPyPaP9lshWdWLveiKIC-D5~5ffJl2UHtmeJy6U~3W3zfERjho7KAMWGyej5pcOEw__",
    },
    {
      id: 9,
      label: "Front Counter",
      image:
        "https://s3-alpha-sig.figma.com/img/9289/6e76/46b0e870475e764e703dd17efbbcfed6?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YT7nY33~W0bA1EIOJ~mE5LPVyHT~18vzepRXaTucnoZHH1yVBwNPXjdKYMj4rsXRxf05gk~TlftWLZNg4QlrSbTBHaN8GZubdVIrYXJTNmrhvB0ehwlRsHJoKtjTtoUl~SloTMq00ktKxQ4iYFCUV0CbmYT6VCjiAiSP81CLeqTFiOBIcAtRPXgsIFm39btuuwsPf6~MqcX04-5oiVTt5JjIDTzWYJ58VINZkobykcKb83IZXOw0bV1YhWFZoDD76SausEfDbuu6ksz5ZBkEobPyPaP9lshWdWLveiKIC-D5~5ffJl2UHtmeJy6U~3W3zfERjho7KAMWGyej5pcOEw__",
    },




  ];

  return (
    <Container fluid className="py-3">
      <Row className="d-flex" style={{ flexWrap: "nowrap", gap: "20px" }}>
        {/* Left Section */}
        <Col>
          <Card style={{ position: "relative" }} className="">
            <div
              style={{
                width: "1280px",
                height: "720px",
                overflow: "",
                position: "relative",
                borderRadius: "12px",
              }}
            >
              <Card.Img
                variant="top"
                // src="main_feed.jpg"
                src={`
                  https://images.freeimages.com/images/large-previews/ead/tunnel-1056859.jpg
                  `}
                // https://s3-alpha-sig.figma.com/img/4054/ca3f/b88f2d74b686fc0b6fe363ff303cf931?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A9zYTo21j1jp2L-hvGkt8YRzfYXRBgk9CaOiHf7NTuByBwsIi-4DhIdYnYJpKBgLwCC9pZ7-bgTqSGNDCCw5MrgvmRTozz3M5cpfX-2mtS6ZQwI8ib8nIBafy0QdJh-f9fngGOFA8fSc-XagoQjoDnrEmC1Wp9WZqCQVdbjrGmlpoz99~rEE~6KCh9vVMZzvTRREb19Fz7zxK9dhJkdHPx0X9Yq8~CGpWnJ3Ar~Wc5IPhdYfnrrsXf9owk8Ht10klZT-ZdmLQJEKMfd5Iu~R8Szn9NnLkLm5085GmozjpOnBDCUHnmQiCuE9mcBSG7~wXYod7GDx6StXuH6IdxzT-A__
                alt="Main Feed"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <span
              style={{
                position: "absolute",
                fontfamily: "Inter",
                color: "#fff",
                fontSize: "26px",
                fontWeight: 400,
                lineHeight: "31.47px",
                textAlign: "left",
                bottom: "24px",
                left: "24px",
              }}
            >
              Entrance
            </span>
            {/* <Button variant="primary">Send</Button> */}
          </Card>
        </Col>

        {/* Right Section */}
        <Col md={4}>
          <Row style={{display:"flex",}} className="g-3  ">
            {thumbnails.map((thumb, index) => (
              <Col md={index === 0 ? 12 : 6} key={thumb.id}>
                <Card style={{ position: "relative",width:index === 0 ? "400px":"190px" ,height:index === 0 ? "244px":"180px"} }>
                  <Card.Img
                    variant="top"
                    style={{ height: "100%", width: "100%",borderRadius:"12px",objectFit:"cover" }}
                    src={thumb.image}
                    alt={thumb.label}
                  />
                    <Card.Text
                      style={{
                        position: "absolute",
                        fontfamily: "Inter",
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "20px",
                        textAlign: "left",
                        bottom: "12px",
                        left: "12px",
                      }}
                    >
                      {thumb.label}
                    </Card.Text>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CCTVUI;
