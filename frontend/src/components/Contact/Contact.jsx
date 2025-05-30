import React, { useState, useEffect } from "react";
import "./Contact.css";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import Particle from "../Particle";
import CustomAlert from "./CustomAlert";

const Contact = () => {
  const service_key = import.meta.env.VITE_SERVICE_KEY;
  const template_key = import.meta.env.VITE_TEMPLATE_KEY;
  const public_key = import.meta.env.VITE_PUBLIC_KEY;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
        const res = await fetch(`${apiBaseUrl}/api/projects`);
        const data = await res.json();
        const uniqueCategories = [
          ...new Set((data.data || []).map((project) => project.category)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message,
    };

    emailjs.send(service_key, template_key, templateParams, public_key).then(
      (response) => {
        console.log("Email sent successfully!", response.status, response.text);
        CustomAlert("Your message has been sent successfully!", "success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      },
      (error) => {
        console.error("Email sending failed:", error);
        CustomAlert("Failed to send message. Please try again later.", "error");
      }
    );
  };

  return (
    <>
      <Particle />
      <div className="contact-container">
        <div className="contact-form-section">
          <h1>Let's Work Together!</h1>
          <p>
            Send a general message or details of a project you'd like me to be a
            part of and I'll get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                autoComplete="off"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                autoComplete="off"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                autoComplete="off"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text" 
                pattern="[0-9]{10}"
                name="phone"
                placeholder="Phone number"
                autoComplete="off"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="">Choose Service</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <textarea
              name="message"
              placeholder="Your message"
              autoComplete="off"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit">Send Message</button>
          </form>
        </div>

        <div className="contact-info-section">
          <div className="info-item">
            <FiPhone className="icon" />
            <div>
              <h3>Phone</h3>
              <p>+91 972 945 5859</p>
            </div>
          </div>

          <div className="info-item">
            <FiMail className="icon" />
            <div>
              <h3>Email</h3>
              <p>govindrawat3011@gmail.com</p>
            </div>
          </div>

          <div className="info-item">
            <FiMapPin className="icon" />
            <div>
              <h3>Address</h3>
              <p>Hodal, Palwal</p>
              <p>Haryana, India, 121106</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
