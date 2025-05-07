"use client";

import Card from "@/components/Card";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { useAssignments } from "@/context/AssignmentsContext";

export default function Home() {
  const { locations } = useAssignments();

  return (
    <ScrollShadow className="relative p-4 w-full h-full space-y-4">
      {locations.map((location, index) => (
        <Card
          key={index}
          locationId={location.id}
          title={location.title}
          imageUrl={location.imageUrl}
          progress={
            location.assignments.filter((assignment) => assignment.completed).length +
            "/" +
            location.assignments.length
          }
          inProgress={location.assignments.some((assignment) => assignment.completed)}
          completed={location.assignments.every((assignment) => assignment.completed)}
        />
      ))}

      {/* This is for spacing on the bottom to prevent the navigation from overlapping */}
      <div className="h-24"></div>
    </ScrollShadow>
  );
}
