import ProductList from "../componentes/products/ProductList";

export default function ProductPage() {
  return (
    <div
      style={{
        backgroundColor: "#0e0e0e",
        minHeight: "100vh",
        padding: "30px 20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#ffffff",
          fontSize: "2.5rem",
          marginTop: "30px",
          textTransform: "uppercase",
          letterSpacing: "2px",
        }}
      >
        Produktet Tona
      </h1>
      <ProductList />
    </div>
  );
}
