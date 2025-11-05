import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import PCConfigurator from './components/PCConfigurator';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <Hero3D />
      <PCConfigurator />
      <Footer />
    </div>
  );
}

export default App;
