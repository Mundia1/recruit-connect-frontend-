import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
// import Footer from "../components/layout/Footer";
import { Input } from "../components/ui/Input";
import { TextArea } from "../components/ui/TextArea";

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 py-5 px-4 md:px-20 lg:px-40">
        <div className="max-w-[960px] mx-auto">
          {/* About Title */}
          <section className="p-4">
            <h1 className="text-2xl md:text-[32px] font-bold leading-8 md:leading-10 text-recruit-text-dark">
              About Recruit Connect
            </h1>
          </section>

          {/* Our Story */}
          <section className="py-5 px-4 pb-3">
            <h2 className="text-lg md:text-[22px] font-bold leading-6 md:leading-7 text-recruit-text-dark mb-1">
              Our Story
            </h2>
          </section>

          <section className="pt-1 px-4 pb-3">
            <p className="text-base leading-6 text-recruit-text-dark">
              Recruit Connect was founded in 2025 with a mission to connect talented individuals with leading companies across various industries. Our platform is designed to streamline the job search and application process, making it easier for job seekers to find their dream roles and for companies to discover top talent.
            </p>
          </section>

          {/* Meet the Team */}
          <section className="py-5 px-4 pb-3">
            <h2 className="text-lg md:text-[22px] font-bold leading-6 md:leading-7 text-recruit-text-dark">
              Meet the Team
            </h2>
          </section>

          <section className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Sarah */}
              <div className="w-full pb-3 flex flex-col items-start gap-3">
                <div className="px-4 flex flex-col items-center w-full">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/aa33e8d2339059d21699ee27015527400c1b9c00?width=382"
                    alt="Sarah, CEO"
                    className="w-full aspect-square rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-center w-full">
                  <h3 className="text-base leading-6 text-recruit-text-dark text-center">
                    Sarah
                  </h3>
                  <p className="text-sm leading-[21px] text-recruit-primary-light text-center">
                    CEO
                  </p>
                </div>
              </div>

              {/* David */}
              <div className="w-full pb-3 flex flex-col items-start gap-3">
                <div className="px-4 flex flex-col items-center w-full">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/1a4efb3d5a9324c84f32515df6bb1c13858d508e?width=382"
                    alt="David, CTO"
                    className="w-full aspect-square rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-center w-full">
                  <h3 className="text-base leading-6 text-recruit-text-dark text-center">
                    David
                  </h3>
                  <p className="text-sm leading-[21px] text-recruit-primary-light text-center">
                    CTO
                  </p>
                </div>
              </div>

              {/* Emily */}
              <div className="w-full pb-3 flex flex-col items-start gap-3">
                <div className="px-4 flex flex-col items-center w-full">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/baf3871e2b68fadc9c81bd30f81d5632c67590d5?width=382"
                    alt="Emily, Head of Marketing"
                    className="w-full aspect-square rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-center w-full">
                  <h3 className="text-base leading-6 text-recruit-text-dark text-center">
                    Emily
                  </h3>
                  <p className="text-sm leading-[21px] text-recruit-primary-light text-center">
                    Head of Marketing
                  </p>
                </div>
              </div>

              {/* Michael */}
              <div className="w-full pb-3 flex flex-col items-start gap-3">
                <div className="px-4 flex flex-col items-center w-full">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/4132572e130eac2e766789be2c0464f7f413cea5?width=382"
                    alt="Michael, Lead Recruiter"
                    className="w-full aspect-square rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-center w-full">
                  <h3 className="text-base leading-6 text-recruit-text-dark text-center">
                    Michael
                  </h3>
                  <p className="text-sm leading-[21px] text-recruit-primary-light text-center">
                    Lead Recruiter
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Values */}
          <section className="py-5 px-4 pb-3">
            <h2 className="text-lg md:text-[22px] font-bold leading-6 md:leading-7 text-recruit-text-dark">
              Our Values
            </h2>
          </section>

          <section className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* User-Centric */}
              <div className="p-4 rounded-lg border border-recruit-border-light bg-recruit-bg-light flex flex-col gap-3">
                <div className="w-6 h-6">
                  <svg
                    width="24"
                    height="16"
                    viewBox="0 0 24 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-recruit-text-dark"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.9922 10.805C13.0561 9.43099 13.9769 6.86767 13.2592 4.49441C12.5414 2.12114 10.3544 0.497718 7.875 0.497718C5.39558 0.497718 3.20857 2.12114 2.49084 4.49441C1.7731 6.86767 2.69393 9.43099 4.75781 10.805C2.93952 11.4752 1.38666 12.7153 0.330938 14.3403C0.179932 14.5647 0.161484 14.8531 0.28266 15.095C0.403836 15.3368 0.645857 15.4947 0.916031 15.5081C1.18621 15.5215 1.44266 15.3884 1.58719 15.1597C2.97076 13.0317 5.33677 11.7479 7.875 11.7479C10.4132 11.7479 12.7792 13.0317 14.1628 15.1597C14.3917 15.4999 14.8514 15.5932 15.1948 15.3692C15.5382 15.1452 15.6381 14.6869 15.4191 14.3403C14.3633 12.7153 12.8105 11.4752 10.9922 10.805ZM3.75 6.125C3.75 3.84683 5.59683 2 7.875 2C10.1532 2 12 3.84683 12 6.125C12 8.40317 10.1532 10.25 7.875 10.25C5.5979 10.2474 3.75258 8.4021 3.75 6.125ZM23.4506 15.3781C23.1037 15.6043 22.6391 15.5066 22.4128 15.1597C21.0308 13.0303 18.6636 11.7466 16.125 11.75C15.7108 11.75 15.375 11.4142 15.375 11C15.375 10.5858 15.7108 10.25 16.125 10.25C17.7863 10.2484 19.2846 9.25041 19.9261 7.71798C20.5677 6.18554 20.2273 4.4178 19.0626 3.23312C17.898 2.04844 16.1363 1.67805 14.5931 2.29344C14.3427 2.40171 14.0531 2.36541 13.8372 2.19864C13.6212 2.03188 13.5128 1.76096 13.5542 1.49125C13.5956 1.22154 13.7802 0.995581 14.0363 0.90125C16.7109 -0.165433 19.7592 0.960007 21.099 3.50883C22.4388 6.05765 21.6374 9.2067 19.2422 10.805C21.0605 11.4752 22.6133 12.7153 23.6691 14.3403C23.8953 14.6872 23.7975 15.1518 23.4506 15.3781Z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-bold leading-5 text-recruit-text-dark">
                    User-Centric
                  </h3>
                  <p className="text-sm leading-[21px] text-recruit-primary-light">
                    We prioritize the needs of our users, ensuring a seamless and effective experience.
                  </p>
                </div>
              </div>

              {/* Results-Driven */}
              <div className="p-4 rounded-lg border border-recruit-border-light bg-recruit-bg-light flex flex-col gap-3">
                <div className="w-6 h-6">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-recruit-text-dark"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.8003 5.79625C20.9559 10.3046 19.3577 15.7129 15.0979 18.3255C10.838 20.938 5.29291 19.9107 2.25168 15.9455C-0.789558 11.9803 -0.344225 6.35844 3.28337 2.9215C6.91096 -0.515443 12.5486 -0.656918 16.3441 2.59375L18.4694 0.4675C18.7624 0.174444 19.2376 0.174444 19.5306 0.4675C19.8237 0.760556 19.8237 1.23569 19.5306 1.52875L10.5306 10.5288C10.2376 10.8218 9.76243 10.8218 9.46937 10.5288C9.17632 10.2357 9.17632 9.76056 9.46937 9.4675L12.0681 6.86875C10.6182 5.90981 8.6993 6.07307 7.4322 7.26318C6.1651 8.45328 5.88202 10.3582 6.7483 11.8653C7.61457 13.3724 9.40306 14.0866 11.0692 13.5908C12.7353 13.0949 13.8422 11.519 13.7434 9.78344C13.7201 9.36922 14.037 9.01455 14.4513 8.99125C14.8655 8.96795 15.2201 9.28485 15.2434 9.69906C15.3843 12.1572 13.798 14.383 11.4284 15.0519C9.0589 15.7209 6.5428 14.6533 5.37739 12.4844C4.21198 10.3155 4.71038 7.62811 6.576 6.02137C8.44163 4.41462 11.1732 4.32024 13.1453 5.79437L15.2781 3.66156C12.0414 0.974274 7.30002 1.15714 4.27992 4.08575C1.25983 7.01435 0.931232 11.7479 3.51771 15.0657C6.10419 18.3835 10.7749 19.2198 14.3518 17.0055C17.9288 14.7912 19.2629 10.2377 17.4466 6.44312C17.2679 6.0693 17.4262 5.62144 17.8 5.44281C18.1738 5.26418 18.6217 5.42242 18.8003 5.79625Z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-bold leading-5 text-recruit-text-dark">
                    Results-Driven
                  </h3>
                  <p className="text-sm leading-[21px] text-recruit-primary-light">
                    We are committed to delivering tangible results for both job seekers and companies.
                  </p>
                </div>
              </div>

              {/* Integrity */}
              <div className="p-4 rounded-lg border border-recruit-border-light bg-recruit-bg-light flex flex-col gap-3">
                <div className="w-6 h-6">
                  <svg
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-recruit-text-dark"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.5 0.75H1.5C0.671573 0.75 0 1.42157 0 2.25V7.76062C0 16.1616 7.10812 18.9487 8.53125 19.4222C8.8352 19.5256 9.1648 19.5256 9.46875 19.4222C10.8938 18.9487 18 16.1616 18 7.76062V2.25C18 1.42157 17.3284 0.75 16.5 0.75ZM16.5 7.76156C16.5 15.1134 10.2797 17.5697 9 17.9972C7.73156 17.5744 1.5 15.12 1.5 7.76156V2.25H16.5V7.76156ZM4.71938 10.2806C4.42632 9.98757 4.42632 9.51243 4.71938 9.21937C5.01243 8.92632 5.48757 8.92632 5.78063 9.21937L7.5 10.9388L12.2194 6.21937C12.5124 5.92632 12.9876 5.92632 13.2806 6.21937C13.5737 6.51243 13.5737 6.98757 13.2806 7.28063L8.03063 12.5306C7.88995 12.6715 7.69906 12.7506 7.5 12.7506C7.30094 12.7506 7.11005 12.6715 6.96937 12.5306L4.71938 10.2806Z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-bold leading-5 text-recruit-text-dark">
                    Integrity
                  </h3>
                  <p className="text-sm leading-[21px] text-recruit-primary-light">
                    We uphold the highest standards of integrity and transparency in all our operations.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Us */}
          <section className="py-5 px-4 pb-3">
            <h2 className="text-lg md:text-[22px] font-bold leading-6 md:leading-7 text-recruit-text-dark">
              Contact Us
            </h2>
          </section>

          {/* Contact Form */}
          <div className="max-w-[480px]">
            <div className="py-3 px-4">
              <div className="flex flex-col min-w-[160px] flex-1">
                <Input
                  type="text"
                  placeholder="Your Name"
                  className="h-14 p-4 bg-recruit-bg-input rounded-xl"
                />
              </div>
            </div>

            <div className="py-3 px-4">
              <div className="flex flex-col min-w-[160px] flex-1">
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="h-14 p-4 bg-recruit-bg-input rounded-xl"
                />
              </div>
            </div>

            <div className="py-3 px-4">
              <div className="flex flex-col min-w-[160px] flex-1">
                <TextArea
                  placeholder="Your Message"
                  className="min-h-[144px] p-4 bg-recruit-bg-input rounded-xl"
                />
              </div>
            </div>

            <div className="py-3 px-4">
              <button className="h-10 min-w-[84px] max-w-[480px] px-4 bg-recruit-primary text-recruit-text-white text-sm font-bold rounded-[20px] hover:bg-recruit-primary/90">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
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
