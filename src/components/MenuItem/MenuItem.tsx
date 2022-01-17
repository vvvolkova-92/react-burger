import React from "react";
function MenuItem ({id, icon, link, stylesComp, stylesText, title}: any) {

    return (
      <li key={id} className={stylesComp}>
        {icon}
        <a href={link} className={stylesText}>{title}</a>
      </li>
    );
  }

export default MenuItem 