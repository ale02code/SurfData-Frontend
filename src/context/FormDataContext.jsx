import { createContext, useState } from "react";

export const FormDataContext = createContext();

export const FormDataContextProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    producto: "",
    precio: "",
    cantidad: "",
  });

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};