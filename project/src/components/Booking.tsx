import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send, Phone, Mail, MessageSquare, Calendar } from "lucide-react";

const Booking = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  // Handle form input changes
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // WhatsApp phone number
  const phoneNumber = "919557531212"; // Added country code without +

  // Function to open WhatsApp directly
  const openWhatsApp = () => {
    // Create a basic greeting message
    const initialMessage = encodeURIComponent("Hello! I'm interested in learning more about your services.");
    
    // Create WhatsApp URL with the initial message
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${initialMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappURL, "_blank");
  };

  // Book meeting function
  const bookMeeting = () => {
    const meetingBookingUrl = "https://calendly.com/divinedestinationevents/30min"; // Replace with actual URL when available
    window.open(meetingBookingUrl, "_blank");
  }

  // Handle form submission to WhatsApp
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Create the message string
    const whatsappMessage = `*New Booking Inquiry*
*Name:* ${formData.fullName}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Service:* ${formData.service}
*Message:* ${formData.message}`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappURL, "_blank");
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section
      id="booking"
      className="section-padding bg-soft-white dark:bg-dark-bg"
    >
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={formVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Contact Information */}
          <div>
            <h2 className="text-4xl font-bold text-deep-green dark:text-gold mb-6">
              Begin Your Divine Journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-dark-text mb-8">
              Ready to embark on a spiritual journey? Contact us to plan your
              perfect pilgrimage or celebration.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-deep-green/10 dark:bg-gold/10 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-deep-green dark:text-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-deep-green dark:text-gold">
                    Phone
                  </h3>
                  <p className="text-gray-600 dark:text-dark-text">
                    +91 9557531212
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-deep-green/10 dark:bg-gold/10 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-deep-green dark:text-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-deep-green dark:text-gold">
                    Email
                  </h3>
                  <p className="text-gray-600 dark:text-dark-text">
                  divinedestination@gmail.com
                  </p>
                </div>
              </div>

              <div 
                className="flex items-center space-x-4 cursor-pointer transition-transform hover:scale-105" 
                onClick={openWhatsApp}
                role="button"
                aria-label="Contact us on WhatsApp"
              >
                <div className="bg-deep-green/10 dark:bg-gold/10 p-3 rounded-full">
                  <MessageSquare className="w-6 h-6 text-deep-green dark:text-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-deep-green dark:text-gold">
                    WhatsApp
                  </h3>
                  <p className="text-gray-600 dark:text-dark-text">
                    Message us directly
                  </p>
                </div>
              </div>

              {/* Book Meeting Button - Moved outside of the WhatsApp section */}
              <div 
                className="flex items-center space-x-4 cursor-pointer transition-transform hover:scale-105" 
                onClick={bookMeeting}
                role="button"
                aria-label="Book a Meeting"
              >
                <div className="bg-deep-green/10 dark:bg-gold/10 p-3 rounded-full">
                  <Calendar className="w-6 h-6 text-deep-green dark:text-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-deep-green dark:text-gold">
                    Book Meeting
                  </h3>
                  <p className="text-gray-600 dark:text-dark-text">
                    Schedule a consultation
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white dark:bg-dark-surface p-8 rounded-2xl shadow-lg">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-deep-green dark:text-gold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-transparent dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-gold/50"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-deep-green dark:text-gold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-transparent dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-gold/50"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-deep-green dark:text-gold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-transparent dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-gold/50"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-deep-green dark:text-gold mb-2">
                  Service Interest
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-transparent dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-gold/50"
                >
                  <option value="">Select a service</option>
                  <option value="Char Dham Yatra">Char Dham Yatra</option>
                  <option value="Destination Wedding">
                    Destination Wedding
                  </option>
                  <option value="Rituals & Ceremonies">
                    Rituals & Ceremonies
                  </option>
                  <option value="Travel & Hospitality">
                    Travel & Hospitality
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-deep-green dark:text-gold mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-transparent dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-gold/50"
                  placeholder="Tell us about your requirements"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-deep-green hover:bg-rich-green dark:bg-gold dark:hover:bg-gold/90 text-white rounded-lg transition-colors duration-300"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Booking;