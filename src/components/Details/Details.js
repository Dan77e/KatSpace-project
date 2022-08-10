import { useNavigate } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import { useState } from "react";

export const Details = ({ cats }) => {
  const navigate = useNavigate();


  const catId = Array(window.location.href.split("/"))[0][4];
  let cat;
  let catObject;
  const currentUser = Parse.User.current().get("username");
  let isOwner = false;
  let [isLiked, setIsLiked] = useState(false);
  const [likes = cat.likes, setLikes] = useState(0);
  let hasLiked = false;

  // TODO Maybe try to do it with a query and '.get(id)'
  for (const current of cats) {
    if (current.id == catId) {
      cat = JSON.parse(JSON.stringify(current));
      catObject = current;
    }
  }

  if (currentUser === cat.owner) {
    isOwner = true;
    hasLiked = true;
  }

  const editHandler = () => {
    navigate(`/edit/${catId}`);
  };

  const deleteHandler = async () => {
    if (window.confirm("Are you sure you want to delete the post ?")) {
      try {
        await catObject.destroy();
        navigate("/cats");
        window.location.reload(false);
      } catch (error) {
        alert("Failed to delete cat, with error code: " + error.message);
      }
    }
  };

  const catIsLiked = async () => {
    cat.likes = cat.likes + 1;
    cat.likedUsers.push(currentUser);
    await catObject.set("likes", cat.likes);
    await catObject.set("likedUsers", cat.likedUsers);
    await catObject.save();
  };

  const likeHandler = (e) => {
    setLikes((oldLikes) => oldLikes + 1);
    if (!isOwner) {
      setIsLiked(true);
    }

    catIsLiked();
  };

  if (cat.likedUsers.includes(currentUser) || isLiked) {
    hasLiked = true;
  }

  return (
    <section className="details">
      <img src={cat.image} alt="Cat for adoption" />
      <article className="cat-info">
        <h2>This is {cat.name}</h2>
        <p id="age">Age: {cat.age}</p>
        <p id="gender">Gender: {cat.gender}</p>
        <p id="description">{cat.description}</p>
        <p id="contact-number">
          Contact: <strong>{cat.phone}</strong>
        </p>
        {isOwner && (
          <span className="details-btns">
            <button id="remove-btn" onClick={(e) => deleteHandler(e)}>
              REMOVE
            </button>
            <button id="edit-btn" onClick={editHandler}>
              EDIT
            </button>
          </span>
        )}
        {hasLiked ? (
          <button className="like-btn">
            <i className="bi bi-star-fill">&nbsp; {cat.likes}</i>
          </button>
        ) : (
          <button className="like-btn" onClick={likeHandler}>
            <i className="bi bi-star">&nbsp; {cat.likes}</i>
          </button>
        )}
      </article>
    </section>
  );
};
