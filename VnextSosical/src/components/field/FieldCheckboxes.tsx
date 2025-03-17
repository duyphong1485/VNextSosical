import React from "react";
import { ReactNode } from "react";

const FieldCheckboxes = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-wrap gap-5">{children}</div>;
};

export default FieldCheckboxes;
