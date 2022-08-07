import { Cat } from "./CatItem.js";
import { useState } from "react";

export const Cats = ({ cats }) => {
  const catsNumber = Object.keys(cats).length;
  return (
    <>
      {catsNumber > 0 ? (
        <section className="cats-container">
          {cats.map((c) => (
            <Cat key={c.id} cat={c} />
          ))}
        </section>
      ) : (
        <section className="no-cats-container">
          <h1 id="sorry-face">╮(●︿●)╭</h1>
          <h1 id="sorry-text">Sorry, no cats at the moment.</h1>
        </section>
      )}
    </>
  );
};
