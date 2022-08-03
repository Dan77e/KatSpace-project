import { useNavigate } from "react-router-dom";

export const Post = (props) => {
const navigate = useNavigate();

const postHandler = () =>{
    //TODO - Post the cat to database !

    navigate('/cats');
}

  return (
    <form className="post-form" method="post" enctype="multipart/form-data">
      <span id="cat-img">
        <h3>Add image:</h3>
        <input type="file" name="imgfile" />
      </span>
      <article className="cat-info">
        <h2>
          <input type="text" placeholder="Kittie's name" />
        </h2>
        <p id="age">
          Age: <input type="number" min="0" max="25" step="0.1" />
        </p>
        <p id="gender">
          Gender: <input type="radio" id="Male" value="Male" name="Gender" />
          <label for="Male">Male</label>
          <input type="radio" id="Female" value="Female" name="Gender" />
          <label for="Female">Female</label>
        </p>

        <p id="description">
          <textarea placeholder="Post description" maxlength="696"></textarea>
        </p>
        <p id="contact-number">
          Contact:{" "}
          <strong>
            <input type="tel" maxlength="13" placeholder="Phone number" />
          </strong>
        </p>

        <button id="post-btn" onClick={postHandler}>POST</button>
      </article>
    </form>
  );
};
