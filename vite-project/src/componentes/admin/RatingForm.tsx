
import { useAppContext } from "../../context/AppContext";

const RatingsTable = () => {
  const { Rating, productdata } = useAppContext();

  // Group ratings by productId
  const groupedRatings = productdata.map((product) => {
    const productRating = Rating.filter((rate) => rate.id === product.id);

    const totalRatings = productRating.reduce(
      (sum, rate) => sum + rate.rating,
      0
    );

    const averageRating =
      productRating.length > 0
        ? (totalRatings / productRating.length).toFixed(1)
        : "N/A";

    return {
      ...product,
      totalRatings: productRating.length,
      averageRating,
    };
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Product Ratings</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Number of Ratings</th>
            <th>Average</th>
          </tr>
        </thead>
        <tbody>
          {groupedRatings.length > 0 ? (
            groupedRatings.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.img}
                    alt={product.title}
                    style={{
                      width: "30px",
                      height: "30px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                    className="img-thumbnail"
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.totalRatings}</td>
                <td>{product.averageRating}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center text-muted py-4">
                No products or ratings recorded.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RatingsTable;
