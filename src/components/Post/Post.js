import React, { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import { useNavigate } from "react-router-dom";

export const Post = (props) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("male");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);

  async function addCat(e) {
    e.preventDefault();
    if (name != "" && age != 0 && description != "" && phone != "") {
      try {
        // create a new Parse Object instance
        const Cat = new Parse.Object("Cat");
        // define the attributes you want for your Object
        Cat.set("name", name);
        Cat.set("age", age);
        Cat.set("gender", gender);
        Cat.set("description", description);
        Cat.set("phone", phone);
        Cat.set("image", image);
        Cat.set("owner", await Parse.User.current().get("username"));
        Cat.set("likes", 0);
        Cat.set("likedUsers", []);
        // save it on Back4App Data Store
        await Cat.save();
        alert("Cat successfully posted!");
        navigate("/cats", { replace: true });
        window.location.reload(false); // TODO THIS SHOULD BE A TEMPORARY SOLUTION !!!!
      } catch (error) {
        console.log("Error posting cat: ", error);
      }
    } else {
      alert("Please fill all fields");
    }
  }

  function handleChange(e) {
    let imgUrl = URL.createObjectURL(e.target.files[0]);
    setImage(imgUrl);
    console.log(e.target.files);
  }

  console.log(image);

  return (
    <form className="post-form" method="post" encType="multipart/form-data">
      <span id="cat-img">
        <h3>Add image:</h3>
        {/* <img src={image} /> */}
        <input
          type="file"
          name="imgFile"
          value={image}
          // onChange={handleChange}
        />
      </span>
      <article className="cat-info">
        <h2>
          <input
            type="text"
            placeholder="Kittie's name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </h2>
        <p id="age">
          Age:{" "}
          <input
            type="number"
            min="0"
            max="25"
            step="0.1"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
        </p>
        <p id="gender">
          <label htmlFor="gender">Gender: </label>
          <select
            name="gender"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </p>

        <p id="description">
          <textarea
            placeholder="Post description"
            maxLength="696"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </p>
        <p id="contact-number">
          Contact:{" "}
          <strong>
            <input
              type="tel"
              maxLength="13"
              placeholder="Phone number"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </strong>
        </p>

        <button id="post-btn" onClick={addCat}>
          POST
        </button>
      </article>
    </form>
  );
};
