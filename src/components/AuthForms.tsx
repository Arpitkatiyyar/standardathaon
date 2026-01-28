// import { useState } from "react";
// import { Mail, Lock, User, AlertCircle, CheckCircle } from "lucide-react";
// import { useAuth } from "../contexts/AuthContext";
// import bisLogo from '../assets/bis logo.png'

// interface AuthFormsProps {
//   onNavigate: (section: string) => void;
// }

// export default function AuthForms({ onNavigate }: AuthFormsProps) {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const { signIn, signUp } = useAuth();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     try {
//       if (isLogin) {
//         const { error } = await signIn(email, password);
//         if (error) {
//           setError(error.message);
//         } else {
//           setSuccess("Login successful! Redirecting...");
//           setTimeout(() => onNavigate("dashboard"), 1000);
//         }
//       } else {
//         if (!fullName.trim()) {
//           setError("Please enter your full name");
//           setLoading(false);
//           return;
//         }

//         const { error } = await signUp(email, password, fullName);
//         if (error) {
//           setError(error.message);
//         } else {
//           setSuccess("Account created successfully! Redirecting...");
//           setTimeout(() => onNavigate("dashboard"), 1000);
//         }
//       }
//     } catch (err) {
//       setError("An unexpected error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-br from-[#34a1eb]/10 via-white to-[#9c371e]/10">
//       <div className="container mx-auto px-4">
//         <div className="max-w-md mx-auto">
//           <div className="bg-white rounded-2xl shadow-2xl p-8">
//             <div className="text-center mb-8">
//               <div className="flex justify-center">
//               <img
//                 src={bisLogo}
//                 alt="BIS Logo"
//                 className="h-12 md:h-14 w-auto object-contain"
//               />
//               </div>
//               <h2 className="text-3xl font-bold text-gray-900 mb-2">
//                 {isLogin ? "Welcome Back" : "Create Account"}
//               </h2>
//               <p className="text-gray-600">
//                 {isLogin
//                   ? "Sign in to access your dashboard"
//                   : "Join the hackathon today"}
//               </p>
//             </div>

//             {error && (
//               <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
//                 <AlertCircle
//                   className="text-red-500 flex-shrink-0 mt-0.5"
//                   size={20}
//                 />
//                 <p className="text-red-700 text-sm">{error}</p>
//               </div>
//             )}

//             {success && (
//               <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3">
//                 <CheckCircle
//                   className="text-green-500 flex-shrink-0 mt-0.5"
//                   size={20}
//                 />
//                 <p className="text-green-700 text-sm">{success}</p>
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {!isLogin && (
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Full Name
//                   </label>
//                   <div className="relative">
//                     <User
//                       className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                       size={20}
//                     />
//                     <input
//                       type="text"
//                       value={fullName}
//                       onChange={(e) => setFullName(e.target.value)}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#34a1eb] focus:border-transparent outline-none transition-all"
//                       placeholder="Enter your full name"
//                       required={!isLogin}
//                     />
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <Mail
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                     size={20}
//                   />
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#34a1eb] focus:border-transparent outline-none transition-all"
//                     placeholder="your.email@example.com"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <Lock
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                     size={20}
//                   />
//                   <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#34a1eb] focus:border-transparent outline-none transition-all"
//                     placeholder="••••••••"
//                     required
//                     minLength={6}
//                   />
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-3 bg-gradient-to-r from-[#34a1eb] to-[#9c371e] text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading
//                   ? "Processing..."
//                   : isLogin
//                     ? "Sign In"
//                     : "Create Account"}
//               </button>
//             </form>

//             <div className="mt-6 text-center">
//               <button
//                 onClick={() => {
//                   setIsLogin(!isLogin);
//                   setError("");
//                   setSuccess("");
//                 }}
//                 className="text-[#34a1eb] hover:text-[#2891db] font-medium"
//               >
//                 {isLogin
//                   ? "Don't have an account? Sign up"
//                   : "Already have an account? Sign in"}
//               </button>
//             </div>

//             <div className="mt-6 pt-6 border-t border-gray-200 text-center">
//               <button
//                 onClick={() => onNavigate("home")}
//                 className="text-gray-600 hover:text-gray-900 text-sm"
//               >
//                 ← Back to Home
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import { useState } from "react";
import { Mail, Lock, User, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import bisLogo from "../assets/bis logo.png";

interface AuthFormsProps {
  onNavigate: (section: string) => void;
}

export default function AuthForms({ onNavigate }: AuthFormsProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      /* -------------------- LOGIN -------------------- */
      if (isLogin) {
        const { data, error } = await signIn(email, password);

        if (error) {
          setError(error.message);
          return;
        }

        const user = data?.user;

        // 🚫 BLOCK unverified users
        if (!user || !user.email_confirmed_at) {
          setError("Please verify your email before logging in.");
          await signIn("", ""); // clears session safely
          return;
        }

        // ✅ VERIFIED USER ONLY
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => onNavigate("dashboard"), 1000);
        return;
      }

      /* -------------------- SIGN UP -------------------- */
      if (!fullName.trim()) {
        setError("Please enter your full name");
        return;
      }

      const { error } = await signUp(email, password, fullName);

      if (error) {
        setError(error.message);
        return;
      }

      // 🚫 DO NOT redirect after signup
      setSuccess(
        "Account created! Please check your email and verify before logging in."
      );
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-br from-[#34a1eb]/10 via-white to-[#9c371e]/10">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center">
                <img
                  src={bisLogo}
                  alt="BIS Logo"
                  className="h-12 md:h-14 w-auto object-contain"
                />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-gray-600">
                {isLogin
                  ? "Sign in to access your dashboard"
                  : "Join the hackathon today"}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                <AlertCircle className="text-red-500" size={20} />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3">
                <CheckCircle className="text-green-500" size={20} />
                <p className="text-green-700 text-sm">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="Enter your full name"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-[#34a1eb] to-[#9c371e] text-white font-semibold rounded-lg disabled:opacity-50"
              >
                {loading
                  ? "Processing..."
                  : isLogin
                  ? "Sign In"
                  : "Create Account"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                  setSuccess("");
                }}
                className="text-[#34a1eb] font-medium"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>

            <div className="mt-6 pt-6 border-t text-center">
              <button
                onClick={() => onNavigate("home")}
                className="text-gray-600 text-sm"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
