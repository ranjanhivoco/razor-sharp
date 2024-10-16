import React from "react";

export default function Button({ type, onClick, className, icon, iconClass, text, badge, arrow, children, style, onSubmit, title, onMouseOver, onMouseOut }) {
    return (
        <button type={ type || "button" } onClick={ onClick } className={ className } style={style} onSubmit={onSubmit} title={title} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
            { icon || iconClass ? <i className={ iconClass || "material-icons" }>{ icon }</i> : <></> }
            { text && <span>{ text }</span> }
            { badge && <sup className={ badge.variant }>{ badge.text }</sup> }
            { arrow && <small className="material-icons">{ arrow }</small>}
            { children }
        </button>
    );
}