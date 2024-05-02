import useDesigner from "@/hooks/useDesigner";
import React from "react";
import { FormElements } from "./FormElements";
import { Button } from "./ui/button";
import { AiOutlineClose } from "react-icons/ai";

export default function PropertiesFormSidebar() {
  const { selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) return null;

  const PropertiesForm = FormElements[selectedElement?.type].propertiesComponent;

  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Eleman özellikleri</p>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => setSelectedElement(null)}
        >
          <AiOutlineClose />
        </Button>
      </div>
      <PropertiesForm elementsInstance={selectedElement} />
    </div>
  );
}
