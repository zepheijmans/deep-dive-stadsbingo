import { motion, PanInfo } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/react";

const steps = [
  {
    id: 1,
    title: "Welkom",
    text: "Welkom bij de stadsbingo! Jullie zijn vrij om jullie eigen route te kiezen door de stad. Er zijn locaties met verschillende opdrachten, het doel is om bingo te krijgen binnen twee uur.",
    image: "/images/welcome.png",
  },
  {
    id: 2,
    title: "Stippel je route",
    text: "Kies een route door de stad. Je kunt zelf bepalen welke locaties je wilt bezoeken. Er zijn geen vaste routes, maar je kunt de locaties in willekeurige volgorde bezoeken.",
    image: "/images/navigation.png",
  },
  {
    id: 3,
    title: "Bingo",
    text: "Probeer zoveel mogelijk opdrachten te voltooien binnen de tijd, veel plezier!",
    image: "/images/winners.png",
  },
];

type TutorialProps = {
  setShowTutorial: (show: boolean) => void;
}

const Tutorial = ({ setShowTutorial }: TutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for previous

  const handleNext = () => {
    setDirection(1);
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
    if (info.offset.x < -100) {
      handleNext();
    } else if (info.offset.x > 100) {
      handlePrev();
    }
  };

  const handleTutorialFinish = () => {
    if (!localStorage) return;

    localStorage.setItem("showTutorial", JSON.stringify(false));
    setShowTutorial(false);
  };

  return (
    <motion.div
      className="w-screen h-screen flex flex-col items-center justify-center bg-nav text-white z-[1000]"
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <motion.div
        className="w-full h-full flex items-center justify-center overflow-hidden relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }} // Add scale and opacity animation on exit
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <motion.div
          className="flex w-full h-full"
          key={currentStep}
          initial={{ x: direction === 1 ? 300 : -300 }}
          animate={{ x: 0 }}
          exit={{ x: direction === 1 ? -300 : 300 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
        >
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`p-4 flex flex-col items-center justify-center gap-4 absolute w-full h-full ${
                index === currentStep ? "z-10" : "z-0"
              }`}
              style={{
                transform: `translateX(${(index - currentStep) * 100}%)`,
                opacity: index === currentStep ? 1 : 0.5,
              }}
            >
              <h1 className="text-4xl font-semibold">{step.title}</h1>
              <p className="text-neutral-400 text-lg text-center">
                {step.text}
              </p>
              <Image
                src={step.image}
                alt={`tutorial_${step.id}`}
                width={500}
                height={500}
                className="mt-8 w-full h-[300px] object-contain object-center rounded-3xl"
              />

              {step.id === steps.length && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <Button
                    radius="full"
                    size="lg"
                    color="primary"
                    variant="flat"
                    className="font-semibold text-primary-300"
                    onPress={handleTutorialFinish}
                  >
                    Start
                  </Button>
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
      </motion.div>
      <div className="relative flex gap-2 mb-4">
        {steps.map((_, index) => (
          <div
            key={index}
            className="w-3 h-3 rounded-full bg-neutral-600"
          ></div>
        ))}
        <motion.div
          className="absolute w-3 h-3 rounded-full bg-white"
          layout
          initial={false}
          animate={{ x: currentStep * 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        ></motion.div>
      </div>
    </motion.div>
  );
};

export default Tutorial;