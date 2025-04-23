import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookTemplate as Temple, BellRing as Ring, HelpingHand as PrayingHands, Car } from 'lucide-react';
import { Modal } from './Modelling/Modal';

const Services = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: <Temple className="w-12 h-12 text-gold" />,
      title: "Char Dham Yatra & Pilgrimage Tours",
      description: "Personalized itineraries, guided experiences, comfortable stays.",
      image: "https://viacation.com/wp-content/uploads/2024/09/Group-Family-Packages-for-Char-Dham-Yatra-Exploration-and-Trip.png",
      details: "Experience the divine journey of Char Dham Yatra with our comprehensive tour packages. We handle everything from transportation and accommodation to spiritual guidance and local assistance. Our experienced team ensures a smooth and meaningful pilgrimage experience."
    },
    {
      icon: <Ring className="w-12 h-12 text-gold" />,
      title: "Divine Destination Weddings",
      description: "Spiritual ceremonies in sacred and serene locations.",
      image: "https://www.heartsdesireevents.com/assets/images/services/wedding_planner1.jpeg",
      details: "Transform your special day into a divine celebration with our destination wedding services. We specialize in organizing traditional ceremonies in spiritually significant locations, combining sacred rituals with modern amenities for an unforgettable experience."
    },
    {
      icon: <PrayingHands className="w-12 h-12 text-gold" />,
      title: "Rituals & Festive Celebrations",
      description: "Satyanarayan Katha, Mahamrityunjaya Jaap, Griha Pravesh, and more.",
      image: "https://static-blog.treebo.com/wp-content/uploads/2018/02/diwali.jpg",
      details: "Celebrate life's important moments with proper spiritual guidance. Our expert pandits and coordinators ensure authentic ritual performances while explaining their significance, making your celebrations both meaningful and memorable."
    },
    {
      icon: <Car className="w-12 h-12 text-gold" />,
      title: "Travel & Hospitality",
      description: "Luxury & Budget Stays, Temple Accommodations, Guides, Local Assistance.",
      image: "https://www.cybage.com/sites/default/files/styles/large/public/2024-03/02.Travel-%26-Hospitality-IT-Solutions.webp?itok=2cmY91wz",
      details: "From luxury hotels to authentic ashram stays, we provide comprehensive travel solutions tailored to your preferences. Our network of local guides and assistants ensures you get the most out of your spiritual journey."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-dark-surface dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={titleVariants}
            className="text-4xl md:text-5xl font-bold text-deep-green dark:text-gold mb-6"
          >
            Our Services
          </motion.h2>
          <motion.p 
            variants={titleVariants}
            className="text-lg text-gray-600 dark:text-dark-text max-w-3xl mx-auto"
          >
            Comprehensive spiritual journey planning and execution
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-[300px]"
              onClick={() => setSelectedService(index)}
              style={{
                backgroundImage: `url(${service.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
              <div className="relative h-full p-8 flex flex-col justify-end">
                <motion.div 
                  className="mb-4"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-soft-white/90">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Modal
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)}
        layout="center"
        theme="glass"
        className="w-11/12 max-w-2xl mx-auto overflow-hidden rounded-2xl"
        animationSpeed={0.3}
        customAnimation={{
          initial: { opacity: 0, scale: 0.9, y: 20 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.95, y: 10 }
        }}
      >
        {selectedService !== null && (
          <div 
            className="relative"
            style={{
              backgroundImage: `url(${services[selectedService].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <div className="relative p-8">
              <motion.div 
                className="flex items-center gap-4 mb-6"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {services[selectedService].icon}
                <h2 className="text-2xl font-bold text-white">
                  {services[selectedService].title}
                </h2>
              </motion.div>
              
              <motion.p 
                className="text-gray-200 leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {services[selectedService].details}
              </motion.p>
              
              <motion.div 
                className="flex justify-end mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={() => setSelectedService(null)}
                  className="bg-gold hover:bg-gold/90 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Close
                </button>
              </motion.div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Services;