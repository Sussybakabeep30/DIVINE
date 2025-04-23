import React, { useState, useEffect } from 'react';
import { Sun, Moon, Droplet, Wind, Thermometer, Info, Award, MapPin, Clock, Car, Home, Map, CalendarDays, Hotel, AlertTriangle, Coffee, Mountain, Eye } from 'lucide-react';

const CharDhamYatraFlowchart = () => {
  // Animation state
  const [animate, setAnimate] = useState(false);
  const [carPosition, setCarPosition] = useState(0);
  const [activeDayInfo, setActiveDayInfo] = useState(null);

  // Colors
  const colors = {
    royalGreen: '#1a513a',
    lightGreen: '#2a6e50',
    beige: '#f5e8c9',
    darkBeige: '#e6d6b5',
    gold: '#d4af37',
    blue: '#3a7ca5',
    red: '#9a3548',
    yellow: '#f0c869',
  };

  // Day data
  const daysData = [
    {
      day: 1,
      from: 'Haridwar',
      to: 'Barkot',
      distance: '180 km',
      time: '6-7 hrs',
      accommodation: [
        { name: 'GMVN Tourist Rest House', type: 'Budget' },
        { name: 'Hotel Devlok', type: 'Mid-Range' },
        { name: 'Yamuna River Retreat', type: 'Luxury' }
      ],
      sightseeing: [
        { name: 'Har Ki Pauri', icon: <MapPin size={14} /> },
        { name: 'Kempty Falls', icon: <Droplet size={14} /> }
      ],
      tips: [
        'Start early to avoid mountain traffic',
        'Carry motion sickness medication'
      ]
    },
    {
      day: 2,
      from: 'Barkot',
      to: 'Yamunotri and back to Barkot',
      distance: '36 km drive + 6 km trek',
      time: '8-9 hrs (round trip)',
      accommodation: [
        { name: 'Same hotel as previous night', type: 'Same as Day 1' }
      ],
      sightseeing: [
        { name: 'Yamunotri Temple', icon: <Home size={14} /> },
        { name: 'Surya Kund', icon: <Sun size={14} /> },
        { name: 'Divya Shila', icon: <Mountain size={14} /> }
      ],
      tips: [
        'Arrange for walking sticks and ponies in advance',
        'Carry light snacks and water for the trek'
      ]
    },
    {
      day: 3,
      from: 'Barkot',
      to: 'Uttarkashi',
      distance: '90 km',
      time: '4-5 hrs',
      accommodation: [
        { name: 'GMVN Tourist Rest House', type: 'Budget' },
        { name: 'Hotel Shivlinga', type: 'Mid-Range' },
        { name: 'Himalayan Eco Lodge', type: 'Luxury' }
      ],
      sightseeing: [
        { name: 'Vishwanath Temple', icon: <Home size={14} /> },
        { name: 'Kuteti Devi Temple', icon: <Home size={14} /> }
      ],
      tips: [
        'Visit the local market for woolen clothes if needed',
        'Get permits for Gangotri'
      ]
    },
    {
      day: 4,
      from: 'Uttarkashi',
      to: 'Gangotri and back to Uttarkashi',
      distance: '100 km one way',
      time: '8-9 hrs (round trip)',
      accommodation: [
        { name: 'Same hotel as previous night', type: 'Same as Day 3' }
      ],
      sightseeing: [
        { name: 'Gangotri Temple', icon: <Home size={14} /> },
        { name: 'Harsil Valley', icon: <Mountain size={14} /> },
        { name: 'Bhagirathi River', icon: <Droplet size={14} /> }
      ],
      tips: [
        'Take a holy dip in Gangotri (weather permitting)',
        'Carry warm clothes as Gangotri is colder'
      ]
    },
    {
      day: 5,
      from: 'Uttarkashi',
      to: 'Guptkashi',
      distance: '220 km',
      time: '9-10 hrs',
      accommodation: [
        { name: 'GMVN Tourist Rest House', type: 'Budget' },
        { name: 'Kedar River Resort', type: 'Mid-Range' },
        { name: 'Sarovar Portico', type: 'Luxury' }
      ],
      sightseeing: [
        { name: 'Tehri Dam', icon: <Droplet size={14} /> },
        { name: 'Kalimath Temple', icon: <Home size={14} /> }
      ],
      tips: [
        'Long journey - take frequent breaks',
        'Book Kedarnath trek ponies/palanquins in advance'
      ]
    },
    {
      day: 6,
      from: 'Guptkashi',
      to: 'Kedarnath',
      distance: '30 km drive + 16 km trek',
      time: '8-10 hrs',
      accommodation: [
        { name: 'GMVN Tourist Rest House', type: 'Budget' },
        { name: 'Dharmshala', type: 'Budget' },
        { name: 'Luxury Tents', type: 'Mid-Range' }
      ],
      sightseeing: [
        { name: 'Kedarnath Temple', icon: <Home size={14} /> },
        { name: 'Bhairavnath Temple', icon: <Home size={14} /> },
        { name: 'Gandhi Sarovar', icon: <Droplet size={14} /> }
      ],
      tips: [
        'Alternative: Helicopter service available (book in advance)',
        'Start trek early to reach before sunset',
        'Carry adequate winter clothing'
      ]
    },
    {
      day: 7,
      from: 'Kedarnath',
      to: 'Guptkashi',
      distance: '16 km trek + 30 km drive',
      time: '7-8 hrs',
      accommodation: [
        { name: 'Same hotel as Day 5', type: 'Same as Day 5' }
      ],
      sightseeing: [
        { name: 'Morning Aarti at Kedarnath', icon: <Sun size={14} /> },
        { name: 'Triyuginarayan Temple (optional)', icon: <Home size={14} /> }
      ],
      tips: [
        'Start descent early to avoid afternoon rain',
        'Keep knee support if needed for the trek down'
      ]
    },
    {
      day: 8,
      from: 'Guptkashi',
      to: 'Badrinath',
      distance: '200 km',
      time: '9-10 hrs',
      accommodation: [
        { name: 'GMVN Tourist Rest House', type: 'Budget' },
        { name: 'Hotel Sarovar Portico', type: 'Mid-Range' },
        { name: 'Narayan Palace', type: 'Luxury' }
      ],
      sightseeing: [
        { name: 'Chopta (en route)', icon: <Mountain size={14} /> },
        { name: 'Joshimath (en route)', icon: <MapPin size={14} /> }
      ],
      tips: [
        'Road conditions may be challenging',
        'Altitude increases significantly - acclimatize properly'
      ]
    },
    {
      day: 9,
      from: 'Badrinath',
      to: 'Rudraprayag',
      distance: '160 km',
      time: '7-8 hrs',
      accommodation: [
        { name: 'GMVN Tourist Rest House', type: 'Budget' },
        { name: 'Hotel Monal', type: 'Mid-Range' },
        { name: 'Alaknanda River Resort', type: 'Luxury' }
      ],
      sightseeing: [
        { name: 'Badrinath Temple', icon: <Home size={14} /> },
        { name: 'Mana Village', icon: <MapPin size={14} /> },
        { name: 'Vasudhara Falls', icon: <Droplet size={14} /> },
        { name: 'Tapt Kund', icon: <Thermometer size={14} /> }
      ],
      tips: [
        'Visit Mana (last Indian village) before departing',
        'Attend morning aarti at Badrinath if possible'
      ]
    },
    {
      day: 10,
      from: 'Rudraprayag',
      to: 'Haridwar',
      distance: '165 km',
      time: '6-7 hrs',
      accommodation: [
        { name: 'GMVN Tourist Rest House', type: 'Budget' },
        { name: 'Hotel Haveli Hari Ganga', type: 'Mid-Range' },
        { name: 'Radisson Blu', type: 'Luxury' }
      ],
      sightseeing: [
        { name: 'Rudraprayag Sangam', icon: <Droplet size={14} /> },
        { name: 'Devprayag (en route)', icon: <Droplet size={14} /> },
        { name: 'Triveni Ghat', icon: <Droplet size={14} /> }
      ],
      tips: [
        'Yatra completion ceremony at Haridwar',
        'Evening Ganga Aarti at Har Ki Pauri'
      ]
    }
  ];

  // Temple animation component
  const AnimatedTemple = ({ delay = 0 }) => {
    const [templeGlow, setTempleGlow] = useState(false);
    
    useEffect(() => {
      const interval = setInterval(() => {
        setTempleGlow(prev => !prev);
      }, 2000);
      
      return () => clearInterval(interval);
    }, []);
    
    return (
      <div className={`transition-all duration-1000 delay-${delay} ${animate ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
        <div className="relative">
          <div className="w-12 h-12 bg-beige rounded-t-lg mx-auto" />
          <div className="w-16 h-4 bg-gold rounded-t-lg mx-auto -mt-1" />
          <div className="w-8 h-8 bg-beige rounded-full mx-auto mt-1 flex items-center justify-center">
            <div className={`w-4 h-4 bg-gold rounded-full transition-all duration-500 ${templeGlow ? 'scale-150 opacity-70' : 'scale-100 opacity-100'}`} />
          </div>
        </div>
      </div>
    );
  };

  // Car animation component
  const AnimatedCar = () => {
    useEffect(() => {
      if (animate) {
        const interval = setInterval(() => {
          setCarPosition(prev => (prev < 100 ? prev + 1 : 0));
        }, 100);
        
        return () => clearInterval(interval);
      }
    }, [animate]);
    
    return (
      <div 
        className="absolute transition-all duration-300"
        style={{ 
          left: `${carPosition}%`, 
          transform: `translateX(-${carPosition}%)`,
          opacity: animate ? 1 : 0
        }}
      >
        <Car size={24} className="text-red" />
      </div>
    );
  };

  // Mountain animation component
  const AnimatedMountain = ({ height = 50, delay = 0 }) => {
    return (
      <div 
        className={`transition-all duration-1000 delay-${delay} ${animate ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
        style={{ height: `${height}px` }}
      >
        <div 
          className="bg-lightGreen rounded-t-3xl w-full h-full relative overflow-hidden"
          style={{
            clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)'
          }}
        >
          <div 
            className="absolute top-0 right-0 bg-white opacity-20 w-12 h-12"
            style={{
              clipPath: 'polygon(100% 0%, 0% 100%, 100% 100%)'
            }}
          />
          <div className="absolute bottom-0 w-full h-5 bg-darkBeige" />
        </div>
      </div>
    );
  };

  // Start animations when component mounts
  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="bg-beige p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
      {/* Header */}
      <div className={`text-center mb-6 transition-all duration-1000 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
        <h1 className="text-4xl font-bold text-royalGreen mb-2">Char Dham Yatra 2025</h1>
        <p className="text-lightGreen">Complete Road Route Map & Itinerary</p>
      </div>

      {/* Color Legend */}
      <div className={`flex flex-wrap justify-center gap-4 mb-6 transition-all duration-1000 delay-300 ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue rounded mr-2"></div>
          <span className="text-sm">Temples</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-lightGreen rounded mr-2"></div>
          <span className="text-sm">Accommodations</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red rounded mr-2"></div>
          <span className="text-sm">Road Routes</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow rounded mr-2"></div>
          <span className="text-sm">Travel Tips</span>
        </div>
      </div>

      {/* Mountains Background */}
      <div className="flex justify-between mb-4">
        <AnimatedMountain height={80} delay={100} />
        <AnimatedMountain height={60} delay={200} />
        <AnimatedMountain height={100} delay={300} />
        <AnimatedMountain height={70} delay={400} />
        <AnimatedMountain height={90} delay={500} />
      </div>

      {/* Flowchart Container */}
      <div className="relative">
        {/* Days Timeline */}
        {daysData.map((day, index) => (
          <div 
            key={day.day}
            className={`flex flex-col md:flex-row gap-4 mb-8 p-4 rounded-lg border-2 border-lightGreen bg-beige transition-all duration-1000 delay-${index * 100} ${animate ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
            onMouseEnter={() => setActiveDayInfo(day)}
            onMouseLeave={() => setActiveDayInfo(null)}
          >
            {/* Day Number Circle */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${index % 2 === 0 ? 'bg-royalGreen text-beige' : 'bg-gold text-royalGreen'} text-xl font-bold`}>
                Day {day.day}
              </div>
            </div>

            {/* Route Info */}
            <div className="flex-grow">
              <div className="flex items-center mb-2">
                <MapPin size={18} className="text-red mr-2" />
                <h3 className="text-lg font-semibold text-royalGreen">{day.from} → {day.to}</h3>
              </div>
              
              {/* Travel Details */}
              <div className="flex items-center mb-2">
                <div className="relative h-6 w-32 bg-red rounded-full mr-2 overflow-hidden">
                  <AnimatedCar />
                </div>
                <span className="text-sm">{day.distance}, {day.time}</span>
              </div>
              
              {/* Temple/Destination */}
              <div className="flex items-start gap-4 mb-4">
                {day.sightseeing.slice(0, 3).map((sight, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-blue bg-opacity-20 rounded-lg flex items-center justify-center mb-1">
                      {sight.name.includes('Temple') && <AnimatedTemple delay={i * 100} />}
                      {!sight.name.includes('Temple') && sight.icon}
                    </div>
                    <span className="text-xs text-center">{sight.name}</span>
                  </div>
                ))}
              </div>
              
              {/* Accommodation */}
              <div className="mb-2">
                <div className="flex items-center mb-1">
                  <Hotel size={16} className="text-lightGreen mr-2" />
                  <span className="text-sm font-semibold">Accommodation Options</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {day.accommodation.map((acc, i) => (
                    <div key={i} className="text-xs bg-lightGreen bg-opacity-20 px-2 py-1 rounded">
                      {acc.name} <span className="text-xs">({acc.type})</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Tips */}
              <div>
                <div className="flex items-center mb-1">
                  <AlertTriangle size={16} className="text-yellow mr-2" />
                  <span className="text-sm font-semibold">Travel Tips</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {day.tips.map((tip, i) => (
                    <div key={i} className="text-xs bg-yellow bg-opacity-20 px-2 py-1 rounded">
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Connecting Lines */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gold h-full hidden md:block" />

        {/* Active Day Info Popup */}
        {activeDayInfo && (
          <div className="fixed right-4 bottom-4 w-64 bg-white rounded-lg shadow-lg p-4 border-2 border-royalGreen z-10 animate-pulse">
            <h4 className="font-bold text-royalGreen">Day {activeDayInfo.day} Highlights</h4>
            <p className="text-sm">{activeDayInfo.from} → {activeDayInfo.to}</p>
            <div className="mt-2">
              <span className="text-xs font-bold">Must See:</span>
              <ul className="text-xs">
                {activeDayInfo.sightseeing.map((sight, i) => (
                  <li key={i} className="flex items-center mt-1">
                    <Eye size={12} className="mr-1" /> {sight.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Additional Travel Tips Section */}
      <div className={`mt-8 bg-royalGreen bg-opacity-10 rounded-lg p-4 transition-all duration-1000 delay-1000 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h3 className="text-xl font-bold text-royalGreen mb-2">Essential Travel Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <CalendarDays size={18} className="text-gold mr-2 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-royalGreen">Best Time to Visit</h4>
              <p className="text-sm">May to June and September to October. Avoid monsoon (July-August) due to landslides.</p>
            </div>
          </div>
          <div className="flex items-start">
            <Thermometer size={18} className="text-gold mr-2 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-royalGreen">Weather Conditions</h4>
              <p className="text-sm">Temperatures range from 7°C to 30°C. Carry layers and rain protection.</p>
            </div>
          </div>
          <div className="flex items-start">
            <Award size={18} className="text-gold mr-2 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-royalGreen">Permits Required</h4>
              <p className="text-sm">Biometric registration required for Kedarnath. ID proofs needed at all temples.</p>
            </div>
          </div>
          <div className="flex items-start">
            <Info size={18} className="text-gold mr-2 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-royalGreen">Alternative Options</h4>
              <p className="text-sm">Helicopter services available for Kedarnath and Badrinath. Book well in advance.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`mt-6 text-center text-xs text-royalGreen transition-all duration-1000 delay-1200 ${animate ? 'opacity-100' : 'opacity-0'}`}>
        <p>Char Dham Yatra 2025 | Created for pilgrims to plan their spiritual journey</p>
      </div>
    </div>
  );
};

export default CharDhamYatraFlowchart;
