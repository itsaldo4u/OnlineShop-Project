import { useState } from "react";
import "./ProductCard.css";
import axios from "axios";

type ProductCardProps = {
  id: string;
  img: string;
  title: string;
  description: string;
  price: string;
  tags: string[];
  filterTags: string[];
  discount?: string;
  rating?: number;
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
  const [isHovered, setIsHovered] = useState(false);
  const [isImgHovered, setIsImgHovered] = useState(false);
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const [btnAnimation, setBtnAnimation] = useState("");

  const [userRating, setUserRating] = useState<number | null>(null);
  const [currentRating, setCurrentRating] = useState(rating);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [loadingRating, setLoadingRating] = useState(false);
  const [errorRating, setErrorRating] = useState<string | null>(null);

  const handleRatingClick = async (newRating: number) => {
    setLoadingRating(true);
    setErrorRating(null);
    try {
      await axios.post(`http://localhost:3000/rating`, {
        id,
        rating: newRating,
      });
      setUserRating(newRating);
      setCurrentRating(newRating);
    } catch (error) {
      setErrorRating("Nuk u ruajt ratingu në server.");
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
          aria-label={interactive ? `Jep rating ${i}` : undefined}
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
      aria-label={`Produkt: ${title}, çmimi: ${price}`}
      tabIndex={0}
    >
      <div className="card-accent" aria-hidden="true" />
      {discount && (
        <div className="discount-badge" aria-label={`Zbritje: ${discount}`}>
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
          <span className="new-badge" aria-label="Produkt i ri">
            NEW
          </span>
        )}
      </div>

      <div className="card-content">
        <h3 className="product-title">{title}</h3>
        <div aria-label="Vlerësimi i produktit" style={{ marginBottom: "8px" }}>
          {renderStars(currentRating, true)}
        </div>
        {loadingRating && <p>Po ruhet vlerësimi...</p>}
        {errorRating && <p style={{ color: "red" }}>{errorRating}</p>}
        <p className="product-description">{description}</p>
        <div className="tag-box" aria-label="Kategoritë e produktit">
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
          <span>Çmimi</span>
          <div>
            {getOriginalPrice() && (
              <span className="price-old" aria-label="Çmimi pa zbritje">
                {getOriginalPrice()}
              </span>
            )}
            <span
              className={`price-current ${discount ? "discount" : ""}`}
              aria-label="Çmimi aktual"
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
              Shtuar në shportë!
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
              Shto në shportë
            </>
          )}
        </button>
      </div>
    </article>
  );
}
