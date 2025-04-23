import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Hero = () => {
  const images = [
    'https://www.travelinindia.tours/UPLOAD/SLIDESHOW/198-rishikesh3.jpg',
    'https://wpblogassets.paytm.com/travelblog/uploads/2023/08/Places-to-Visit-in-Uttarakhand-HERO.jpg',
    'https://st.depositphotos.com/1915353/2831/i/450/depositphotos_28318093-stock-photo-sunrise-in-the-himalayas.jpg',
    'https://media.istockphoto.com/id/539105384/photo/kedarnath-in-india.jpg?s=612x612&w=0&k=20&c=0nK5I_7HUWn3VOuHyWxGc7_eJilZY1Wa975eA_FKdB8=',
    'https://st2.depositphotos.com/46710872/48944/i/450/depositphotos_489447144-stock-photo-beautiful-view-beautiful-panchachuli-peaks.jpg'
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Image Slideshow Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <img 
              src={images[currentIndex]} 
              alt={`Char Dham Yatra destination ${currentIndex + 1}`}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-4 md:px-8 lg:px-16">
        <motion.h1 
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Welcome to <br/>
          <div className='text-7xl'>Divine Destination</div>
        </motion.h1>
        
        <motion.h2 
          className="text-xl md:text-2xl lg:text-3xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Your Journey, Our Blessing!
        </motion.h2>
        
        <motion.p 
          className="max-w-2xl text-base md:text-lg lg:text-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Embark on the sacred Char Dham Yatra – a divine journey to the holiest shrines.
          Experience spiritual bliss, seamless planning, and a soul-enriching pilgrimage.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <a href = {'#booking'}>
          <motion.button 
            className="px-6 py-3 bg-yellow-600/60 hover:bg-yellow-700/70 rounded-md font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Your Yatra
          </motion.button></a>
          <a href = {'#booking'}>
          <motion.button 
            className="px-6 py-3 bg-transparent border-2 border-white hover:bg-white/20 rounded-md font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          > Know more
          </motion.button></a>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          animate={{ 
            y: [0, 12, 0],
            opacity: [1, 0.3, 1]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 2
          }}
          className="flex flex-col items-center text-white"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
          <span className="text-sm mt-2">Scroll Down</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;