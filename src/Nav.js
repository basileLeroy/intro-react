import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {

    return (
        <div className="mt-5 m-5">
            <Link to="/" className="w-50 btn btn-primary">My List</Link>
            <Link to="/calendar" className="w-50 btn btn-primary">My Calendar</Link>
        </div>
    )
}