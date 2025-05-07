"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import initialData from "@/__mocks__/opdrachten.json";

type Assignment = {
  id: number;
  description: string;
  completed: boolean;
};

type Location = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  assignments: Assignment[];
};

type AssignmentsContextType = {
  locations: Location[];
  markAssignmentCompleted: (locationId: number, assignmentId: number) => void;
  markAssignmentIncomplete: (locationId: number, assignmentId: number) => void;
};

const AssignmentsContext = createContext<AssignmentsContextType | undefined>(
  undefined
);

export const AssignmentsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [locations, setLocations] = useState<Location[]>(initialData);

  useEffect(() => {
    // Load progress data from localStorage after the component mounts
    const storedProgress = localStorage.getItem("progress");
    if (storedProgress) {
      const progress = JSON.parse(storedProgress);
      setLocations((prevLocations) =>
        prevLocations.map((location) => ({
          ...location,
          assignments: location.assignments.map((assignment) => ({
            ...assignment,
            completed: progress[location.id]?.[assignment.id] || false,
          })),
        }))
      );
    }
  }, []);

  useEffect(() => {
    // Extract and save only progress data to localStorage whenever it changes
    const progress = locations.reduce((acc, location) => {
      acc[location.id] = location.assignments.reduce((locAcc, assignment) => {
        locAcc[assignment.id] = assignment.completed;
        return locAcc;
      }, {} as Record<number, boolean>);
      return acc;
    }, {} as Record<number, Record<number, boolean>>);

    localStorage.setItem("progress", JSON.stringify(progress));
  }, [locations]);

  const markAssignmentCompleted = (
    locationId: number,
    assignmentId: number
  ) => {
    setLocations((prevLocations) =>
      prevLocations.map((location) =>
        location.id === locationId
          ? {
              ...location,
              assignments: location.assignments.map((assignment) =>
                assignment.id === assignmentId
                  ? { ...assignment, completed: true }
                  : assignment
              ),
            }
          : location
      )
    );
  };

  const markAssignmentIncomplete = (
    locationId: number,
    assignmentId: number
  ) => {
    setLocations((prevLocations) =>
      prevLocations.map((location) =>
        location.id === locationId
          ? {
              ...location,
              assignments: location.assignments.map((assignment) =>
                assignment.id === assignmentId
                  ? { ...assignment, completed: false }
                  : assignment
              ),
            }
          : location
      )
    );
  };

  return (
    <AssignmentsContext.Provider
      value={{ locations, markAssignmentCompleted, markAssignmentIncomplete }}
    >
      {children}
    </AssignmentsContext.Provider>
  );
};

export const useAssignments = () => {
  const context = useContext(AssignmentsContext);
  if (!context) {
    throw new Error(
      "useAssignments must be used within an AssignmentsProvider"
    );
  }
  return context;
};
