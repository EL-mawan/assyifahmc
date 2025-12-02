'use client';

import Image from 'next/image';
import { FaInstagram, FaLinkedin, FaYoutube, FaAward, FaMicrophone, FaHeart } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-6 py-3 glass rounded-full">
              <span className="text-primary-600 font-semibold">Tentang Saya</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
              Kenali
              <span className="block gradient-text mt-2">MC Profesional Anda</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Profil Assyifah MC"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary-100 rounded-full -z-10 blur-2xl"></div>
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-purple-100 rounded-full -z-10 blur-2xl"></div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-4xl font-display font-bold mb-6">
                Halo, Saya <span className="gradient-text">Assyifah</span>
              </h2>
              <h3 className="text-xl font-semibold text-gray-700 mb-6">
                Master of Ceremony Profesional & Public Speaker
              </h3>
              
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Dengan pengalaman lebih dari 10 tahun di industri acara, saya memiliki kehormatan untuk memandu ratusan acara mulai dari pernikahan intim hingga pertemuan perusahaan besar. Semangat saya terletak pada menghubungkan audiens dan menciptakan suasana yang menarik dan tak terlupakan.
                </p>
                <p>
                  Saya percaya bahwa MC yang hebat melakukan lebih dari sekadar mengumumkan agenda berikutnya. MC yang hebat menetapkan nada, mengelola energi ruangan, dan memastikan acara berjalan lancar dari awal hingga akhir.
                </p>
                <p>
                  Baik itu acara protokol formal atau perayaan yang penuh kesenangan, saya membawa profesionalisme, kemampuan beradaptasi, dan sentuhan pribadi untuk setiap kesempatan.
                </p>
              </div>

              {/* Social Links */}
              <div className="mt-8 flex space-x-4">
                <a href="#" className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 transform hover:scale-110">
                  <FaInstagram className="text-xl" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110">
                  <FaLinkedin className="text-xl" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-110">
                  <FaYoutube className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Nilai Inti Saya</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Prinsip-prinsip yang memandu setiap acara yang saya pandu
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FaAward,
                title: 'Keunggulan',
                description: 'Berusaha untuk kesempurnaan dalam setiap detail, memastikan acara Anda memenuhi standar kualitas tertinggi.',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: FaMicrophone,
                title: 'Keterlibatan',
                description: 'Menciptakan koneksi yang bermakna dengan audiens dan menjaga energi tetap hidup sepanjang acara.',
                color: 'from-purple-500 to-purple-600'
              },
              {
                icon: FaHeart,
                title: 'Passion',
                description: 'Menuangkan hati dan jiwa ke dalam setiap penampilan, memperlakukan hari istimewa Anda seolah-olah itu milik saya sendiri.',
                color: 'from-pink-500 to-pink-600'
              }
            ].map((value, index) => (
              <div key={index} className="glass rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center text-white text-2xl shadow-lg`}>
                  <value.icon />
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
