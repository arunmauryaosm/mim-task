import React, { useState } from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { CgKeyhole, CgSpinner } from "react-icons/cg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OTPInput, { ResendOTP } from "otp-input-react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";
import { Toaster, toast } from "react-hot-toast";


const Index = () => {
    const [otp, setOtp] = useState("")
    const [ph, setPh] = useState("")
    const [loading, setLoading] = useState(false)
    const [showOTP, setShowOTP] = useState(false)
    const [user, setUser] = useState(null)


    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                    onSignup()
                },
                'expired-callback': () => {

                }
            }, auth);
        }
    }

    function onSignup() {
        setLoading(true)
        onCaptchVerify()

        const appVerifier = window.recaptchaVerifier
        const formatPh = "+" + ph
        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {

                window.confirmationResult = confirmationResult;
                setLoading(false);
                setShowOTP(true);
                toast.success('OTP sended successfully!')
            }).catch((error) => {
                console.log(error)
                setLoading(false)
            });
    }

    function onOTPVerify() {
        setLoading(true)
        window.confirmationResult.confirm(otp).then(async (res) => {
            console.log(user)
            setUser(res.user)
            setLoading(false)
        }).className(err => {
            console.log(err)
            setLoading(false);
        })
    }

    return (
        <div>
            <section className="flex items-center justify-center h-screen">
                <Toaster toastOptions={{ duration: 4000 }} />
                <div id="recaptcha-container"></div>

                {
                    user ? (

                        <div className="text-center text-white w-full ">

                            <h1 className="font-bold py-5 text-3xl"> Welcome to MiM-Essay </h1>
                            <p className="pb-2  ">Task has been completed succesfully, If you feel that task is not up to mark feel free to contact me. <span className=" text-xl font-medium "> <br />
                                I'll make changes on it
                            </span>  </p>
                            <p className="grid grid-flow-row gap-0 pt-5">
                                <p className="font-bold text-xl">Contact Details : </p>
                                <p>Email ID : arunmauryaam9@gmail.com</p>
                                Phone No: 9151479114
                            </p>
                        </div>) : (


                        <div className=" flex flex-col gap-4 rounded-lg p-4 ">
                            {showOTP ? (


                                <>

                                    <h2 className="text-center text-white text-3xl py-6 font-bold ">Enter your OTP </h2>
                                    <spam className="bg-emerald-50 text-emerald-800 text-2xl mb-3 w-fit mx-auto p-4 rounded-full">
                                        <CgKeyhole />
                                    </spam>

                                    <OTPInput value={otp} onChange={setOtp} autoFocus OTPLength={6} otpType="number" disabled={false} />
                                    <ResendOTP className="hover:text-yellow-50 cursor-pointer" onResendClick={() => console.log("Resend clicked")} />
                                    <button onClick={onOTPVerify} className="bg-[#082531] w-full flex gap-1 items-center justify-center p-3 text-white rounded font-bold  hover:bg-white hover:text-[#082531] hover:ease-in-out duration-500">
                                        {loading && (
                                            <CgSpinner size={20} className=" animate-spin" />
                                        )}
                                        <spam >Verify Phone Number</spam>
                                    </button>
                                </>




                            ) :
                                (

                                    <>
                                        <spam className="text-center font-bold leading-normal text-white  text-3xl mb-6">
                                            <h1>Welcome to</h1>
                                            <h2>MiM-Essay</h2>
                                        </spam>

                                        <spam className="bg-emerald-50 text-emerald-800 text-3xl w-fit mx-auto p-4 rounded-full">
                                            <BsFillTelephoneFill />
                                        </spam>
                                        <p className="font-bold text-2xl text-white text-center">
                                            Verify your phone number
                                        </p>

                                        <PhoneInput
                                            country={"in"}
                                            value={ph}
                                            onChange={setPh}
                                        />
                                        <div id="recaptcha-container" />

                                        <button onClick={onSignup} className="bg-[#082531] w-full flex gap-1 items-center justify-center py-3 text-white rounded font-bold  hover:bg-white hover:text-[#082531] hover:ease-in-out duration-500">
                                            {loading && (
                                                <CgSpinner size={20} className=" animate-spin" />
                                            )}
                                            <spam>Send OTP</spam>
                                        </button>
                                    </>

                                )}

                        </div>

                    )}

            </section>
        </div>
    );
};

export default Index;
