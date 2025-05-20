import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import "./Resume.css";

function Resume() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const [width, setWidth] = useState(1200);
  const [resumeUrl, setResumeUrl] = useState("");
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    setWidth(window.innerWidth);
    fetch(`${apiBaseUrl}/api/pdf/resume`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data) && data.data.length > 0) {
          setResumeUrl(data.data[0].url);
        }
      })
      .catch(() => setResumeUrl(""));
  }, [apiBaseUrl]);

  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />
        <Row className="fork-btn" style={{}}>
          <Button
            variant="primary"
            href={resumeUrl}
            target="_blank"
            className="fork-btn-inner"
          >
            <AiOutlineDownload />
            &nbsp;Download Resume
          </Button>
        </Row>

        <Row className="resume flex-column align-items-center">
            <Document
              key={resumeUrl}
              file={{
                url: resumeUrl,
                httpHeaders: { "Cache-Control": "no-cache" }
              }}
              className="d-flex flex-column align-items-center"
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            >
              {[...Array(numPages || 0)].map((_, idx) => (
                <div key={idx + 1} style={{ marginBottom: "0.5rem" }}>
                  <Page
                    pageNumber={idx + 1}
                    scale={width > 786 ? 1.7 : 0.6}
                  />
                </div>
              ))}
            </Document>
        </Row>
      </Container>
    </div>
  );
}

export default Resume;
