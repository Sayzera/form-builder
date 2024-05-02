import { JSXElementConstructor, ReactElement } from "react";
import { TextFieldFormElement } from "./fields/TextField";
import { IconType } from "react-icons/lib";

export type ElementsType = 'TextField';

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => formElementInstance;

  designerBtnElement: {
    icon: React.ElementType | IconType;
    label: string;
  }

  designerComponent: React.FC<{
    elementsInstance: formElementInstance
  }>;
  formComponent: React.FC;
  propertiesComponent: React.FC<{
    elementsInstance: formElementInstance
  }>;
}


export type formElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string,any>
  
}

type FormElementType = {
  [key in ElementsType]: FormElement;
}

export const FormElements: FormElementType = {
   TextField: TextFieldFormElement
}