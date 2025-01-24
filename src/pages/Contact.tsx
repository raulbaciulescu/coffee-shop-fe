import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail, Clock, Coffee, MessageSquare, Users, Heart } from 'lucide-react';

export function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmitted(true);
        setIsSubmitting(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-[#f8f3e9]">
            {/* Hero Section */}
            <div
                className="h-[40vh] bg-cover bg-center relative"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80")'
                }}
            >
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
                        <p className="text-xl max-w-2xl mx-auto">We'd love to hear from you. Let's start a conversation about coffee, community, and collaboration.</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div>
                        <div className="sticky top-24">
                            <h2 className="text-3xl font-bold text-[#2C1810] mb-6">Get in Touch</h2>
                            <p className="text-gray-600 mb-8 text-lg">
                                Whether you have questions about our coffee, want to collaborate, or just want to say hello, we're here for you.
                            </p>

                            <div className="space-y-8">
                                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-[#6F4E37]/10 p-3 rounded-full">
                                            <MapPin className="w-6 h-6 text-[#6F4E37]" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-[#2C1810] mb-1">Visit Us</h3>
                                            <p className="text-gray-600">123 Coffee Street<br />Brew City, BC 12345</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-[#6F4E37]/10 p-3 rounded-full">
                                            <Phone className="w-6 h-6 text-[#6F4E37]" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-[#2C1810] mb-1">Call Us</h3>
                                            <p className="text-gray-600">(555) 123-4567</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-[#6F4E37]/10 p-3 rounded-full">
                                            <Mail className="w-6 h-6 text-[#6F4E37]" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-[#2C1810] mb-1">Email Us</h3>
                                            <p className="text-gray-600">hello@dailybrew.com</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-[#6F4E37]/10 p-3 rounded-full">
                                            <Clock className="w-6 h-6 text-[#6F4E37]" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-[#2C1810] mb-1">Opening Hours</h3>
                                            <p className="text-gray-600">
                                                Monday - Friday: 7am - 7pm<br />
                                                Saturday - Sunday: 8am - 6pm
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-xl p-8 shadow-xl">
                        {submitted ? (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Send className="w-10 h-10 text-green-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-[#2C1810] mb-3">Message Sent!</h2>
                                <p className="text-gray-600 text-lg">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold text-[#2C1810] mb-6">Send Us a Message</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent transition-shadow"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent transition-shadow"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.subject}
                                            onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent transition-shadow"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Message
                                        </label>
                                        <textarea
                                            value={formData.message}
                                            onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                            rows={6}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent transition-shadow resize-none"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-[#6F4E37] text-white py-4 px-6 rounded-lg hover:bg-[#5D3D2B] transition-colors flex items-center justify-center gap-2 text-lg font-medium"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}