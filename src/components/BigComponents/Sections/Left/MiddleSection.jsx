import React from "react";
import css from "./MiddleSection.module.css";

function MiddleSection() {
  return (
    <div>
      <div className={css.container}>
        <img
          src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fzafaire.com%2Fwp-content%2Fuploads%2F2020%2F07%2FMacBook_Pro_16-in_Touch_Bar_Pure_Top_Open_Space_Gray.png&f=1&nofb=1'
          alt=''
        />
      </div>
      <div className={css.description}>
        <h2>Description:</h2>
        <h4>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam
          veritatis in, accusantium modi iusto recusandae! Suscipit temporibus
          aspernatur molestias neque, sit harum quod quibusdam at inventore
          deleniti quas voluptates id ullam mollitia corrupti ipsa repellendus
          earum aut autem error repellat doloribus atque aliquam. Veniam
          incidunt blanditiis quidem quas nostrum molestiae?
        </h4>
      </div>
    </div>
  );
}

export default MiddleSection;
