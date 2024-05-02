"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { FormElements } from "./FormElements";
import SidebarBtnElement from "./SidebarBtnElement";
import useDesigner from "@/hooks/useDesigner";
import FormElementSidebar from "./FormElementSidebar";
import PropertiesFormSidebar from "./PropertiesFormSidebar";
export default function DesignerSidebar() {
  const { selectedElement } = useDesigner();

  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      {!selectedElement && <FormElementSidebar />}
      {selectedElement && <PropertiesFormSidebar />}
    </aside>
  );
}
