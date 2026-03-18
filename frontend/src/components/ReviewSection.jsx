import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import StarRating from "./StarRating";
import "../styles/reviews.css";

const API_BASE = "http://localhost:5000/api/reviews";

function ReviewSection({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState({ avgRating: 0, totalReviews: 0, breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } });
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [reviewsRes, summaryRes] = await Promise.all([
        axios.get(`${API_BASE}/${productId}`),
        axios.get(`${API_BASE}/${productId}/summary`)
      ]);
      setReviews(reviewsRes.data);
      setSummary(summaryRes.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  }, [productId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Pre-fill user name from localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsed = JSON.parse(user);
        if (parsed.name) setUserName(parsed.name);
      } catch {}
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName.trim() || !rating || !comment.trim()) {
      alert("Please fill in all fields and select a rating.");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(API_BASE, {
        productId,
        userName: userName.trim(),
        rating,
        comment: comment.trim()
      });
      setComment("");
      setRating(0);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      fetchData();
    } catch (err) {
      alert("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  const getRatingBadgeClass = (r) => {
    if (r >= 4) return "high";
    if (r >= 3) return "medium";
    return "low";
  };

  return (
    <div className="review-section">
      <h3 className="review-section-title">⭐ Ratings & Reviews</h3>

      {/* Rating Summary */}
      <div className="rating-summary">
        <div className="rating-big-score">
          <div className="rating-big-number">{summary.avgRating || "–"}</div>
          <div className="rating-big-stars">
            <StarRating rating={summary.avgRating} readonly size="small" />
          </div>
          <div className="rating-big-count">
            {summary.totalReviews} {summary.totalReviews === 1 ? "Review" : "Reviews"}
          </div>
        </div>

        <div className="rating-breakdown">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = summary.breakdown[star] || 0;
            const pct = summary.totalReviews > 0 ? (count / summary.totalReviews) * 100 : 0;
            return (
              <div key={star} className="rating-bar-row">
                <span className="rating-bar-label">{star}★</span>
                <div className="rating-bar-track">
                  <div
                    className={`rating-bar-fill star-${star}`}
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>
                <span className="rating-bar-count">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Form */}
      <form className="review-form" onSubmit={handleSubmit}>
        <h4 className="review-form-title">📝 Write a Review</h4>

        {success && (
          <div className="review-success">✅ Your review has been submitted successfully!</div>
        )}

        <div className="review-form-row">
          <label className="review-form-label">Your Name</label>
          <input
            className="review-form-input"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="review-form-row">
          <label className="review-form-label">Your Rating</label>
          <StarRating rating={rating} onRate={setRating} />
        </div>

        <div className="review-form-row">
          <label className="review-form-label">Your Review</label>
          <textarea
            className="review-form-textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            required
          />
        </div>

        <button className="review-submit-btn" type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Review ⭐"}
        </button>
      </form>

      {/* Review List */}
      <div className="review-list">
        <h4 className="review-list-title">Customer Reviews ({reviews.length})</h4>

        {reviews.length === 0 ? (
          <div className="review-empty">
            No reviews yet. Be the first to review this product! 🌸
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="review-card">
              <div className="review-card-header">
                <div className="review-avatar">
                  {review.userName.charAt(0).toUpperCase()}
                </div>
                <div className="review-meta">
                  <div className="review-user-name">{review.userName}</div>
                  <div className="review-date">{formatDate(review.createdAt)}</div>
                </div>
                <span className={`review-rating-badge ${getRatingBadgeClass(review.rating)}`}>
                  {review.rating}★
                </span>
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReviewSection;
