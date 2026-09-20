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
import RealEstateManagement from "./navbar/RealEstateManagement";
import Manufacturing from './navbar/Manufacturing';
import CustomSoftware from './navbar/Whatwedo/CustomSoftware;';
import AI_MachineLearning from './navbar/Whatwedo/AI_MachineLearning';
import DataEngineering from './navbar/Whatwedo/DataEngineering';
import WebDevelopment from './navbar/Whatwedo/WebDevelopment';
import MobileAppDevelopment from './navbar/Whatwedo/MobileAppDevelopment';
import CloudDevOps from './navbar/Whatwedo/CloudDevOps';
import IoTSolutions from './navbar/Whatwedo/IoTSolutions';
import Blog from './navbar/insights/blog';
import TechnologyTrends from './navbar/insights/TechnologyTrends';
import AIInsights from './navbar/insights/AIInsights';
import CaseStudies from './navbar/insights/CaseStudies';
import WhitePaper from './navbar/insights/WhitePaper';
import SuccessStories from './navbar/insights/SuccessStories';
import Footer from './components/Footer';
import TrustedByGlobalClients from './components/TrustedByGlobalClients';
function HomePage() {
  return (
    <>
      <Hero />
      <TrustedByGlobalClients/>
      <ServicesSection />
      <EngineeringFramework />
      <Product />
      <HowToDevelopProject />
      
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
        {/* Industries */}
        <Route path="/industries/healthcare" element={<HealthcareManagement />} />
        <Route path="/industries/retail" element={<RetailManagement />} />
        <Route path="/industries/finance-banking" element={<FinanceBankingPage />} />
        <Route path="/industries/education" element={<EducationManagement />} />
        <Route path="/industries/logistics" element={<Logistics />} />
        <Route path="/industries/real-estate" element={<RealEstateManagement/>} />
        <Route path="/industries/manufacturing" element={<Manufacturing/>} />  
        {/* what-we-do */}
        <Route path="/what-we-do/custom-software-development" element={<CustomSoftware/>} /> 
        <Route path="/what-we-do/ai-machine-learning" element={<AI_MachineLearning/>} />
        <Route path="/what-we-do/data-engineering" element={<DataEngineering/>} />   
        <Route path="/what-we-do/web-development" element={<WebDevelopment/>} /> 
        <Route path="/what-we-do/mobile-development" element={<MobileAppDevelopment/>} />  
        <Route path="/what-we-do/cloud-devops" element={<CloudDevOps/>} />     
        <Route path="/what-we-do/iot-solutions" element={<IoTSolutions/>} />  
        {/* Insights */}
        <Route path="/insights/blogs" element={<Blog/>} />    
        <Route path="/insights/technology-trends" element={<TechnologyTrends/>} />   
        <Route path="/insights/ai-insights" element={<AIInsights/>} />   
        <Route path="/insights/case-studies" element={<CaseStudies/>} />   
        <Route path="/insights/white-papers" element={<WhitePaper/>} />   
        <Route path="/insights/success-stories" element={<SuccessStories/>} />
        {/* Solutions */}
        <Route path="/solutions/healthcare-platforms" element={<HealthcareManagement />} />
        <Route path="/industries/retail" element={<RetailManagement />} />
        <Route path="/solutions/digital-transformation" element={<FinanceBankingPage />} />
        <Route path="/industries/education" element={<EducationManagement />} />
        <Route path="/industries/logistics" element={<Logistics />} />
        <Route path="/industries/real-estate" element={<RealEstateManagement/>} />
        <Route path="/industries/manufacturing" element={<Manufacturing/>} />  
      </Routes> 
      <Footer/>
    </>
  );
}

export default App;