import { useNavigate, useParams } from "react-router-dom";
import CatImg from "../../images/Kats Catalogue/cat-1.jpg";
import Parse from "parse/dist/parse.min.js";
import { render } from "@testing-library/react";
import { useEffect } from "react";

export const Details = ({ cats }) => {
  const navigate = useNavigate();

  const catId = Array(window.location.href.split("/"))[0][4];
  let cat;
  let catToDelete;

  for (const current of cats) {
    if (current.id == catId) {
      cat = JSON.parse(JSON.stringify(current));
      catToDelete = current;
    }
  }


  const editHandler = () => {
    navigate("/post");
  };

  const deleteHandler = async () => {
          try{
        //destroy the object
        let result = await catToDelete.destroy();
        alert('Cat post deleted with objectId: ' + result.id);
        navigate("/cats");
        window.location.reload(false); // THIS SHOULD BE A TEMPORARY SOLUTION !!!!
    }catch(error){
        alert('Failed to delete cat, with error code: ' + error.message);
    }

  };

  return (
    <section className="details">
      <img src={cat.image} alt="Cat for adoption" />
      <article className="cat-info">
        <h2>This is {cat.name}</h2>
        <p id="age">Age: {cat.age}</p>
        <p id="gender">Gender: {cat.gender}</p>
        <p id="description">
         {cat.description}
        </p>
        <p id="contact-number">
          Contact: <strong>{cat.phone}</strong>
        </p>
        <span className="details-btns">
          <button id="remove-btn" onClick={(e) => deleteHandler(e)}>
            REMOVE
          </button>
          <button id="edit-btn" onClick={editHandler}>
            EDIT
          </button>
        </span>
      </article>
    </section>
  );
};
