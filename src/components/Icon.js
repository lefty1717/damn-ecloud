import { SvgIcon } from "@mui/material";
import React, { useState, useEffect } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
const icons = [
  {
    name: "AddPhotoAlternateIcon",
    d: "M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z",
  },
  {
    name: "ManageAccountsIcon",
    d: "M10.67 13.02c-.22-.01-.44-.02-.67-.02-2.42 0-4.68.67-6.61 1.82-.88.52-1.39 1.5-1.39 2.53V20h9.26c-.79-1.13-1.26-2.51-1.26-4 0-1.07.25-2.07.67-2.98zM20.75 16c0-.22-.03-.42-.06-.63l1.14-1.01-1-1.73-1.45.49c-.32-.27-.68-.48-1.08-.63L18 11h-2l-.3 1.49c-.4.15-.76.36-1.08.63l-1.45-.49-1 1.73 1.14 1.01c-.03.21-.06.41-.06.63s.03.42.06.63l-1.14 1.01 1 1.73 1.45-.49c.32.27.68.48 1.08.63L16 21h2l.3-1.49c.4-.15.76-.36 1.08-.63l1.45.49 1-1.73-1.14-1.01c.03-.21.06-.41.06-.63zM17 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z",
  },
];

const Icon = ({ size = 24, color = "#fe8b83", name, hidden = false }) => {
  const [path_d, setPath_d] = useState("");

  useEffect(() => {
    icons.forEach((icon) => {
      if (name === icon.name) {
        setPath_d(icon.d);
      }
    });
  }, []);

  return (
    <SvgIcon
      style={{
        fontSize: size,
        color: color,
        display: `${hidden ? "none" : "unset"}`,
      }}
    >
      <path d={path_d} />
    </SvgIcon>
  );
};

export default Icon;
