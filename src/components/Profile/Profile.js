import Parse from "parse/dist/parse.min.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export const Profile = () => {
  let catQuery = new Parse.Query("Cat");
  const [cats, setCats] = useState([]);
  const currentUser = Parse.User.current().get("username");
  const userCats = [];
  let counter = 0;

  const queryFunc = async () => {
    setCats(await catQuery.find());
  };

  useEffect(() => {
    queryFunc();
  }, []);

  let catImages = [];
  let catId = [];
  for (const current of cats) {
    const cat = JSON.parse(JSON.stringify(current));
    if (cat.owner == currentUser) {
      userCats.push(cat.name);
      catImages.push(cat.image);
      catId.push(current.id);
    }
  }

console.log(catId);
  return (
    <div className="profile-container">
      <article className="profile-article">
        <h1>
          Mr/Mrs <i> {currentUser}</i>, this is your profile page
        </h1>
        <p>
          Here you cans find the "<Link className="post-link" to='/post'>Create</Link>" button, which you can use for
          uploading adoption posts. Also you can see all the sweet little
          kittens you and your good heart have decided to post for adoption.
          Thank you for making the world a better place{" "}
          <strong> &nbsp; ^_^</strong>
        </p>
      </article>
      <section className="user-post-container">
        <ul className="user-post-list">
          {userCats.map((c) => (
            <div className="cat-card">
              <img src={catImages[counter++]} alt="Cat Image" />
              <article>
                <h3>{c}</h3>
                <Link id="detail-link" to={`/cats/${catId[counter-1]}`}>
                  Learn more
                </Link>
              </article>
            </div>
          ))}
        </ul>
      </section>
    </div>
  );
};
