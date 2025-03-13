import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProjectCard from "./ProjectCard";
import Particle from "../Particle";
import "./Project.css";
import ZidioBlog from "../../assets/Projects/ZidioBlog.png";
import ZidioBlogPreview from "../../assets/Projects/ZidioBlogPreview.mp4";
import ZidioECom from "../../assets/Projects/ZidioECom.png";
import ZidioEComPreview from "../../assets/Projects/ZidioEComPreview.mp4";
import GamesLibri from "../../assets/Projects/gameslibri.png";

const projects = [
  {
    imgPath: GamesLibri,
    isBlog: false,
    title: "GamesLibri",
    description:
      "GamesLibri is a React-based web application designed to help users discover amazing free games. It provides a seamless interface to explore a curated list of games with detailed information and responsive design for an optimal user experience.",
    ghLink:
      "https://github.com/GovindSingh3011/GamesLibri",
    demoLink: "https://gameslibri.vercel.app/",
    category: "Web Development",
  },
  {
    imgPath: ZidioBlog,
    isBlog: false,
    title: "ZidioBlog",
    description:
      "For the tech blog website design at Zidio Development, I analyzed company targets, then created wireframes and final designs in Figma, ensuring a user-friendly and appealing website.",
    ghLink:
      "https://github.com/GovindSingh3011/ZidioDev_Intern/tree/master/Blog%20Website",
    demoLink: ZidioBlogPreview,
    category: "UI/UX",
  },
  {
    imgPath: ZidioECom,
    isBlog: false,
    title: "Zidio E-commerce",
    description:
      "Designed an intuitive and visually appealing e-commerce website using Figma, ensuring a seamless user experience. Conducted through market research and created detailed wireframes to meet Zidio's targets.",
    ghLink:
      "https://github.com/GovindSingh3011/ZidioDev_Intern/tree/master/E-commerce%20Page",
    demoLink: ZidioEComPreview,
    category: "UI/UX",
  },
];

function Projects() {
  const [filter, setFilter] = useState("All");

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Featured <strong className="purple"> Projects </strong>
        </h1>
        <p style={{ color: "white" }}>
          These are the tip of the iceberg, but I'm proud of all of these
          projects.
        </p>
        <div className="filter-buttons-container">
          <div className="filter-buttons">
            <Button
              variant="primary2"
              className={`${filter === "All" ? "active" : ""}`}
              onClick={() => setFilter("All")}
            >
              All
            </Button>
            <Button
              variant="primary2"
              className={`${filter === "Web Development" ? "active" : ""}`}
              onClick={() => setFilter("Web Development")}
            >
              Web Development
            </Button>
            <Button
              variant="primary2"
              className={`${filter === "UI/UX" ? "active" : ""}`}
              onClick={() => setFilter("UI/UX")}
            >
              UI/UX
            </Button>
          </div>
        </div>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {filteredProjects.map((project, index) => (
            <Col md={4} className="project-card" key={index}>
              <ProjectCard
                imgPath={project.imgPath}
                isBlog={project.isBlog}
                title={project.title}
                description={project.description}
                ghLink={project.ghLink}
                demoLink={project.demoLink}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
