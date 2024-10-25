import { useState } from "react";
import { List, Item, Anchor, Button } from "../elements";

export default function MenuItem({ item }) {
  const [active, setActive] = useState(item.href === window.location.pathname);

  return (
    <Item className={`mc-sidebar-menu-item ${active ? "active" : ""}`}>
      {item.submenu ? (
        <>
          <Button
            icon={item.icon}
            text={item.text}
            badge={item.badge}
            arrow="expand_more"
            className="mc-sidebar-menu-btn"
          />

          <List className="mc-sidebar-dropdown-list">
            {item.submenu.map((item, index) => (
              <Item
                key={index}
                className="mc-sidebar-dropdown-item"
                onClick={() => setActive(!active)}
              >
                <Anchor href={item.href} className="mc-sidebar-dropdown-link">
                  {item.text}
                </Anchor>
              </Item>
            ))}
          </List>
        </>
      ) : (
        <Anchor
          href={item.href}
          icon={item.icon}
          text={item.text}
          badge={item.badge}
          className="mc-sidebar-menu-btn"
        />
      )}
    </Item>
  );
}
