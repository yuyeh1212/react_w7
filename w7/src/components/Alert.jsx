import { useSelector, useDispatch } from "react-redux";
import { hideAlert } from "../redux/alertSlice";
import { useEffect } from "react";

const Alert = () => {
  const dispatch = useDispatch();
  const { message, type, visible } = useSelector((state) => state.alert);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        dispatch(hideAlert());
      }, 3000); // 3秒後自動隱藏
    }
  }, [visible, dispatch]);

  if (!visible) return null;

  return (
    <div className={`alert alert-${type} position-fixed top-0 end-0 m-3`}>
      {message}
    </div>
  );
};

export default Alert;
