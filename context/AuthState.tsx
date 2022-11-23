import { useState, useContext, useEffect } from "react";
import AuthContext from "./AuthContext";
import { auth, db, provider } from '../firebase/config'
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../components/Loading";
import { user } from "../types";


export const useAuth = () => useContext(AuthContext)

const AuthState = ({ children }: any) => {

    const [user, setUser] = useState<any>(null);
    const date = new Date().toLocaleString('en-US', { timeZone: "GMT" });
    const day = new Date().getDay()
    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const timeOut = `${dayName[day]}, ${date} GMT`
    const [loading, setLoading] = useState(true)
    const [userPermisssion, setUserPermisssion] = useState(null)

    const googleSignIn = async () => {

        try {
            const res = (await signInWithPopup(auth, provider)).user


            const userData: user | object = {

                'displayName': res.displayName,
                'email': res.email,
                'photoURL': res.photoURL,
                'uid': res.uid,

            }

            setLoading(true)
            const docRef = doc(db, "Dashboard", res.email!);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {

                toast.success('You Signed In successfully 🎉 ', {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });


                await addDoc(collection(db, 'Dashboard', res.email!, 'LogInTimings'), {
                    'lastLogInTime': timeOut
                })

                if (!docSnap.data()?.uid) {
                    await updateDoc(doc(db, 'Dashboard', res.email!), userData)
                }


            } else {

                toast.error('Access Denied 🤚🛑🙅‍♂️', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                await addDoc(collection(db, 'Access-Attempted'), {
                    'displayName': res.displayName,
                    'email': res.email,
                    'creationTime': res.metadata.creationTime,
                    'photoURL': res.photoURL,
                    'uid': res.uid,
                    'phoneNumber': res.phoneNumber,
                    'lastSignInTime': res.metadata.lastSignInTime,
                })

                setLoading(false)

            }



        } catch (error) {
            console.log(error)
        }

    }

    const logOut = async () => {
        console.log('user log out')

        try {

            await addDoc(collection(db, 'Dashboard', user.email, 'LogOutTimings'), {
                'lastLogOutTime': timeOut,
            })


        } catch (error) {
            console.log(error)
        }

        setLoading(true)

        toast.success('You Logged Out Successfully 😢', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        

        return await signOut(auth)
    }

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async (currentUser: any) => {

            try {



                const docRef = doc(db, "Dashboard", `${currentUser?.email}`);
                const docSnap = await getDoc(docRef);
                // console.log("Permissions:",docSnap.data()?.Permissions)

                if (docSnap.exists()) {
                    setUser(currentUser)
                    setUserPermisssion(docSnap.data()?.Permission)
                    // console.log('currentUser', currentUser)


                } else {
                    setUser(null)
                }

                setLoading(false)

            } catch (error) {
                console.error(error)
            }

        })

        return () => {
            unsubscribe()
        }
    }, [])

    


    return (

        <AuthContext.Provider value={{ googleSignIn, logOut, user,userPermisssion }}>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
            {!loading ? children : <Loading />}
        </AuthContext.Provider>
    )

}

export default AuthState