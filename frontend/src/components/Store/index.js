import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getStores } from "../../store/stores";


const Store = () => {
    const { storeId } = useParams();
    const store = useSelector(state => state.stores[storeId])
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStores())
    }, [dispatch])

    return (
        <h1>{store.name}</h1>
    )
}

export default Store;
