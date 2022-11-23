import React, { useState } from 'react'
import Create from '../components/settings/Create'
import Current from '../components/settings/Current'

const Settings = () => {

    const [active, setActive] = useState(true)

    return (
        <section className="max-w-4xl mx-auto  container p-4 md:pl-20  ">

            <div className="flex  justify-around  bg-white ">
                <button onClick={() => setActive(true)} className={`${active ? "border-b-2 border-blue-500" : ""} h-10 px-4 py-2 -mb-px text-sm text-center text-blue-600 bg-transparent  sm:text-base   whitespace-nowrap focus:outline-none`} >
                    Create User
                </button>

                <button onClick={() => setActive(false)}  className={`${!active ? "border-b-2 border-blue-500" : ""} h-10 px-4 py-2 -mb-px text-sm text-center text-blue-600 bg-transparent  sm:text-base   whitespace-nowrap focus:outline-none`} >
                    Current User
                </button>

            </div>

            <div className='mt-4'>

                {active ? <Create /> : <Current /> } 

            </div>

        </section>
    )
}

export default Settings