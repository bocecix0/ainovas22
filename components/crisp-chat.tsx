"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("eaeca578-cd58-48e4-992c-b0732172b1fe");
  }, []);

  return null;
};
