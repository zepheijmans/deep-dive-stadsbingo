import Card from "@/components/Card";
import { ScrollShadow } from "@heroui/scroll-shadow";

export default function Home() {
  return (
    <ScrollShadow className="relative p-4 w-full h-full space-y-4">
      <Card title="Diepenring" imageUrl="/images/Museum.png" progress="0/3" />
      <Card
        title="Prinsentuin"
        imageUrl="/images/Prinsentuin.png"
        progress="0/3"
      />
      <Card title="A-kerk" imageUrl="/images/Akerk.png" progress="0/3" />
      <Card title="Gracht" imageUrl="/images/Gracht.png" progress="0/3" />
      <Card title="Gracht" imageUrl="/images/Gracht.png" progress="0/3" />
      <Card title="Gracht" imageUrl="/images/Gracht.png" progress="0/3" />
      <Card title="Gracht" imageUrl="/images/Gracht.png" progress="0/3" />
      <Card title="Gracht" imageUrl="/images/Gracht.png" progress="0/3" />
    </ScrollShadow>
  );
}
