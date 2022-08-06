import { Link } from "react-router-dom";

export const Cat = ({ cat }) => {
  let catProps = JSON.parse(JSON.stringify(cat));

  return (
    <>
      <div className="cat-card">
        <img src={catProps.image} alt="Cat Image" />
        <article>
          <h3>{catProps.name}</h3>
          <Link id="detail-link" to={`/cats/${cat.id}`}>
            Learn more
          </Link>
        </article>
      </div>
    </>
  );
};
