import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { TextArea } from "../components/ui/TextArea";
import toast, { Toaster } from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://formspree.io/f/xqalbwyq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message submitted successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />

      <main className="flex-1 py-5 px-4 md:px-20 lg:px-40">
        <div className="max-w-[960px] mx-auto">
          <section className="p-4">
            <h1 className="text-2xl md:text-[32px] font-bold text-recruit-text-dark">
              Contact Us
            </h1>
            <p className="text-sm text-recruit-primary-light mt-2">
              We're here to help! Reach out to us with any questions or feedback.
            </p>
          </section>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="max-w-[480px]">
            {["name", "email", "subject"].map((field) => (
              <div key={field} className="py-3 px-4">
                <label className="text-base text-recruit-text-dark pb-2 block capitalize">
                  {field === "email" ? "Your Email" : `Your ${field}`}
                </label>
                <div className="h-14 px-[15px] py-[15px] bg-recruit-bg-contact border border-recruit-border-contact rounded-xl flex items-center focus-within:ring-2 focus-within:ring-green-300 transition-all duration-200">
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    placeholder={`Enter your ${field}`}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full text-base text-recruit-primary-light bg-transparent border-none outline-none placeholder:text-recruit-primary-light"
                  />
                </div>
              </div>
            ))}

            {/* Message Field using TextArea */}
            <div className="py-3 px-4">
              <label className="text-base text-recruit-text-dark pb-2 block">
                Message
              </label>
              <div className="h-auto px-[15px] py-[10px] bg-recruit-bg-contact border border-recruit-border-contact rounded-xl focus-within:ring-2 focus-within:ring-green-300 transition-all duration-200">
                <TextArea
                  name="message"
                  placeholder="Enter your message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full resize-none text-base text-recruit-primary-light bg-transparent border-none outline-none placeholder:text-recruit-primary-light"
                />
              </div>
            </div>

            <div className="py-3 px-4">
              <button
                type="submit"
                className="h-10 w-[84px] min-w-[84px] max-w-[480px] px-4 bg-recruit-primary-bright text-recruit-text-dark text-sm font-bold rounded-[20px] hover:bg-recruit-primary-bright/90 transition duration-200 active:scale-95"
              >
                Submit
              </button>
            </div>
          </form>

          {/* Contact Info */}
          <section className="py-4 px-4 pb-2">
            <h2 className="text-lg font-bold text-recruit-text-dark">
              Our Contact Information
            </h2>
          </section>
          <section className="pt-1 px-4 pb-3">
            <p className="text-base text-recruit-text-dark">
              Email: recruitconnect11@gmail.com
            </p>
            <p className="text-base text-recruit-text-dark">
              Phone: +254 711 082 146
            </p>
            <p className="text-base text-recruit-text-dark">
              Address: Moringa School, Ngong Lane, Nairobi, Kenya
            </p>
          </section>

          {/* Embedded Google Map */}
          <section className="py-3 px-4">
            <div className="w-full">
              <iframe
                title="Google Map - Moringa School"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.3781470836936!2d36.78250415293501!3d-1.3012342787839824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10fc39095d6f%3A0x75f6e03c2c2a69df!2sMoringa%20School!5e0!3m2!1sen!2ske!4v1722177275249!5m2!1sen!2ske"
                width="100%"
                height="522"
                className="rounded-xl border-0 w-full h-[522px]"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}