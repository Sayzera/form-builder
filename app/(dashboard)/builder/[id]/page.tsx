import { GetFormById } from "@/actions/form";
import FormBuilder from "@/components/FormBuilder";
import React from "react";

export default async function BuilderPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  if (!id) throw new Error("Herhangi bir seçili form bulunamadı.");

  const form = await GetFormById(Number(id));
  if (!form) throw new Error("Form bulunamadı.");

  return  <FormBuilder form={form} />
  
}
