function StarRating({ rating = 0, onRate, size = "normal", readonly = false }) {
  const stars = [1, 2, 3, 4, 5];

  const sizeClass = size === "small" ? "small" : size === "mini" ? "mini" : "";

  return (
    <div className={`star-rating ${readonly ? "readonly" : ""} ${sizeClass}`}>
      {stars.map((star) => (
        <span
          key={star}
          className={`star ${star <= Math.round(rating) ? "filled" : ""}`}
          onClick={() => !readonly && onRate && onRate(star)}
          role={readonly ? "presentation" : "button"}
          aria-label={`${star} star`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating;
