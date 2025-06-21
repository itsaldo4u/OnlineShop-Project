import { useState } from "react";
import { useAppContext, ProductData } from "../../context/AppContext";
import ProductForm from "./ProductForm";
import { Edit, Trash2 } from "lucide-react";

const ProductTable = () => {
  const { productdata, deleteProduct, addProduct, updateProduct } =
    useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(
    null
  );
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const confirmDelete = async () => {
    if (productToDelete) {
      await deleteProduct(productToDelete);
      setProductToDelete(null);
    }
  };

  const openAddForm = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const openEditForm = (product: ProductData) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleSave = async (product: ProductData) => {
    editingProduct ? await updateProduct(product) : await addProduct(product);
  };

  const iconBtnStyle = (color: string) => ({
    width: "35px",
    height: "35px",
    borderRadius: "8px",
    border: `2px solid ${color}`,
    transition: "all 0.2s ease",
    color,
    backgroundColor: "transparent",
  });

  const renderTags = (tags: string[], color = "secondary") =>
    tags.map((tag, i) => (
      <span
        key={i}
        className={`badge bg-${color}`}
        style={{
          fontSize: "0.75rem",
          padding: "5px 10px",
          borderRadius: "12px",
        }}
      >
        {tag}
      </span>
    ));

  const scaleImg = (e: any, scale: number) => {
    e.target.style.transform = `scale(${scale})`;
  };

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#222",
      }}
    >
      <h4
        style={{
          fontWeight: "700",
          fontSize: "1.7rem",
          marginBottom: "1.5rem",
        }}
      >
        Menaxhimi i Produkteve
      </h4>

      <button
        onClick={openAddForm}
        style={{
          backgroundColor: "#4caf50",
          border: "none",
          padding: "10px 18px",
          borderRadius: "8px",
          color: "white",
          fontWeight: "600",
          fontSize: "1rem",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(76, 175, 80, 0.4)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#43a047")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#4caf50")
        }
      >
        + Shto Produkt
      </button>

      <div
        className="table-responsive"
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
          border: "1px solid #ddd",
        }}
      >
        <table
          className="table table-bordered table-hover align-middle text-center"
          style={{ width: "100%", fontSize: "0.9rem", backgroundColor: "#fff" }}
        >
          <thead
            style={{
              background: "linear-gradient(90deg, #4b79a1 0%, #283e51 100%)",
              color: "white",
              textTransform: "uppercase",
              fontSize: "0.85rem",
            }}
          >
            <tr>
              <th
                style={{
                  padding: "12px 8px",
                  fontWeight: "600",
                  width: "60px",
                }}
              >
                ID
              </th>
              <th>Foto</th>
              <th>Titulli</th>
              <th style={{ minWidth: "150px" }}>Përshkrimi</th>
              <th>Çmimi</th>
              <th>Etiketa</th>
              <th>Filter Tags</th>
              <th>Vlerësimi</th>
              <th>Discount</th>
              <th>Produkt i Ri?</th>
              <th>Veprime</th>
            </tr>
          </thead>
          <tbody>
            {productdata.map((p) => (
              <tr
                key={p.id}
                style={{
                  transition: "all 0.2s ease",
                  borderBottom: "1px solid #f1f3f4",
                }}
              >
                <td>
                  <span
                    className="badge bg-light text-dark"
                    style={{
                      padding: "8px 10px",
                      borderRadius: "8px",
                      fontSize: "0.8rem",
                    }}
                  >
                    {p.id}
                  </span>
                </td>
                <td>
                  <img
                    src={`/${p.img}`}
                    alt={p.title}
                    className="rounded shadow-sm"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) => scaleImg(e, 1.1)}
                    onMouseLeave={(e) => scaleImg(e, 1)}
                  />
                </td>
                <td>
                  {p.title}
                  {p.isNew && (
                    <span
                      className="badge bg-success ms-2"
                      style={{ fontSize: "0.7rem", padding: "4px 8px" }}
                    >
                      E re
                    </span>
                  )}
                </td>
                <td>
                  {p.description.length > 80
                    ? `${p.description.slice(0, 80)}...`
                    : p.description}
                </td>
                <td>
                  <span className="fw-bold text-success">{p.price}€</span>
                  {p.discount && (
                    <div>
                      <span
                        className="badge bg-danger"
                        style={{ fontSize: "0.7rem" }}
                      >
                        -{p.discount}
                      </span>
                    </div>
                  )}
                </td>
                <td>{renderTags(p.tags)}</td>
                <td>{renderTags(p.filterTags, "info")}</td>
                <td>
                  {p.rating ? (
                    <span
                      className="badge bg-warning text-dark"
                      style={{ fontSize: "0.8rem", padding: "6px 10px" }}
                    >
                      ⭐ {p.rating}
                    </span>
                  ) : (
                    "-"
                  )}
                </td>
                <td>{p.discount ? `${p.discount}` : "-"}</td>
                <td>
                  <span
                    className={`badge ${
                      p.isNew ? "bg-success" : "bg-secondary"
                    }`}
                    style={{ fontSize: "0.8rem", padding: "6px 12px" }}
                  >
                    {p.isNew ? "Po" : "Jo"}
                  </span>
                </td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      onClick={() => openEditForm(p)}
                      style={iconBtnStyle("#ffc107")}
                      onMouseEnter={(e) => (
                        (e.currentTarget.style.backgroundColor = "#ffc107"),
                        (e.currentTarget.style.color = "white")
                      )}
                      onMouseLeave={(e) => (
                        (e.currentTarget.style.backgroundColor = "transparent"),
                        (e.currentTarget.style.color = "#ffc107")
                      )}
                      title="Edito"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => setProductToDelete(p.id)}
                      style={iconBtnStyle("#dc3545")}
                      onMouseEnter={(e) => (
                        (e.currentTarget.style.backgroundColor = "#dc3545"),
                        (e.currentTarget.style.color = "white")
                      )}
                      onMouseLeave={(e) => (
                        (e.currentTarget.style.backgroundColor = "transparent"),
                        (e.currentTarget.style.color = "#dc3545")
                      )}
                      title="Fshi"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}

      {productToDelete && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          onClick={() => setProductToDelete(null)}
        >
          <div
            style={{
              backgroundColor: "#222",
              padding: "2rem",
              borderRadius: "12px",
              maxWidth: "420px",
              width: "100%",
              color: "white",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p
              style={{
                marginBottom: "1.5rem",
                fontSize: "1.1rem",
                fontWeight: "600",
              }}
            >
              A jeni i sigurt që doni ta fshini këtë produkt?
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1.2rem",
              }}
            >
              <button
                onClick={() => setProductToDelete(null)}
                style={{
                  backgroundColor: "#757575",
                  border: "none",
                  padding: "0.6rem 1.3rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  color: "white",
                  fontWeight: "600",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#616161")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#757575")
                }
              >
                Anulo
              </button>
              <button
                onClick={confirmDelete}
                style={{
                  backgroundColor: "#e53935",
                  border: "none",
                  padding: "0.6rem 1.3rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  color: "white",
                  fontWeight: "600",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#d32f2f")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#e53935")
                }
              >
                Fshi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
