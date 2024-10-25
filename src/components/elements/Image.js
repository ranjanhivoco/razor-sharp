import React from "react";

export default function Image({ src, alt, className, style }) {
    (src, alt, className, style);
    
    return <img className={ className } src={ src } alt={ alt } style={style}/>
}