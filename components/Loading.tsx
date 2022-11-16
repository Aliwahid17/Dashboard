import Image from 'next/image'
import React from 'react'
import load from '../public/Fidget-spinner.gif'

const Loading = () => {
    return (

        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
            <Image src={load} alt="loading..." />
        </div>


    )
}

export default Loading