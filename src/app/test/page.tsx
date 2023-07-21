"use client";

import CreateRessourceForm from "@/components/CreateRessourceForm";

const Page = () => {
  const vmData = {
    username: "User1",
    password: "password1",
    ip: "192.168.1.1",
    os: "Ubuntu",
    status: "running",
    price: "20",
  };

  return (
    <>
      <CreateRessourceForm />
      {/* <Vm vmData={vmData} />;
      <Vm vmData={vmData} />; */}
    </>
  );
};

export default Page;
