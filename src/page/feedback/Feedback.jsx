import React, { useEffect, useRef, useState } from "react";
import "./Feedback.css";
import { postFeedback } from "../../api/postFeedback";

const Feedback = () => {
  useEffect(() => {
    document.title = "Feedback • Okv Music";
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage(null);
    try {
      if (!formRef.current) return;
      const formData = new FormData(formRef.current);
      const formDataObj = Object.fromEntries(formData.entries());
      const { name, email, subject, message } = formDataObj;
      const response = await postFeedback({ name, email, subject, message });

      if (response.status !== 200) {
        throw new Error("Failed to send feedback ❌");
      }
      setStatusMessage("Feedback send successfully ✅");
      e.target?.reset();
    } catch (error) {
      if (error instanceof Error) {
        setStatusMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="feedback-container container">
      <div className="feedback-heading-wrapper">
        <h1>Feedback Form</h1>
        <small>Submit your valuable feedback</small>
      </div>
      <span className="separator"></span>

      <form className="form-container" ref={formRef} onSubmit={handleSubmit}>
        <div className="name-email-wrapper">
          <div className="form-label-input-wrapper">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              minLength={3}
              maxLength={20}
              required
            />
          </div>
          <div className="form-label-input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="feedback-form-input"
              required
            />
          </div>
        </div>
        <div className="form-label-input-wrapper">
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="Subject"
            className="feedback-form-input"
            minLength={3}
            required
          />
        </div>
        <div className="form-label-input-wrapper">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            type="text"
            placeholder="Message"
            cols="50"
            rows="10"
            minLength={5}
            required
          />
        </div>

        <div className="form-btn-wrapper">
          <button type="reset" title="Reset" className="form-btn">
            Reset
          </button>
          <button
            type="submit"
            title="Submit"
            className="form-btn submit-btn"
            disabled={isLoading}
          >
            {isLoading ? "Submiting..." : "Submit"}
          </button>
        </div>
        {statusMessage ? (
          <p className="status-message">{statusMessage}</p>
        ) : null}
      </form>
    </section>
  );
};

export default Feedback;
