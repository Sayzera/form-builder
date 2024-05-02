"use client";
import { DesignerContext } from "@/context/DesignerContext";
import React, { useContext } from "react";

export default function useDesigner() {
  const context = useContext(DesignerContext);
  if (!context) {
    throw new Error(
      "useDesigner DesignerContextProvider içinde olmalıdır."
    );
  }
  return context;
}
