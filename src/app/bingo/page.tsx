"use client";

import { useAssignments } from "@/context/AssignmentsContext";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useState } from "react";

export default function BingoPage() {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(
    null
  );
  const [selectedAssignment, setSelectedAssignment] = useState<{
    locationTitle: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    assignment: any;
    index: number;
  } | null>(null);
  const { locations, markAssignmentCompleted, markAssignmentIncomplete } =
    useAssignments();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-3xl shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-6">Bingo</h1>
        <div className="grid grid-cols-5 gap-0 rounded-xl overflow-hidden bg-default-200">
          {locations.flatMap((location) =>
            location.assignments.map((assignment, index) => (
              <div
                key={`${location.id}-${assignment.id}`}
                className={`flex flex-col items-center justify-center h-16 w-16 font-bold cursor-pointer text-center rounded-full ${
                  location.assignments.every((a) => a.completed)
                    ? "bg-success-500 text-white"
                    : assignment.completed
                    ? "bg-success-100 text-success-500"
                    : "bg-transparent text-gray-700"
                }`}
                onClick={() => {
                  setSelectedLocation(location.id);
                  setSelectedAssignment({
                    locationTitle: location.title,
                    assignment,
                    index,
                  });
                  onOpen();
                }}
              >
                <span
                  className="text-xs truncate w-full px-1"
                  title={location.title}
                >
                  {location.title}
                </span>
                <span className="text-xs">#{index + 1}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedAssignment && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" className="bg-nav text-white rounded-3xl">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {selectedAssignment.locationTitle}
                </ModalHeader>
                <ModalBody>
                  <p className="text-sm text-gray-500 mb-2">
                    Opdracht {selectedAssignment.index + 1}
                  </p>
                  <p className="mb-4">{selectedAssignment.assignment.description}</p>
                </ModalBody>
                <ModalFooter className="justify-center">
                  <Button
                    color={selectedAssignment.assignment.completed ? "danger" : "success"}
                    variant="flat"
                    radius="full"
                    onPress={() => {
                      if (!selectedLocation) return;

                      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                      selectedAssignment.assignment.completed
                        ? markAssignmentIncomplete(
                            selectedLocation,
                            selectedAssignment.assignment.id
                          )
                        : markAssignmentCompleted(
                            selectedLocation,
                            selectedAssignment.assignment.id
                          );
                      onClose();
                    }}
                  >
                    {selectedAssignment.assignment.completed
                      ? "Opdracht ongedaan maken"
                      : "Opdracht afronden"}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
