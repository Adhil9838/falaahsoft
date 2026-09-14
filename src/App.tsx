import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import './App.css';
import EngineeringFramework from './components/EngineeringFramework';
import CardViewSection from './components/CardViewSection';
import OurApproach from './components/OurApproach';
import ServicesSection from './components/ServicesSection';
import Product from './components/Product';
import HowToDevelopProject from './components/HowToDevelopProject';
import HealthcareManagement from './navbar/HealthcareManagement';
import RetailManagement from './navbar/RetailManagement';
import FinanceBankingPage from './navbar/FinanceBankingPage';
import EducationManagement from './navbar/EducationManagement';
import Logistics from './navbar/LogisticsPage';
function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <Product />
      <HowToDevelopProject />
      <EngineeringFramework />
      <CardViewSection />
      <OurApproach />
    </>
  );
}

function App() {
  return (
    <>
      {/* Global Header – visible on every route */}
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/industries/healthcare" element={<HealthcareManagement />} />
        <Route path="/industries/retail" element={<RetailManagement />} />
        <Route path="/industries/finance-banking" element={<FinanceBankingPage />} />
        <Route path="/industries/education" element={<EducationManagement />} />
        <Route path="/industries/logistics" element={<Logistics />} />

      </Routes>
    </>
  );
}

export default App;