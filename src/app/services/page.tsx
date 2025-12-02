'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import * as FaIcons from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  color?: string; // Backend might not send color, so optional
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/services');
        if (response.data.success) {
          setServices(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Helper to get icon component dynamically
  const getIconComponent = (iconName: string) => {
    // @ts-ignore
    const IconComponent = FaIcons[iconName as keyof typeof FaIcons];
    return IconComponent || FaIcons.FaStar; // Default to Star if not found
  };

  // Helper to get random gradient color if not provided
  const getGradientColor = (index: number) => {
    const gradients = [
      'from-pink-500 to-rose-600',
      'from-blue-500 to-blue-700',
      'from-yellow-500 to-orange-600',
      'from-purple-500 to-purple-700',
      'from-green-500 to-teal-600',
      'from-indigo-500 to-indigo-700',
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-6 py-3 glass rounded-full">
              <span className="text-primary-600 font-semibold">Our Services</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
              Professional MC Services
              <span className="block gradient-text mt-2">For Every Occasion</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              From intimate gatherings to grand celebrations, we provide exceptional MC services 
              tailored to make your event unforgettable.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading services...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const IconComponent = getIconComponent(service.icon);
                const gradientColor = service.color || getGradientColor(index);
                
                return (
                  <div
                    key={service.id}
                    className="group perspective-container"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="card-3d glass rounded-2xl p-8 h-full hover:shadow-2xl transition-all duration-500">
                      {/* Icon */}
                      <div className={`w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br ${gradientColor} flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300`}>
                        {/* @ts-ignore */}
                        <IconComponent className="text-4xl text-white" />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-600 transition-colors">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-3 mb-6">
                        {service.features && service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <FaCheckCircle className="text-primary-500 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <Link
                        href="/booking"
                        className="inline-block w-full text-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                      >
                        Book This Service
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="section-padding bg-gradient-to-br from-blue-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Why Choose Our <span className="gradient-text">MC Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We go above and beyond to ensure your event is a success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Experienced Professional',
                description: 'Over 10 years of experience hosting hundreds of successful events',
              },
              {
                title: 'Customized Approach',
                description: 'Every event is unique, and we tailor our services to match your vision',
              },
              {
                title: 'Bilingual Capability',
                description: 'Fluent in both Indonesian and English for diverse audiences',
              },
              {
                title: 'Professional Equipment',
                description: 'High-quality audio equipment and backup systems',
              },
              {
                title: 'Flexible Packages',
                description: 'Various packages to suit different budgets and requirements',
              },
              {
                title: 'Reliable & Punctual',
                description: 'Always on time, always prepared, always professional',
              },
            ].map((benefit, index) => (
              <div key={index} className="glass rounded-xl p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold mb-3 text-primary-600">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Ready to Book Your MC?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Let's discuss your event and create an unforgettable experience together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="px-8 py-4 bg-white text-primary-600 rounded-full font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Book Now
            </Link>
            <Link
              href="/packages"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-primary-600 transition-all duration-300"
            >
              View Packages
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
