import Card from "@/components/Card";
import { ScrollShadow } from "@heroui/scroll-shadow";

export default function Home() {
  return (
    <ScrollShadow className="relative p-4 w-full h-full space-y-4">
      <Card title="Museum" imageUrl="/images/Museum.png" progress="0/3" />
      <Card
        title="Prinsentuin"
        imageUrl="/images/Prinsentuin.png"
        progress="0/3"
      />
      <Card title="Noorderplantsoen" imageUrl="/images/Noorderplantsoen.png" progress="0/3" />
      <Card title="Vismarkt" imageUrl="/images/Vismarkt.png" progress="0/3" />
      <Card title="Forum" imageUrl="/images/Forum.png" progress="0/3" />
      <Card title="Diepenring" imageUrl="/images/Gracht.png" progress="0/3" />

      {/* This is for spacing on the bottom to prevent the navigation from overlapping */}
      <div className="h-24"></div>
    </ScrollShadow>
  );
}
