import bisLogo from "../assets/bis logo.png";

interface FooterProps {
  onNavigate: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* BRAND */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                {/* <div className="w-12 h-12 bg-gradient-to-br from-[#34a1eb] to-[#9c371e] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  BI S
                </div> */}
                <img
                  src={bisLogo}
                  alt="BIS Logo"
                  className="h-12 md:h-14 w-auto object-contain"
                />
                <div>
                  <h3 className="font-bold text-lg">Standardthon</h3>
                  <p className="text-gray-400 text-sm">BIS × NIT Hamirpur</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Innovation meets standards excellence through collaboration.
              </p>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                {[
                  { id: "home", label: "Home" },
                  { id: "about", label: "About" },
                  { id: "timeline", label: "Timeline" },
                  { id: "eligibility", label: "Eligibility" },
                  { id: "members", label: "Members" },
                  { id: "problems", label: "Problems" },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => onNavigate(item.id)}
                      className="hover:text-white transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Bureau of Indian Standards</li>
                <li>Manak Bhavan, New Delhi</li>
                <li className="pt-3">NIT Hamirpur</li>
                <li>Hamirpur, Himachal Pradesh</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
            © 2024 Bureau of Indian Standards × NIT Hamirpur. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
