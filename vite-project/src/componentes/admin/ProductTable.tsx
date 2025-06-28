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
    width: "30px",
    height: "30px",
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
        color: "#2c3e50",
        background: "transparent",
        minHeight: "100vh",
        padding: "10px",
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "transparent",
          borderRadius: "20px",
          padding: "10px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h4
          style={{
            fontWeight: "700",
            fontSize: "2rem",
            marginBottom: "2rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
          }}
        >
          Menaxhimi i Produkteve
        </h4>

        <button
          onClick={openAddForm}
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            border: "none",
            padding: "12px 24px",
            borderRadius: "12px",
            color: "white",
            fontWeight: "600",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 8px 16px rgba(102, 126, 234, 0.3)",
            transition: "all 0.3s ease",
            marginBottom: "20px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 12px 24px rgba(102, 126, 234, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 8px 16px rgba(102, 126, 234, 0.3)";
          }}
        >
          + Shto Produkt
        </button>

        <div
          className="table-responsive"
          style={{
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
            border: "none",
            background: "white",
            width: "100%",
            overflowX: "auto",
          }}
        >
          <table
            className="table table-hover align-middle text-center"
            style={{
              width: "100%",
              fontSize: "0.9rem",
              backgroundColor: "#fff",
              marginBottom: "0",
              borderCollapse: "separate",
              borderSpacing: "0",
            }}
          >
            <thead
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                textTransform: "uppercase",
                fontSize: "0.85rem",
                fontWeight: "600",
              }}
            >
              <tr>
                <th
                  style={{
                    padding: "16px 12px",
                    fontWeight: "600",
                    width: "60px",
                    borderBottom: "none",
                  }}
                >
                  ID
                </th>
                <th
                  style={{
                    padding: "16px 8px",
                    borderBottom: "none",
                    minWidth: "60px",
                  }}
                >
                  Foto
                </th>
                <th
                  style={{
                    padding: "16px 8px",
                    borderBottom: "none",
                    minWidth: "120px",
                  }}
                >
                  Titulli
                </th>
                <th
                  style={{
                    minWidth: "120px",
                    padding: "16px 8px",
                    borderBottom: "none",
                    fontSize: "0.8rem",
                  }}
                >
                  Përshkrimi
                </th>
                <th
                  style={{
                    padding: "16px 8px",
                    borderBottom: "none",
                    minWidth: "80px",
                  }}
                >
                  Çmimi
                </th>
                <th
                  style={{
                    padding: "16px 8px",
                    borderBottom: "none",
                    minWidth: "100px",
                  }}
                >
                  Etiketa
                </th>
                <th
                  style={{
                    padding: "16px 8px",
                    borderBottom: "none",
                    minWidth: "100px",
                  }}
                >
                  Filter Tags
                </th>
                <th
                  style={{
                    padding: "16px 8px",
                    borderBottom: "none",
                    minWidth: "80px",
                  }}
                >
                  Vlerësimi
                </th>
                <th
                  style={{
                    padding: "16px 8px",
                    borderBottom: "none",
                    minWidth: "80px",
                  }}
                >
                  Discount
                </th>
                <th
                  style={{
                    padding: "16px 8px",
                    borderBottom: "none",
                    minWidth: "100px",
                  }}
                >
                  Produkt i Ri?
                </th>
                <th
                  style={{
                    padding: "16px 8px",
                    borderBottom: "none",
                    minWidth: "120px",
                  }}
                >
                  Veprime
                </th>
              </tr>
            </thead>
            <tbody>
              {productdata.map((p, index) => (
                <tr
                  key={p.id}
                  style={{
                    transition: "all 0.3s ease",
                    backgroundColor: index % 2 === 0 ? "#f8f9ff" : "#ffffff",
                    borderBottom: "1px solid #e8ecf4",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#e8f2ff";
                    e.currentTarget.style.transform = "scale(1.01)";
                    e.currentTarget.style.boxShadow =
                      "0 5px 15px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      index % 2 === 0 ? "#f8f9ff" : "#ffffff";
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <td style={{ padding: "12px 8px", verticalAlign: "middle" }}>
                    <span
                      className="badge"
                      style={{
                        padding: "8px 12px",
                        borderRadius: "20px",
                        fontSize: "0.8rem",
                        background:
                          "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                        color: "#2c3e50",
                        fontWeight: "600",
                      }}
                    >
                      {p.id}
                    </span>
                  </td>
                  <td style={{ padding: "12px 8px", verticalAlign: "middle" }}>
                    <div
                      style={{
                        display: "inline-block",
                        borderRadius: "12px",
                        overflow: "hidden",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      }}
                    >
                      <img
                        src={`/${p.img}`}
                        alt={p.title}
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                          transition: "transform 0.2s ease",
                        }}
                        onMouseEnter={(e) => scaleImg(e, 1.1)}
                        onMouseLeave={(e) => scaleImg(e, 1)}
                      />
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "12px 8px",
                      verticalAlign: "middle",
                      fontWeight: "600",
                      color: "#2c3e50",
                      fontSize: "0.85rem",
                    }}
                  >
                    {p.title}
                    {p.isNew && (
                      <span
                        className="badge ms-2"
                        style={{
                          fontSize: "0.7rem",
                          padding: "4px 8px",
                          background:
                            "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                          color: "white",
                          borderRadius: "12px",
                        }}
                      >
                        E re
                      </span>
                    )}
                  </td>
                  <td
                    style={{
                      padding: "12px 8px",
                      verticalAlign: "middle",
                      color: "#64748b",
                      fontSize: "0.8rem",
                    }}
                  >
                    {p.description.length > 60
                      ? `${p.description.slice(0, 60)}...`
                      : p.description}
                  </td>
                  <td style={{ padding: "12px 8px", verticalAlign: "middle" }}>
                    <span
                      style={{
                        fontWeight: "700",
                        fontSize: "1.1rem",
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {p.price}€
                    </span>
                    {p.discount && (
                      <div style={{ marginTop: "4px" }}>
                        <span
                          className="badge"
                          style={{
                            fontSize: "0.7rem",
                            background:
                              "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
                            color: "white",
                            borderRadius: "12px",
                          }}
                        >
                          -{p.discount}
                        </span>
                      </div>
                    )}
                  </td>
                  <td style={{ padding: "12px 8px", verticalAlign: "middle" }}>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "2px",
                        justifyContent: "center",
                      }}
                    >
                      {renderTags(p.tags)}
                    </div>
                  </td>
                  <td style={{ padding: "12px 8px", verticalAlign: "middle" }}>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "2px",
                        justifyContent: "center",
                      }}
                    >
                      {renderTags(p.filterTags, "info")}
                    </div>
                  </td>
                  <td style={{ padding: "12px 8px", verticalAlign: "middle" }}>
                    {p.rating ? (
                      <span
                        className="badge"
                        style={{
                          fontSize: "0.8rem",
                          padding: "8px 12px",
                          background:
                            "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
                          color: "#2c3e50",
                          borderRadius: "20px",
                          fontWeight: "600",
                        }}
                      >
                        ⭐ {p.rating}
                      </span>
                    ) : (
                      <span style={{ color: "#94a3b8" }}>-</span>
                    )}
                  </td>
                  <td
                    style={{
                      padding: "12px 8px",
                      verticalAlign: "middle",
                      fontWeight: "600",
                    }}
                  >
                    {p.discount ? (
                      `${p.discount}`
                    ) : (
                      <span style={{ color: "#94a3b8" }}>-</span>
                    )}
                  </td>
                  <td style={{ padding: "12px 8px", verticalAlign: "middle" }}>
                    <span
                      className="badge"
                      style={{
                        fontSize: "0.8rem",
                        padding: "8px 14px",
                        background: p.isNew
                          ? "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)"
                          : "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
                        color: "#2c3e50",
                        borderRadius: "20px",
                        fontWeight: "600",
                      }}
                    >
                      {p.isNew ? "Po" : "Jo"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 8px", verticalAlign: "middle" }}>
                    <div className="d-flex justify-content-center gap-1">
                      <button
                        onClick={() => openEditForm(p)}
                        style={{
                          ...iconBtnStyle("#ffc107"),
                          background:
                            "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
                          border: "none",
                          color: "#2c3e50",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "linear-gradient(135deg, #fcb69f 0%, #ffecd2 100%)";
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow =
                            "0 4px 8px rgba(252, 182, 159, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)";
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                        title="Edito"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => setProductToDelete(p.id)}
                        style={{
                          ...iconBtnStyle("#dc3545"),
                          background:
                            "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
                          border: "none",
                          color: "#2c3e50",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "linear-gradient(135deg, #fecfef 0%, #ff9a9e 100%)";
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow =
                            "0 4px 8px rgba(255, 154, 158, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)";
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                        title="Fshi"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            backdropFilter: "blur(5px)",
          }}
          onClick={() => setProductToDelete(null)}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              padding: "2.5rem",
              borderRadius: "20px",
              maxWidth: "450px",
              width: "100%",
              color: "white",
              textAlign: "center",
              boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p
              style={{
                marginBottom: "2rem",
                fontSize: "1.2rem",
                fontWeight: "600",
                lineHeight: "1.5",
              }}
            >
              A jeni i sigurt që doni ta fshini këtë produkt?
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1.5rem",
              }}
            >
              <button
                onClick={() => setProductToDelete(null)}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "2px solid rgba(255,255,255,0.3)",
                  padding: "0.8rem 1.5rem",
                  borderRadius: "12px",
                  cursor: "pointer",
                  color: "white",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.3)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Anulo
              </button>
              <button
                onClick={confirmDelete}
                style={{
                  background:
                    "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
                  border: "none",
                  padding: "0.8rem 1.5rem",
                  borderRadius: "12px",
                  cursor: "pointer",
                  color: "white",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 8px rgba(238, 90, 36, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 12px rgba(238, 90, 36, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(238, 90, 36, 0.3)";
                }}
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
