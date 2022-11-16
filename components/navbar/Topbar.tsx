import React, { useState } from 'react'
import Minibar from './Minibar'
import Sidebar from './Sidebar'
import Notification from '../../public/navbar/notification.svg'
import Link from 'next/link'
import Image from 'next/image'


const Topbar = () => {

    const [open, setOpen] = useState<Boolean>(false)

    return (
        <>

                <nav className= {`sticky top-0 z-[1] ${!open ? 'md:ml-16' : 'ml-[199px] ' } overflow-hidden`} >
                    <div className="bg-white font-sans w-full m-0 ">
                        <div className="bg-slate-200 shadow-md  ">
                            <div className="container mx-auto px-4  ">
                                <div className="flex items-center justify-between py-4">


                                    <button onClick={() => setOpen(!open)} className='w-10 h-10 flex items-center justify-center'>

                                        {
                                            open ? (

                                                <svg viewBox="0 0 24 24" width="33.35" height="33.35" className="inline-block"><path fill="currentColor" d="M5,13L9,17L7.6,18.42L1.18,12L7.6,5.58L9,7L5,11H21V13H5M21,6V8H11V6H21M21,16V18H11V16H21Z"></path></svg>


                                            ) : (
                                                <svg viewBox="0 0 24 24" width="33.35" height="33.35" className="inline-block"><path fill="currentColor" d="M19,13H3V11H19L15,7L16.4,5.6L22.8,12L16.4,18.4L15,17L19,13M3,6H13V8H3V6M13,16V18H3V16H13Z"></path></svg>

                                            )
                                        }

                                    </button>

                                        <Link href="#" className='w-10 h-10 flex items-center justify-center' >
                                            <Image src={Notification} alt="Notification" width={33.35} height={33.35} />
                                        </Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </nav>



{ !open ? <Minibar /> : <Sidebar /> }

 
            
        </>
    )
}

export default Topbar