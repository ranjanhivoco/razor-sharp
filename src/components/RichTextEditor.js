import React, { useMemo } from "react";
import JoditEditor from "jodit-react";

export default function RichTextEditor({ value, onChange }) {
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "",
      defaultActionOnPaste: "insert_as_html",
      defaultLineHeight: 1.5,
      enter: "div",
      statusbar: false,
      sizeLG: 900,
      sizeMD: 700,
      sizeSM: 400,
      toolbarAdaptive: false,
    }),
    []
  );

  return <JoditEditor value={value} onChange={onChange} config={config} className="joditEditor" />;
}
