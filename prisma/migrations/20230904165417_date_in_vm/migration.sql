-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VirtualMachine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "resourceGroupName" TEXT NOT NULL,
    "virtualMachineName" TEXT NOT NULL,
    "networkInterfaceName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "diskName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_VirtualMachine" ("diskName", "id", "location", "networkInterfaceName", "password", "resourceGroupName", "username", "virtualMachineName") SELECT "diskName", "id", "location", "networkInterfaceName", "password", "resourceGroupName", "username", "virtualMachineName" FROM "VirtualMachine";
DROP TABLE "VirtualMachine";
ALTER TABLE "new_VirtualMachine" RENAME TO "VirtualMachine";
CREATE UNIQUE INDEX "VirtualMachine_virtualMachineName_key" ON "VirtualMachine"("virtualMachineName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
