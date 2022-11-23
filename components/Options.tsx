import React from 'react'
import Image from 'next/image'
import Physics from '../public/subject/physics.svg'
import Chemistry from '../public/subject/chemistry.svg'
import Math from '../public/subject/math.svg'
import Biology from '../public/subject/biology.svg'
import Link from 'next/link'

const Options = ({ params, subject }: any) => {

    // console.log(subject)

    return (


        <div className="grid grid-cols-2 sm:flex py-1 sm:ml-20  justify-center items-center">


            <Link href={`/${params}/physics`} className={`flex items-center justify-center m-3 rounded-lg ${subject !== 'physics' ? " rounded-lg  transition ease-in-out delay-100 bg-slate-100 hover:-translate-y-1 hover:scale-110   hover:shadow-[inset_13rem_0_0_0]   hover:shadow-cyan-400" : "bg-cyan-400 "} `}>
                <button className=' block p-4 w-36 rounded-lg ' >
                    <div className="flex items-center justify-start ">
                        <Image src={Physics} alt="Physics" width={45} height={45} />
                        <span className="ml-[7px] text-md  font-medium text-gray-900"> Physics </span>
                    </div>
                </button>
            </Link>


            <Link href={`/${params}/chemistry`} className={`flex items-center justify-center m-3 rounded-lg ${subject !== 'chemistry' ? "   transition ease-in-out delay-100 bg-slate-100 hover:-translate-y-1 hover:scale-110   hover:shadow-[inset_13rem_0_0_0]   hover:shadow-cyan-400" : "bg-cyan-400 "} `}>
                <button className=' quiz block p-4 w-36 rounded-lg ' >
                    <div className="flex items-center justify-start">
                        <Image src={Chemistry} alt="Chemistry" width={45} height={45} />
                        <span className="ml-[7px] text-md font-medium text-gray-900"> Chemistry </span>
                    </div>
                </button>
            </Link>


            <Link href={`/${params}/biology`} className={`flex items-center justify-center m-3 rounded-lg ${subject !== 'biology' ? " rounded-lg  transition ease-in-out delay-100 bg-slate-100 hover:-translate-y-1 hover:scale-110   hover:shadow-[inset_13rem_0_0_0]   hover:shadow-cyan-400" : "bg-cyan-400 "}`}  >
                <button className='paper block p-4 w-36   ' >
                    <div className="flex items-center justify-start">
                        <Image src={Biology} alt="Biology" width={45} height={45} />
                        <span className="ml-[7px] text-md font-medium text-gray-900"> Biology </span>
                    </div>
                </button>
            </Link>

            <Link href={`/${params}/math`} className={`flex items-center justify-center m-3 rounded-lg ${subject !== 'math' ? " rounded-lg  transition ease-in-out delay-100 bg-slate-100 hover:-translate-y-1 hover:scale-110   hover:shadow-[inset_13rem_0_0_0]   hover:shadow-cyan-400" : "bg-cyan-400 "}`} >
                <button className=' tuition block p-4 w-36 ' >
                    <div className="flex items-center justify-start">
                        <Image src={Math} alt="Math" width={45} height={45} />
                        <span className="ml-3 text-md font-medium text-gray-900"> Math </span>
                    </div>
                </button>
            </Link>



        </div>



    )
}

export default Options