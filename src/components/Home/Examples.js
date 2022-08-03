import example1 from "../../images/adopted_examples/example1.jpg";
import example2 from "../../images/adopted_examples/example-2.jpg";
import example3 from "../../images/adopted_examples/example-3.jpg";
import example4 from "../../images/adopted_examples/example-4.jpg";
import example5 from "../../images/adopted_examples/example-5.jpg";
import example6 from "../../images/adopted_examples/example-6.jpg";





export const Examples = () =>{
    return (
        <section className="examples">
        <span id="left-side-examples"
          ><picture
            ><p>Missy</p>
            <img
              className="example-img"
              src={example1}
              alt="Adopted Example Image"
          /></picture>
          <picture
            ><p>Leo & Deo</p>
            <img
              className="example-img"
              src={example2}
              alt="Adopted Example Image"
          /></picture>
          <picture
            ><p>Simba</p>
            <img
              className="example-img"
              src={example3}
              alt="Adopted Example Image"
          /></picture>
        </span>
        <span id="right-side-examples"
          ><picture
            ><p>Grumpy</p>
            <img
              className="example-img"
              src={example4}
              alt="Adopted Example Image"
          /></picture>
          <picture
            ><p>Bigfoot</p>
            <img
              className="example-img"
              src={example5}
              alt="Adopted Example Image"
          /></picture>
          <picture
            ><p>Alice</p>
            <img
              className="example-img"
              src={example6}
              alt="Adopted Example Image"
          /></picture>
        </span>
      </section>
    )
}