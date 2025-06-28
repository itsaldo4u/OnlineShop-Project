// src/componentes/admin/ProductForm.tsx
import { useState, useEffect } from "react"; // Shto useEffect
import { ProductData } from "../../context/AppContext";
import { XCircle, Save } from "lucide-react";

type FormProps = {
  product: ProductData | null;
  onClose: () => void;
  onSave: (product: ProductData) => void;
};

const ProductForm = ({ product, onClose, onSave }: FormProps) => {
  const [formData, setFormData] = useState<ProductData>(
    product || {
      id: "",
      img: "",
      title: "",
      description: "",
      price: "",
      tags: [],
      filterTags: [],
      rating: undefined,
      discount: "",
      isNew: false,
    }
  );

  // State të veçantë për vlerat e papërpunuara të inputeve të tags
  // Kjo siguron që presja të shfaqet menjëherë.
  const [rawTagsInput, setRawTagsInput] = useState<string>(
    formData.tags.join(", ")
  );
  const [rawFilterTagsInput, setRawFilterTagsInput] = useState<string>(
    formData.filterTags.join(", ")
  );

  // State për mesazhet e gabimit për tags/filterTags
  const [tagError, setTagError] = useState<string | null>(null);
  const [filterTagError, setFilterTagError] = useState<string | null>(null);

  // Përdor useEffect për të sinkronizuar rawTagsInput me formData.tags
  // Kur editohet një produkt ekzistues.
  useEffect(() => {
    if (product) {
      setRawTagsInput(product.tags.join(", "));
      setRawFilterTagsInput(product.filterTags.join(", "));
    } else {
      // Nëse shtohet një produkt i ri, pastro fushat
      setRawTagsInput("");
      setRawFilterTagsInput("");
    }
    // Gjithashtu pastro gabimet kur ndryshon produkti (p.sh. nga edit në add)
    setTagError(null);
    setFilterTagError(null);
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, checked, type } = e.target as HTMLInputElement;

    if (name === "tags" || name === "filterTags") {
      // Përditëso state-in e inputit të papërpunuar menjëherë
      if (name === "tags") {
        setRawTagsInput(value);
      } else {
        setRawFilterTagsInput(value);
      }

      // Pastro mesazhet e gabimit kur ndryshon inputi
      if (name === "tags") setTagError(null);
      if (name === "filterTags") setFilterTagError(null);

      // Nda fjalët sipas presjes, pastro hapësirat, dhe filtro boshllëqet
      const currentTags = value
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t !== "");

      // Kufizimi në maksimumi 3 fjalë
      if (currentTags.length > 3) {
        if (name === "tags") {
          setTagError("Maksimumi 3 etiketa lejohen.");
        } else {
          setFilterTagError("Maksimumi 3 etiketa filtri lejohen.");
        }
        // Nuk ndryshojmë formData-n këtu nëse ka gabim, por lejojmë inputin të shfaqë çfarëdo që shkruhet
        // Nënkupton që validimi final do të bëhet në handleSubmit
      } else {
        // Përditëso formData vetëm nëse numri i etiketave është i vlefshëm
        setFormData((prevData) => ({
          ...prevData,
          [name]: currentTags,
        }));
      }
    } else if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (name === "rating") {
      setFormData((prevData) => ({
        ...prevData,
        rating: value === "" ? undefined : Number(value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Rifresko vlerat e tags/filterTags në formData nga raw input para se të validosh
    // Kjo siguron që formData të ketë vlerat aktuale para ruajtjes
    const finalTags = rawTagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");
    const finalFilterTags = rawFilterTagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    if (finalTags.length > 3) {
      setTagError("Maksimumi 3 etiketa lejohen.");
      return; // Ndalon dërgimin e formës
    }
    if (finalFilterTags.length > 3) {
      setFilterTagError("Maksimumi 3 etiketa filtri lejohen.");
      return; // Ndalon dërgimin e formës
    }

    // Përditëso formData me vlerat finale të etiketave para ruajtjes
    const dataToSave = {
      ...formData,
      tags: finalTags,
      filterTags: finalFilterTags,
    };

    if (!dataToSave.id) {
      dataToSave.id = Math.random().toString(36).substr(2, 9);
    }
    onSave(dataToSave);
    onClose();
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
      aria-labelledby="productFormModal"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-md"
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content rounded-4 shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="modal-header bg-gradient-primary text-white py-3 px-4 rounded-top-4">
              <h5 className="modal-title fw-bold m-0" id="productFormModal">
                {product ? "Edito Produkt" : "Shto Produkt"}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>

            <div
              className="modal-body p-4"
              style={{
                maxHeight: "60vh",
                overflowY: "auto",
              }}
            >
              {/* Titulli */}
              <div className="mb-3">
                <label
                  htmlFor="title"
                  className="form-label small fw-semibold text-muted mb-1"
                >
                  Titulli
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm rounded-3"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  autoFocus
                />
              </div>

              {/* Përshkrimi */}
              <div className="mb-3">
                <label
                  htmlFor="description"
                  className="form-label small fw-semibold text-muted mb-1"
                >
                  Përshkrimi
                </label>
                <textarea
                  className="form-control form-control-sm rounded-3"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={2}
                  required
                />
              </div>

              {/* Çmimi */}
              <div className="mb-3">
                <label
                  htmlFor="price"
                  className="form-label small fw-semibold text-muted mb-1"
                >
                  Çmimi
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm rounded-3"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Foto (emri i file-it) */}
              <div className="mb-3">
                <label
                  htmlFor="img"
                  className="form-label small fw-semibold text-muted mb-1"
                >
                  Foto (emri i file-it)
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm rounded-3"
                  id="img"
                  name="img"
                  value={formData.img}
                  onChange={handleChange}
                />
              </div>

              {/* Tags */}
              <div className="mb-3">
                <label
                  htmlFor="tags"
                  className="form-label small fw-semibold text-muted mb-1"
                >
                  Etiketa (maks. 3, nda me presje)
                </label>
                <input
                  type="text"
                  className={`form-control form-control-sm rounded-3 ${
                    tagError ? "is-invalid" : ""
                  }`}
                  id="tags"
                  name="tags"
                  value={rawTagsInput} // Këtu përdorim state-in e papërpunuar
                  onChange={handleChange}
                />
                {tagError && (
                  <div className="invalid-feedback d-block">{tagError}</div>
                )}
              </div>

              {/* FilterTags */}
              <div className="mb-3">
                <label
                  htmlFor="filterTags"
                  className="form-label small fw-semibold text-muted mb-1"
                >
                  Filter Tags (maks. 3, nda me presje)
                </label>
                <input
                  type="text"
                  className={`form-control form-control-sm rounded-3 ${
                    filterTagError ? "is-invalid" : ""
                  }`}
                  id="filterTags"
                  name="filterTags"
                  value={rawFilterTagsInput} // Këtu përdorim state-in e papërpunuar
                  onChange={handleChange}
                />
                {filterTagError && (
                  <div className="invalid-feedback d-block">
                    {filterTagError}
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="mb-3">
                <label
                  htmlFor="rating"
                  className="form-label small fw-semibold text-muted mb-1"
                >
                  Vlerësimi (rating) - 1 deri 5
                </label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  step={0.1}
                  className="form-control form-control-sm rounded-3"
                  id="rating"
                  name="rating"
                  value={formData.rating ?? ""}
                  onChange={handleChange}
                />
              </div>

              {/* Discount */}
              <div className="mb-3">
                <label
                  htmlFor="discount"
                  className="form-label small fw-semibold text-muted mb-1"
                >
                  Discount (p.sh. "10% OFF")
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm rounded-3"
                  id="discount"
                  name="discount"
                  value={formData.discount ?? ""}
                  onChange={handleChange}
                />
              </div>

              {/* Produkt i Ri Checkbox */}
              <div className="form-check form-switch mb-3 d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  id="isNew"
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label small fw-semibold text-muted"
                  htmlFor="isNew"
                >
                  Produkt i Ri
                </label>
              </div>
            </div>

            <div className="modal-footer d-flex justify-content-end gap-2 py-3 px-4 bg-light rounded-bottom-4">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1 rounded-pill px-3 py-2"
                onClick={onClose}
              >
                <XCircle size={16} /> Anulo
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-sm d-flex align-items-center gap-1 rounded-pill px-3 py-2"
                // Disables button if there are errors
                disabled={!!tagError || !!filterTagError}
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  boxShadow: "0 4px 8px rgba(102, 126, 234, 0.3)",
                }}
              >
                <Save size={16} /> Ruaj
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
