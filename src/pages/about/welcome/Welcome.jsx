import React from "react";
import welcomeImage from "../../../assets/about__welcome.jpg";
import "./welcome.css";
const Welcome = () => {
  return (
    <div className="section__margin welcome">
      <section className="welcome__text">
        <h2>Welcome to our Netflixo</h2>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          numquam corrupti a placeat, modi esse corporis quaerat laudantium
          neque illo possimus necessitatibus soluta officiis saepe aliquid
          deleniti aliquam accusamus explicabo quia cumque iusto. Eos doloribus
          corporis totam, doloremque impedit quod. Architecto voluptas rerum
          natus? Dolor consequuntur quis quas deleniti maiores tempora illo,
          natus unde repellendus, cumque enim odit libero, officia distinctio.
          Ipsum temporibus et atque earum magni reprehenderit. Accusamus
          delectus magnam, odit dolores excepturi cupiditate a porro cumque
          libero consectetur suscipit alias assumenda reiciendis dicta
          voluptatum eligendi culpa soluta praesentium nulla vitae eos? Ab,
          reiciendis maxime doloremque qui ipsam molestiae.
        </span>
        <div className="welcome__cards">
          <div>
            <h2>10K</h2>
            <p>Listed Movies</p>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga,
              animi?
            </span>
          </div>
          <div>
            <h2>4K</h2>
            <p>Lovely Users</p>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga,
              animi?
            </span>
          </div>
        </div>
      </section>
      <section className="welcome__image">
        <img src={welcomeImage} alt="Image" />
      </section>
    </div>
  );
};

export default Welcome;
