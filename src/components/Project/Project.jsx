import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProjectCard from "./ProjectCard";
import Particle from "../Particle";
import "./Project.css";
import projects from "../../data/projects.json";

function Projects() {
  const [filter, setFilter] = useState("All");

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];

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
            {categories.map((category) => (
              <Button
                key={category}
                variant="primary2"
                className={`${filter === category ? "active" : ""}`}
                onClick={() => setFilter(category)}
              >
                {category}
              </Button>
            ))}
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
