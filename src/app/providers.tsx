"use client";

import { AssignmentsProvider } from "@/context/AssignmentsContext";
import { HeroUIProvider } from "@heroui/react";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <HeroUIProvider>
      <AssignmentsProvider>{children}</AssignmentsProvider>
    </HeroUIProvider>
  );
};

export default Providers;
