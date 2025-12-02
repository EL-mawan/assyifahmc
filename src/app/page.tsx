'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaPlay, FaStar, FaAward, FaUsers, FaCalendarCheck, FaQuoteLeft, FaMicrophone, FaArrowRight } from 'react-icons/fa';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface Testimonial {
  id: number;
  client_name: string;
  client_position: string;
  testimonial_text: string;
  rating: number;
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroButtonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [featuredServices, setFeaturedServices] = useState<Service[]>([]);
  const [featuredTestimonials, setFeaturedTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch featured data
    const fetchFeaturedData = async () => {
      try {
        const [servicesRes, testimonialsRes] = await Promise.all([
          api.get('/services/featured'),
          api.get('/testimonials/featured'),
        ]);

        if (servicesRes.data.success) {
          setFeaturedServices(servicesRes.data.data.slice(0, 3));
        }
        if (testimonialsRes.data.success) {
          setFeaturedTestimonials(testimonialsRes.data.data.slice(0, 3));
        }
      } catch (error) {
        console.error('Failed to fetch featured data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedData();

    // Hero Animation - Reduced
    if (heroRef.current) {
      gsap.from(heroRef.current.querySelectorAll('.hero-content > *'), {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }

    // Stats Counter Animation - Reduced
    if (statsRef.current) {
      const stats = statsRef.current.querySelectorAll('.stat-number');
      stats.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target') || '0');
        gsap.to(stat, {
          innerText: target,
          duration: 1.5,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: stat,
            start: 'top 80%',
          },
        });
      });
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-20 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
            <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container-custom h-full flex flex-col justify-center items-center text-center">
          <h1 
            ref={heroTitleRef}
            className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight text-gray-900"
          >
            Tingkatkan Acara Anda Bersama <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Assyifah MC
            </span>
          </h1>
          
          <p 
            ref={heroSubtitleRef}
            className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto font-light"
          >
            Menghadirkan keanggunan, energi, dan profesionalisme di setiap momen spesial Anda.
          </p>
          
          <div 
            ref={heroButtonsRef}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/booking" className="btn-primary text-lg px-8 py-4">
              Pesan Sekarang
            </Link>
            <Link href="/about" className="btn-secondary text-lg px-8 py-4">
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <FaArrowRight className="text-primary-600 transform rotate-90 text-2xl opacity-70" />
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white relative z-10">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-3d bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center group hover:border-primary-200 transition-all duration-300">
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-600 transition-colors duration-300">
                <FaMicrophone className="text-3xl text-primary-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">MC Profesional</h3>
              <p className="text-gray-600">
                Berpengalaman dalam memandu berbagai acara dengan gaya yang elegan dan menarik.
              </p>
            </div>

            <div className="card-3d bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center group hover:border-primary-200 transition-all duration-300">
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-600 transition-colors duration-300">
                <FaStar className="text-3xl text-primary-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Pengalaman Premium</h3>
              <p className="text-gray-600">
                Memberikan sentuhan kelas atas untuk pernikahan, acara perusahaan, dan pesta privat.
              </p>
            </div>

            <div className="card-3d bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center group hover:border-primary-200 transition-all duration-300">
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-600 transition-colors duration-300">
                <FaCalendarCheck className="text-3xl text-primary-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Booking Mudah</h3>
              <p className="text-gray-600">
                Proses pemesanan yang simpel dan konsultasi gratis untuk merencanakan acara impian Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Mengapa Memilih <span className="gradient-text">Assyifah MC</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Kami menghadirkan profesionalisme, energi, dan keanggunan di setiap acara
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FaAward,
                title: 'Profesional',
                description: 'MC bersertifikat dan berpengalaman dengan rekam jejak terbukti',
                color: 'from-blue-500 to-blue-600',
              },
              {
                icon: FaStar,
                title: 'Rating Tertinggi',
                description: 'Ulasan bintang 5 dari ratusan klien yang puas',
                color: 'from-yellow-500 to-yellow-600',
              },
              {
                icon: FaUsers,
                title: 'Personal',
                description: 'Pendekatan yang disesuaikan untuk setiap acara unik',
                color: 'from-purple-500 to-purple-600',
              },
              {
                icon: FaCalendarCheck,
                title: 'Terpercaya',
                description: 'Selalu tepat waktu, siap sedia, dan profesional',
                color: 'from-green-500 to-green-600',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group perspective-container"
              >
                <div className="card-3d glass rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300`}>
                    <feature.icon className="text-4xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="section-padding bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: 500, label: 'Acara Dipandu', suffix: '+' },
              { number: 10, label: 'Tahun Pengalaman', suffix: '+' },
              { number: 450, label: 'Klien Bahagia', suffix: '+' },
              { number: 100, label: 'Tingkat Kepuasan', suffix: '%' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2">
                  <span className="stat-number" data-target={stat.number}>0</span>
                  {stat.suffix}
                </div>
                <div className="text-xl opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Layanan <span className="gradient-text">Kami</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Layanan MC profesional yang disesuaikan dengan kebutuhan acara Anda
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {featuredServices.map((service, index) => (
                <div
                  key={service.id}
                  className="group perspective-container"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="card-3d glass rounded-2xl p-8 h-full hover:shadow-2xl transition-all duration-300">
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {service.description}
                    </p>
                    <Link
                      href="/services"
                      className="text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center gap-2"
                    >
                      Selengkapnya →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center">
            <Link href="/services" className="btn-primary inline-block">
              Lihat Semua Layanan
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Testimonials Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Apa Kata <span className="gradient-text">Klien Kami</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Jangan hanya percaya kata-kata kami - dengarkan dari klien kami yang puas
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {featuredTestimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="group perspective-container"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="card-3d glass rounded-2xl p-8 h-full hover:shadow-2xl transition-all duration-300 flex flex-col relative">
                    <FaQuoteLeft className="absolute top-6 right-6 text-4xl text-primary-100 group-hover:text-primary-200 transition-colors" />
                    
                    {/* Rating */}
                    <div className="flex space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400" />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-gray-600 mb-6 italic leading-relaxed flex-1 line-clamp-4">
                      "{testimonial.testimonial_text}"
                    </p>

                    {/* Author */}
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.client_name}</h4>
                      <div className="text-sm text-primary-600 font-medium">{testimonial.client_position}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center">
            <Link href="/testimonials" className="btn-secondary inline-block">
              Baca Lebih Banyak Ulasan
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 to-white">
        <div className="container-custom">
          <div className="glass rounded-3xl p-12 md:p-16 text-center shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Siap Membuat Acara Anda Spesial?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Mari diskusikan bagaimana kami dapat membuat acara Anda tak terlupakan. Pesan konsultasi hari ini!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking" className="btn-primary inline-flex items-center justify-center space-x-2">
                <span>Pesan Konsultasi</span>
                <FaCalendarCheck />
              </Link>
              <Link href="/packages" className="btn-secondary">
                Lihat Paket
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
