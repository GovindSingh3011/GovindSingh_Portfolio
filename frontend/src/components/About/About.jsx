import React from "react";
import "./About.css";
import Particle from "../Particle";
import { Container, Row, Col } from "react-bootstrap";
import laptopImg from "../../assets/about.png";
import Aboutcard from "./AboutCard.jsx";
import SkillSet from "./SkillSet.jsx";
import Github from "./Github.jsx";
import Certificate from "./certificate.jsx";

function About() {
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <Aboutcard />
          </Col>

          <Col
            md={5}
            style={{ paddingTop: "120px", paddingBottom: "50px" }}
            className="about-img"
          >
            <img src={laptopImg} alt="about" className="img-fluid" />
          </Col>
        </Row>

        <SkillSet />

        <h1 className="project-heading">
          Professional <strong className="purple">Certifications</strong>
        </h1>
        <Certificate />

        <Github />
      </Container>
    </Container>
  );
}

export default About;
