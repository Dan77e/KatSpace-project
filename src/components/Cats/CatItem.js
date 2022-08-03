import CatImg from '../../images/Kats Catalogue/cat-1.jpg';
import { useNavigate } from 'react-router-dom';

export const Cat = () =>{
const navigate = useNavigate();

  const detailsBtnHandler = () =>{
    navigate('/details');
  }

    return (
      <>
        <div className="cat-card">
        <img src={CatImg} alt="Cat Image" />
        <article>
          <h3>Sammy</h3>
          <button onClick={detailsBtnHandler}>Learn more</button>
        </article>
      </div>
      <div className="cat-card">
        <img src={CatImg} alt="Cat Image" />
        <article>
          <h3>Sammy</h3>
          <button onClick={detailsBtnHandler}>Learn more</button>
        </article>
      </div>
      <div className="cat-card">
        <img src={CatImg} alt="Cat Image" />
        <article>
          <h3>Sammy</h3>
          <button onClick={detailsBtnHandler}>Learn more</button>
        </article>
      </div>
      
  
      </>
    )
}