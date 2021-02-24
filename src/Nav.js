import React, { useState } from 'react'

export default function Nav() {

    const [isActive, setActive] = useState()

    return (
        <div className="mt-5 m-5">
            <a href="/" className="w-50 btn btn-primary active">My List</a>
            <a href="/calendar" className="w-50 btn btn-primary">My Calendar</a>
        </div>
    )
}