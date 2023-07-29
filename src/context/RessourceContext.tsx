"use client";
import { FC, createContext, useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type RessourceType = {
  id: number;
  step: number;
} & RequestBody;

type RessourceContextType = {
  ressources: RessourceType[];
  addItem: (item: RessourceType) => void;
  updateItem: (item: RessourceType) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

export const RessourceContext = createContext<RessourceContextType>(null!);

export const RessourceContextProvider: FC<Props> = ({ children }) => {
  const [ressources, setRessources] = useState<RessourceType[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const addItem = (item: RessourceType) => {
    setRessources([...ressources, item]);
    localStorage.setItem("ressources", JSON.stringify([...ressources, item]));
  };

  const updateItem = (item: RessourceType) => {
    const index = ressources.findIndex((ressource) => ressource.id === item.id);
    const newArray = [...ressources];
    newArray[index] = item;
    setRessources(newArray);
    localStorage.setItem("ressources", JSON.stringify([...ressources, item]));
  };

  useEffect(() => {
    const ressources = localStorage.getItem("ressources");
    if (ressources) {
      setRessources(JSON.parse(ressources));
    }
  }, []);

  return (
    <RessourceContext.Provider value={{ ressources, addItem, updateItem, currentStep, setCurrentStep }}>
      {children}
    </RessourceContext.Provider>
  );
};
