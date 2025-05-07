"use client";

import { useParams } from "next/navigation";
import data from "@/__mocks__/opdrachten.json";
import Image from "next/image";
import { LuChevronLeft } from "react-icons/lu";
import Link from "next/link";
import { Button, ScrollShadow } from "@heroui/react";

const TabButton = ({
  children,
  selected,
}: {
  children: React.ReactNode;
  selected?: boolean;
}) => {
  return (
    <Button
      className={`rounded-full ${selected ? "bg-nav text-white" : ""}`}
      size="lg"
    >
      {children}
    </Button>
  );
}

export default function ViewPage() {
  const params = useParams<{ id: string }>();
  const location = data.find((location) => location.id === parseInt(params.id));

  if (!location) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Location not found
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-start w-full h-screen max-h-screen overflow-y-scroll">
      <Link
        href="/"
        className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md z-[100]"
      >
        <LuChevronLeft className="text-3xl text-nav" />
      </Link>

      <Image
        src={location.imageUrl}
        alt={location.title}
        width={500}
        height={500}
        className="absolute w-screen h-[400px] top-0 left-0 object-cover object-center"
      />

      <div className="relative mt-[375px] flex flex-col items-start justify-start w-full h-full p-4 space-y-4 rounded-t-3xl z-[10] bg-background overflow-hidden">
        <div className="flex items-center justify-start w-full gap-4">
          <TabButton selected>
            Over deze plek
          </TabButton>
          <TabButton>
            Opdrachten
          </TabButton>
        </div>
        
        <ScrollShadow className="w-full h-full pt-[10px] mb-24 space-y-4">
          <h1 className="text-3xl font-semibold text-neutral-950">
            {location.title}
          </h1>
          <p className="text-lg text-neutral-950">{location.description}</p>
        </ScrollShadow>
      </div>
    </div>
  );
}
