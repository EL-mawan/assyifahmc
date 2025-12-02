'use client';

import { useState, useEffect } from 'react';
import { FaCheckCircle, FaStar, FaCrown, FaRocket, FaGem } from 'react-icons/fa';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface Package {
  id: number;
  name: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
  is_popular?: boolean;
  // Icon and color will be assigned dynamically
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.get('/packages');
        if (response.data.success) {
          setPackages(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch packages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPackageIcon = (index: number) => {
    const icons = [FaStar, FaCrown, FaRocket, FaGem];
    return icons[index % icons.length];
  };

  const getPackageColor = (index: number) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-700',
      'from-yellow-500 to-orange-600',
      'from-pink-500 to-rose-600',
    ];
    return colors[index % colors.length];
  };

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
              <span className="text-primary-600 font-semibold">Pricing Plans</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
              Choose Your Perfect
              <span className="block gradient-text mt-2">MC Package</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Flexible packages designed to fit your event needs and budget. 
              All packages include professional service and dedication to excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading packages...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg, index) => {
                const Icon = getPackageIcon(index);
                const color = getPackageColor(index);
                
                return (
                  <div
                    key={pkg.id}
                    className={`perspective-container ${pkg.is_popular ? 'lg:-mt-8' : ''}`}
                  >
                    <div className={`card-3d relative rounded-3xl p-8 h-full transition-all duration-500 ${
                      pkg.is_popular 
                        ? 'glass-dark shadow-2xl border-2 border-primary-500' 
                        : 'glass hover:shadow-2xl'
                    }`}>
                      {/* Popular Badge */}
                      {pkg.is_popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <div className="px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-full font-bold text-sm shadow-lg">
                            Most Popular
                          </div>
                        </div>
                      )}

                      {/* Icon */}
                      <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center transform hover:rotate-12 hover:scale-110 transition-all duration-300`}>
                        <Icon className="text-4xl text-white" />
                      </div>

                      {/* Package Name */}
                      <h3 className="text-3xl font-bold text-center mb-2">
                        {pkg.name}
                      </h3>

                      {/* Duration */}
                      <p className="text-center text-gray-600 mb-4">{pkg.duration}</p>

                      {/* Price */}
                      <div className="text-center mb-6">
                        <div className="text-4xl font-bold gradient-text mb-2">
                          {formatPrice(pkg.price)}
                        </div>
                        <p className="text-gray-600">{pkg.description}</p>
                      </div>

                      {/* Features */}
                      <ul className="space-y-4 mb-8">
                        {pkg.features && pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <FaCheckCircle className="text-primary-500 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <Link
                        href="/booking"
                        className={`block w-full text-center px-6 py-4 rounded-full font-bold transform hover:scale-105 transition-all duration-300 ${
                          pkg.is_popular
                            ? 'bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-lg hover:shadow-xl'
                            : 'bg-gray-100 text-primary-600 hover:bg-gradient-to-r hover:from-primary-500 hover:to-primary-700 hover:text-white'
                        }`}
                      >
                        Choose {pkg.name}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Custom Package Notice */}
          <div className="mt-16 text-center">
            <div className="glass rounded-2xl p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Need a Custom Package?</h3>
              <p className="text-gray-600 mb-6">
                Every event is unique. We can create a custom package tailored specifically to your needs and budget.
              </p>
              <Link
                href="/booking"
                className="inline-block px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Request Custom Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Available <span className="gradient-text">Add-ons</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enhance your package with these additional services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Extended Hours',
                price: 'Rp 500.000/hour',
                description: 'Additional hosting time beyond package duration',
              },
              {
                title: 'Bilingual Script',
                price: 'Rp 750.000',
                description: 'Custom script in both Indonesian and English',
              },
              {
                title: 'Premium Sound',
                price: 'Rp 1.500.000',
                description: 'Upgraded sound system with wireless mics',
              },
              {
                title: 'Video Recording',
                price: 'Rp 2.000.000',
                description: 'Professional video documentation of the event',
              },
            ].map((addon, index) => (
              <div key={index} className="glass rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <h3 className="text-xl font-bold mb-2 text-primary-600">{addon.title}</h3>
                <div className="text-2xl font-bold gradient-text mb-3">{addon.price}</div>
                <p className="text-gray-600 text-sm">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'What is included in the basic package?',
                answer: 'The basic package includes professional MC services for 2-3 hours, event rundown consultation, basic sound system, event coordination, and guest interaction.',
              },
              {
                question: 'Can I customize a package?',
                answer: 'Absolutely! We understand every event is unique. Contact us to discuss your specific needs and we\'ll create a custom package for you.',
              },
              {
                question: 'Do you provide bilingual services?',
                answer: 'Yes, our Professional and Premium packages include bilingual hosting in both Indonesian and English.',
              },
              {
                question: 'What is your cancellation policy?',
                answer: 'We require 30 days notice for cancellations. Deposits are non-refundable but can be transferred to a future date within 12 months.',
              },
              {
                question: 'Do you travel outside Jakarta?',
                answer: 'Yes, we can travel to other cities. Additional travel costs will apply based on location.',
              },
            ].map((faq, index) => (
              <div key={index} className="glass rounded-xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-3 text-primary-600">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Ready to Book Your Package?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Let's make your event unforgettable. Book your preferred package today!
          </p>
          <Link
            href="/booking"
            className="inline-block px-8 py-4 bg-white text-primary-600 rounded-full font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Book Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
