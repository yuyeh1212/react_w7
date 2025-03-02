import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showAlert } from "../redux/alertSlice";

const API_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [modalProduct, setModalProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const fetchProducts = async (page = 1) => {
    const token = localStorage.getItem("hexToken");
    if (!token) return dispatch(showAlert({ message: "Token 無效，請先登入！", type: "warning" }));
    setIsLoading(true); // 請求開始，開啟 loading
    try {
      const res = await axios.get(
        `${API_URL}/v2/api/${API_PATH}/admin/products?page=${page}`,
        { headers: { Authorization: token } }
      );
      setProducts(res.data.products || []);
      setPagination(res.data.pagination);
    } catch (err) {
      dispatch(showAlert({ message: "載入產品列表失敗，請稍後再試", type: "error" }));
    } finally {
      setIsLoading(false); // 請求結束，關閉 loading
    }
  };

  const addProduct = () => {
    setModalProduct({
      title: "",
      category: "",
      origin_price: 0,
      price: 0,
      unit: "",
      description: "",
      content: "",
      is_enabled: 0,
      imageUrl: "",
      imagesUrls: [],
    });
  };

  const handleEditProduct = (product) => {
    setModalProduct(product);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("確定要刪除此產品嗎？")) {
      try {
        const token = localStorage.getItem("hexToken");
        await axios.delete(
          `${API_URL}/v2/api/${API_PATH}/admin/product/${productId}`,
          {
            headers: { Authorization: token },
          }
        );
        dispatch(showAlert({ message: "刪除成功", type: "success" }));
        const newProducts = products.filter((p) => p.id !== productId);
        if (newProducts.length === 0 && pagination.current_page > 1) {
          fetchProducts(pagination.current_page - 1);
        } else {
          fetchProducts(pagination.current_page);
        }
      } catch (err) {
        dispatch(showAlert({ message: "刪除失敗，請稍後再試", type: "error" }));
      }
    }
  };

  const handleSubmitProduct = async () => {
    const token = localStorage.getItem("hexToken");
    if (!token) return dispatch(showAlert({ message: "Token 無效，請先登入！", type: "warning" }));
    const payload = { data: { ...modalProduct } };

    try {
      if (modalProduct.id) {
        await axios.put(
          `${API_URL}/v2/api/${API_PATH}/admin/product/${modalProduct.id}`,
          payload,
          {
            headers: { Authorization: token },
          }
        );
        dispatch(showAlert({ message: "產品更新成功！", type: "success" }));
      } else {
        await axios.post(
          `${API_URL}/v2/api/${API_PATH}/admin/product`,
          payload,
          {
            headers: { Authorization: token },
          }
        );
        dispatch(showAlert({ message: "產品新增成功！", type: "success" }));
      }
      setModalProduct(null);
      fetchProducts(pagination.current_page || 1);
    } catch (err) {
      dispatch(showAlert({ message: "操作失敗，請稍後再試", type: "error" }));
    }
  };

  return {
    products,
    pagination,
    modalProduct,
    fetchProducts,
    addProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleSubmitProduct,
    setModalProduct,
  };
}
