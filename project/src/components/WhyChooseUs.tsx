import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Compass, Heart, Star, Users } from 'lucide-react';

const WhyChooseUs = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <Compass className="w-8 h-8 text-gold" />,
      title: "Seamless Char Dham Pilgrimage Planning",
      description: "Hassle-free yatra with comfortable stays, guided tours, and VIP darshans.",
    },
    {
      icon: <Heart className="w-8 h-8 text-gold" />,
      title: "Spiritual Destination Weddings",
      description: "Temple weddings, royal heritage celebrations, and eco-friendly Himalayan ceremonies.",
    },
    {
      icon: <Star className="w-8 h-8 text-gold" />,
      title: "Personalized Rituals & Festive Arrangements",
      description: "From Griha Pravesh pujas to Navratri & Diwali celebrations, we take care of everything.",
    },
    {
      icon: <Users className="w-8 h-8 text-gold" />,
      title: "Local Expertise & Authentic Experience",
      description: "Managed by professionals with deep spiritual knowledge.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
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
    <section id="why-us" className="section-padding bg-soft-white dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-deep-green dark:text-gold mb-6">
            Why Choose Divine Destinations?
          </h2>
          <p className="text-lg text-gray-600 dark:text-dark-text max-w-3xl mx-auto">
            Experience the perfect blend of spiritual guidance and modern comfort
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-yellow-100 dark:bg-dark-surface p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-deep-green/5 dark:bg-gold/10 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-deep-green dark:text-gold mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-dark-text">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;