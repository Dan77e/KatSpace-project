import { Link } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import { useNavigate } from "react-router-dom";

export const Cat = ({ cat }) => {
  const navigate = useNavigate();

  let catProps = JSON.parse(JSON.stringify(cat));

  const noUserHandler = () => {
    if (Parse.User.current() === null) {
      alert("Please sign in to see the details!");
        navigate("/cats", { replace: true });
    }
  };

  return (
    <>
      <div className="cat-card">
        <img src={catProps.image} alt="Cat Image" />
        <article>
          <h3>{catProps.name}</h3>
          <button onClick={noUserHandler}>
          <Link id="detail-link" to={`/cats/${cat.id}`}>
            Learn more
          </Link>
          </button>
        </article>
      </div>
    </>
  );
};
