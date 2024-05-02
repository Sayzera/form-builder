import { GetFormStats, GetForms } from "@/actions/form";
import { LuView } from "react-icons/lu";
import React, { ReactNode, Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { Separator } from "@/components/ui/separator";
import CreateFormButton from "@/components/CreateFormButton";
import { Form } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { tr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";

type Props = {};

export default function Page({}: Props) {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true}  />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />

      <h2 className="text-4xl font-bold col-span-2">Formlarınız</h2>
      <Separator className="my-6" />
      <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormButton />
        <Suspense
          fallback={[1, 2, 3, 4].map((e) => (
            <FormCardSkeleton key={e} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();
  console.log(stats);
  return <StatsCards loading={false} data={stats} />;
}

interface StatsCardProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>; // Fonksiyonun içerisinde döndüklerini type olarak oluşturdum.
  loading: boolean;
}

function StatsCards(props: StatsCardProps) {
  const { data, loading } = props;
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Toplam Ziyaret"
        icon={<LuView className="text-blue-600" />}
        helperText="Toplam ziyaret sayısı"
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />
      <StatsCard
        title="Toplam Gönderim"
        icon={<FaWpforms className="text-yellow-600" />}
        helperText="Toplam gönderim sayısı"
        value={data?.submissions?.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-yellow-600"
      />

      <StatsCard
        title="Gönderim Oranı"
        icon={<HiCursorClick className="text-green-600" />}
        helperText="Formu kullanan kullanıcıların gönderim oranı"
        value={data?.submissionsRate?.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-green-600"
      />

      <StatsCard
        title="Dönüş Oranı"
        icon={<TbArrowBounce className="text-red-600" />}
        helperText="Formu kullanan kullanıcıların dönüş oranı"
        value={data?.bounceRate?.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-red-600"
      />
    </div>
  );
}

function StatsCard({
  title,
  value,
  icon,
  helperText,
  loading,
  className,
}: {
  title: string;
  value: string;
  helperText: string;
  className: string;
  loading: boolean;
  icon: ReactNode;
}) {
  return (
    <Card className={className}>
      <CardHeader
        className="flex flex-row items-center 
        justify-between pb-2
        "
      >
        <CardTitle>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
      </CardContent>
    </Card>
  );
}

function FormCardSkeleton() {
  return <Skeleton className="border border-primary/20 h-[190px] w-full" />;
}

async function FormCards() {
  const forms = await GetForms();

  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}

function FormCard({ form }: { form: Form }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold">{form.name}</span>
          {form.published && <Badge>Yayında</Badge>}
          {!form.published && <Badge variant={"destructive"}>Taslak</Badge>}
        </CardTitle>
        <CardDescription className="flex items-center justify-between test-muted-foreground text-sm">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
            locale: tr,
          })}
          {!form.published && (
            <span className="flex items-center gap-2">
              <LuView className="text-muted-foreground" />
              <span>{form.visits.toLocaleString()}</span>
              <FaWpforms className="text-muted-foreground" />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "Form açıklaması yok"}
      </CardContent>

      <CardFooter>
        {form.published && (
          <Button asChild variant={'secondary'} className="w-full mt-2 text-md gap-4">
            <Link href={`/forms/${form.id}`}>
              Görüntüle
              <BiRightArrowAlt />
            </Link>
          </Button>
        )}

        {!form.published && (
          <Button asChild variant={'secondary'} className="w-full mt-2 text-md gap-4">
            <Link href={`/builder/${form.id}`}>
              Düzenle
              <FaEdit />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
