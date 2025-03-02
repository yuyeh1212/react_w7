function ProductList({ products, onEdit, onDelete, onAddProduct }) {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>產品列表</h2>
        <button className="btn btn-success" onClick={onAddProduct}>
          新增產品
        </button>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>分類</th>
            <th>產品名稱</th>
            <th>原價</th>
            <th>售價</th>
            <th>是否啟用</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.category}</td>
              <td>{product.title}</td>
              <td>{product.origin_price}</td>
              <td>{product.price}</td>
              <td>
                {product.is_enabled ? (
                  <span className="text-success">啟用</span>
                ) : (
                  <span className="text-danger">未啟用</span>
                )}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => onEdit(product)}
                >
                  編輯
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(product.id)}
                >
                  刪除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
