import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";

export const Edit = ({ cats }) => {
  const navigate = useNavigate();

  const catId = Array(window.location.href.split("/"))[0][4];
  const [cat, setCat] = useState({
    name: "",
    age: "",
    gender: "",
    description: "",
    phone: "",
    image: "",
  });

  const query = new Parse.Query("Cat");
  const queryFunc = async () => {
    let current = await query.get(catId);
    setCat(JSON.parse(JSON.stringify(current)));
  };

  useEffect(() => {
    queryFunc();
  }, []);

  const changeHandler = (e) => {
    setCat((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value,
    }));
  };

  async function updateCat(e) {
    e.preventDefault();
    if (
      cat.name != "" &&
      cat.age != 0 &&
      cat.description != "" &&
      cat.phone != ""
    ) {
      try {
        const queryCat = new Parse.Query("Cat");
        queryCat.equalTo("objectId", catId);
        let updated = await queryCat.get(catId);
        updated.set("name", cat.name);
        updated.set("age", cat.age);
        updated.set("gender", cat.gender);
        updated.set("description", cat.description);
        updated.set("phone", cat.phone);
        updated.set("image", cat.image);

        await updated.save();
        alert("Post successfully updated!");
        navigate("/cats", { replace: true });
        window.location.reload(false); // TODO THIS SHOULD BE A TEMPORARY SOLUTION !!!!
      } catch (error) {
        alert("Error posting cat   ( ●__●)  ");
        console.log(error);
      }
    } else {
      alert("Please fill all fields");
    }
  }

  return (
    <form className="post-form" method="post" encType="multipart/form-data">
      <span id="cat-img">
        <h3>Add image:</h3>
        {/* <img src={image} /> */}
        <input
          type="file"
          name="image"
          value={cat.image}
          //   onChange={changeHandler} //TODO Fix the image issue
        />
      </span>
      <article className="cat-info">
        <h2>
          <input
            name="name"
            type="text"
            placeholder="Kittie's name"
            value={cat.name}
            onChange={changeHandler}
          />
        </h2>
        <p id="age">
          Age:{" "}
          <input
            name="age"
            type="number"
            min="0"
            max="25"
            step="0.1"
            value={cat.age}
            onChange={changeHandler}
          />
        </p>
        <p id="gender">
          <label htmlFor="gender">Gender: </label>
          <select
            name="gender"
            id="gender"
            value={cat.gender}
            onChange={changeHandler}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </p>

        <p id="description">
          <textarea
            name="description"
            placeholder="Post description"
            maxLength="696"
            value={cat.description}
            onChange={changeHandler}
          ></textarea>
        </p>
        <p id="contact-number">
          Contact:{" "}
          <strong>
            <input
              name="phone"
              type="tel"
              maxLength="13"
              placeholder="Phone number"
              value={cat.phone}
              onChange={changeHandler}
            />
          </strong>
        </p>

        <button id="post-btn" onClick={updateCat}>
          UPDATE
        </button>
      </article>
    </form>
  );
};
