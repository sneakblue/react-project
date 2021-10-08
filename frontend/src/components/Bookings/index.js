import DatePicker from 'react-datepicker';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { newBooking, findBookings, removeBooking, updateBooking } from '../../store/bookings';

import "react-datepicker/dist/react-datepicker.css";
import './Bookings.css';

const dateFormatter = (date) => {
    let newDate = date.split('');
    let year = '';
    let month = '';
    let day = '';
    for (let i = 0; i < 5; i++) {
        if (i === 4) {
            newDate.shift();
            continue;
        }
        year += newDate.shift();
    };
    for (let i = 0; i < 3; i++) {
        if (i === 2) {
            newDate.shift();
            continue;
        }
        month += newDate.shift();
    };
    for (let i = 0; i < 2; i++) {
        day += newDate.shift();
    };
    let textMonth = monthFormatter(month);
    return `${textMonth} ${day}, ${year}`
}

const monthFormatter = (month) => {
    if (month === '01') {
        return 'January'
    } else if (month === '02') {
        return 'February'
    } else if (month === '03') {
        return 'March'
    } else if (month === '04') {
        return 'April'
    } else if (month === '05') {
        return 'May'
    } else if (month === '06') {
        return 'June'
    } else if (month === '07') {
        return 'July'
    } else if (month === '08') {
        return 'August'
    } else if (month === '09') {
        return 'September'
    } else if (month === '10') {
        return 'October'
    } else if (month === '11') {
        return 'November'
    } else if (month === '12') {
        return 'December'
    } else {
        return 'Invalid Month'
    }
}

export default function Bookings ({ hauntId }) {
    const [ startDate, setStartDate ] = useState(new Date());
    const [ endDate, setEndDate ] = useState( new Date());
    const [ hasBooking, setHasBooking ] = useState( false );
    const [ currBooking, setCurrBooking ] = useState({});
    const [ editStart, setEditStart ] = useState(new Date(currBooking.startDate));
    const [ editEnd, setEditEnd ] = useState( new Date(currBooking.endDate));
    const [ showEdit, setShowEdit ] = useState(false);
    const dispatch = useDispatch();
    const currUser = useSelector(state => state.session.user);
    const bookings = useSelector(state => Object.values(state.bookings));

    useEffect(() => {

    }, [hasBooking])

    useEffect(() => {
        dispatch(findBookings());
    }, [dispatch])

    useEffect(() => {
        bookings.forEach(booking => {
            if (booking.userId === currUser.id) {
                setHasBooking(true);
                setCurrBooking(booking);
            }
        })
    }, [bookings, currUser.id])

    const handleBooking = async () => {
        const newBook = {
            hauntId,
            userId: currUser.id,
            startDate,
            endDate
        }
        dispatch(newBooking(newBook))
    }

    const handleEdit = async () => {
        const edittedBooking = {
            id: currBooking.id,
            hauntId: currBooking.hauntId,
            userId: currBooking.userId,
            startDate: currBooking.startDate,
            endDate: currBooking.endDate
        }

        setShowEdit(false);
    }

    const handleDelete = async () => {
        await dispatch(removeBooking(currBooking.id));
        setHasBooking(false);
    }

    let content = null;

    let bookingContent = null;


    if (hasBooking) {
        const currStart = currBooking.startDate.slice(0, 10);
        let formattedStart = dateFormatter(currStart)
        const currEnd = currBooking.endDate.slice(0, 10);
        let formattedEnd = dateFormatter(currEnd);

        if (showEdit) {
            // if (startDate !== currBooking.startDate) setStartDate(new Date(currBooking.startDate));
            // if (endDate !== currBooking.endDate) setEndDate(new Date(currBooking.endDate));

            bookingContent = (
                <>
                    <h2>Change Your Stay</h2>
                    <div className='date-div'>
                        <h5>Start Date</h5>
                        <DatePicker
                            selected={editStart}
                            selectsStart
                            onChange={(date) => setEditStart(date)}
                            minDate={new Date()}
                            startDate={editStart}
                            endDate={editEnd}
                        />
                        <h5>End Date</h5>
                        <DatePicker
                            selected={editEnd}
                            selectsEnd
                            onChange={(date) => setEditEnd(date)}
                            startDate={editStart}
                            endDate={editEnd}
                            minDate={editStart}
                        />
                        <button className='bookings-btn' onClick={handleEdit}>Update Booking</button>
                    </div>
                </>
            )
        } else {
            bookingContent = (
                <>
                    <h2>Your Booking</h2>
                    <div className='currBooking-div'>
                        <h5 className='booking-start-h5'>Check-in:</h5>
                        <h5>{formattedStart}</h5>
                    </div>
                    <div className='currBooking-div'>
                        <h5 className='booking-start-h5'>Check-out:</h5>
                        <h5>{formattedEnd}</h5>
                    </div>
                    <div className='booking-edit-delete-btns'>
                        <button className='bookings-btn' onClick={() => showEdit ? setShowEdit(false) : setShowEdit(true)}>Edit Booking</button>
                        <button className='bookings-btn' onClick={handleDelete}>Delete Booking</button>
                    </div>
                </>
            )
        }

        content = (
            <>
                {bookingContent}
            </>
        )
    } else {
        content = (
            <>
                <h2>Book Your Stay</h2>
                <div className='date-div'>
                    <h5>Start Date</h5>
                    <DatePicker
                        selected={startDate}
                        selectsStart
                        onChange={(date) => setStartDate(date)}
                        minDate={new Date()}
                        startDate={startDate}
                        endDate={endDate}
                    />
                    <h5>End Date</h5>
                    <DatePicker
                        selected={endDate}
                        selectsEnd
                        onChange={(date) => setEndDate(date)}
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                    />
                    <button className='bookings-btn' onClick={handleBooking}>Book</button>
                </div>
            </>
        )
    }

    return (
        <div className='bookings-main--div'>
            {content}
        </div>
    )
}
