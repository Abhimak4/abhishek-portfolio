function Education() {
  return (
    <section id="education">
      <h2>Education</h2>
      <div className="project-grid">
        <div className="project-card academic">
          <h3>Post Graduate Diploma in Cloud Data Management</h3>
          <p><strong>Conestoga College, Canada</strong></p>
          <p><em>December 2024 | GPA: 3.40</em></p>
          <ul>
            <li>Specialized in enterprise-level data architecture and cloud systems.</li>
          </ul>
        </div>

        <div className="project-card academic">
          <h3>Master&apos;s in CS & IT</h3>
          <p><strong>Gujarat University, India</strong></p>
          <p><em>2021 | CGPA: 3.34</em></p>
          <ul>
            <li>Advanced coursework in software engineering and information systems.</li>
          </ul>
        </div>

        <div className="project-card academic">
          <h3>Bachelor&apos;s in CS & IT</h3>
          <p><strong>Gujarat University, India</strong></p>
          <p><em>2019 | CGPA: 2.74</em></p>
        </div>
      </div>
    </section>
  );
}

export default Education;