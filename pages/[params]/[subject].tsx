import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import Options from '../../components/Options'
import { FcPlus } from 'react-icons/fc';
import { AiFillDelete } from 'react-icons/ai';
import { useAuth } from '../../context/AuthState';
import { toast } from 'react-toastify';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';


let optionId = 0;
const Subject = () => {

    const { user } = useAuth()

    const router = useRouter()
    const { params, subject }: any = router.query

    const date = new Date().toLocaleString('en-US', { timeZone: "GMT" });
    const day = new Date().getDay()
    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const timeOut = `${dayName[day]}, ${date} GMT`

    const [quiz, setQuiz] = useState(false)
    const [paper, setPaper] = useState(false)
    const [option, setOption] = useState<string>("")
    const [addOption, setAddOption] = useState<any>([])
    // const [topics, setTopics] = useState<string>('')
    const [topics, setTopics] = useState<string>('---- Topics ----')
    const [type, setType] = useState<string>('')
    const [active, setActive] = useState<string>('')
    const [question, setQuestion] = useState<string>('')

    // const router = useRouter()



    const physicsTopics = ["---- Topics ----", "Gravity", "Motion"]
    const quizType = ["MCQ\'s", "True Or False", "Fill in The Gaps"]

    // let ques = 0;

    const quizModal = () => {
        if (params === 'quizzes') {
            setQuiz(true)
        }
        if (params === 'practice-paper') {
            setPaper(true)
        }
    }

    const check = (e: any, id: number) => {

        addOption.filter((a: any) => {
            if (a.id === id) {
                a.checked = e.target.checked
            }
        })

    }



    const onClickOption = () => {

        if (option.length !== 0) {
            setOption("")
            addOption.push({
                id: optionId++,
                option: option,
                checked: false
            })
        }

    }


    const handleSubmit = async (e: any) => {

        e.preventDefault()
        let quiz;
        let fail = 0;
        let error: string[] = []

        quiz = Object.assign({

            "Subject": subject,
            "Topic": topics,
            "Type": type,
            "Public": active,
            "Question": question,
            "options": addOption,
            "creationTime": timeOut,
            "createdBy": user.email

        })


        // const docRef = doc(db, "Quizzes", subject);
        // const docSnap = await getDoc(docRef);
        console.log(quiz)


        for (let data in quiz) {
            const check = [null, '--']
            const value = quiz[data]
            for (let checkVal in check) {

                if (!value || value.includes(check[checkVal])) {
                    console.log("userData", value)
                    error.push(value)

                }

            }

        }

        for (let index = 0; index < addOption.length; index++) {
            if (!addOption[index].checked) {
                fail++
            }
        }

        if (addOption.length === fail) {
            error.push(addOption.length)
        }

        if (error.length !== 0) {
            return toast.error('Create Quiz failed!! 🚫🤚 ', {
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
            toast.success('Quiz Created Successfully 🥳🎉', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            await addDoc(collection(db, "Quizzes", quiz.Subject, quiz.Topic), quiz);

            setQuestion("")
            setAddOption([])
            // setOption("")
            // setAddOption([])
            setTopics('---- Topics ----')
            // setType('')
            // setActive('')
            // setQuestion('')

        }

        console.log("fail", fail)
        console.log('e', error)

    }




    return (
        <>

            <div className={`${quiz ? 'blur-sm' : ""}`} >

                <section className='max-w-4xl mx-auto  container p-4 md:pl-20 ' >

                    <div className="flex  justify-between  bg-white ">
                        <Link href='/notes/physics'>
                            <button className={`${params === 'notes' ? "border-b-2 border-blue-500" : ""} h-10 px-4 py-2 -mb-px text-sm text-center text-blue-600 bg-transparent  sm:text-base   whitespace-nowrap focus:outline-none`} >
                                Notes
                            </button>
                        </Link>

                        <Link href='/quizzes/physics'>
                            <button className={`${params === 'quizzes' ? "border-b-2 border-blue-500" : ""} h-10 px-4 py-2 ml-5 -mb-px text-sm text-center text-blue-600 bg-transparent  sm:text-base   whitespace-nowrap focus:outline-none`} >
                                Quizzes
                            </button>
                        </Link>

                        <Link href='/practice-paper/physics'>
                            <button className={`${params === 'practice-paper' ? "border-b-2 border-blue-500" : ""} h-10 px-4  -mb-px text-sm text-center text-blue-600 bg-transparent  sm:text-base   whitespace-nowrap focus:outline-none`} >
                                Practice Paper
                            </button>
                        </Link>

                    </div>


                </section>

                <Options params={params} subject={subject} />

                {params === "notes" && <div className='flex justify-center items-center mx-10 mt-2' >
                    <button className="flex items-center justify-center w-full px-2 py-1 sm:ml-7 text-white transition-colors duration-300 transform bg-green-400 rounded-md focus:outline-none sm:w-auto  hover:bg-gray-500 focus:bg-green-500 focus:ring focus:ring-green-300 focus:ring-opacity-40">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span className="mx-1">
                            Upload
                        </span>
                    </button>
                </div>}

                {(params === "quizzes" || params === "practice-paper") && <div className='flex justify-center items-center mx-10 mt-2' >
                    <button onClick={() => quizModal()} className="flex items-center justify-center w-full px-2 py-1 sm:ml-7 text-white transition-colors duration-300 transform bg-green-400 rounded-md focus:outline-none sm:w-auto  hover:bg-gray-500 focus:bg-green-500 focus:ring focus:ring-green-300 focus:ring-opacity-40">
                        <FcPlus className=" w-5 h-5 mx-1 " />
                        <span className="mx-1">
                            Add
                        </span>
                    </button>
                </div>}

            </div>


            {

                quiz &&

                <div className="  w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
                    <div className="mt-0  opacity-100 duration-500 ease-out transition-all sm:max-w-3xl sm:pl-32 lg:pl-24 sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center justify-center">
                        <div className="flex flex-col bg-gray-100 rounded-xl  border border-gray-400 shadow-2xl   ">
                            <div className="flex justify-between items-center py-3 px-4 border-b border-b-slate-300 ">
                                <h3 className="font-bold text-gray-800 ">
                                    Quizzes
                                </h3>
                                <button onClick={() => setQuiz(false)} type="button" className=" inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm  " >
                                    <span className="sr-only">Close</span>
                                    <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                                    </svg>
                                </button>
                            </div>


                            <section className="max-w-7xl  mx-auto p-4  ">

                                <form method='POST' onSubmit={(e) => handleSubmit(e)}>

                                    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 w-full">

                                        <div className="relative  z-0 mb-1 w-full group">
                                            <input type="text" name="subjects" id="subjects" className=" block w-full px-4 py-2.5 placeholder:text-gray-900 border-gray-400 rounded-md  text-sm    bg-transparent border-2     " placeholder={`${subject}`} disabled />
                                            <label htmlFor="Subject" className="   font-sm absolute text-xs text-black bg-gray-100 -translate-y-4 top-2 z-10 origin-top left-2 px-2 peer-focus:text-cyan-600  ">Subject</label>
                                        </div>


                                        <div className="mb-1">
                                            <select onChange={(e) => setTopics(e.target.value)} value={topics} id="topics" name="topics" autoComplete="topics" className=" cursor-pointer block w-full rounded-md border border-gray-300 bg-white p-3 shadow-sm focus:border-cyan-600 focus:outline-none focus:ring-cyan-600 sm:text-sm">
                                                {/* <option> ---- Topics ---- </option> */}
                                                {/* <option> ---- Topics ---- </option> */}
                                                {
                                                    physicsTopics.map((topics, key) => <option key={key}> {topics} </option>)
                                                }
                                            </select>
                                        </div>

                                        <div className="mb-1">
                                            <select onChange={(e) => setType(e.target.value)} id="type" name="type" autoComplete="type" className=" cursor-pointer block w-full rounded-md border border-gray-300 bg-white p-3 shadow-sm focus:border-cyan-600 focus:outline-none focus:ring-cyan-600 sm:text-sm">
                                                <option> ---- Type Of Quiz ---- </option>
                                                {
                                                    quizType.map((type, key) => <option key={key}> {type} </option>)
                                                }
                                            </select>
                                        </div>

                                        <div className="mb-1">
                                            <select onChange={(e) => setActive(e.target.value)} id="public" name="public" autoComplete="public" className="cursor-pointer block w-full rounded-md border border-gray-300 bg-white p-3 shadow-sm focus:border-cyan-600 focus:outline-none focus:ring-cyan-600 sm:text-sm">
                                                <option> ---- Public ---- </option>
                                                <option> YES </option>
                                                <option> NO </option>
                                            </select>
                                        </div>



                                    </div>

                                    <div className="relative mt-4 z-0 mb-1 w-full group">
                                        <textarea onChange={(e) => setQuestion(e.target.value)} value={question} name="questions" id="questions" className=" block  w-full px-4 py-2.5 text-gray-900 border-gray-400 rounded-md  text-sm    bg-transparent border-2 border-b-2  appearance-none   focus:outline-none focus:ring-0 focus:border-cyan-600 peer" placeholder=" " required />
                                        <label htmlFor="questions" className="  peer-focus:font-medium absolute text-sm text-black bg-gray-100  duration-300  transform -translate-y-4 scale-75 top-2 z-10 origin-[0]   px-1 peer-focus:px-2 peer-focus:text-cyan-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[18px] left-2">Question</label>
                                    </div>


                                    <div className="relative mt-4 flex z-0 mb-1 w-full group">
                                        <input onChange={(e) => setOption(e.target.value)} value={option} type="option" name="option" id="option" className=" block w-full pl-4 pr-20 py-2.5 text-gray-900 border-gray-400 rounded-md  text-sm    bg-transparent border-2 border-b-2  appearance-none   focus:outline-none focus:ring-0 focus:border-cyan-600 peer" placeholder=" " />
                                        <label htmlFor="option" className="  peer-focus:font-medium absolute text-sm text-black bg-gray-100  duration-300  transform -translate-y-4 scale-75 top-2 z-10 origin-[0]   px-1 peer-focus:px-2 peer-focus:text-cyan-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[18px] left-2">Option</label>
                                        <button onClick={() => onClickOption()} type='button' className=' border-l-2 border-l-gray-300 inline-flex justify-center items-center  -ml-[70px] my-2 ' ><FcPlus className=" w-5 h-5 mx-1 " />Add</button>
                                    </div>





                                    {
                                        addOption.map((option: any) => (
                                            <label key={option.id} className="flex w-full mt-2  py-2.5 text-gray-900 border-gray-400 rounded-md  text-sm    bg-transparent border-2 border-b-2  appearance-none   focus:outline-none focus:ring-0 focus:border-cyan-600 peer" >
                                                {/* <input value={option.option}  onChange={(e) => addOption[option.id].checked! = e.target.checked} className="mx-2" type="checkbox" name="value" id="value" /> */}
                                                <input value={option.option} onChange={(e) => check(e, option.id)} className="mx-2" type="checkbox" name="value" id="value" />
                                                {option.option}
                                                <button onClick={() => { setAddOption(addOption.filter((a: any) => a.id !== option.id)) }} className='flex justify-end mx-2 items-end w-full' ><AiFillDelete fill='red' className='  w-5 h-5 mx-1  ' /> </button>
                                            </label>

                                        ))
                                    }



                                    <div className="flex justify-end items-center mt-4 py-3  border-t border-t-slate-300 ">
                                        <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md bg-green-100 border border-transparent font-semibold text-green-500 hover:text-white hover:bg-green-600 focus:outline-none focus:ring-2 ring-offset-white focus:ring-green-500 focus:ring-offset-2 transition-all text-sm ">
                                            <FcPlus className=" w-5 h-5 mx-1 " /> Add Quiz
                                        </button>
                                    </div>
                                </form>
                            </section>

                        </div>
                    </div>
                </div >

            }

        </>
    )
}

export default Subject