import { useState, useEffect, useMemo } from "react";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";
import "./ProductCard.css";

type ProductCardProps = {
  id: string;
  img: string;
  title: string;
  description: string;
  price: string;
  tags: string[];
  filterTags: string[];
  discount?: string;
  rating?: number; // default fallback
  isNew?: boolean;
  onAddToCart: () => void;
};

export default function ProductCard({
  id,
  img,
  title,
  description,
  price,
  tags,
  discount,
  rating = 4.5,
  isNew = false,
  onAddToCart,
}: ProductCardProps) {
  const { Rating, currentUser, fetchRatings } = useAppContext();

  const [, setUserRating] = useState<number | null>(null);
  const [currentRating, setCurrentRating] = useState<number>(rating);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [loadingRating, setLoadingRating] = useState(false);
  const [errorRating, setErrorRating] = useState<string | null>(null);

  // Calculate average rating for this product
  const averageRating = useMemo(() => {
    const productRatings = Rating.filter((r) => r.productId === id);
    if (productRatings.length === 0) return rating; // fallback
    const sum = productRatings.reduce((acc, r) => acc + r.rating, 0);
    return sum / productRatings.length;
  }, [Rating, id, rating]);

  // Get current user's rating for this product, if exists
  useEffect(() => {
    if (!currentUser) {
      setUserRating(null);
      setCurrentRating(averageRating);
      return;
    }
    const userRatingObj = Rating.find(
      (r) => r.productId === id && r.userId === currentUser.id
    );
    if (userRatingObj) {
      setUserRating(userRatingObj.rating);
      setCurrentRating(userRatingObj.rating);
    } else {
      setUserRating(null);
      setCurrentRating(averageRating);
    }
  }, [Rating, currentUser, id, averageRating]);

  const handleRatingClick = async (newRating: number) => {
    if (!currentUser) {
      alert("You must be logged in to give a rating.");
      return;
    }

    setLoadingRating(true);
    setErrorRating(null);

    try {
      // Check if user has already rated
      const existingRatings = await axios.get(
        `http://localhost:3000/rating?productId=${id}&userId=${currentUser.id}`
      );

      if (existingRatings.data.length > 0) {
        // Update existing rating
        const ratingId = existingRatings.data[0].id;
        await axios.put(`http://localhost:3000/rating/${ratingId}`, {
          id: ratingId,
          productId: id,
          userId: currentUser.id,
          rating: newRating,
        });
      } else {
        // Create new rating
        await axios.post(`http://localhost:3000/rating`, {
          id: Date.now().toString(),
          productId: id,
          userId: currentUser.id,
          rating: newRating,
        });
      }

      await fetchRatings();

      setUserRating(newRating);
      setCurrentRating(newRating);
    } catch (error) {
      setErrorRating("Failed to save rating on the server.");
    } finally {
      setLoadingRating(false);
    }
  };

  const renderStars = (rate: number, interactive = false) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      let className = "star";
      if (hoveredStar !== null) {
        className += i <= hoveredStar ? " star-hover" : "";
      } else {
        className += i <= rate ? " star-selected" : "";
      }

      stars.push(
        <span
          key={i}
          className={className}
          style={{ cursor: interactive ? "pointer" : "default" }}
          onMouseEnter={() => interactive && setHoveredStar(i)}
          onMouseLeave={() => interactive && setHoveredStar(null)}
          onClick={() => interactive && handleRatingClick(i)}
          aria-label={interactive ? `Give rating ${i}` : undefined}
          role={interactive ? "button" : undefined}
          tabIndex={interactive ? 0 : -1}
          onKeyDown={(e) => {
            if (interactive && (e.key === "Enter" || e.key === " ")) {
              handleRatingClick(i);
            }
          }}
        >
          ★
        </span>
      );
    }

    return (
      <div className="star-wrapper" aria-label={`Rating: ${rate.toFixed(1)}`}>
        {stars}
        <span className="star-rating">({rate.toFixed(1)})</span>
      </div>
    );
  };

  const getOriginalPrice = () => {
    if (!discount) return null;
    if (discount.includes("%")) {
      const discountPercent = parseFloat(discount.replace("%", ""));
      const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ""));
      if (!isNaN(discountPercent) && !isNaN(numericPrice)) {
        const original = numericPrice / (1 - discountPercent / 100);
        return original.toFixed(2) + "€";
      }
    }
    return null;
  };

  const [isHovered, setIsHovered] = useState(false);
  const [isImgHovered, setIsImgHovered] = useState(false);
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const [btnAnimation, setBtnAnimation] = useState("");

  const handleAddToCart = () => {
    onAddToCart();
    setBtnAnimation("added");
    setTimeout(() => setBtnAnimation(""), 1500);
  };

  return (
    <article
      className={`product-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Product: ${title}, price: ${price}`}
      tabIndex={0}
    >
      <div className="card-accent" aria-hidden="true" />
      {discount && (
        <div className="discount-badge" aria-label={`Discount: ${discount}`}>
          {discount}
        </div>
      )}
      <div className="image-container">
        <img
          src={img}
          alt={title}
          className={`product-image ${isImgHovered ? "hovered" : ""}`}
          onMouseEnter={() => setIsImgHovered(true)}
          onMouseLeave={() => setIsImgHovered(false)}
          loading="lazy"
        />
        {isNew && (
          <span className="new-badge" aria-label="New product">
            NEW
          </span>
        )}
      </div>

      <div className="card-content">
        <h3 className="product-title">{title}</h3>
        <div aria-label="Product rating" style={{ marginBottom: "8px" }}>
          {renderStars(currentRating, true)}
        </div>
        {loadingRating && <p>Saving rating...</p>}
        {errorRating && <p style={{ color: "red" }}>{errorRating}</p>}
        <p className="product-description">{description}</p>
        <div className="tag-box" aria-label="Product categories">
          <ul>
            {tags.slice(0, 3).map((tag, i) => (
              <li key={i}>
                <span className="tag-check" aria-hidden="true">
                  ✓
                </span>{" "}
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="price-section">
        <div className="price-label">
          <span>Price</span>
          <div>
            {getOriginalPrice() && (
              <span className="price-old" aria-label="Original price">
                {getOriginalPrice()}
              </span>
            )}
            <span
              className={`price-current ${discount ? "discount" : ""}`}
              aria-label="Current price"
            >
              {price}
            </span>
          </div>
        </div>

        <button
          type="button"
          className={`add-to-cart-btn ${
            btnAnimation === "added" ? "added" : ""
          } ${isBtnHovered ? "btn-hover" : ""}`}
          onMouseEnter={() => setIsBtnHovered(true)}
          onMouseLeave={() => setIsBtnHovered(false)}
          onClick={handleAddToCart}
          aria-live="polite"
        >
          {btnAnimation === "added" ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Added to cart!
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Add to cart
            </>
          )}
        </button>
      </div>
    </article>
  );
}
