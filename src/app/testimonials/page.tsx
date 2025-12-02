'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaQuoteLeft, FaStar, FaUserCircle } from 'react-icons/fa';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Testimonial {
  id: number;
  client_name: string;
  client_position: string;
  client_company: string;
  client_photo_url?: string;
  testimonial_text: string;
  rating: number;
  event_type: string;
  event_date: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.get('/testimonials');
        if (response.data.success) {
          setTestimonials(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

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
              <span className="text-primary-600 font-semibold">Client Stories</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
              What People Say
              <span className="block gradient-text mt-2">About Us</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our happy clients have to say about their experience.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading testimonials...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="group perspective-container"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="card-3d glass rounded-2xl p-8 h-full hover:shadow-2xl transition-all duration-500 flex flex-col relative">
                    <FaQuoteLeft className="absolute top-6 right-6 text-4xl text-primary-100 group-hover:text-primary-200 transition-colors" />
                    
                    {/* Rating */}
                    <div className="flex space-x-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400" />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-gray-600 mb-8 italic leading-relaxed flex-1">
                      "{testimonial.testimonial_text}"
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center space-x-4 mt-auto">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        {testimonial.client_photo_url ? (
                          <Image
                            src={testimonial.client_photo_url}
                            alt={testimonial.client_name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FaUserCircle className="w-full h-full text-gray-400" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{testimonial.client_name}</h4>
                        <div className="text-sm text-primary-600 font-medium">{testimonial.client_position}</div>
                        <div className="text-xs text-gray-400 mt-1">{testimonial.event_type} • {new Date(testimonial.event_date).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-xl opacity-90">Happy Clients</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">5.0</div>
              <div className="text-xl opacity-90">Average Rating</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="text-xl opacity-90">Satisfaction Guaranteed</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
