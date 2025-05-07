"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { LuChevronLeft } from "react-icons/lu";
import Link from "next/link";
import { Button, PressEvent, ScrollShadow } from "@heroui/react";
import { useState } from "react";
import { Accordion, AccordionItem } from "@heroui/react";
import { IoIosCheckmark } from "react-icons/io";
import { useAssignments } from "@/context/AssignmentsContext";
import clsx from "clsx";

const TabButton = ({
  children,
  selected,
  onPress,
}: {
  children: React.ReactNode;
  selected?: boolean;
  onPress?: ((e: PressEvent) => void) | undefined;
}) => {
  return (
    <Button
      className={`rounded-full ${selected ? "bg-nav text-white" : ""}`}
      size="lg"
      onPress={onPress}
    >
      {children}
    </Button>
  );
};

export default function ViewPage() {
  const params = useParams<{ id: string }>();
  const { locations, markAssignmentCompleted, markAssignmentIncomplete } = useAssignments();
  const location = locations.find(
    (location) => location.id === parseInt(params.id)
  );
  const [selectedTab, setSelectedTab] = useState<number>(0);

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
        <div className="flex items-center justify-center w-full gap-4">
          <TabButton
            selected={selectedTab === 0}
            onPress={() => setSelectedTab(0)}
          >
            Over deze plek
          </TabButton>
          <TabButton
            selected={selectedTab === 1}
            onPress={() => setSelectedTab(1)}
          >
            Opdrachten
          </TabButton>
        </div>

        <ScrollShadow className="w-full h-full pt-[10px] mb-24 space-y-4">
          {selectedTab === 0 ? (
            <>
              <h1 className="text-3xl font-semibold text-neutral-950">
                {location.title}
              </h1>
              <p className="text-lg text-neutral-950">{location.description}</p>
            </>
          ) : (
            <div>
              <Accordion variant="splitted">
                {location.assignments.map((assignment, index) => (
                  <AccordionItem
                    key={index}
                    aria-label={`Opdracht ${index + 1}`}
                    title={`Opdracht ${index + 1}`}
                    className={clsx(
                      "bg-white rounded-3xl px-4",
                      assignment.completed ? "bg-success-100" : "bg-white"
                    )}
                  >
                    <div className="flex items-center w-full h-full pb-4 space-y-4 gap-4 items-center justify-center">
                      <Button
                        radius="full"
                        size="sm"
                        color={assignment.completed ? "success" : "default"}
                        onPress={() =>
                          assignment.completed
                            ? markAssignmentIncomplete(location.id, assignment.id)
                            : markAssignmentCompleted(location.id, assignment.id)
                        }
                        startContent={
                          <IoIosCheckmark className="text-white w-12 h-12" />
                        }
                        isIconOnly
                      />

                      <p>{assignment.description}</p>
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </ScrollShadow>
      </div>
    </div>
  );
}
