import React from "react";
import { Col, Row } from "react-bootstrap";
import { CgCPlusPlus } from "react-icons/cg";
import "./About.css";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiPython,
  DiGit,
  DiJava,
} from "react-icons/di";
import {
  SiFigma
} from "react-icons/si";
import { FaAws } from "react-icons/fa"; // Import the AWS icon


function SkillSet() {
  return (
    <>
      <h1 className="project-heading">
        Professional <strong className="purple">Skillset </strong>
      </h1>

      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>  
        <Col xs={4} md={2} className="tech-icons">
          <DiReact />
          < p className="tech-icon-label">React</p> 
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <DiGit />
          < p className="tech-icon-label">Git</p> 
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <DiPython />
          < p className="tech-icon-label">Python</p> 
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <DiJava />
          < p className="tech-icon-label">Java</p> 
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <DiJavascript1 />
          < p className="tech-icon-label">JavaScript</p>
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <SiFigma />
          < p className="tech-icon-label">Figma</p>
        </Col>
        <Col xs={4} md={2} className="tech-icons">
          <FaAws />
          < p className="tech-icon-label">AWS</p>
        </Col>
      </Row>
    </>
  );
}

export default SkillSet;
