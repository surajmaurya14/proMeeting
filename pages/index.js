/* This example requires Tailwind CSS v2.0+ */

import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";

const Home = () => {
    const [roomId, setRoomId] = useState("");
    const router = useRouter();

    const handleMeetingJoin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`/api/meeting/join/${roomId}`);
            if (data.success === true) {
                router.push(`/${roomId}`);
            } else {
                toast.warning("Invalid Room Id");
                router.push("/");
            }
        } catch (err) {
            console.error(`Error: ${err}`);
            toast.error("Error");
            return;
        }
    };
    const handleNewMeetingCreation = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get("/api/meeting/create");
            if (data.success === true) {
                router.push(`/${data.roomId}`);
            } else {
                toast.warning("Couldn't create new meeting");
                router.push("/");
            }
        } catch (err) {
            // console.error(`Error: ${err}`);
            toast.error("Error");
            return;
        }
    };
    return (
        <div className="relative bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                    <svg
                        className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                        fill="currentColor"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <polygon points="50,0 100,0 50,100 0,100" />
                    </svg>

                    <main className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
                        <div className="sm:text-center lg:text-left">
                            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                <span className="block xl:inline">
                                    Premium Video Meetings.
                                </span>{" "}
                                <span className="block text-brand-dark xl:inline">
                                    Now for everyone.
                                </span>
                            </h1>
                            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                We engineered the service we built for secure
                                business meetings, proMeet, to make it free and
                                available for all.
                            </p>
                            <div className="mt-5 sm:mt-8 sm:flex-col sm:items-center lg:items-start space-y-4 w-full lg:w-5/6">
                                <div className="rounded-md">
                                    <form onSubmit={handleNewMeetingCreation}>
                                        <button
                                            type="submit"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-dark hover:bg-brand-extra_dark md:py-4 md:text-lg md:px-10"
                                        >
                                            New Meeting
                                        </button>
                                    </form>
                                </div>
                                <div className="w-full mt-3 sm:mt-0">
                                    <form
                                        className="flex flex-row"
                                        onSubmit={handleMeetingJoin}
                                    >
                                        <input
                                            placeholder="Enter meet id"
                                            className="p-2 lg:p-4 rounded border-2 mr-3 w-2/3 text-brand-super_dark text-xl"
                                            name="roomId"
                                            value={roomId}
                                            onChange={(e) => {
                                                setRoomId(e.target.value);
                                            }}
                                            required
                                        />
                                        <button
                                            className="w-1/3 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-brand-extra_dark bg-brand-extra_light hover:bg-brand-semi_light md:py-4 md:text-lg md:px-10"
                                            type="submit"
                                        >
                                            Join
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <img
                    className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
                    alt=""
                />
            </div>
        </div>
    );
};
export default Home;
