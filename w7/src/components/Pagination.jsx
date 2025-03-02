function Pagination({ pagination, onPageChange }) {
  return (
    <div className="d-flex justify-content-center">
      <nav>
        <ul className="pagination">
          <li className={`page-item ${!pagination.has_pre ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(pagination.current_page - 1)}
            >
              上一頁
            </button>
          </li>
          {Array.from({ length: pagination.total_pages }, (_, i) => (
            <li
              key={i + 1}
              className={`page-item ${
                pagination.current_page === i + 1 ? "active" : ""
              }`}
            >
              <button className="page-link" onClick={() => onPageChange(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${!pagination.has_next ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(pagination.current_page + 1)}
            >
              下一頁
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
