import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "../Feedback/Feedback.module.css";
import FeedbackImage from "../../assets/FeedbackImage.svg";
import FeedbackDropdownIcon from "../../assets/FeedbackDropdownIcon.svg";
import axios from "axios";

function Feedback() {
  const [showForm, setShowForm] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Choose the type");
  const [formSubmitted, setFormSubmitted] = useState(false); // New state to track form submission

  const validationSchema = Yup.object().shape({
    feedbackType: Yup.string()
      .oneOf(["Bugs", "Feedback", "Query"])
      .required("*Required Field"),
    feedback: Yup.string().required("*Required Field"),
  });

  const formik = useFormik({
    initialValues: {
      feedbackType: "",
      feedback: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          "https://shubhamkumar478-gmail-com-cuvette-final-evaluation-aug.vercel.app/api/v1/feedback/",
          values
        ); // Change the endpoint URL according to your backend route
        console.log("Feedback submitted successfully:", response.data);
        setFormSubmitted(true);
        resetForm();
        setSelectedOption("Choose the type");
        setShowForm(false);
        // Reset form values after successful submission
      } catch (error) {
        console.error("Error submitting feedback:", error);
      }
    },
  });

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setShowOption(false);
    formik.setFieldValue("feedbackType", option); // Set feedback type value
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.formOpening}
        onClick={() => {
          setShowForm(!showForm);
        }}
      >
        <div>
          <img src={FeedbackImage} alt="Feedback" className={styles.image} />
        </div>
      </div>
      {showForm && (
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.feedbackForm}>
            <div className={styles.dropdownContainer}>
              <div className={styles.feedbackHeading}>Type of feedback</div>
              <div
                onClick={() => setShowOption(!showOption)}
                className={`${styles.selectedOption} ${
                  formik.touched.feedbackType && formik.errors.feedbackType
                    ? styles.errorBorder
                    : ""
                }`}
              >
                <div className={styles.selectedText}>{selectedOption}</div>
                <img
                  src={FeedbackDropdownIcon}
                  alt="Dropdown"
                  className={styles.dropdownIcon}
                />
              </div>
              {showOption && (
                <div className={styles.options}>
                  <div
                    className={styles.option}
                    onClick={() => handleSelectOption("Bugs")}
                  >
                    Bugs
                  </div>
                  <div
                    className={styles.option}
                    onClick={() => handleSelectOption("Feedback")}
                  >
                    Feedback
                  </div>
                  <div
                    className={styles.option}
                    onClick={() => handleSelectOption("Query")}
                  >
                    Query
                  </div>
                </div>
              )}
              {/* Display error message and change border color if form is submitted and feedbackType is not filled */}
              {formik.touched.feedbackType && formik.errors.feedbackType && (
                <div className={styles.error}>{formik.errors.feedbackType}</div>
              )}
            </div>
            <div className={styles.feedbackTextArea}>
              <label className={styles.label} htmlFor="feedback">
                Feedback
              </label>
              <textarea
                className={`${styles.textarea} ${
                  formik.touched.feedback && formik.errors.feedback
                    ? styles.errorBorder
                    : ""
                }`} // Apply error border if form is submitted and feedback is not filled
                id="feedback"
                name="feedback"
                placeholder="Type your feedback"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.feedback}
                rows={6}
              />
              {/* Display error message and change border color if form is submitted and feedback is not filled */}
              {formik.touched.feedback && formik.errors.feedback && (
                <div className={styles.error}>{formik.errors.feedback}</div>
              )}
            </div>
            <div className={styles.submitButtonContainer}>
              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default Feedback;
