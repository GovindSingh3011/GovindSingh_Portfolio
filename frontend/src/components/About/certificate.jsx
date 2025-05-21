import React, { useEffect, useState } from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import { FaCertificate } from "react-icons/fa";
import "./About.css";

const Certificate = () => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${apiBaseUrl}/api/pdf/certificate`)
            .then((res) => res.json())
            .then((data) => {
                setCertificates(data.data || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading certificates...</div>;

    return (
        <>
            <h1 className="project-heading">
                Professional <strong className="purple">Certifications</strong>
            </h1>
            {certificates.length === 0 ? (
                <p>No certifications found.</p>
            ) : (
                <Row style={{ justifyContent: "center", paddingBottom: "50px" }} xs={1} sm={2} md={3} >
                    {[...certificates].reverse().map((certificate) => (
                        <Col key={certificate._id} className="certificate-card">
                            <Card className="certificate-card-view">
                                <Card.Body>
                                    <Card.Title style={{ fontWeight: "bold" }}>{certificate.name}</Card.Title>
                                    <Card.Text style={{ textAlign: "justify" }}>
                                        <span>
                                            <strong style={{ color: "rgb(155 126 172)" }}>Issued by:</strong> {certificate.organization}
                                        </span>
                                        <br />
                                        <span>
                                            <strong style={{ color: "rgb(155 126 172)" }}>Date of Completion:</strong>{" "}
                                            {(() => {
                                                const val = certificate.dateCompleted;
                                                if (!val) return "";
                                                let [year, month] = val.split("-");
                                                if (!year || !month) return val;
                                                if (month.length === 1) month = "0" + month;
                                                const date = new Date(`${year}-${month}-01`);
                                                const monthStr = date.toLocaleString("default", { month: "long" });
                                                return `${monthStr}, ${year}`;
                                            })()}
                                        </span>
                                    </Card.Text>
                                    <Button
                                        variant="primary"
                                        href={certificate.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaCertificate />&nbsp;View Certificate
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
};

export default Certificate;
