import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/solid";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

// { name: "New Meeting", href: "/" }
const navigation = [];

const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
};

const Navbar = ({ currentPath }) => {
    return (
        <Disclosure as="nav" className="bg-white shadow">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex px-2 lg:px-0">
                                <div className="flex-shrink-0 flex items-center">
                                    <div className="flex flex-row space-x-4 lg:hidden">
                                        <Link href="/">
                                            <a>
                                                <Image
                                                    src="/logo.svg"
                                                    alt="proMeet"
                                                    width={32}
                                                    height={32}
                                                />
                                            </a>
                                        </Link>
                                        <p className="text-xl text-brand">
                                            proMeet
                                        </p>
                                    </div>

                                    <div className="hidden lg:flex flex-row space-x-4">
                                        <Link href="/">
                                            <a>
                                                <Image
                                                    src="/logo.svg"
                                                    alt="proMeet"
                                                    width={32}
                                                    height={32}
                                                />
                                            </a>
                                        </Link>
                                        <p className="text-xl text-brand">
                                            proMeet
                                        </p>
                                    </div>
                                </div>
                                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                                    {navigation.map((item, index) => (
                                        <Link href={item.href} key={index}>
                                            <a
                                                key={item.name}
                                                className={classNames(
                                                    item.href == currentPath
                                                        ? "border-indigo-500 text-gray-900"
                                                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                                    "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                                )}
                                                aria-current={
                                                    item.href == currentPath
                                                        ? "page"
                                                        : undefined
                                                }
                                            >
                                                {item.name}
                                            </a>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center lg:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    {open ? (
                                        <XIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <MenuIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="hidden lg:ml-4 lg:flex lg:items-center">
                                {/* Profile dropdown */}
                                <Menu
                                    as="div"
                                    className="ml-4 relative flex-shrink-0"
                                >
                                    <div>
                                        <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            <span className="sr-only">
                                                Open user menu
                                            </span>

                                            <UserIcon
                                                className="block h-8 w-8 text-black group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                <Link href="/">
                                                    <a
                                                        className={
                                                            "hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                                                        }
                                                    >
                                                        Home
                                                    </a>
                                                </Link>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="lg:hidden">
                        <div className="pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as={Link}
                                    href={item.href}
                                    aria-current={
                                        item.current ? "page" : undefined
                                    }
                                >
                                    <a
                                        className={classNames(
                                            item.current
                                                ? "bg-indigo-50 border-indigo-500 text-indigo-700 block"
                                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                            "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                </Disclosure.Button>
                            ))}
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-200">
                            <div className="flex items-center px-4">
                                <div className="flex-shrink-0">
                                    <UserIcon
                                        className="block h-8 w-8 text-black group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                </div>
                            </div>
                            <div className="mt-3 space-y-1">
                                <Disclosure.Button as={Link} href="/">
                                    <a className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                                        Home
                                    </a>
                                </Disclosure.Button>
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};

export default Navbar;
