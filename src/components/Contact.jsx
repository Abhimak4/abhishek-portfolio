import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    company: "" // ✅ ADD THIS (honeypot field)
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          message: "",
          company: "" // ✅ RESET THIS TOO
        });
      } else {
        console.error(data);
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }

    setLoading(false);
  };

  return (
    <section id="contact">
      <h2>GET IN TOUCH</h2>

      <p className="contact-subtitle">
        Drop a text and get solution for any business problems!
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>

        {/* ✅ HONEYPOT FIELD (ANTI-SPAM) */}
        <div style={{ display: "none" }}>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            autoComplete="off"
            tabIndex="-1"
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            name="name"
            placeholder="Name / Organization"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <textarea
            name="message"
            rows="4"
            placeholder="queries..."
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="transmit-btn" disabled={loading}>
          {loading ? "Sending..." : "TRANSMIT DATA"}
        </button>
      </form>

      {status === "success" && (
        <p className="success-message">✅ Message sent successfully!</p>
      )}

      {status === "error" && (
        <p className="error-message">❌ Something went wrong. Try again.</p>
      )}

      <div className="social-footer">
        <span className="social-label">// OR CONNECT VIA SOCIAL</span>
        <div className="social-links">
          <a
            href="https://www.linkedin.com/in/abhimak4"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
          >
            LinkedIn
          </a>
          <a href="mailto:Abhi.mak4@gmail.com" className="social-btn">
            Email
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;