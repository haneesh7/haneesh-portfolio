import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br />
          experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Project Intern</h4>
                <h5>NIT Goa</h5>
              </div>
              <h3>Mar – May 2025</h3>
            </div>
            <p>
              Acquired hands-on experience applying machine learning models. Worked on a spam detection project, which enhanced understanding of text classification, natural language processing, and the practical implementation of classification algorithms. Gained core skills in data preprocessing, feature extraction, and performance evaluation.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BE in Artificial Intelligence &amp; Machine Learning</h4>
                <h5>B. M. S. College of Engineering</h5>
              </div>
              <h3>2021 – 2025</h3>
            </div>
            <p>
              Learned core AI &amp; ML fundamentals, including neural networks, NLP frameworks, advanced algorithms, and database management (SQL). Built practical projects leveraging deep learning models and natural language processing pipelines.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Pre-University Course (PCMCs)</h4>
                <h5>SSMRV PU College</h5>
              </div>
              <h3>2019 – 2021</h3>
            </div>
            <p>
              Completed senior secondary education focusing on Physics, Chemistry, Mathematics, and Computer Science (PCMCs).
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Secondary School Leaving Certificate (SSLC)</h4>
                <h5>Bangalore International Public School</h5>
              </div>
              <h3>2018 – 2019</h3>
            </div>
            <p>
              Completed secondary schooling with a strong foundation in sciences and mathematics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
