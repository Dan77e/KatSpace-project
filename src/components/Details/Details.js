import { useNavigate } from 'react-router-dom';
import CatImg from '../../images/Kats Catalogue/cat-1.jpg';


export const Details = () =>{

    const navigate = useNavigate();

    const editHandler = () =>{
        navigate('/post');
    }
    const deleteHandler = () =>{
        //TODO Delete post from database !!!
        navigate('/cats');
    }

    return(
        <section className="details">
        <img src={CatImg} alt="Cat for adoption" />
        <article className="cat-info">
            <h2>This is Earl</h2>
            <p id="age">Age: 2</p>
            <p id="gender">Gender: Male</p>
            <p id="description">Earl is a very cute and calm cat. He's favourite food is chicken.
                He doesn't play a lot, but he likes to cuddle. I am hoping to find Earl a nice quite home.
            </p>
            <p id="contact-number">Contact: <strong>+359 000 000 000</strong></p>
            <span className="details-btns">
            <button id="remove-btn" onClick={deleteHandler}>REMOVE</button>
            <button id="edit-btn" onClick={editHandler}>EDIT</button>
        </span>
        </article>
      </section>
    )
}