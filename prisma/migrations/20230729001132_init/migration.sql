-- CreateTable
CREATE TABLE "ResourceGroup" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "resourceGroupName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "projectName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "NetworkInterface" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "resourceGroupName" TEXT NOT NULL,
    "virtualNetworkName" TEXT NOT NULL,
    "publicIpName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "networkInterfaceName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PublicIpAddress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "resourceGroupName" TEXT NOT NULL,
    "publicIpName" TEXT NOT NULL,
    "location" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "StorageAccount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "resourceGroupName" TEXT NOT NULL,
    "storageAccountName" TEXT NOT NULL,
    "accType" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "projectName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "VirtualMachine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "resourceGroupName" TEXT NOT NULL,
    "virtualMachineName" TEXT NOT NULL,
    "networkInterfaceName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "diskName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "VirtualNetwork" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "resourceGroupName" TEXT NOT NULL,
    "virtualNetworkName" TEXT NOT NULL,
    "location" TEXT NOT NULL
);
