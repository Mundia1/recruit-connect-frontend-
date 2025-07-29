import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { TextArea } from "../components/ui/TextArea";

export default function About() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("subject", formData.subject);
    form.append("message", formData.message);

    try {
      const res = await fetch("https://formspree.io/f/xqalbwyq", {
        method: "POST",
        body: form,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Failed to send. Try again.");
      }
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  const teamMembers = [
    { name: "Anderson", title: "Team Member", img: "/images/andy.jpg" },
    { name: "Christine", title: "Team Member", img: "/images/Mworia.jpeg" },
    { name: "Eugene", title: "Team Member", img: "/images/wekesa.jpeg" },
    { name: "Regina", title: "Team Member", img: "/images/Wanjiku.jpeg" },
    { name: "Priscillah", title: "Team Member", img: "/images/pree.jpeg" },
    { name: "Brian", title: "Team Member", img: "/images/brian.jpg" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />

      <main className="flex-1 py-5 px-4 md:px-20 lg:px-40">
        <div className="max-w-[960px] mx-auto">
          {/* About Title */}
          <section className="p-4">
            <h1 className="text-2xl md:text-[32px] font-bold text-recruit-text-dark">
              About Recruit Connect
            </h1>
          </section>

          {/* Our Story */}
          <section className="px-4 pb-3">
            <h2 className="text-lg md:text-[22px] font-bold mb-1 text-recruit-text-dark">
              Our Story
            </h2>
            <p className="text-base leading-6 text-recruit-text-dark">
              Recruit Connect was founded in 2025 with a mission to connect talented individuals with leading companies. This platform was built through a well-thought-out project by a team of 6 ambitious software developers from Moringa School — driven by the passion to bridge the gap between job seekers and opportunities. We are proud to have been mentored by our technical mentor, <strong>Erick Mong'are</strong>, who guided us throughout the journey.
            </p>
          </section>

          {/* Meet the Team */}
          <section className="px-4 py-6">
            <h2 className="text-lg md:text-[22px] font-bold mb-4 text-recruit-text-dark">
              Meet the Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {teamMembers.map(({ name, title, img }, index) => (
                <div key={index} className="flex flex-col items-center gap-3">
                  <img
                    src={img}
                    alt={`${name}, ${title}`}
                    className="w-full max-w-[180px] aspect-square rounded-full object-cover"
                  />
                  <div className="text-center">
                    <h3 className="text-base font-medium text-recruit-text-dark">{name}</h3>
                    <p className="text-sm text-recruit-primary-light">{title}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Us */}
          <section className="px-4 py-6">
            <h2 className="text-lg md:text-[22px] font-bold text-recruit-text-dark mb-3">
              Contact Us
            </h2>

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
                      required
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
                    required
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
          </section>
        </div>
      </main>

      <footer className="w-full border-t border-recruit-border-light bg-white dark:bg-black mt-10">
        <div className="max-w-[960px] mx-auto py-6 px-4 flex flex-col items-center gap-3">
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-recruit-primary-light mb-2">
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
            <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:underline">Terms of Service</Link>
            <Link to="/faq" className="hover:underline">FAQ</Link>
          </nav>
          <div className="text-xs text-recruit-primary-light text-center">
            © 2025 Recruit Connect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}