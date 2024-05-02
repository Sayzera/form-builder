"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";
import { formSchema, formSchemaTye } from "@/schemas/form";
import { CreateFrom } from "@/actions/form";
import {BsFileEarmarkPlus} from 'react-icons/bs'
import { useRouter } from "next/navigation";

type Props = {};
export default function CreateFormButton({}: Props) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const form = useForm<formSchemaTye>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: formSchemaTye) {
    try {
     const formId =  await CreateFrom(values)

      toast({
        title: 'Başarılı',
        description: 'Form başarıyla oluşturuldu',
      })
      router.push('/builder/' + formId)
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error?.message,
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <Dialog>
        <DialogTrigger className="w-full">
          <Button 
          variant={'outline'}
          className="group border border-primary/20  h-[190px] items-center justify-center flex flex-col hover:border-primary
            hover:cursor-pointer border-dashed gap-4 bg-background w-full ">
            <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
            <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">Yeni Form Oluştur</p>
            </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Form Oluştur</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Sayfalarınızı oluşturmaya başlamak için yeni bir form oluşturun.
          </DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Form Adı</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Açıklama</FormLabel>
                    <FormControl>
                      <Textarea rows={5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>

            <DialogFooter>
              <Button
                disabled={form.formState.isSubmitting}
                className="w-full mt-4"
                onClick={form.handleSubmit(onSubmit)}
              >
                {!form.formState.isSubmitting ? (
                  <span>Kaydet</span>
                ) : (
                  <ImSpinner2 className="animate-spin" />
                )}
              </Button>
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
