// src/pages/backend/ProductManagement.jsx
import React from "react";
import ProductList from "../../components/ProductList";
import Pagination from "../../components/Pagination";
import ProductModal from "../../components/ProductModal";
import useProducts from "../../hooks/useProducts";

const ProductManagement = () => {
  const {
    products,
    pagination,
    modalProduct,
    fetchProducts,
    addProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleSubmitProduct,
    setModalProduct,
  } = useProducts();

  React.useEffect(() => {
    fetchProducts(1);
  }, []);

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-12">
          <h2>產品管理</h2>
          <ProductList
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onAddProduct={addProduct}
          />
          <Pagination pagination={pagination} onPageChange={fetchProducts} />
        </div>
      </div>
      {modalProduct && (
        <ProductModal
          product={modalProduct}
          isEditMode={!!modalProduct.id}
          onClose={() => setModalProduct(null)}
          onInputChange={(e) => {
            const { name, value } = e.target;
            setModalProduct((prev) => ({
              ...prev,
              [name]:
                name === "origin_price" || name === "price"
                  ? Number(value)
                  : value,
            }));
          }}
          onSubmit={handleSubmitProduct}
        />
      )}
    </div>
  );
};

export default ProductManagement;
