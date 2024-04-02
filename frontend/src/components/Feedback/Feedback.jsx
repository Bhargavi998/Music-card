import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "../Feedback/Feedback.module.css";
import FeedbackImage from "../../assets/FeedbackImage.svg";
import FeedbackDropdownIcon from "../../assets/FeedbackDropdownIcon.svg";

function Feedback() {
  const [showForm, setShowForm] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Choose the type");

  const validationSchema = Yup.object().shape({
    feedbackType: Yup.string().oneOf(
      ["Bugs", "Feedback", "Query"],
      "Please choose a feedback type"
    ),
    feedback: Yup.string().required("Feedback is required"),
  });

  const formik = useFormik({
    initialValues: {
      feedbackType: "",
      feedback: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("values :", values); // Replace with your submission logic
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
                className={styles.selectedOption}
                onClick={() => setShowOption(!showOption)}
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
            </div>
            <div className={styles.feedbackTextArea}>
              <label className={styles.label} htmlFor="feedback">
                Feedback
              </label>
              <textarea
                className={styles.textarea}
                id="feedback"
                name="feedback"
                placeholder="Type your feedback"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.feedback}
              />
              {formik.touched.feedback && formik.errors.feedback && (
                <div className={styles.error}>{formik.errors.feedback}</div>
              )}
            </div>
            {formik.touched.feedbackType && formik.errors.feedbackType && (
              <div className={styles.error}>{formik.errors.feedbackType}</div>
            )}
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Feedback;
