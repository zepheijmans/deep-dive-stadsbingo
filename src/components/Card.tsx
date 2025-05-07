import Image from "next/image";
import Link from "next/link";

type CardProps = {
  locationId: number;
  title: string;
  imageUrl: string;
  progress: string;
  locked?: boolean;
};

const Card = ({ locationId, title, imageUrl, progress, locked }: CardProps) => {
  return (
    <Link
      href={`/view/${locationId}`}
      className="relative flex flex-col items-center justify-center w-full h-62 overflow-hidden rounded-3xl"
    >
      <Image
        src={imageUrl}
        alt="Museum"
        width={500}
        height={500}
        className="w-full h-full object-cover object-center"
      />

      <h3 className="absolute bottom-3 left-3 text-2xl font-semibold text-white">
        {title}
      </h3>

      <span className="absolute bottom-3 right-3 text-lg font-semibold text-white">
        {progress}
      </span>
    </Link>
  );
};

export default Card;
