import { useEffect, useState } from 'react';
import Calculator from './components/Calculator/Calculator';
import MobileShare from './components/share/MobileShare';
import TabShare from './components/share/TabShare';

function App() {
    const [deviceType, setDeviceType] = useState<"big" | "small">("big");


  useEffect(() => {
    const handleResize = () => {
        setDeviceType(window.innerWidth < 1024 ? "small" : "big");
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
    {deviceType === "small" ? <MobileShare /> : <TabShare />}
      <Calculator />
    </div>
  );
}

export default App;