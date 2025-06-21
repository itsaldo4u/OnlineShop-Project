import { useState } from "react";
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
  rating?: number;
  isNew?: boolean;
  onAddToCart: () => void;
};

export default function ProductCard({
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

  // Funksion për krijimin e yjeve bazuar në rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`star-full-${i}`} className="star-full" aria-hidden="true">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="star-half" className="star-half" aria-hidden="true">
          ★
        </span>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`star-empty-${i}`} className="star-empty" aria-hidden="true">
          ★
        </span>
      );
    }

    return (
      <div
        className="star-wrapper"
        aria-label={`Vlerësimi: ${rating.toFixed(1)} nga 5`}
      >
        {stars}
        <span className="star-rating">({rating.toFixed(1)})</span>
      </div>
    );
  };

  // Llogarit çmimin "original" (pa zbritje) nëse ka discount në %
  const getOriginalPrice = () => {
    if (!discount) return null;

    // Nëse discount është në format % (p.sh "20%")
    if (discount.includes("%")) {
      const discountPercent = parseFloat(discount.replace("%", ""));
      const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ""));
      if (!isNaN(discountPercent) && !isNaN(numericPrice)) {
        const original = numericPrice / (1 - discountPercent / 100);
        return original.toFixed(2) + "€";
      }
    }
    // Nëse discount është absolute, ose nuk mund ta llogarisim originalin, mund ta mos shfaqim
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
        {renderStars(rating)}
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
