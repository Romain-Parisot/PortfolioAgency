"use client";

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./ContactForm.css";
import emailjs from "emailjs-com";
import { useForm } from "../../context/ConfirmationPopupContext";
import { useLanguage } from "@/context/LanguageContext";
import translations from "@/translation";

interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

const initialState: ContactFormState = {
  name: "",
  email: "",
  message: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormState>(initialState);
  const { setSubmittedMessage, setShowPopupConfirmation, setShowPopupError } =
    useForm();

  const { selectedLanguage } = useLanguage();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Send to Adam
    const sendToAdam = emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID_ADAM!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADAM!,
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        to_email: "adamsimon2002pro@gmail.com",
      },
      process.env.NEXT_PUBLIC_EMAILJS_USER_ID_ADAM!
    );

    // Send to Romain
    const sendToRomain = emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID_ROMAIN!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ROMAIN!,
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        to_email: "romainparisot.pro@gmail.com",
      },
      process.env.NEXT_PUBLIC_EMAILJS_USER_ID_ROMAIN!
    );

    Promise.all([sendToAdam, sendToRomain])
      .then(() => {
        setSubmittedMessage(
          translations[selectedLanguage].confirmationPopup.successMessage
        );
        setFormData(initialState);
        setShowPopupConfirmation(true);
        setTimeout(() => setShowPopupConfirmation(false), 2000);
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
        setSubmittedMessage(
          translations[selectedLanguage].confirmationPopup.errorMessage
        );
        setShowPopupError(true);
        setTimeout(() => setShowPopupError(false), 2000);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="contactForm">
      <TextField
        id="name"
        name="name"
        label={translations[selectedLanguage].contact.name}
        variant="filled"
        fullWidth
        margin="normal"
        value={formData.name}
        onChange={handleChange}
        required
        sx={{
          "& .MuiFilledInput-root": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            color: "white",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.3)" },
            "&.Mui-focused": { backgroundColor: "rgba(0, 0, 0, 0.3)" },
            "&:before": { borderBottomColor: "white" },
            "&:hover:before": { borderBottomColor: "white" },
            "& input": { color: "white" },
            "& textarea": { color: "white" },
          },
          "& .MuiFilledInput-underline:after": { borderBottomColor: "#fc6d36" },
          "& .MuiInputLabel-root": {
            color: "white",
            "&.Mui-focused": { color: "#fc6d36" },
          },
        }}
      />

      <TextField
        id="email"
        name="email"
        label={translations[selectedLanguage].contact.email}
        variant="filled"
        fullWidth
        margin="normal"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        sx={{
          "& .MuiFilledInput-root": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            color: "white",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.3)" },
            "&.Mui-focused": { backgroundColor: "rgba(0, 0, 0, 0.3)" },
            "&:before": { borderBottomColor: "white" },
            "&:hover:before": { borderBottomColor: "white" },
            "& input": { color: "white" },
            "& textarea": { color: "white" },
          },
          "& .MuiFilledInput-underline:after": { borderBottomColor: "#fc6d36" },
          "& .MuiInputLabel-root": {
            color: "white",
            "&.Mui-focused": { color: "#fc6d36" },
          },
        }}
      />

      <TextField
        id="message"
        name="message"
        label={translations[selectedLanguage].contact.message}
        variant="filled"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={formData.message}
        onChange={handleChange}
        required
        sx={{
          "& .MuiFilledInput-root": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            color: "white",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.3)" },
            "&.Mui-focused": { backgroundColor: "rgba(0, 0, 0, 0.3)" },
            "&:before": { borderBottomColor: "white" },
            "&:hover:before": { borderBottomColor: "white" },
            "& input": { color: "white" },
            "& textarea": { color: "white" },
          },
          "& .MuiFilledInput-underline:after": { borderBottomColor: "#fc6d36" },
          "& .MuiInputLabel-root": {
            color: "white",
            "&.Mui-focused": { color: "#fc6d36" },
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          mt: 2,
          bgcolor: "#fc6d36",
          transition: "all 0.3s ease",
          "&:hover": {
            bgcolor: "#d45e31",
            transform: "scale(1.02)",
          },
        }}
      >
        {translations[selectedLanguage].contact.send}
      </Button>
    </form>
  );
}
