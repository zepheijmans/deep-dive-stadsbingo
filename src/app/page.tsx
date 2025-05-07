import Card from "@/components/Card";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-start h-screen max-h-screen overflow-hidden">
      <div className="relative p-4 flex flex-col w-full h-full gap-4">
        <Card title="Diepenring" imageUrl="/images/Museum.png" progress="0/3" />
        <Card title="Prinsentuin" imageUrl="/images/Prinsentuin.png" progress="0/3" />
        <Card title="A-kerk" imageUrl="/images/Akerk.png" progress="0/3" />
        <Card title="Gracht" imageUrl="/images/Gracht.png" progress="0/3" />
      </div>
    </div>
  );
}