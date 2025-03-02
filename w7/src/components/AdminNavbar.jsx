import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/admin">
          購物網站管理後台
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/admin/products">
                產品管理
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/orders">
                訂單管理
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/logout">
                登出
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
