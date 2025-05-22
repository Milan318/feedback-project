import { useState } from 'react'
import './App.css'
import { FaStar } from "react-icons/fa";

function App() {
  const [hover, setHover] = useState(0);
  const [star, setStar] = useState(0);
  const [feedback, setFeedback] = useState({});
  const [list, setList] = useState([]);

  const handleHover = (index) => {
    setHover(index);
    if (star !== 0) {
      setStar(0);
    }
  };

  const handleLeave = (index) => {
    setHover(0);
    setStar(index);
  };

  const handleDown = (index) => {
    setStar(index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setList([...list, { ...feedback, star }]);
    setFeedback({});
    setStar(0);
    setHover(0);
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h1 className="text-center mt-3 fw-bold">Submit-Your-Feedback</h1>
          <form onSubmit={handleSubmit} className="text-center mb-4">
            <div className='mt-3'>
              <img src="https://img.freepik.com/premium-psd/event-poster-design-template_528542-2256.jpg?uid=R151108316&ga=GA1.1.139402874.1747737613&semt=ais_hybrid&w=740" width={"200px"} alt="" />
            </div>
            {
              [...Array(5).keys()].map((_, index) => (
                <FaStar className='mt-3 mb-3'
                  key={index}
                  onMouseOver={() => handleHover(index + 1)}
                  onMouseLeave={() => handleLeave(index + 1)}
                  onMouseDown={() => handleDown(index + 1)}
                  color={hover > index || star > index ? "gold" : "gray"}
                  size={'18px'}
                  style={{ cursor: "pointer" }}
                />
              ))
            }
            <br />
            <textarea
              className="form-control mt-2"
              name="message"
              value={feedback.message || ''}
              onChange={handleChange}
              rows="3"
              placeholder="Write your feedback..."
            ></textarea>
            <br />
            <button className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>

      <div className="row">
        {list.map((val, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm">
              <img
                src="https://img.freepik.com/premium-psd/event-poster-design-template_528542-2256.jpg?uid=R151108316&ga=GA1.1.139402874.1747737613&semt=ais_hybrid&w=740"
                style={{width:"415px", height:"400px"}} 
                className="card-img-top"
                alt="User"
              />
              <div className="card-body">
                <h5 className="card-title">Feedback-{index + 1}</h5>
                <div className="mb-2">
                  {[...Array(5).keys()].map((_, i) => (
                    <FaStar
                      key={i}
                      color={val.star > i ? "gold" : "gray"}
                      size={'18px'}
                    />
                  ))}
                </div>
                <p className="card-text">{val.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
