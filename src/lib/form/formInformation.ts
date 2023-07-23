import * as Yup from "yup";

export const ressourceGroupValidationSchema = Yup.object().shape({
  projectName: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  resourceGroupName: Yup.string().required("Required"),
});
export const ressourceGroupInitialValues = {
  projectName: "projectName",
  location: "location",
  resourceGroupName: "ressourceGroupName",
};

export const storageAccountValidationSchema = Yup.object().shape({
  storageAccountName: Yup.string().required("Required"),
  accType: Yup.string().required("Required"),
});
export const storageAccountInitialValues = {
  storageAccountName: "storageAccountName",
  accType: "accType",
};

export const virtualNetworkValidationSchema = Yup.object().shape({
  virtualNetworkName: Yup.string().required("Required"),
});
export const virtualNetworkInitialValues = {
  virtualNetworkName: "",
};

export const publicIpAdressValidationSchema = Yup.object().shape({
  publicIpName: Yup.string().required("Required"),
});
export const publicIpAdressInitialValues = {
  publicIpName: "",
};

export const networkInterfaceValidationSchema = Yup.object().shape({
  networkInterfaceName: Yup.string().required("Required"),
});
export const networkInterfaceInitialValues = {
  networkInterfaceName: "",
};
