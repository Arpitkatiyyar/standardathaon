import { Award, Target, Users, Zap } from 'lucide-react';

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
              A collaborative initiative bringing together innovation and standards excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-[#34a1eb]/10 rounded-xl flex items-center justify-center mb-6">
                <Award className="text-[#34a1eb]" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Bureau of Indian Standards
              </h3>
              <p className="text-gray-600 leading-relaxed">
                BIS is the national standards body of India, working towards ensuring quality and
                safety of products and services. With this hackathon, BIS aims to foster innovation
                in standardization and quality assurance through technology.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-[#9c371e]/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="text-[#9c371e]" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                NIT Hamirpur
              </h3>
              <p className="text-gray-600 leading-relaxed">
                National Institute of Technology Hamirpur is a premier technical institution known
                for excellence in engineering and technology education. This collaboration brings
                together academic excellence with industry standards.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#34a1eb] to-[#9c371e] rounded-2xl p-8 md:p-12 text-white mb-12">
            <h3 className="text-3xl font-bold mb-6 text-center">
              Why Participate?
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Target size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Real-World Impact</h4>
                  <p className="text-white/90">
                    Work on problems that directly affect quality standards and consumer safety in India
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Zap size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Innovation Platform</h4>
                  <p className="text-white/90">
                    Showcase your skills and innovative solutions to industry leaders and experts
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Award size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Prizes & Recognition</h4>
                  <p className="text-white/90">
                    Compete for attractive prizes and get recognized by BIS and NIT Hamirpur
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Networking</h4>
                  <p className="text-white/90">
                    Connect with fellow innovators, mentors, and industry professionals
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
