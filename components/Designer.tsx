import React, { useState } from "react";
import DesignerSidebar from "./DesignerSidebar";
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { FormElements, formElementInstance } from "./FormElements";
import useDesigner from "@/hooks/useDesigner";
import { idGenerator } from "@/lib/idGenerator";
import { Button } from "./ui/button";
import { BiSolidTrash } from "react-icons/bi";

export default function Designer() {
  const { elements, addElement, setSelectedElement, selectedElement} = useDesigner();
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  // Ekleme işlemi
  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerBtnElement = active?.data?.current?.isDesignerBtnElement;
      if (isDesignerBtnElement) {
        const type: keyof typeof FormElements = active?.data?.current?.type;
        const newElement = FormElements[type].construct(idGenerator());

        addElement(0, newElement);

      }
    },
  });
  return (
    <div className="flex w-full h-full">
      <div className="w-full p-4" onClick={() => {
        if(selectedElement) setSelectedElement(null)
      }}>
        <div
          ref={droppable.setNodeRef}
          className={cn(
            `p-4 w-full bg-background max-w-[920px] h-full mx-auto rounded-xl
        flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto`,
            droppable.isOver && "ring-2 ring-primary/20"
          )}
        >
          {!droppable.isOver && elements.length == 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Buraya Sürükleyin
            </p>
          )}

          {droppable.isOver && elements.length === 0 &&  (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}

          {elements.length > 0 && (
            <div className="flex flex-col  w-full gap-2 p-4">
              {elements?.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>

      <DesignerSidebar />
    </div>
  );
}

function DesignerElementWrapper({ element }: { element: formElementInstance }) {
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const { removeElement, selectedElement, setSelectedElement } = useDesigner();
  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      id: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      id: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null;
  console.log(selectedElement,'selectedElement')
  const DesignerElement = FormElements[element.type].designerComponent;
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer
     rounded-md  ring-1 ring-accent ring-inset
     "
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={(e) => {
        e.stopPropagation();        
        setSelectedElement(element)
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className={"absolute  w-full h-1/2 rounded-t-md"}
      ></div>
      <div
        ref={bottomHalf.setNodeRef}
        className={"absolute  w-full h-1/2 bottom-0 rounded-t-md"}
      ></div>
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              variant={"outline"}
              className=" border rounded-md rounded-l-none bg-red-500 h-full"
              onClick={(e) =>{
                e.stopPropagation();
                removeElement(element.id)
              }}
            >
              <BiSolidTrash className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">
              Hareket ettirmek için tutup sürükleyin özellikleri için ise
              tıklayınız
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div
          className="absolute top-0 w-full rounded-md h-[7px] bg-primary
          rounded-b-none
          "
        />
      )}

      {bottomHalf.isOver &&  (
        <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary    rounded-t-none" />
      )}

      <div
        className={cn(
          "flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none",
          mouseIsOver && "opacity-30"
        )}
      >
        <DesignerElement elementsInstance={element} />
      </div>
    </div>
  );
}
