import { Rocket, FileText } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const { user } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-[#34a1eb]/10 via-white to-[#9c371e]/10" />

      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#34a1eb]/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#9c371e]/20 rounded-full filter blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700">
                Registration Now Open
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Innovation Meets
              <span className="block mt-2 bg-gradient-to-r from-[#34a1eb] to-[#9c371e] text-transparent bg-clip-text">
                Standards Excellence
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-4 font-light">
              Bureau of Indian Standards × NIT Hamirpur
            </p>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
              Join us for a transformative hackathon experience where innovation meets industry standards.
              Build solutions that matter, collaborate with brilliant minds, and shape the future of quality standards in India.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            {user ? (
              <button
                onClick={() => onNavigate('dashboard')}
                className="group px-8 py-4 bg-[#34a1eb] text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center space-x-2"
              >
                <Rocket size={24} />
                <span>Go to Dashboard</span>
              </button>
            ) : (
              <button
                onClick={() => onNavigate('auth')}
                className="group px-8 py-4 bg-[#34a1eb] text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center space-x-2"
              >
                <Rocket size={24} />
                <span>Register Now</span>
              </button>
            )}

            <button
              onClick={() => onNavigate('problems')}
              className="px-8 py-4 bg-white text-[#9c371e] border-2 border-[#9c371e] rounded-xl font-semibold text-lg hover:bg-[#9c371e] hover:text-white transition-all flex items-center space-x-2"
            >
              <FileText size={24} />
              <span>View Problem Statements</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="text-4xl font-bold text-[#34a1eb] mb-2">48hrs</div>
              <div className="text-gray-700 font-medium">Hackathon Duration</div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="text-4xl font-bold text-[#9c371e] mb-2">6</div>
              <div className="text-gray-700 font-medium">Problem Statements</div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="text-4xl font-bold text-[#34a1eb] mb-2">₹1L+</div>
              <div className="text-gray-700 font-medium">Prize Pool</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
