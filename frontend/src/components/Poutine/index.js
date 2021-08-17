import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPoutines } from "../../store/poutine";


const Poutine = () => {
    const { poutineId } = useParams();
    const poutine = useSelector(state => state.poutines[poutineId])
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPoutines())
    }, [dispatch])

    return (
        <h1>{poutine.name}</h1>
    )
}

export default Poutine;
