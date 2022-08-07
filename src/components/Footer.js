import { useState } from "react";

export const Footer = () => {
  const [name, setName] = useState("");

  const showname = () => {
    name == "" ? setName("@KatSpace") : setName("");
  };
  
  return (
    <footer>
      <ul className="socials">
        <h4>Follow us:</h4>
        <li>
          <i className="bi bi-instagram" onClick={showname}>
            &nbsp;{name}
          </i>
        </li>
        <li>
          <i className="bi bi-twitter" onClick={showname}>
            &nbsp;{name}
          </i>
        </li>
        <li>
          <i className="bi bi-tiktok" onClick={showname}>
            &nbsp;{name}
          </i>
        </li>
      </ul>
      <ul className="contacts">
        <h4>Contact us:</h4>
        <li>Ring: +359 000 000 000</li>
        <li>Email: pawMail@katspace.com</li>
      </ul>
      <p>KatSpace&#174;</p>
    </footer>
  );
};
