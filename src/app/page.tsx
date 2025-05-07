import Card from "@/components/Card";
import { ScrollShadow } from "@heroui/scroll-shadow";
import data from "@/__mocks__/opdrachten.json";

export default function Home() {
  return (
    <ScrollShadow className="relative p-4 w-full h-full space-y-4">
      {data.map((location, index) => (
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
        />
      ))}

      {/* This is for spacing on the bottom to prevent the navigation from overlapping */}
      <div className="h-24"></div>
    </ScrollShadow>
  );
}
