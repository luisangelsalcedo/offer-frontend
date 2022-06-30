import React from "react";
import { OfferProvider } from "./context/OfferProvider";
import OfferTable from "./components/OfferTable";

import "./offerse.scss";
import { ModalProvider } from "../modal/context/ModalProvider";

const Offerse = () => (
  <OfferProvider>
    <ModalProvider>
      <OfferTable />
    </ModalProvider>
  </OfferProvider>
);

export default Offerse;
