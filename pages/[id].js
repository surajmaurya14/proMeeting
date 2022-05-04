import {
    DesktopComputerIcon,
    DotsVerticalIcon,
    MicrophoneIcon,
    PhoneIcon,
    ShareIcon,
    VideoCameraIcon,
    XCircleIcon,
} from "@heroicons/react/solid";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
};

const { io } = require("socket.io-client");
const socket = io("/");

// const socketConnection = () => {
//     setInterval(() => {
//         console.log(socket);
//     }, 1000);
// };
// socketConnection();

const MeetingDashboard = () => {
    const [tabOpen, setTabOpen] = useState(true);
    const [tab, setTab] = useState("chat");
    const [meetLinkShareOpen, setMeetLinkShareOpen] = useState(false);
    const [micOn, setMicOn] = useState(false);
    const [callConnection, setCallConnection] = useState(true);
    const [videoOn, setVideoOn] = useState(false);
    const myVideo = useRef();
    const videoList = useRef();

    // const [screenShareOn, setScreenShareOn] = useState(false);

    const addVideoStream = (stream, myVideoAddition, video) => {
        console.table(stream, myVideoAddition, video);
        if (myVideoAddition === true) {
            myVideo.current.srcObject = stream;
            myVideo.current.addEventListener("loadedmetadata", () => {
                myVideo.current.play();
            });
        } else {
            video.srcObject = stream;
            video.addEventListener("loadedmetadata", () => {
                video.play();
            });
            videoList.current.append(video);
        }
    };

    const router = useRouter();

    useEffect(() => {
        if (router.query.id !== undefined) {
            const { id: roomId } = router.query;

            import("peerjs").then(({ default: Peer }) => {
                const myPeer = new Peer(undefined, {
                    host: "/",
                    port: "3001",
                });

                // Connected with Peer Server
                myPeer.on("open", (id) => {
                    socket.emit("join-room", roomId, id);
                });
                const connectWithNewUser = (userId, stream) => {
                    const call = myPeer.call(userId, stream);
                    const video = document.createElement("video");

                    //userId Video Stream addition to video list
                    call.on("stream", (userVideoStream) => {
                        addVideoStream(userVideoStream, false, video);
                    });
                    call.on("close", () => {
                        video.remove();
                    });
                    peers[userId] = call;
                };
                //Video Connection
                myVideo.current.muted = true;
                const peers = [];

                navigator.mediaDevices
                    .getUserMedia({
                        video: true,
                        audio: true,
                    })
                    .then((stream) => {
                        addVideoStream(stream, true);

                        // Answer call to user calling and send our stream
                        myPeer.on("call", (call) => {
                            call.answer(stream);
                            const video = document.createElement("video");
                            call.on("stream", (userVideoStream) => {
                                addVideoStream(userVideoStream, false, video);
                            });
                        });

                        socket.on("user-connected", (userId) => {
                            connectWithNewUser(userId, stream);
                        });
                    });
                socket.on("user-disconnected", (userId) => {
                    if (peers[userId] !== undefined) peers[userId].close();
                });
            });
        }
    }, [router.query]);

    return (
        <div className="h-screen">
            <div className="h-[92%]  flex flex-col lg:flex-row">
                <div className="h-full w-full users justify-center flex flex-row items-center">
                    <video
                        src={myVideo}
                        className="w-80 h-80 my-video"
                        autoPlay
                        ref={myVideo}
                    />
                    <div className="video-list" ref={videoList}></div>
                </div>
                {tabOpen === true && (
                    <div className="h-full bg-slate-300 w-full lg:w-2/6 flex flex-col">
                        <div className="flex flex-row justify-between bg-brand-bg_light p-4">
                            {/* <button
                                className={classNames(
                                    tab == "people"
                                        ? "text-brand"
                                        : "text-gray-400 group-hover:text-gray-500",
                                    "text-base lg:text-xl"
                                )}
                                onClick={() => {
                                    setTab("people");
                                }}
                            >
                                People
                            </button> */}
                            <button
                                className={classNames(
                                    tab == "chat"
                                        ? "text-brand"
                                        : "text-gray-400 group-hover:text-gray-500",
                                    "text-base lg:text-xl"
                                )}
                                onClick={() => {
                                    setTab("chat");
                                }}
                            >
                                Chat
                            </button>
                            <button
                                onClick={() => {
                                    setTabOpen(false);
                                }}
                            >
                                <XCircleIcon
                                    className="text-red-400 group-hover:text-gray-500 flex-shrink-0 h-6 w-6"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                        <div className="h-full w-full px-2">
                            {tab == "users" && <></>}
                            {tab == "chat" && (
                                <>
                                    <div className="h-4/6"></div>
                                    <div className="h-2/6 flex flex-col justify-end">
                                        <input
                                            placeholder="Send Message"
                                            className="w-full bg-transparent border-2 border-brand-super_dark rounded bg-brand-extra_light p-2 mb-4"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="h-[8%] bg-slate-200 flex flex-row justify-center space-x-4 lg:space-x-8">
                <button
                    type="button"
                    onClick={() => {
                        setCallConnection(!callConnection);
                    }}
                >
                    <PhoneIcon
                        className={classNames(
                            callConnection === true
                                ? "text-indigo-500"
                                : "text-gray-400 group-hover:text-gray-500",
                            "flex-shrink-0 h-6 w-6"
                        )}
                        aria-hidden="true"
                    />
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setVideoOn(!videoOn);
                    }}
                >
                    <VideoCameraIcon
                        className={classNames(
                            videoOn === true
                                ? "text-indigo-500"
                                : "text-gray-400 group-hover:text-gray-500",
                            "flex-shrink-0 h-6 w-6"
                        )}
                        aria-hidden="true"
                    />
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setMicOn(!micOn);
                    }}
                >
                    <MicrophoneIcon
                        className={classNames(
                            micOn === true
                                ? "text-indigo-500"
                                : "text-gray-400 group-hover:text-gray-500",
                            "flex-shrink-0 h-6 w-6"
                        )}
                        aria-hidden="true"
                    />
                </button>
                {/* <button
                    type="button"
                    onClick={() => {
                        setScreenShareOn(!screenShareOn);
                    }}
                >
                    <DesktopComputerIcon
                        className={classNames(
                            screenShareOn === true
                                ? "text-indigo-500"
                                : "text-gray-400 group-hover:text-gray-500",
                            "flex-shrink-0 h-6 w-6"
                        )}
                        aria-hidden="true"
                    />
                </button> */}

                <button
                    type="button"
                    onClick={() => {
                        setMeetLinkShareOpen(true);
                    }}
                >
                    <ShareIcon
                        className={classNames(
                            tab === true
                                ? "text-indigo-500"
                                : "text-gray-400 group-hover:text-gray-500",
                            "flex-shrink-0 h-6 w-6"
                        )}
                        aria-hidden="true"
                    />
                    <Transition.Root show={meetLinkShareOpen} as={Fragment}>
                        <Dialog
                            as="div"
                            className="fixed z-10 inset-0 overflow-y-auto"
                            onClose={setMeetLinkShareOpen}
                        >
                            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                </Transition.Child>

                                {/* This element is to trick the browser into centering the modal contents. */}
                                <span
                                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                                    aria-hidden="true"
                                >
                                    &#8203;
                                </span>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                        <div>
                                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-brand-bg_light">
                                                <ShareIcon
                                                    className="h-6 w-6 text-red-600"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <div className="mt-3 text-center sm:mt-5">
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-lg leading-6 font-medium text-gray-900"
                                                >
                                                    Meeting Link
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Link.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-5 sm:mt-6">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                                onClick={() =>
                                                    setMeetLinkShareOpen(false)
                                                }
                                            >
                                                Go back to dashboard
                                            </button>
                                        </div>
                                    </div>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition.Root>
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setTabOpen(!tabOpen);
                    }}
                >
                    <DotsVerticalIcon
                        className={classNames(
                            tabOpen === true
                                ? "text-indigo-500"
                                : "text-gray-400 group-hover:text-gray-500",
                            "flex-shrink-0 h-6 w-6"
                        )}
                        aria-hidden="true"
                    />
                </button>
            </div>
        </div>
    );
};
export default MeetingDashboard;
