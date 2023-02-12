import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { cartActions } from "../redux/slice/cart.slice";
import { likeActions } from '../redux/slice/like.slice';

const allActions = {
    ...likeActions,
    ...cartActions
}

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(allActions, dispatch)
}