import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Container } from "@mui/material";
import "./ContactUs.css";

const ContactUs = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch("http://localhost:3000/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        if (response.ok) {
          setResponseMessage("Message sent successfully!");
          resetForm();
        } else {
          setResponseMessage(`Error: ${data.error}`);
        }
      } catch (error) {
        console.error("Error submitting contact form:", error);
        setResponseMessage("Failed to send message. Please try again later.");
      }
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
      message: Yup.string().required("Message is required"),
    }),
  });

  return (
    <Container>
      <h1 id="contact-us-title">SEND US A MESSAGE</h1>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="contact-us-form">
            <div className="contact-us-inputs">
              <div className="field">
                <TextField
                  label="Name"
                  variant="outlined"
                  name="name"
                  fullWidth
                  value={formik.values.name || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">
                  {formik.errors.name &&
                    formik.touched.name &&
                    formik.errors.name}
                </div>
              </div>
              <div className="field">
                <TextField
                  label="Email"
                  variant="outlined"
                  name="email"
                  fullWidth
                  value={formik.values.email || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                <div className="error">
                  {formik.errors.email &&
                    formik.touched.email &&
                    formik.errors.email}
                </div>
              </div>
              <div className="field">
                <TextField
                  label="Message"
                  variant="outlined"
                  name="message"
                  multiline
                  fullWidth
                  rows={4}
                  value={formik.values.message || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">
                  {formik.errors.message &&
                    formik.touched.message &&
                    formik.errors.message}
                </div>
              </div>

              <Button
                style={{
                  borderRadius: 35,
                  color: "white",
                  border: "white",
                  backgroundColor: "#e2b7b9",
                  padding: "18px 25px",
                  fontSize: "18px",
                }}
                variant="outlined"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default ContactUs;
