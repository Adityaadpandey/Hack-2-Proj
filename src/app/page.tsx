import Main from "@/components/Main";
import { ArrowRight, Clock, MessageCircle, Shield } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <Shield className="w-6 h-6 text-blue-400" />,
      title: "Safe & Secure",
      description: "Your health data is protected with enterprise-grade security"
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-400" />,
      title: "24/7 Available",
      description: "Get instant responses any time, day or night"
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-blue-400" />,
      title: "Smart Conversations",
      description: "Natural dialogue with advanced AI understanding"
    }
  ];

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#1a365d,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#2d3748,transparent_50%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center justify-between mb-16">
          <div className="text-white text-2xl font-bold">HealthChat.ai</div>
          <div className="flex gap-8">
            <button className="text-gray-400 hover:text-white transition-colors">About</button>
            <button className="text-gray-400 hover:text-white transition-colors">Features</button>
            <button className="text-gray-400 hover:text-white transition-colors">Contact</button>
          </div>
        </nav>

        <div className="flex items-center justify-between min-h-[calc(100vh-12rem)]">
          {/* Left side - Text Content */}
          <div className="w-1/2 pr-12">
            <div className="inline-block px-4 py-2 bg-blue-500/10 rounded-full mb-6">
              <span className="text-blue-400 text-sm font-semibold">AI-Powered Healthcare Support</span>
            </div>

            <h1 className="text-white font-bold text-6xl leading-tight mb-4">
              Feel Sick?{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Chat Quick!
              </span>
            </h1>

            <h2 className="text-white/90 text-4xl font-medium mb-6">
              Your AI Health Buddy,{" "}
              <span className="text-blue-400">Always Ready.</span>
            </h2>

            <p className="text-gray-400 text-xl mb-8">
              Get instant health guidance and support, 24/7. Your personal AI health companion is here to help you make informed decisions about your well-being.
            </p>

            <button className="group flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-200">
              Start Chatting Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-16 grid grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                  <div className="mb-3">{feature.icon}</div>
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Spline Component */}
          <div className="w-1/2 flex items-center -mt-32 justify-center">
            <div className="relative w-full  h-[800px]  scale-x-[-1]">
              <Main />
              {/* Add a glow effect behind the 3D model */}
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl -z-10 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-40 w-8 h-8 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-40 right-80 w-12 h-12 bg-purple-500/20 rounded-full blur-xl animate-pulse" />
    </div>
  );
}
