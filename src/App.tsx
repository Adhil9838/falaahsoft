import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import './App.css';
import EngineeringFramework from './components/EngineeringFramework';
import CardViewSection from './components/CardViewSection';
import OurApproach from './components/OurApproach';
function App() {
  useEffect(() => {
    document.documentElement.classList.add('hide-scrollbar');
    document.body.classList.add('hide-scrollbar');

    return () => {
      document.documentElement.classList.remove('hide-scrollbar');
      document.body.classList.remove('hide-scrollbar');
    };
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <EngineeringFramework/>
      <CardViewSection/>
      <OurApproach/>
    </>
  );
}

export default App;