import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { newHaunt } from "../../store/haunts";

export default function CreateHaunt () {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [price, setPrice] = useState('');
    const [activity, setActivity] = useState('');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState([]);

    if(!sessionUser) {
        history.push('/login');
    }

    useEffect(() => {
        const errors = [];
        if (name.length < 3) {
            errors.push('Name must be 3 or more characters');
        } else if (name.length === 0) {
            errors.push('Must provide a name');
        }
        if (address.length === 0) {
            errors.push('Must provide an address');
        }
        if (city.length === 0) {
            errors.push('Must provide a city');
        }
        if (state.length === 0) {
            errors.push('Must provide a state or province');
        }
        if (country.length === 0) {
            errors.push('Must provide a country');
        }
        if (lat.length === 0) {
            errors.push('Must provide a lattitude');
        }
        if (lng.length === 0) {
            errors.push('Must provide a longitude');
        }
        if (price <= 0) {
            errors.push('Must provide a price higher than zero');
        }
        if (activity <= 0) {
            errors.push('Must provide a Paranormal Activity level');
        }
        setErrors(errors);
    }, [name, address, city, state, country, lat, lng, price, activity])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!errors.length > 0) {
            const createdHaunt = {
                userId: sessionUser.id,
                name,
                address,
                city,
                state,
                country,
                lat,
                lng,
                price,
                activity
            }
            dispatch(newHaunt(createdHaunt));
            history.push('/');
        }
    }

    return (
        <div>
            <h2>Create a Haunt page</h2>
            <form
                onSubmit={handleSubmit}
            >
                <ul className='errors'>
                    {errors.map((error) => <li key={error}>{error}</li>)}
                </ul>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        name='name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='address'>Address</label>
                    <input
                        type='text'
                        name='address'
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='city'>City</label>
                    <input
                        type='text'
                        name='city'
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='state'>State</label>
                    <input
                        type='text'
                        name='state'
                        value={state}
                        onChange={e => setState(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='country'>Country</label>
                    <input
                        type='text'
                        name='country'
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='lat'>Lattitude</label>
                    <input
                        type='decimal'
                        name='lat'
                        value={lat}
                        onChange={e => setLat(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='lng'>Longitude</label>
                    <input
                        type='decimal'
                        name='lng'
                        value={lng}
                        onChange={e => setLng(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='price'>Price per Night</label>
                    <input
                        type='decimal'
                        name='price'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='activity'>Paranormal Activity level</label>
                    <input
                        type='number'
                        name='activity'
                        value={activity}
                        onChange={e => setActivity(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='image'>Image URL</label>
                    <input
                        type='text'
                        name='image'
                        value={image}
                        onChange={e => setImage(e.target.value)}
                    />
                </div>
                <button type='submit'>Create Haunt</button>
            </form>
        </div>
    )
}