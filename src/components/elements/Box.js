import React from "react";

export default function Box({ as, children, className, style, ...rest }) {
    const Component = as || "div";
    return <Component style={ style } className={ className } {...rest}>{ children }</Component>
}