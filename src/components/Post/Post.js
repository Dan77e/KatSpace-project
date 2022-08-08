import React, { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import { useNavigate } from "react-router-dom";

export const Post = (props) => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    age: 0.1,
    gender: "male",
    description: "",
    phone: "",
    image: null,
    isError: {
      name: "",
      age: "",
      gender: "male",
      description: "",
      phone: "",
      image: null,
    },
  });

  // ----------------------------------------------------------------
  const validPhone = RegExp(/^0+[0-9]{10,10}$/);
  const formValChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let isError = { ...values.isError };
    switch (name) {
      case "name":
        isError.name =
          value.length < 2 ? "Name must be at least two characters long!" : "";
        break;
      case "age":
        isError.age = value <= 40 ? "" : "There is no cat over 40 years old";
        break;
      case "description":
        isError.description =
          value.length < 20 ? "The post must have a brief description" : "";
        break;
      case "phone":
        isError.phone = validPhone.test(value)
          ? ""
          : "Phone must be valid format starting with 0";
        break;

      default:
        break;
    }
    setValues((oldState) => ({
      ...oldState,
      isError: isError,
      [name]: value,
    }));
  };

  const formValid = ({ isError, ...rest }) => {
    let isValid = false;
    Object.keys(isError).forEach((val) => {
      if (val.length > 0) {
        isValid = false;
      } else {
        isValid = true;
      }
    });
    Object.keys(rest).forEach((val) => {
      if (val === null || val === "" || val > 40) {
        isValid = false;
      } else {
        isValid = true;
      }
    });
    return isValid;
  };

  // ----------------------------------------------------------------

  async function addCat(e) {
    e.preventDefault();

    if (
      values.name != "" &&
      values.age != 0 &&
      values.description != "" &&
      values.phone != "" &&
      values.image != null &&
      !formValid(values)
    ) {
      try {
        // create a new Parse Object instance
        const Cat = new Parse.Object("Cat");
        // define the attributes you want for your Object
        Cat.set("name", values.name);
        Cat.set("age", values.age);
        Cat.set("gender", values.gender);
        Cat.set("description", values.description);
        Cat.set("phone", values.phone);
        Cat.set("image", values.image);
        Cat.set("owner", await Parse.User.current().get("username"));
        Cat.set("likes", 0);
        Cat.set("likedUsers", []);

        await Cat.save();
        alert("Cat successfully posted!");
        navigate("/cats");
        window.location.reload(false); // TODO THIS SHOULD BE A TEMPORARY SOLUTION !!!!
      } catch (error) {
        console.log("Error posting cat: ", error);
      }
    } else {
      alert("Please fill all fields correctly!");
    }
  }

  return (
    <form className="post-form" method="post" encType="multipart/form-data">
      <span id="cat-img">
        <h3>Add image:</h3>
        <img src={values.image} id="preview-image" />
        <input
          placeholder="Image link"
          type="url"
          name="image"
          value={values.image}
          onChange={formValChange}
        />
      </span>
      <article className="cat-info">
        <p>
          Name:
          <br />
          <input
            name="name"
            type="text"
            placeholder="Kittie's name"
            value={values.name}
            onChange={formValChange}
          />
          {values.isError.name.length > 0 && (
            <span className="invalid-feedback">{values.isError.name}</span>
          )}
        </p>
        <p id="age">
          Age (years):
          <br />
          <input
            name="age"
            type="number"
            min="0.1"
            max="25"
            step="0.1"
            value={values.age}
            onChange={formValChange}
          />
          {values.isError.age.length > 0 && (
            <span className="invalid-feedback">{values.isError.age}</span>
          )}
        </p>
        <p id="gender">
          Gender:
          <br />
          <select
            name="gender"
            id="gender"
            value={values.gender}
            onChange={formValChange}
          >
            <option value="male" name="male">
              Male
            </option>
            <option value="female" name="female">
              Female
            </option>
          </select>
        </p>

        <p id="description">
          <textarea
            name="description"
            placeholder="Post description"
            maxLength="696"
            value={values.description}
            onChange={formValChange}
          ></textarea>
          {values.isError.description.length > 0 && (
            <span className="invalid-feedback">
              {values.isError.description}
            </span>
          )}
        </p>
        <p id="contact-number">
          Contact:
          <br />
          <strong>
            <input
              name="phone"
              type="tel"
              maxLength="11"
              placeholder="Phone number"
              value={values.phone}
              onChange={formValChange}
            />
          </strong>
          {values.isError.phone.length > 0 && (
            <span className="invalid-feedback">{values.isError.phone}</span>
          )}
        </p>

        <button id="post-btn" onClick={addCat}>
          POST
        </button>
      </article>
    </form>
  );
};
