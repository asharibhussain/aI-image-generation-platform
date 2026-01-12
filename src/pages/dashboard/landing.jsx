import React, { useState, useEffect, useContext } from 'react';
import {
     Sparkles,
     Palette,
     Zap,
     Shield,
     ArrowRight,
     Play,
     Star,
     Menu,
     X,
     ChevronDown,
     Brain,
     Image,
     Clock
} from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import TextToImageHome from "@/pages/components/TextToImageHome";
import GeneratePage from "@/pages/components/GeneratePage";
// Import your AuthContext
import { AuthContext } from "../../context/AuthContext"; // Adjust path as needed

const LandingPage = () => {
     const [scrolled, setScrolled] = useState(false);
     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
     const [currentImageIndex, setCurrentImageIndex] = useState(0);
     const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);
     // Add this state at the top inside LandingPage
     const [showTextToImage, setShowTextToImage] = useState(true);
     const navigate = useNavigate();

     // Use AuthContext for login state
     const { currentUser, logout } = useContext(AuthContext);

     const showcaseImages = [
          { emoji: "🎨", title: "Digital Art", color: "from-purple-500 to-pink-500" },
          { emoji: "🌟", title: "Fantasy Scenes", color: "from-blue-500 to-purple-500" },
          { emoji: "🏞️", title: "Landscapes", color: "from-green-500 to-blue-500" },
          { emoji: "👤", title: "Portraits", color: "from-orange-500 to-red-500" },
          { emoji: "🔬", title: "Abstract Art", color: "from-cyan-500 to-purple-500" }
     ];

     const finalStats = [1000000, 50000, 99, 4.9];
     const statLabels = ["Images Generated", "Happy Users", "Uptime %", "User Rating"];

     useEffect(() => {
          if (currentUser) {
               navigate("/", { replace: true });
          }
     }, [currentUser, navigate]);

     useEffect(() => {
          const handleScroll = () => setScrolled(window.scrollY > 50);
          window.addEventListener('scroll', handleScroll);

          // Image carousel
          const imageInterval = setInterval(() => {
               setCurrentImageIndex((prev) => (prev + 1) % showcaseImages.length);
          }, 3000);

          // Animate stats
          const animateStats = () => {
               finalStats.forEach((finalValue, index) => {
                    let current = 0;
                    const increment = finalValue / 50;
                    const timer = setInterval(() => {
                         current += increment;
                         if (current >= finalValue) {
                              current = finalValue;
                              clearInterval(timer);
                         }
                         setAnimatedStats(prev => {
                              const newStats = [...prev];
                              newStats[index] = current;
                              return newStats;
                         });
                    }, 50);
               });
          };

          setTimeout(animateStats, 1000);

          return () => {
               window.removeEventListener('scroll', handleScroll);
               clearInterval(imageInterval);
          };
     }, []);

     const features = [
          {
               icon: <Brain className="w-8 h-8" />,
               title: "AI-Powered Generation",
               description: "Advanced neural networks create stunning, unique images from your text descriptions",
               color: "from-purple-500 to-blue-500"
          },
          {
               icon: <Zap className="w-8 h-8" />,
               title: "Lightning Fast",
               description: "Generate high-quality images in seconds with our optimized AI infrastructure",
               color: "from-yellow-500 to-orange-500"
          },
          {
               icon: <Palette className="w-8 h-8" />,
               title: "Multiple Art Styles",
               description: "Choose from photorealistic, artistic, anime, and countless other visual styles",
               color: "from-pink-500 to-purple-500"
          },
          {
               icon: <Shield className="w-8 h-8" />,
               title: "Commercial License",
               description: "Use generated images for personal and commercial projects without restrictions",
               color: "from-green-500 to-teal-500"
          }
     ];

     const formatStat = (value, index) => {
          if (index === 0) return Math.floor(value / 1000) + "K+";
          if (index === 1) return Math.floor(value / 1000) + "K+";
          if (index === 2) return value.toFixed(1) + "%";
          if (index === 3) return value.toFixed(1) + "/5";
          return Math.floor(value);
     };

     // Logout handler
     const handleLogout = async () => {
          await logout();
          navigate("/");
     };

     return (
          <div style={{ background: '#a1adca' }} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
               {/* Background Effects */}
               <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                    <div className="absolute top-40 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
               </div>

               {/* Navigation */}
               <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                    ? 'bg-slate-900/90 backdrop-blur-md shadow-lg shadow-purple-500/10'
                    : 'bg-transparent'
                    }`}>
                    <div className="max-w-7xl mx-auto px-4 lg:px-8">
                         <div className="flex items-center justify-between h-16">
                              <div className="flex items-center space-x-3">
                                   <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 animate-pulse">
                                        <Sparkles className="w-6 h-6 text-white" />
                                   </div>
                                   <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        AI Images
                                   </span>
                              </div>

                              {/* Desktop Menu */}
                              <div className="hidden md:flex items-center space-x-8">
                                   {/* {['Home', 'Generate', 'Gallery', 'Features', 'Pricing', 'About'].map((item) => {
                                        let path = "/";
                                        if (item !== "Home") path = `/${item.toLowerCase()}`;
                                        return (
                                             <Link
                                                  key={item}
                                                  to={path}
                                                  className={`text-black hover:text-purple-300 transition-colors duration-300 px-3 py-2 ${item === 'Home' ? 'text-purple-400 border-b-2 border-purple-400' : ''}`}
                                             >
                                                  {item}
                                             </Link>
                                        );
                                   })} */}
                                   {currentUser ? (
                                        <>
                                             <Link
                                                  to="/dashboard/gallery"
                                                  className="text-black hover:text-purple-300 transition-colors duration-300 px-3 py-2 font-bold"
                                             >
                                                  Dashboard
                                             </Link>
                                             <button
                                                  onClick={handleLogout}
                                                  className="text-black hover:text-purple-300 transition-colors duration-300 px-3 py-2 font-bold"
                                             >
                                                  Logout
                                             </button>
                                        </>
                                   ) : (
                                        <>
                                             <Link to="/auth/sign-in" className="text-black hover:text-purple-300 transition-colors duration-300 px-3 py-2">Sign In</Link>
                                             <Link to="/auth/sign-up" className="text-black hover:text-purple-300 transition-colors duration-300 px-3 py-2">Sign Up</Link>
                                        </>
                                   )}
                              </div>
                              {/* Mobile Menu Button */}
                              <button
                                   className="md:hidden text-white p-2"
                                   onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                              >
                                   {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                              </button>
                         </div>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                         <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-700">
                              <div className="px-4 py-6 space-y-4">
                                   {['Home', 'Generate', 'Gallery', 'Features', 'Pricing', 'About'].map((item) => (
                                        <Link
                                             key={item}
                                             to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                             className="block w-full text-left text-white hover:text-purple-300 transition-colors duration-300 py-2"
                                             onClick={() => setMobileMenuOpen(false)}
                                        >
                                             {item}
                                        </Link>
                                   ))}
                                   {currentUser ? (
                                        <button
                                             onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                                             className="block w-full text-left text-white hover:text-purple-300 transition-colors duration-300 py-2 font-bold"
                                        >
                                             Logout
                                        </button>
                                        // dashboard btn

                                        // <Link to="/dashboard" className="block w-full text-left text-white hover:text-purple-300 transition-colors duration-300 py-2" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                                   ) : (
                                        <>
                                             <Link to="/auth/sign-in" className="block w-full text-left text-white hover:text-purple-300 transition-colors duration-300 py-2" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                                             <Link to="/auth/sign-up" className="block w-full text-left text-white hover:text-purple-300 transition-colors duration-300 py-2" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
                                        </>
                                   )}
                              </div>
                         </div>
                    )}
               </nav>

               {/* Hero Section */}
               {!currentUser && (
                    <div className="relative">
                         <div className="max-w-7xl mx-auto px-4 lg:px-8">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
                                   <div className="space-y-8 animate-slide-up">
                                        <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-sm font-medium">
                                             <Sparkles className="w-4 h-4 mr-2" />
                                             POPULAR AND EXPERTLY SELECTED
                                        </div>

                                        <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                                             <span className="text-gray-300">Next-Gen AI </span>
                                             <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                                                  Image Creation
                                             </span>
                                        </h1>

                                        <p className="text-slate-300 text-xl leading-relaxed max-w-lg">
                                             Transform your imagination into stunning visual masterpieces with our cutting-edge AI technology. Create professional-quality images in seconds.
                                        </p>

                                        {/* Stats */}
                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
                                             {animatedStats.map((stat, index) => (
                                                  <div key={index} className="text-center">
                                                       <div className="text-3xl lg:text-4xl font-bold text-gray-300">
                                                            {formatStat(stat, index)}
                                                       </div>
                                                       <div className="text-slate-400 text-sm mt-1">
                                                            {statLabels[index]}
                                                       </div>
                                                  </div>
                                             ))}
                                        </div>
                                   </div>

                                   <div className="relative">
                                        {/* Main showcase container */}
                                        <div className="relative w-full h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl backdrop-blur-sm border border-purple-500/30 overflow-hidden">
                                             <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10" />

                                             {/* Animated content */}
                                             <div className="absolute inset-0 flex items-center justify-center">
                                                  <div className="text-center space-y-6 animate-float">
                                                       <div className="text-8xl animate-pulse">
                                                            {showcaseImages[currentImageIndex].emoji}
                                                       </div>
                                                       <h3 className="text-white text-2xl font-semibold">
                                                            {showcaseImages[currentImageIndex].title}
                                                       </h3>
                                                       <div className="flex justify-center space-x-2">
                                                            {showcaseImages.map((_, index) => (
                                                                 <div
                                                                      key={index}
                                                                      className={`h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
                                                                           ? 'bg-purple-400 w-8'
                                                                           : 'bg-slate-600 w-2'
                                                                           }`}
                                                                 />
                                                            ))}
                                                       </div>
                                                  </div>
                                             </div>

                                             {/* Floating elements */}
                                             <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl animate-float opacity-80 flex items-center justify-center">
                                                  <Image className="w-8 h-8 text-white" />
                                             </div>
                                             <div className="absolute bottom-6 left-6 w-12 h-12 bg-gradient-to-r from-pink-400 to-red-400 rounded-xl opacity-60 flex items-center justify-center animate-float" style={{ animationDelay: '2s' }}>
                                                  <Clock className="w-6 h-6 text-white" />
                                             </div>
                                             <div className="absolute top-1/2 left-6 w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg opacity-70 flex items-center justify-center animate-float" style={{ animationDelay: '4s' }}>
                                                  <Star className="w-5 h-5 text-white" />
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               )}

               {currentUser && (
                    <div className="pt-24 pb-16">
                         <div className="flex justify-center mb-8">
                              <button
                                   className={`px-6 py-2 rounded-l-lg font-semibold ${showTextToImage ? 'bg-purple-600 text-white' : 'bg-slate-700 text-gray-300'}`}
                                   onClick={() => setShowTextToImage(true)}
                              >
                                   Text to Image
                              </button>
                              <button
                                   className={`px-6 py-2 rounded-r-lg font-semibold ${!showTextToImage ? 'bg-purple-600 text-white' : 'bg-slate-700 text-gray-300'}`}
                                   onClick={() => setShowTextToImage(false)}
                              >
                                   Generate Page
                              </button>
                         </div>
                         {showTextToImage ? (
                              <TextToImageHome />
                         ) : (
                              <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl p-4">
                                   <GeneratePage />
                              </div>
                         )}
                    </div>
               )}


               {/* Features Section */}
               <div className="py-24 relative">
                    <div className="max-w-7xl mx-auto px-4 lg:px-8">
                         <div className="text-center mb-16">
                              <h2 className="text-4xl lg:text-5xl font-bold text-gray-300 mb-6">
                                   Powerful AI Features
                              </h2>
                              <p className="text-slate-300 text-xl max-w-2xl mx-auto">
                                   Experience the future of image creation with our advanced AI technology
                              </p>
                         </div>

                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                              {features.map((feature, index) => (
                                   <div
                                        key={index}
                                        className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/50 rounded-2xl p-8 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                                   >
                                        <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                             <div className="text-white">
                                                  {feature.icon}
                                             </div>
                                        </div>
                                        <h3 className="text-gray-500 text-xl font-semibold mb-4">
                                             {feature.title}
                                        </h3>
                                        <p className="text-slate-300 leading-relaxed">
                                             {feature.description}
                                        </p>
                                   </div>
                              ))}
                         </div>
                    </div>
               </div>

               {/* CTA Section */}
               <div className="py-24">
                    <div className="max-w-4xl mx-auto px-4 lg:px-8">
                         <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl p-12 text-center backdrop-blur-sm border border-purple-500/30 relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10" />
                              <div className="relative z-10">
                                   <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                                        Ready to Create Amazing Images?
                                   </h2>
                                   <p className="text-slate-300 text-xl mb-8 max-w-2xl mx-auto">
                                        Join thousands of creators who are already using AI to bring their ideas to life
                                   </p>
                                   {/* <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-4 rounded-lg text-lg font-semibold shadow-lg shadow-purple-500/30 transform hover:scale-105 transition-all duration-300">
                                        Get Started Now
                                   </button> */}
                              </div>
                         </div>
                    </div>
               </div>

               <style jsx>
                    {`
                         @keyframes float {
                              0%, 100% { transform: translateY(0px); }
                              50% { transform: translateY(-20px); }
                         }
                         @keyframes slide-up {
                              0% { opacity: 0; transform: translateY(50px); }
                              100% { opacity: 1; transform: translateY(0); }
                         }
                         .animate-float {
                              animation: float 6s ease-in-out infinite;
                         }
                         .animate-slide-up {
                              animation: slide-up 1s ease-out;
                         }
                    `}
               </style>
          </div>
     );
};

export default LandingPage;