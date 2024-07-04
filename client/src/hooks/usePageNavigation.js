import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProgress } from "../redux/slices/loadingSlice";
import { setToggleSelectButton } from "../redux/slices/toggleSelectButton";


const usePageNavigation = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate( );

  const handlePropagation = (e) => {
    e.stopPropagation();
  };

  const navigateToPage = async (path, select) => {
    dispatch(setProgress(10));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    navigate(path);
    dispatch(setToggleSelectButton(select));
    dispatch(setProgress(100));
  };

  return {handlePropagation, navigateToPage}
};

export default usePageNavigation;
