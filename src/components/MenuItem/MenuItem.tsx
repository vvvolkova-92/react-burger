import React from "react";
function MenuItem ({icon, link, stylesComp, stylesText, title}: any) {

    return (
      <li className={stylesComp}>
        {icon}
        <a href={link} className={stylesText}>{title}</a>
      </li>
    );
  }

export default MenuItem 