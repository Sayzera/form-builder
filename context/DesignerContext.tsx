"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";
import { formElementInstance } from "../components/FormElements";

type DesignerContextType = {
  elements: formElementInstance[];
  addElement: (index: number, element: formElementInstance) => void;
  removeElement: (id: string) => void;
  selectedElement: formElementInstance | null;
  setSelectedElement: Dispatch<SetStateAction<formElementInstance | null>>;
  updateElement: (id: string, element: formElementInstance) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [elements, setElements] = useState<formElementInstance[]>([]);

  const [selectedElement, setSelectedElement] =
    useState<formElementInstance | null>(null);


  const addElement = (index: number, element: formElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);

      return newElements;
    });
  };

  const removeElement = (id: string) => {
    const newElements = elements.filter((element) => element.id !== id);
    setElements(newElements);
  };

  const updateElement = (id: string, element: formElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex(el => el.id === id);
      newElements[index] = element;
      return newElements;
    });
  };

  return (
    <DesignerContext.Provider
      value={{
        elements,
        addElement,
        removeElement,
        selectedElement,
        setSelectedElement,
        updateElement,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
