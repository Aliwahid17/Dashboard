import React, { useState } from 'react'
import { useAuth } from '../../context/AuthState'
import { newUser } from '../../types'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useRouter } from 'next/navigation';

const Create = () => {

    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [code, setCode] = useState('')
    const [country, setCountry] = useState('')
    const [position, setPosition] = useState('')
    const [permission, setPermission] = useState('')
    const [address, setAddress] = useState('')
    const { user, userPermisssion } = useAuth()
    const date = new Date().toLocaleString('en-US', { timeZone: "GMT" });
    const day = new Date().getDay()
    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const timeOut = `${dayName[day]}, ${date} GMT`
    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let userData: newUser | object | any;
        let error: string[] = [];

        userData = {

            "Permission": permission,
            "Position": position,
            "creationTime": timeOut,
            "email": email,
            "phoneNumber": `${code}${phone}`,
            "address": address,
            "createdBy": user.email,
            "country": country,

        }

        const docRef = doc(db, "Dashboard", userData.email);
        const docSnap = await getDoc(docRef);

        for (let data in userData) {
            const check = [null, '--']
            const value = userData[data]
            for (let checkVal in check) {

                if (!value || value.includes(check[checkVal])) {
                    console.log("userData", value)
                    error.push(value)

                }

            }

        }

        if (error.length !== 0) {
            return toast.error('Create User failed!! 🚫🤚 ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (docSnap.exists()) {
            return toast.error('User already Exists!! 🚫🤚 ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast.success('User Created Successfully 🥳🎉', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            await setDoc(doc(db, "Dashboard", userData.email), userData);
            router.refresh()

        }

        console.log(docSnap.exists())



    }

    return (

        <>


            <section className="max-w-4xl p-6 mx-auto bg-gray-100 rounded-md shadow-lg ">

                <form method='POST' onSubmit={(e) => handleSubmit(e)}>

                    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">




                        <div className="relative  z-0 mb-1 w-full group">
                            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className=" block w-full px-4 py-2.5 text-gray-900 border-gray-400 rounded-md  text-sm    bg-transparent border-2 border-b-2  appearance-none   focus:outline-none focus:ring-0 focus:border-cyan-600 peer" placeholder=" " required />
                            <label htmlFor="email" className="  peer-focus:font-medium absolute text-sm text-black bg-gray-100  duration-300  transform -translate-y-4 scale-75 top-2 z-10 origin-[0]   px-1 peer-focus:px-2 peer-focus:text-cyan-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[18px] left-2">Email</label>
                        </div>




                        <div className="relative  z-0 mb-1 w-full group ">
                            <input onChange={(e) => setPhone(e.target.value)} type="text" name="phone" id="phone" className=" block w-full pl-[70px]  pr-4 py-2.5 text-gray-900 border-gray-400 rounded-md  text-sm    bg-transparent border-2 border-b-2  appearance-none   focus:outline-none focus:ring-0 focus:border-cyan-600 peer" placeholder=" " required />
                            <label htmlFor="phone" className=" mx-14   peer-focus:font-medium absolute text-sm text-black bg-gray-100  duration-300  transform -translate-y-4 scale-75 top-2 z-10 origin-[0]   px-1 peer-focus:px-2 peer-focus:text-cyan-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[18px] left-2">Phone Number</label>

                            <div className="absolute inset-y-0 left-0 flex items-center bg-gray-500 text-white rounded-md  my-1 ml-1 ">
                                <select onChange={(e) => setCode(e.target.value)} id="code" name="code" className="block  bg-gray-500 w-full border-transparent rounded-md focus:ring-cyan-600 focus:border-cyan-600 ">
                                    <option> + -- </option>
                                    <option> +44 </option>
                                    <option> +91 </option>
                                    <option> +1 </option>
                                </select>
                            </div>


                        </div>



                        <div className="mb-1">
                            <select onChange={(e) => setCountry(e.target.value)} id="country" name="country" autoComplete="country" className=" block w-full rounded-md border border-gray-300 bg-white p-3 shadow-sm focus:border-cyan-600 focus:outline-none focus:ring-cyan-600 sm:text-sm">
                                <option> ---- Country ---- </option>
                                <option> United Kingdom (UK) </option>
                                <option> India </option>
                                <option> United State Of America (USA) </option>
                            </select>
                        </div>

                        <div className="mb-1">
                            <select onChange={(e) => setPosition(e.target.value)} id="position" name="position" autoComplete="position" className=" block w-full rounded-md border border-gray-300 bg-white p-3 shadow-sm focus:border-cyan-600 focus:outline-none focus:ring-cyan-600 sm:text-sm">
                                <option> ---- Position ---- </option>
                                <option> Co-Founder </option>
                                <option> Chief Executive Officer (CEO) </option>
                                <option> Chief Financial Officer (CFO) </option>
                                <option> Chief Technology Officer (CTO) </option>
                                <option> Chief Operating Officer (COO) </option>
                                <option> Writer </option>
                                <option> Developer </option>
                                <option> Human Resource (HR) </option>
                                <option> Manager </option>
                                <option> Supporter </option>
                            </select>
                        </div>

                        <div className="mb-1">
                            <select onChange={(e) => setPermission(e.target.value)} id="permission" name="permission" autoComplete="permission" className=" block w-full rounded-md border border-gray-300 bg-white p-3 shadow-sm focus:border-cyan-600 focus:outline-none focus:ring-cyan-600 sm:text-sm">
                                <option> ---- Permission ---- </option>
                                <option> SuperUser </option>
                                <option> Admin </option>
                            </select>
                        </div>

                        <div className="relative  z-0 mb-1 w-full group">

                            <input onChange={(e) => setAddress(e.target.value)} name="address" id="address" className=" block  w-full px-4 py-2.5 text-gray-900 border-gray-400 rounded-md  text-sm    bg-transparent border-2 border-b-2  appearance-none   focus:outline-none focus:ring-0 focus:border-cyan-600 peer" placeholder=" " required />
                            <label htmlFor="address" className="  peer-focus:font-medium absolute text-sm text-black bg-gray-100  duration-300  transform -translate-y-4 scale-75 top-2 z-10 origin-[0]   px-1 peer-focus:px-2 peer-focus:text-cyan-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[18px] left-2">Address</label>
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        {userPermisssion === "SuperUser" && <button type='submit' className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-red-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" >Create</button>}
                    </div>

                </form>
            </section>

        </>

    )
}

export default Create