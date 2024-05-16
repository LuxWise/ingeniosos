import React from "react";
import { Text, View } from "react-native";
import { AuthNavigation } from "./Stacks/AuthNavigation";
import { AppNavigation } from "./AppNavigation";
import { useSelector } from "react-redux";

export const HandlerNavigation = () => {
  // Define la estructura esperada para 'user'
  interface User {
    email: string;
    exp: number;
    iat: number;
    id: number;
    name: string;
    role: "Customer" | "Commercial" | "Admin" | "Proforma";
  }

  interface RootState {
    auth: {
      user: User | null;
    };
  }

  const user = useSelector((state: RootState) => state.auth.user);

  const isValidUser = (user: User | null): user is User => {
    return (
      !!user &&
      typeof user.email === "string" &&
      typeof user.exp === "number" &&
      typeof user.iat === "number" &&
      typeof user.id === "number" &&
      typeof user.name === "string" &&
      (user.role === "Customer" ||
        user.role === "Commercial" ||
        user.role === "Admin" ||
        user.role === "Proforma")
    );
  };

  return isValidUser(user) ? <AppNavigation /> : <AuthNavigation />;
};
