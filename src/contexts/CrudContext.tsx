import { createContext, ReactNode } from "react";

interface CrudContextProviderProps {
  children: ReactNode;
}

interface Client {
  id: string;
  name: string;
  email: string;
}

interface ContextProps {}

export const CrudContext = createContext({} as ContextProps);

export function CrudContextProvider({ children }: CrudContextProviderProps) {
  return <CrudContext.Provider value={{}}>{children}</CrudContext.Provider>;
}
