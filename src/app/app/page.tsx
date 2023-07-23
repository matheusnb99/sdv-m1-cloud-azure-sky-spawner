"use client";

import Auth from "@/components/Auth";
import CreateRessourceForm from "@/components/CreateRessourceForm";
import VmList from "@/components/VmList";
import { AuthContext } from "@/context/AuthContext";
import { UserContext } from "@/context/UserContext";
import Button from "@/core/Button";
import { FunctionComponent, useContext, useEffect, useState } from "react";

interface ApplicationProps {}

const Application: FunctionComponent<ApplicationProps> = () => {
  const { user } = useContext(UserContext);
  const { loginAd } = useContext(AuthContext);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [createRessourcesPopup, setCreateRessourcesPopup] = useState<boolean>(false);

  const { jwt } = useContext(AuthContext);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const setStep = (step: number) => {
    setCurrentStep(step);

    if (step === 7) {
      setCreateRessourcesPopup(false);
    }
  };

  if (!jwt) {
    return (
      <>
        Loading, if this takes too long, please refresh the page.
        {/* button that reloads page */}
        <button
          onClick={() => {
            loginAd();
          }}
        >
          Login
        </button>
      </>
    );
  }

  return (
    <main>
      <h1 className="text-6xl font-bold text-center text-red-600">Creation de VM</h1>
      {createRessourcesPopup && (
        <>
          <Button
            type="button"
            onClick={() => {
              setCreateRessourcesPopup(false);
            }}
          >
            Close PopUp
          </Button>

          <CreateRessourceForm currentStep={currentStep} setCurrentStep={setStep} />
        </>
      )}

      {!createRessourcesPopup && (
        <>
          {user && (
            <>
              {user.credits == 0 && (
                /* button that opens popup */
                <>Currently you dont have enought money to create a vm</>
              )}

              {user.credits > 0 && (
                /* button that opens popup */
                <>
                  <VmList />
                  Currently you don&apos;t have any vms!
                  <Button
                    type="button"
                    onClick={() => {
                      setCreateRessourcesPopup(true);
                    }}
                  >
                    Create One!
                  </Button>
                </>
              )}
            </>
          )}
        </>
      )}
      <div className="flex min-h-screen flex-col items-center justify-evenly p-24">{!user && <Auth />}</div>
    </main>
  );
};

export default Application;
