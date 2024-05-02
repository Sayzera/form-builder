"use client";

import { MdTextFields } from "react-icons/md";
import {
  ElementsType,
  FormElement,
  formElementInstance,
} from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import useDesigner from "@/hooks/useDesigner";

const type: ElementsType = "TextField";

const extraAttributes = {
  label: "Text Field",
  helperText: "Yardım metni",
  required: false,
  placeholder: "Bir şeyler yazın",
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeholder: z.string().max(50),
});

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: "Text Field",
  },
  designerComponent: ({ elementsInstance }) => (
    <DesignerComponent elementsInstance={elementsInstance} />
  ),
  formComponent: () => <div>Form Component</div>,
  propertiesComponent: ({ elementsInstance }) => (
    <PropertiesComponent elementsInstance={elementsInstance} />
  ),
};

type CustomInstance = formElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
  elementsInstance,
}: {
  elementsInstance: formElementInstance;
}) {
  const element = elementsInstance as CustomInstance;
  const { label, required, helperText, placeholder } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <Input readOnly disabled placeholder={placeholder} />
      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  );
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({
  elementsInstance,
}: {
  elementsInstance: formElementInstance;
}) {
  const element = elementsInstance as CustomInstance;
  const {updateElement} = useDesigner();
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      placeholder: element.extraAttributes.placeholder,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    const { label, helperText, required, placeholder } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helperText,
        required,
        placeholder,
      },
    });
  }

  return <div>{element.extraAttributes.label} için form özellikleri</div>;
}
