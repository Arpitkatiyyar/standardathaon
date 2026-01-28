import bisLogo from "../assets/bis logo.png";
import collegeLogo from '../assets/nit logo.png'

import { Award, Users, UserPlus, MailCheck, UploadCloud } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About the Hackathon
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#34a1eb] to-[#9c371e] mx-auto mb-6" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A collaborative initiative bringing together innovation and
              standards excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-[#34a1eb]/10 rounded-xl flex items-center justify-center mb-6">
                {/* <Award className="text-[#34a1eb]" size={32} />
                 */}
                <img
                  src={bisLogo}
                  alt="BIS Logo"
                  className="h-12 md:h-14 w-auto object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Bureau of Indian Standards
              </h3>
              <p className="text-gray-600 leading-relaxed">
                BIS is the national standards body of India, working towards
                ensuring quality and safety of products and services. With this
                hackathon, BIS aims to foster innovation in standardization and
                quality assurance through technology.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-[#9c371e]/10 rounded-xl flex items-center justify-center mb-6">
                <img
                  src={collegeLogo}
                  alt="NIT Hamirpur Logo"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                NIT Hamirpur
              </h3>
              <p className="text-gray-600 leading-relaxed">
                National Institute of Technology Hamirpur is a premier technical
                institution known for excellence in engineering and technology
                education. This collaboration brings together academic
                excellence with industry standards.
              </p>
            </div>
          </div>

          {/* HOW TO PARTICIPATE */}
          <div className="bg-gradient-to-r from-[#34a1eb] to-[#9c371e] rounded-2xl p-8 md:p-12 text-white mb-12">
            <h3 className="text-3xl font-bold mb-6 text-center">
              How to Participate ?
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <UserPlus size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">
                    Create an Account
                  </h4>
                  <p className="text-white/90">
                    Register using the <strong>Sign Up</strong> option and
                    verify your account through the confirmation link sent to
                    your email.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <MailCheck size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">
                    Verify & Access Dashboard
                  </h4>
                  <p className="text-white/90">
                    Sign in after email verification to access your dashboard
                    showing your profile details and participation status.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">
                    Create or Join a Team
                  </h4>
                  <p className="text-white/90">
                    Team leaders can create a team and share the generated team
                    code. Members can join using the <strong>Join Team</strong>{" "}
                    option and team code.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <UploadCloud size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">
                    Select Problem & Submit Solution
                  </h4>
                  <p className="text-white/90">
                    Choose a problem statement from the website, develop your
                    solution, and submit it before the deadline.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* END */}
        </div>
      </div>
    </section>
  );
}
