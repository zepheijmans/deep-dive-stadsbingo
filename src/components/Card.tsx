"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { RiProgress5Line } from "react-icons/ri";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { getOpeningTimes, isOpen } from "@/libs/location";

type CardProps = {
  locationId: number;
  title: string;
  imageUrl: string;
  progress: string;
  inProgress?: boolean;
  completed?: boolean;
  openingHours?: number;
  closingHours?: number;
};

const Card = ({
  locationId,
  title,
  imageUrl,
  progress,
  inProgress,
  completed,
  openingHours,
  closingHours,
}: CardProps) => {
  return (
    <Link
      href={`/view/${locationId}`}
      className="relative flex flex-col items-center justify-center w-full h-62 overflow-hidden rounded-3xl"
    >
      <div
        className={clsx(
          "absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50",
          inProgress &&
            !completed &&
            "bg-gradient-to-t from-warning-500 to-transparent",
          completed && "bg-gradient-to-t from-success-500 to-transparent"
        )}
      ></div>

      {openingHours && closingHours && isOpen(openingHours, closingHours) && (
        <>
          <div className="absolute top-3 right-3 bg-white text-black rounded-full px-2 py-1 text-sm font-semibold">
            Nu geopend
          </div>
          <div className="absolute top-3 right-3 bg-warning-500 text-white rounded-full px-2 py-1 text-sm font-semibold">
            Sluit om {getOpeningTimes(openingHours, closingHours).closingTime}
          </div>
        </>
      )}

      {openingHours && closingHours && !isOpen(openingHours, closingHours) && (
        <div className="absolute top-3 right-3 bg-red-500 text-white rounded-full px-2 py-1 text-sm font-semibold">
          Opent om {getOpeningTimes(openingHours, closingHours).openingTime}
        </div>
      )}

      {inProgress && !completed && (
        <RiProgress5Line className="absolute text-4xl text-white" />
      )}

      {completed && (
        <IoIosCheckmarkCircle className="absolute text-4xl text-white" />
      )}

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
