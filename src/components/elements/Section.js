import React from "react";

export default function Section({ as, children, className,style }) {
    const Component = as || "section";
    return (
      <Component style={style} className={className}>
        {children}
      </Component>
    );
}