import React, { useState } from "react";
import "./Contact.css";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import Particle from "../Particle";
import CustomAlert from "./CustomAlert"; 

const Contact = () => {
  const service_key = "portfoliocontactform";
  const template_key = "contactformtemplate";
  const public_key = "V_mkrOB8lgHa7llrL";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

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
                type="number"
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
              <option value="Web Design">Web Design</option>
              <option value="UI/UX Design">UI/UX Design</option>
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
