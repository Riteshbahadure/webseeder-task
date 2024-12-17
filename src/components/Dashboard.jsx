import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMenuSharp } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { SlCalender } from "react-icons/sl";
import { FaNoteSticky } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { RiListSettingsLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { useGotoDashQuery, useLogoutMutation } from '../redux/authApi';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const { data } = useGotoDashQuery()
    console.log(data);

    const navigate = useNavigate();
    // const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [logout, { isSuccess, isError }] = useLogoutMutation()
    useEffect(() => {
        if (isSuccess) {
            toast.success("User logout");
            navigate("/login");
        }
    }, [isSuccess]);

    return (
        <>
            <div className="flex flex-col sm:flex-row h-screen bg-gray-50 p-7">
                {/* Sidebar */}
                <div className={`sm:w-80 p-6 bg-zinc-100 shadow-lg rounded-2xl font-semibold sm:block `}>
                    <div className='flex justify-between items-center'>
                        <h2 className="text-2xl font-semibold mb-4">Menu</h2>
                        <div className='text-3xl -mt-2'>
                            <IoMenuSharp />
                        </div>
                    </div>

                    <div className="w-full mb-6 py-2 px-2 gap-3 border rounded-lg flex justify-between items-center">
                        <div className='text-xl'>
                            <IoSearch />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Search"
                                className='bg-zinc-100 w-full'
                            />
                        </div>
                    </div>

                    {/* Tasks */}
                    <div>
                        <h3 className="text-sm font-bold mb-2">TASKS</h3>
                        <div className="mb-4">
                            <div className="flex justify-between items-center py-1">
                                <div className='flex items-center gap-2'>
                                    <div className='text-xl'>
                                        <MdKeyboardDoubleArrowRight />
                                    </div>
                                    <h1>Upcoming</h1>
                                </div>
                                <span className="text-sm text-gray-500 bg-gray-200 py-0.5 px-1 shadow-md">12</span>
                            </div>
                            <div className="flex justify-between items-center py-1">
                                <div className='flex items-center gap-2'>
                                    <div className='text-xl'>
                                        <AiOutlineMenuUnfold />
                                    </div>
                                    <h1>Today</h1>
                                </div>
                                <span className="text-sm text-gray-500 bg-gray-200 py-0.5 px-1 shadow-md">5</span>
                            </div>
                            <div className="flex justify-between items-center py-1">
                                <div className='flex items-center gap-2'>
                                    <div className='text-xl'>
                                        <SlCalender />
                                    </div>
                                    <h1>Calendar</h1>
                                </div>
                            </div>

                            <div className="font-bold text-gray-700 mt-2">
                                <div className='flex items-center gap-3 bg-gray-300 px-2 py-0.5 shadow-sm'>
                                    <FaNoteSticky />
                                    <h1>Sticky Wall</h1>
                                </div>
                            </div>
                        </div>

                        {/* Lists */}
                        <h3 className="text-sm font-bold mb-2">LISTS</h3>
                        <ul className="mb-6">
                            <li className="flex items-center py-1">
                                <span className="w-3 h-3 bg-red-400 rounded-sm inline-block mr-2"></span>
                                Personal <span className="ml-auto text-sm bg-gray-200 py-0.5 px-2 shadow-md text-gray-500">3</span>
                            </li>
                            <li className="flex items-center py-1">
                                <span className="w-3 h-3 bg-blue-400 rounded-sm inline-block mr-2"></span>
                                Work <span className="ml-auto text-sm bg-gray-200 py-0.5 px-2 shadow-md text-gray-500">3</span>
                            </li>
                            <li className="flex items-center py-1">
                                <span className="w-3 h-3 bg-yellow-300 rounded-sm inline-block mr-2"></span>
                                List 1 <span className="ml-auto text-sm bg-gray-200 py-0.5 px-2 shadow-md text-gray-500">3</span>
                            </li>
                            <li className="text-gray-500 cursor-pointer mt-2 flex items-center gap-3">
                                <div>
                                    <FaPlus />
                                </div>
                                Add New List
                            </li>
                        </ul>

                        {/* Tags */}
                        <h3 className="text-sm font-bold mb-2">TAGS</h3>
                        <div className="flex gap-1">
                            <button className="bg-teal-100 text-blue-700 px-2 py-1 rounded">
                                Tag 1
                            </button>
                            <button className="bg-red-200 text-red-700 px-2 py-1 rounded">
                                Tag 2
                            </button>
                            <button className="text-blue-600 border px-2 py-1 rounded">
                                + Add Tag
                            </button>
                        </div>
                    </div>

                    {/* Settings */}
                    <div className="mt-28">
                        <button className="text-gray-600 mb-2 flex items-center gap-3">
                            <div className='text-lg'>
                                <RiListSettingsLine />
                            </div>
                            <h1>Settings</h1>
                        </button>
                        <button className="text-gray-600 flex items-center gap-3">
                            <div>
                                <FiLogOut />
                            </div>
                            <button onClick={logout}> <h1>Sign out</h1></button>
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <main className="flex-1 p-4 pl-7">
                    <h1 className="text-4xl font-bold mb-6">Sticky Wall</h1>

                    {/* Cards */}
                    <div className='border px-6 py-6 rounded-md shadow-lg'>
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Social Media Card */}
                            <div className="p-6  bg-yellow-100 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-2">Social Media</h2>
                                <ul className="text-gray-700">
                                    <li>- Plan social content</li>
                                    <li>- Build content calendar</li>
                                    <li>- Plan promotion and distribution</li>
                                </ul>
                            </div>

                            {/* Content Strategy Card */}
                            <div className="p-6  bg-blue-100 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-2">Content Strategy</h2>
                                <p className="text-gray-700 text-sm">
                                    Would need time to get insights (goals, personals, budget, audits),
                                    but after, it would be good to focus on assembling my team (start
                                    with SEO specialist, then perhaps an email marketer?). Also need
                                    to brainstorm on tooling.
                                </p>
                            </div>

                            {/* Email A/B Tests */}
                            <div className="p-6  bg-red-100 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-2">Email A/B Tests</h2>
                                <ul className="text-gray-700">
                                    <li>- Subject lines</li>
                                    <li>- Sender</li>
                                    <li>- CTA</li>
                                    <li>- Sending times</li>
                                </ul>
                            </div>

                            {/* Banner Ads */}
                            <div className="p-6  bg-orange-100 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-2">Banner Ads</h2>
                                <ul className="text-gray-700 text-sm">
                                    <li>- Sizing matters</li>
                                    <li>- Choose distinctive imagery</li>
                                    <li>- The landing page must match the display ad</li>
                                </ul>
                            </div>

                            {/* Add New Card */}
                            <div className="p-6  bg-gray-200 rounded-lg shadow-md flex items-center justify-center text-gray-600 text-4xl font-bold">
                                +
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Dashboard;
