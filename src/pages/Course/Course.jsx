import React, { useState } from 'react';
import CourseIndex from '../../Components/Course/CourseIndex';
import { useParams, Outlet } from 'react-router';
//import ChatBotWidget from '../../Components/ChatBot/ChatBotWidget'; // <-- your chatbot component
import ChatBotIcon from "../../assets/ChatBot.png"; // the chatbot icon/button
import ChatBotWidget from '../../Components/ChatBot/ChatBotWidget';

const Course = () => {
    const { subjectName } = useParams();
    const [showChatBot, setShowChatBot] = useState(false);

    const toggleChatBot = () => {
        setShowChatBot(prev => !prev);
    };

    return (
        <div className='w-11/12 mx-auto my-2 relative'>
            <h1 className='text-center font-bold'>Course Name: {subjectName}</h1>

            <section className='grid md:grid-cols-12'>
                <div className='left col-span-2 px-2'>
                    <CourseIndex subjectName={subjectName} />
                </div>

                <div className='right col-span-8 mt-10 ml-5'>
                    <Outlet />
                </div>

                <div className='col-span-2 my-2'>
                    <h2 className='font-bold'>Resources given by Course Teacher</h2>
                    <button className='btn btn-primary my-2'>Add Resources</button>
                </div>
            </section>

            {/* Floating ChatBot Button */}
            <button
                onClick={toggleChatBot}
                className="fixed bottom-5 right-5 z-50 w-16 h-16 rounded-full shadow-lg bg-sky-400 p-2"
            >
                <img src={ChatBotIcon} alt="ChatBot" className="w-full h-full" />
            </button>

            {/* ChatBot Widget */}
            {showChatBot && <ChatBotWidget />}
        </div>
    );
};

export default Course;
