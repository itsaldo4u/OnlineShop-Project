import { useState } from "react";
import { ProductData } from "../../context/AppContext";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, checked } = e.target as HTMLInputElement;

    if (name === "tags" || name === "filterTags") {
      setFormData({
        ...formData,
        [name]: value.split(",").map((t) => t.trim()),
      });
    } else if (name === "isNew") {
      setFormData({
        ...formData,
        isNew: checked,
      });
    } else if (name === "rating") {
      setFormData({
        ...formData,
        rating: value === "" ? undefined : Number(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id) {
      formData.id = Math.random().toString(36).substr(2, 9);
    }
    onSave(formData);
    onClose();
  };

  return (
    <div
      className="modal d-block"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header py-2">
              <h5 className="modal-title m-0">
                {product ? "Edito Produkt" : "Shto Produkt"}
              </h5>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>
            <div
              className="modal-body"
              style={{
                maxHeight: "60vh",
                overflowY: "auto",
                padding: "1rem 1.5rem",
              }}
            >
              {/* Titulli */}
              <div className="mb-2">
                <label className="form-label small fw-semibold">Titulli</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  autoFocus
                />
              </div>
              {/* Përshkrimi */}
              <div className="mb-2">
                <label className="form-label small fw-semibold">
                  Përshkrimi
                </label>
                <textarea
                  className="form-control form-control-sm"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={2}
                  required
                />
              </div>
              {/* Çmimi */}
              <div className="mb-2">
                <label className="form-label small fw-semibold">Çmimi</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Foto */}
              <div className="mb-2">
                <label className="form-label small fw-semibold">
                  Foto (emri i file-it)
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="img"
                  value={formData.img}
                  onChange={handleChange}
                />
              </div>
              {/* Tags */}
              <div className="mb-2">
                <label className="form-label small fw-semibold">
                  Etiketa (shkruaj me presje)
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="tags"
                  value={formData.tags.join(",")}
                  onChange={handleChange}
                />
              </div>
              {/* FilterTags */}
              <div className="mb-2">
                <label className="form-label small fw-semibold">
                  Filter Tags (shkruaj me presje)
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="filterTags"
                  value={formData.filterTags.join(",")}
                  onChange={handleChange}
                />
              </div>
              {/* Rating */}
              <div className="mb-2">
                <label className="form-label small fw-semibold">
                  Vlerësimi (rating) - 1 deri 5
                </label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  step={0.1}
                  className="form-control form-control-sm"
                  name="rating"
                  value={formData.rating ?? ""}
                  onChange={handleChange}
                />
              </div>
              {/* Discount */}
              <div className="mb-2">
                <label className="form-label small fw-semibold">
                  Discount (p.sh. "10% OFF")
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="discount"
                  value={formData.discount ?? ""}
                  onChange={handleChange}
                />
              </div>
              {/* Produkt i Ri */}
              <div className="form-check form-switch mb-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="isNew"
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label small fw-semibold"
                  htmlFor="isNew"
                >
                  Produkt i Ri
                </label>
              </div>
            </div>
            <div className="modal-footer py-2">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={onClose}
              >
                Anulo
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Ruaj
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ProductForm;
