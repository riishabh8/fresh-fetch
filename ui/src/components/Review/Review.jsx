import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Review({ id }) {
  const [reviews, setReviews] = useState();
  const [err, setErr] = useState();
  const [info, setInfo] = useState();
  const [flag, setFlag] = useState();

  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await axios.get(`https://localhost:7046/api/Reveiw/${id}`);
        console.log(res);
        setReviews(res.data);
      } catch (err) {
        console.log(err);
        setErr("Be the first one to post review");
      }
    };
    getReviews();
  }, [flag]);

  async function postReviews() {
    const body = {
      name: localStorage.getItem("name"),
      productId: id,
      info,
    };
    try {
      const res = await axios.post(`https://localhost:7046/api/Reveiw/`, body);
      setFlag((prev) => !prev);
      setInfo("");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container review">
      <ul>
        {reviews &&
          reviews.map((review) => (
            <>
              <li className="review-item" key={review.id}>
                {" "}
                {review.name}: {review.info}{" "}
              </li>
              <hr />
            </>
          ))}
      </ul>
      {reviews && reviews.length === 0 && (
        <h3 style={{ color: "red" }}>Be the first one to post review</h3>
      )}
      <div>
        <input
          type="text"
          className="form-control review-item-post"
          value={info}
          onChange={(e) => {
            setInfo(e.target.value);
          }}
        />
        <button className="btn btn-outline-primary" onClick={postReviews}>
          Post
        </button>
      </div>
    </div>
  );
}
