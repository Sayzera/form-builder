import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import { SidebarBtnElementDragOverlay } from "./SidebarBtnElement";
import { FormElements } from "./FormElements";
import useDesigner from "@/hooks/useDesigner";

/**
 * Sürükleme işlemi sırasında gösterilen overlay
 */
export default function DragOverlayWrapper() {
  const { elements } = useDesigner();
  const [draggedItem, setDraggedItem] = useState<Active | null>();
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  let node = <div>No Drag overlay</div>;
  const isSidebarBtnElement = draggedItem?.data?.current?.isDesignerBtnElement;

  if (isSidebarBtnElement) {
    const type: keyof typeof FormElements = draggedItem?.data?.current?.type;
    node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />;
  }
  /**
   * Sürüklenen eleman eğer bırakalamaz ise pointer-events-none yaparak sürüklenen elemanın
   * üzerindeki elementlerin click eventlerini engelliyoruz.
   */

  const isDesignerElement = draggedItem?.data?.current?.isDesignerElement;
  if (isDesignerElement) {
    const elementId = draggedItem?.data?.current?.elementId;
    const element = elements.find((e) => e.id === elementId);

    if (!element) node = <div>Element not found</div>;
    else {
      const DesignerElementComponent =
        FormElements[element.type].designerComponent;

      node = (
        <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-60 pointer-events-none">
          <DesignerElementComponent elementsInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
}
