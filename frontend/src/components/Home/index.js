import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPoutines } from "../../store/poutine";


const Home = () => {
    const poutines = useSelector(state => state.poutines)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPoutines());
    }, [dispatch])

    return (
        <div>
            {Object.values(poutines) && Object.values(poutines).map(poutine => (
                <div key={poutine.id}>
                    <h2>{poutine.name}</h2>
                    <img src={poutine.imageUrl} alt={poutine.name}></img>
                </div>
            ))}
        </div>
    )
}


export default Home;
