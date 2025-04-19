import { useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";

// Lista e produkteve
const products = [
  {
    img: "men-skin-care.jpg",
    title: "Cleanser Amino Men",
    description: "Formula me aminoacide pastron pa e tharë lëkurën.",
    price: "€24.99",
    tags: ["Pastrim i thellë", "Hidratim dhe freski", "E butë me lëkurën"],
  },
  {
    img: "krem.webp",
    title: "Krem Hidratues",
    description: "Krem i pasur me vitamina për fytyrë të shëndetshme.",
    price: "€19.99",
    tags: ["Hidratim", "Mbrojtje UV", "Anti-rrudhë"],
  },
  {
    img: "shampo.jpg",
    title: "Shampo Bimore",
    description: "Shampo pa sulfate me përbërës natyralë.",
    price: "€14.99",
    tags: ["Pa sulfate", "Fortësim flokësh", "Aromë freskuese"],
  },
  {
    img: "vaj.webp",
    title: "Serum për mjekër",
    description: "Rritje dhe mbushje e qimeve të mjekrës.",
    price: "€22.49",
    tags: ["Rritje natyrale", "Vitaminë E", "Nuk irriton lëkurën"],
  },
  {
    img: "naturalskincare.jpg",
    title: "Scrub Fytyre",
    description: "Eksfoliues i butë për lëkurë të freskët.",
    price: "€16.99",
    tags: ["Hiq qelizat e vdekura", "Butësi", "Efekt pastrues"],
  },
  {
    img: "care products.jpg",
    title: "Locion Trupi",
    description: "Locion i lehtë me përbërës hidratues.",
    price: "€12.99",
    tags: ["Lëkurë më e butë", "Aromë relaksuese", "Përditshëm"],
  },
];

export default function ProductList() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q")?.toLowerCase() || "";
  console.log("Query nga URL:", query);

  // Filtrojmë produktet që përputhen me query
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.tags.some((tag) => tag.toLowerCase().includes(query))
  );

  return (
    <div
      style={{
        display: "grid",
        marginTop: "40px",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px,1fr))",
        gap: "30px",
        padding: "30px",
        backgroundColor: "#111",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product, index) => (
          <ProductCard
            key={index}
            img={product.img}
            title={product.title}
            description={product.description}
            price={product.price}
            tags={product.tags}
          />
        ))
      ) : (
        <p
          style={{
            gridColumn: "1 / -1",
            marginTop: "40px",
            textAlign: "center",
            fontSize: "20px",
          }}
        >
          Nuk u gjet asnjë produkt për: <strong>{query}</strong>
        </p>
      )}
    </div>
  );
}
