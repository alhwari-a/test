import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ImLocation } from "react-icons/im";
import { IoMdMail } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import { Send } from "lucide-react";

function Contact() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone_number: "",
  });

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/contacts");
        if (response.data && response.data.length > 0) {
          const contactData = response.data[0];
          setContact({
            name: contactData.name,
            email: contactData.email,
            phone_number: contactData.phone_number,
          });
        }
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };

    fetchContactData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      name: userName,
      email: userEmail,
      message: userMessage,
    };

    try {
      const response = await fetch("http://localhost:4000/api/createMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);

      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Your message has been sent successfully.",
        confirmButtonText: "Okay",
      });

      setUserName("");
      setUserEmail("");
      setUserMessage("");
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
      });
    }
  };
  return (
    <div>
      <div
        className="bg-cover bg-center h-screen bg-fixed"
        style={{
          backgroundImage: ` url(../src/assets/Image/contact.jpg)`,
          height: "20rem",
        }}
      >
        <div className="flex items-center justify-center h-full bg-[#FA5990] bg-opacity-15">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Get in touch with us
            </h1>
            <nav className="text-white mb-8">
              <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <Link
                    to="/"
                    className="text-[#fa5990] hover:text-white hover:underline transition"
                  >
                    Home
                  </Link>
                  <span className="mx-2">
                    <AiOutlineRight />
                  </span>
                </li>
                <li>Contact Us</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <section className="relative z-10 overflow-hidden py-28">
        <div className="flex flex-wrap lg:justify-between max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="w-full lg:w-1/2 xl:w-6/12">
            <div className="mb-8 lg:mb-0">
              <h2 className="mb-6 text-[#fa5990] sm:text-[40px]">
                Get in touch with us
              </h2>
              <h4 className="mb-8">
                If you have any questions or feel confused about something, do
                not hesitate and contact us now...we are here for you
              </h4>
              <div className="mb-8 flex w-full max-w-[370px]">
                <div className="flex w-full items-center overflow-hidden sm:max-w-[70px]">
                  <ImLocation className="w-7 h-7" />
                </div>
                <div className="w-full">
                  <p className="pt-5 text-base hover:text-[#060640c6] transition cursor-default">
                    {contact.name || "Phone number not available"}
                  </p>
                </div>
              </div>

              {/* Dynamic phone number from API */}
              <a href={`tel://${contact.phone_number}`}>
                <div className="mb-8 flex w-full max-w-[370px]">
                  <div className="flex w-full items-center overflow-hidden sm:max-w-[70px]">
                    <BsFillTelephoneFill className="w-7 h-7" />
                  </div>
                  <div className="w-full">
                    <p className="pt-5 text-base hover:text-[#060640c6] hover:underline transition">
                      {contact.phone_number || "Phone number not available"}
                    </p>
                  </div>
                </div>
              </a>

              {/* Dynamic email from API */}
              <a href={`mailto:${contact.email}`}>
                <div className="mb-8 flex w-full max-w-[370px]">
                  <div className="flex w-full items-center overflow-hidden sm:max-w-[70px]">
                    <IoMdMail className="w-7 h-7" />
                  </div>
                  <div className="w-full">
                    <p className="pt-5 text-base hover:text-[#060640c6] hover:underline transition">
                      {contact.email || "Email not available"}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="w-full lg:w-1/2 xl:w-5/12 bg-white">
            <form
              onSubmit={handleSubmit}
              method="post"
              className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                Get in Touch
              </h2>

              <div className="mb-6 group">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-indigo-600 transition-colors"
                >
                  Name <span className="text-red-500 text-sm">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  className="w-full py-3 px-4 rounded-lg bg-gray-50 border border-gray-300 
                   text-gray-900 text-sm focus:border-indigo-500 focus:ring-2 
                   focus:ring-indigo-200 outline-none transition-all duration-200
                   hover:border-gray-400"
                  onChange={(event) => setUserName(event.target.value)}
                  value={userName}
                  required
                />
              </div>

              <div className="mb-6 group">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-indigo-600 transition-colors"
                >
                  Email <span className="text-red-500 text-sm">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  className="w-full py-3 px-4 rounded-lg bg-gray-50 border border-gray-300 
                   text-gray-900 text-sm focus:border-indigo-500 focus:ring-2 
                   focus:ring-indigo-200 outline-none transition-all duration-200
                   hover:border-gray-400"
                  onChange={(event) => setUserEmail(event.target.value)}
                  value={userEmail}
                  required
                />
              </div>

              <div className="mb-8 group">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-indigo-600 transition-colors"
                >
                  Message <span className="text-red-500 text-sm">*</span>
                </label>
                <textarea
                  id="message"
                  rows={6}
                  placeholder="Your Message"
                  className="w-full py-3 px-4 rounded-lg bg-gray-50 border border-gray-300 
                   text-gray-900 text-sm focus:border-indigo-500 focus:ring-2 
                   focus:ring-indigo-200 outline-none transition-all duration-200
                   hover:border-gray-400 resize-none"
                  onChange={(event) => setUserMessage(event.target.value)}
                  value={userMessage}
                  required
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full md:w-1/2 
                   bg-[#300a3a] text-white py-3 px-6 rounded-lg font-medium
                   transition-all duration-300 transform hover:bg-[#300a3acb]
                   hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg
                   hover:shadow-indigo-500/30 focus:outline-none focus:ring-2
                   focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
