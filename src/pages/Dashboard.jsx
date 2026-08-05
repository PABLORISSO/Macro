import InflationSection from "../components/sections/InflationSection";
import ExchangeRateSection from "../components/sections/ExchangeRateSection";
import ReserveSection from "../components/sections/ReserveSection";
import IPIMSection from "../components/sections/IpimSection";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard macroeconómico</h1>

      <div className="dashboard-grid">
        <InflationSection />
        <ExchangeRateSection />
        <ReserveSection />
        <IPIMSection />
      </div>
    </div>
  );
}

export default Dashboard;