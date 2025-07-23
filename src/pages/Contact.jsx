import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { TextArea } from "../components/ui/TextArea";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 py-5 px-4 md:px-20 lg:px-40">
        <div className="max-w-[960px] mx-auto">
          {/* Contact Header */}
          <section className="p-4">
            <div className="flex flex-col gap-3 min-w-[288px]">
              <div className="w-full md:w-[448px]">
                <h1 className="text-2xl md:text-[32px] font-bold leading-8 md:leading-10 text-recruit-text-dark">
                  Contact Us
                </h1>
              </div>
              <div>
                <p className="text-sm leading-[21px] text-recruit-primary-light">
                  We're here to help! Reach out to us with any questions or feedback.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <div className="max-w-[480px]">
            {/* Name Field */}
            <div className="py-3 px-4">
              <div className="flex flex-col min-w-[160px] flex-1">
                <div className="pb-2">
                  <label className="text-base leading-6 text-recruit-text-dark">
                    Your Name
                  </label>
                </div>
                <div className="h-14 px-[15px] py-[15px] bg-recruit-bg-contact border border-recruit-border-contact rounded-xl flex items-center">
                  <input 
                    type="text"
                    placeholder="Enter your name"
                    className="w-full text-base leading-6 text-recruit-primary-light bg-transparent border-none outline-none placeholder:text-recruit-primary-light"
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="py-3 px-4">
              <div className="flex flex-col min-w-[160px] flex-1">
                <div className="pb-2">
                  <label className="text-base leading-6 text-recruit-text-dark">
                    Your Email
                  </label>
                </div>
                <div className="h-14 px-[15px] py-[15px] bg-recruit-bg-contact border border-recruit-border-contact rounded-xl flex items-center">
                  <input 
                    type="email"
                    placeholder="Enter your email"
                    className="w-full text-base leading-6 text-recruit-primary-light bg-transparent border-none outline-none placeholder:text-recruit-primary-light"
                  />
                </div>
              </div>
            </div>

            {/* Subject Field */}
            <div className="py-3 px-4">
              <div className="flex flex-col min-w-[160px] flex-1">
                <div className="pb-2">
                  <label className="text-base leading-6 text-recruit-text-dark">
                    Subject
                  </label>
                </div>
                <div className="h-14 px-[15px] py-[15px] bg-recruit-bg-contact border border-recruit-border-contact rounded-xl flex items-center">
                  <input 
                    type="text"
                    placeholder="Enter the subject"
                    className="w-full text-base leading-6 text-recruit-primary-light bg-transparent border-none outline-none placeholder:text-recruit-primary-light"
                  />
                </div>
              </div>
            </div>

            {/* Message Field */}
            <div className="py-3 px-4">
              <div className="flex flex-col min-w-[160px] flex-1">
                <div className="pb-2">
                  <label className="text-base leading-6 text-recruit-text-dark">
                    Message
                  </label>
                </div>
                <TextArea 
                  placeholder="Enter your message"
                  className="w-full min-h-[144px]"
                  rows={6}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="py-3 px-4">
              <button className="h-10 w-[84px] min-w-[84px] max-w-[480px] px-4 bg-recruit-primary-bright text-recruit-text-dark text-sm font-bold rounded-[20px] hover:bg-recruit-primary-bright/90">
                Submit
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <section className="py-4 px-4 pb-2">
            <h2 className="text-lg font-bold leading-[23px] text-recruit-text-dark">
              Our Contact Information
            </h2>
          </section>

          <section className="pt-1 px-4 pb-3">
            <p className="text-base leading-6 text-recruit-text-dark">
              Email: support@recruitconnect.com
            </p>
          </section>

          <section className="pt-1 px-4 pb-3">
            <p className="text-base leading-6 text-recruit-text-dark">
              Phone: +254 712 345 678
            </p>
          </section>

          <section className="pt-1 px-4 pb-3">
            <p className="text-base leading-6 text-recruit-text-dark">
              Address: 123 Recruitment Avenue, Nairobi, Kenya
            </p>
          </section>

          {/* Map */}
          <section className="py-3 px-4">
            <div className="w-full">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/3e86e18fa7edc0d98d3fab7c010113c08b84328a?width=1856"
                alt="Map showing our location in Nairobi, Kenya"
                className="w-full h-[522px] object-cover rounded-xl"
              />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
