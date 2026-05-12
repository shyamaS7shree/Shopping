'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We&apos;ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-primary-foreground/80">
            We&apos;d love to hear from you. Let us know how we can help.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info */}
          {[
            {
              icon: Mail,
              title: 'Email',
              content: 'hello@elegance.com',
              subtext: 'We reply within 24 hours',
            },
            {
              icon: Phone,
              title: 'Phone',
              content: '+1 (234) 567-890',
              subtext: 'Monday to Friday, 9am-6pm EST',
            },
            {
              icon: MapPin,
              title: 'Address',
              content: '123 Luxury Lane',
              subtext: 'Fashion City, FC 10001',
            },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="font-semibold text-foreground mb-1">{item.content}</p>
                <p className="text-muted-foreground text-sm">{item.subtext}</p>
              </div>
            );
          })}
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-muted rounded-lg p-8 md:p-12">
            <h2 className="text-2xl font-bold text-foreground mb-8">Send us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-foreground font-semibold mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground"
                    required
                  />
                </div>
                <div>
                  <label className="block text-foreground font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-foreground font-semibold mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground"
                  required
                />
              </div>

              <div>
                <label className="block text-foreground font-semibold mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
                size="lg"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                q: 'What is your return policy?',
                a: 'We offer a 30-day return policy on all items. Simply contact us for a return authorization and ship the item back in its original condition.',
              },
              {
                q: 'How long does shipping take?',
                a: 'Standard shipping typically takes 5-7 business days. Express shipping options are available at checkout.',
              },
              {
                q: 'Do you offer international shipping?',
                a: 'Yes! We ship to most countries worldwide. International shipping costs and times are calculated at checkout.',
              },
              {
                q: 'How can I track my order?',
                a: 'You&apos;ll receive a tracking number via email once your order ships. You can use it to track your package in real-time.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-background rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-3">{item.q}</h3>
                <p className="text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
