import React, { useEffect, useState } from "react";
import { CardHeader } from "../cards";
import { Dropdown } from "react-bootstrap";
// import { DotsMenu, RoundAvatar } from "..";
import { useNavigate } from "react-router-dom";
import { Icon, Text, Box, List, Heading, Button } from "../elements";
import { hostedOrderAxios } from "../../backendAxios/backendAxios";
import authHeader from "../../backendAxios/authHeader";

export default function WidgetDropdown({
  title,
  icon,
  addClass,
  badge,
  dropdown,
}) {
  
  // useEffect(() => {
  //   getNewOrderNotification();
  // }, []);

  const [orderNumber, setOrderNumber] = useState(0);
  const navigate = useNavigate();

  const getNewOrderNotification = async () => {
    await hostedOrderAxios
      .get(`/new-orders`, { headers: authHeader() })
      .then((response) => {
        if (response.status === 200) {
          setOrderNumber(response?.data?.length);
        }
      });
  };

  const handleViewNotification = async (id) => {
    await hostedOrderAxios
      .get(`/new-orders-to-read/${id}`, {
        headers: authHeader(),
      })
      .then(async (response) => {
        if (response.status === 200) {
          // window.location.reload();
          await navigate(`/invoice-details?_id=${id}`);
        }
      });
  };

  const handleViewAllNotification = async () => {
    await hostedOrderAxios
      .get(`/new-orders-viewall`, {
        headers: authHeader(),
      })
      .then(async (response) => {
        if (response.status === 200) {
          // window.location.reload();
          await navigate("/order-list");
        }
      });
  };

  return (
    <Dropdown className={addClass}>
      <Dropdown.Toggle
        className="mc-dropdown-toggle mc-header-icon "
        title={title}
      >
        <Icon type={icon} />
        <Text as="sup" className="bg-warning">
          {badge?.length}
        </Text>
      </Dropdown.Toggle>
      <Dropdown.Menu align="end" className="mc-dropdown-paper">
        <Box className="mc-header-dropdown-group">
          <CardHeader
            title={`Notification (${orderNumber})`}
            dotsMenu={dropdown?.dotsMenu}
          />
          {orderNumber ? (
            <List className="mc-header-dropdown-list thin-scrolling">
              {dropdown?.map((e) => (
                //   <a
                //     // onClick={handleViewNotification(e?.orderId)}
                //     href={`/invoice-details?_id=${e?.orderId}`}
                //   >
                <Box
                  onClick={() => handleViewNotification(e.orderId)}
                  className="mc-header-dropdown-meta"
                >
                  <Heading as="h4">
                    <Text as="cite">
                      <span
                        style={{ fontSize: "15px", fontWeight: "bold" }}
                      >{`${e?.name} `}</span>
                      has placed order with ID
                    </Text>
                  </Heading>
                  <Text
                    style={{ fontSize: "15px", fontWeight: "bolder" }}
                    as="p"
                  >
                    #{e?.orderId}
                  </Text>
                </Box>
                //   </a>
              ))}
            </List>
          ) : (
            <div style={{ textAlign: "center", padding: "70px" }}>
              No Notifications
            </div>
          )}

          <Button
            href="/order-list"
            className="mc-btn primary mc-header-dropdown-button py-4"
            onClick={() => {
              handleViewAllNotification();
            }}
          >
            View All Notifications
          </Button>
        </Box>
      </Dropdown.Menu>
    </Dropdown>
  );
}
