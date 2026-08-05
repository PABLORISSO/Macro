import InflacionNucleoSection from "../components/sections/InflacionNucleoSection";
import MapaInflacionSection from "../components/sections/MapaInflacionSection";
function Home() {
  return (
    <div>
      <h1>Dashboard macroeconómico</h1>
      <InflacionNucleoSection />
      <MapaInflacionSection /> 
    </div>
  );
}

export default Home;