import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail, Clock } from 'lucide-react';

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
        <div className="min-h-screen pt-24 pb-16 px-4 bg-[#f8f3e9]">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div>
                        <h1 className="text-3xl font-bold text-[#2C1810] mb-6">Get in Touch</h1>
                        <p className="text-gray-600 mb-8">
                            Have questions about our coffee or want to collaborate? We'd love to hear from you.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <MapPin className="w-6 h-6 text-[#6F4E37] flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-[#2C1810] mb-1">Visit Us</h3>
                                    <p className="text-gray-600">123 Coffee Street<br />Brew City, BC 12345</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <Phone className="w-6 h-6 text-[#6F4E37] flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-[#2C1810] mb-1">Call Us</h3>
                                    <p className="text-gray-600">(555) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <Mail className="w-6 h-6 text-[#6F4E37] flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-[#2C1810] mb-1">Email Us</h3>
                                    <p className="text-gray-600">hello@dailybrew.com</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <Clock className="w-6 h-6 text-[#6F4E37] flex-shrink-0 mt-1" />
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

                    {/* Contact Form */}
                    <div className="bg-white rounded-xl p-8 shadow-md">
                        {submitted ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Send className="w-8 h-8 text-green-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-[#2C1810] mb-2">Message Sent!</h2>
                                <p className="text-gray-600">We'll get back to you as soon as possible.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent"
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
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.subject}
                                        onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent"
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
                                        rows={4}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-[#6F4E37] text-white py-3 px-6 rounded-lg hover:bg-[#5D3D2B] transition-colors flex items-center justify-center gap-2"
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
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}