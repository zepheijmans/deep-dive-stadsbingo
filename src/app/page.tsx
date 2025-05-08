"use client";

import Card from "@/components/Card";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { useAssignments } from "@/context/AssignmentsContext";
import { useEffect, useRef, useState } from "react";
import Tutorial from "@/components/Tutorial";

export default function Home() {
  const { locations } = useAssignments();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showTutorial, setShowTutorial] = useState<boolean>(false);

  // Show tutorial
  useEffect(() => {
    const tutorialState = localStorage.getItem("showTutorial");
    setShowTutorial(tutorialState ? JSON.parse(tutorialState) : true)
  }, [])

  // Save scroll position in local state
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // Restore scroll position
    const savedScrollPosition = sessionStorage.getItem("scrollPosition");
    if (savedScrollPosition) {
      scrollContainer.scrollTop = parseInt(savedScrollPosition, 10);
    }

    // Save scroll position on unmount
    const handleScroll = () => {
      sessionStorage.setItem(
        "scrollPosition",
        scrollContainer.scrollTop.toString()
      );
    };
    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {showTutorial ? (
        <Tutorial setShowTutorial={setShowTutorial}/>
      ) : (
        <ScrollShadow
          ref={scrollContainerRef}
          className="relative p-4 w-full h-full space-y-4"
        >
          {locations.map((location, index) => (
            <Card
              key={index}
              locationId={location.id}
              title={location.title}
              imageUrl={location.imageUrl}
              progress={
                location.assignments.filter(
                  (assignment) => assignment.completed
                ).length +
                "/" +
                location.assignments.length
              }
              inProgress={location.assignments.some(
                (assignment) => assignment.completed
              )}
              completed={location.assignments.every(
                (assignment) => assignment.completed
              )}
            />
          ))}

          {/* This is for spacing on the bottom to prevent the navigation from overlapping */}
          <div className="h-24"></div>
        </ScrollShadow>
      )}
    </>
  );
}
