/*
  Warnings:

  - A unique constraint covering the columns `[virtualMachineName]` on the table `VirtualMachine` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VirtualMachine_virtualMachineName_key" ON "VirtualMachine"("virtualMachineName");
