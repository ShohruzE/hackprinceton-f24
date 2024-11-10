import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Clock, Heart, MessageSquare, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-start">
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Bridging the gap between
                <span className="block text-blue-400">nurses and patients</span>
              </h1>
              <p className="mt-6 text-lg text-gray-500">
                Transform patient care with our innovative voice-recognition
                platform. Enhance documentation accuracy while maintaining
                meaningful human connections.
              </p>
              <div className="mt-8 flex items-center space-x-4">
                <Link
                  href="/auth"
                  className="flex items-center px-6 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
                >
                  Get Started
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Link>
                <Link
                  href="/"
                  className="px-6 py-3 text-gray-600 hover:text-gray-900"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-6">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <Image
                  src="/api/placeholder/600/400"
                  alt="EchoHealth Dashboard Preview"
                  width={600}
                  height={400}
                  className="rounded-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Features that transform patient care
            </h2>
            <p className="mt-4 text-gray-500">
              Everything you need to enhance the nurse-patient relationship
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <MessageSquare className="w-6 h-6 text-blue-400" />,
                title: "Voice Recognition",
                description:
                  "Accurate conversation transcription and summarization",
              },
              {
                icon: <Heart className="w-6 h-6 text-blue-400" />,
                title: "Patient Care",
                description: "Digital whiteboard with real-time updates",
              },
              {
                icon: <Clock className="w-6 h-6 text-blue-400" />,
                title: "Time Saving",
                description:
                  "Efficient documentation without compromising care",
              },
              {
                icon: <Shield className="w-6 h-6 text-blue-400" />,
                title: "Secure",
                description: "HIPAA-compliant data protection",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="p-2 bg-blue-50 rounded-lg w-fit">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-400">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              Ready to improve patient care?
            </h2>
            <p className="my-4 text-blue-100">
              Join healthcare professionals who are already using EchoHealth
            </p>
            <Link
              href="/"
              className="mt-8 px-8 py-3 bg-white text-blue-400 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
