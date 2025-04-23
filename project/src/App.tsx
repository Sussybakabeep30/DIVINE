  import { supabase } from './lib/supabase';
  import { useState,useEffect } from 'react';
  import { Session, AuthChangeEvent } from "@supabase/supabase-js";
  import Navbar from './components/Navbar';
  import Hero from './components/Hero';
  import WhyChooseUs from './components/WhyChooseUs';
  import Services from './components/Services';
  import Booking from './components/Booking';
  import  Auth  from './components/Auth.tsx';
  import Planner from './components/Planner.tsx';
  import CharDhamYatraFlowchart from './components/char-dham-yatra-flowchart.tsx';


  function App() {
    const [session, setSession] = useState<Session|null>(null);
    
    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
        setSession(session);
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event:AuthChangeEvent, session:Session | null) => {
        setSession(session);
      });

      return () => subscription.unsubscribe();
    }, []);

    if (!session) {
      return <Auth onAuthSuccess={()=>{}}/>;
    }
    return (
      <div className="min-h-screen bg-soft-white dark:bg-dark-bg">
        <Navbar />
        <Hero />
        <WhyChooseUs />
        <Services />
        <Booking />
        <Planner />
        {/* <CharDhamYatraFlowchart/ > */}
      </div>
    );
  }

  export default App