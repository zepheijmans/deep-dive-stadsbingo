import Image from "next/image";

type CardProps = {
  title: string;
  imageUrl: string;
  progress: string;
  locked?: boolean;
};

const Card = ({ title, imageUrl, progress, locked }: CardProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-62 overflow-hidden rounded-3xl">
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
    </div>
  );
};

export default Card;
