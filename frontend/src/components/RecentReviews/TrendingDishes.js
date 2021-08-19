import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const TrendingDishes = () => {

    const poutines = useSelector(state => Object.values(state.poutines).sort((a, b) => b.Checkins.length - a.Checkins.length).slice(0, 3))

    return (
        <div className='trending-dish-container'>
            {poutines && poutines.map(poutine => (
                <LittlePoutineCard key={poutine.id} poutine={poutine} />
            ))}
        </div>
    )
}


const LittlePoutineCard = ({ poutine }) => {
    return (
        <div className='little-poutine-card'>
            <p><Link to={`/poutines/${poutine.id}`}>{poutine.name}</Link> at <Link to={`/stores/${poutine.Store.id}`}>{poutine.Store.name}.</Link></p>
            <img src={poutine.imageUrl} alt={poutine.name} />
        </div>


    )
}

export default TrendingDishes;
