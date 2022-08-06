import { Cat } from "./CatItem.js";
import { useState } from "react";

export const Cats = ({ cats }) => {
  return (
    <section className="cats-container">
      {cats.map((c) => (
        <Cat key={c.id} cat={c} />
      ))}
    </section>
  );
};
