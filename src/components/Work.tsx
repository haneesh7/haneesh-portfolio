import "./styles/Work.css";
import WorkImage from "./WorkImage";

const Work = () => {
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {[
            {
              num: "01",
              name: "Weapon Detection Using YOLOv8",
              category: "Deep Learning / Computer Vision",
              tools: "Python, YOLOv8, OpenCV, PyTorch",
              image: import.meta.env.BASE_URL + "images/project_yolo.png"
            },
            {
              num: "02",
              name: "Personalized AI Voice Assistant",
              category: "Natural Language Processing",
              tools: "Python, NLP, PyTTSx3, SpeechRecognition",
              image: import.meta.env.BASE_URL + "images/project_assistant.png"
            },
            {
              num: "03",
              name: "Sentiment Analysis Framework",
              category: "NLP / Text Analytics",
              tools: "Python, NLP, NLTK, Scikit-learn",
              image: import.meta.env.BASE_URL + "images/project_sentiment.png"
            }
          ].map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.num}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
