import React from "react";
import "./About.css";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <>
      <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
        Know Who <strong className="purple">I'M</strong>
      </h1>
      <Card className="quote-card-view">
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p style={{ textAlign: "justify" }}>
              Hi Everyone, I am <span className="purple">Govind Singh </span>
              from <span className="purple">Haryana, India.</span>
              <br />
              I am B.Tech CSE Student at GLA University with a passion for
              technology and design. I love exploring new ideas and turning them
              into impactful solutions.
              <br />
              <br />
              Aspiring to be a{" "}
              <span className="purple">Software Engineer </span>and{" "}
              <span className="purple">UI/UX Designer</span>, I enjoy crafting
              user-friendly experiences that blend creativity with
              functionality.
              <br />
              <br />I excel in teamwork, constantly seek new knowledge, and
              enjoy tackling real-world challenges with creative solutions.
            </p>
            <p style={{ color: "rgb(155 126 172)", paddingTop: "10px" }}>
              "Every great project starts with a simple idea. For me, the joy of
              creating something meaningful is what drives me forward"
            </p>
          </blockquote>
        </Card.Body>
      </Card>
    </>
  );
}

export default AboutCard;
