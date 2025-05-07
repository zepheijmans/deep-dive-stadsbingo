'use client';

import clsx from "clsx";
import { JSX } from "react";
import { RiHome5Line, RiHome5Fill, RiTrophyLine, RiTrophyFill, RiMap2Line, RiMap2Fill } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

type NavigationItemProps = {
  link: string;
  icon: {
    active: JSX.Element;
    inactive: JSX.Element;
  };
  isActive: boolean;
};

const NavigationItem = ({ link, icon, isActive }: NavigationItemProps) => {
  return (
    <Link href={link}>
      <motion.div
        whileTap={{ scale: 0.9 }}
        className={clsx(
          "p-3 text-2xl w-14 h-14 rounded-full bg-nav flex items-center justify-center",
          isActive ? "bg-white text-nav" : "bg-nav text-white",
        )}
      >
        {isActive ? icon.active : icon.inactive}
      </motion.div>
    </Link>
  );
};

const Navigation = () => {
  const pathname = usePathname();

  return (
    <div className="absolute bottom-4 left-0 w-full h-[70px] px-4 flex items-center justify-center z-[100]">
      <div className="p-2 bg-nav h-full rounded-full flex items-center justify-center gap-4">
        <NavigationItem
          link="/"
          icon={{
            active: <RiHome5Fill />,
            inactive: <RiHome5Line />,
          }}
          isActive={pathname === "/"}
        />
        <NavigationItem
          link="/bingo"
          icon={{
            active: <RiTrophyFill />,
            inactive: <RiTrophyLine />,
          }}
          isActive={pathname === "/bingo"}
        />
        <NavigationItem
          link="/map"
          icon={{
            active: <RiMap2Fill />,
            inactive: <RiMap2Line />,
          }}
          isActive={pathname === "/map"}
        />
      </div>
    </div>
  );
};

export default Navigation;
