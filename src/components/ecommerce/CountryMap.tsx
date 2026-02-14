// react plugin for creating vector maps
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";

// Define the component props
interface CountryMapProps {
  mapColor?: string;
}

const CountryMap: React.FC<CountryMapProps> = ({ mapColor = "#E5E7EB" }) => {
  // Modern banking institution color scheme
  const primaryColor = "#2563EB"; // Blue - Revolut style
  const secondaryColor = "#7C3AED"; // Purple - Wise style
  const accentColor = "#059669"; // Green - N26 style
  const highlightColor = "#F59E0B"; // Amber - Monzo style
  
  // Enhanced markers with banking data
  const bankingMarkers = [
    {
      latLng: [37.2580397, -104.657039],
      name: "United States",
      style: { fill: primaryColor, borderWidth: 2, borderColor: "white", r: 6 },
      data: { users: "2.1k+", growth: "+45%", tier: "Premium" }
    },
    {
      latLng: [20.7504374, 73.7276105],
      name: "India",
      style: { fill: secondaryColor, borderWidth: 2, borderColor: "white", r: 7 },
      data: { users: "1.5k+", growth: "+68%", tier: "Growth" }
    },
    {
      latLng: [53.613, -11.6368],
      name: "United Kingdom",
      style: { fill: accentColor, borderWidth: 2, borderColor: "white", r: 5 },
      data: { users: "850+", growth: "+32%", tier: "Premium" }
    },
    {
      latLng: [60.1282, 18.6435],
      name: "Sweden",
      style: { fill: highlightColor, borderWidth: 2, borderColor: "white", r: 5 },
      data: { users: "420+", growth: "+55%", tier: "Elite" }
    },
    {
      latLng: [46.8182, 8.2275],
      name: "Switzerland",
      style: { fill: "#DC2626", borderWidth: 2, borderColor: "white", r: 4 },
      data: { users: "180+", growth: "+28%", tier: "Private" }
    },
    {
      latLng: [23.6345, -102.5528],
      name: "Mexico",
      style: { fill: primaryColor, borderWidth: 2, borderColor: "white", r: 6 },
      data: { users: "320+", growth: "+72%", tier: "Growth" }
    },
    {
      latLng: [-25.2744, 133.7751],
      name: "Australia",
      style: { fill: accentColor, borderWidth: 2, borderColor: "white", r: 5 },
      data: { users: "510+", growth: "+38%", tier: "Premium" }
    },
    {
      latLng: [9.0820, 8.6753],
      name: "Nigeria",
      style: { fill: secondaryColor, borderWidth: 2, borderColor: "white", r: 6 },
      data: { users: "890+", growth: "+120%", tier: "Emerging" }
    },
    {
      latLng: [35.8617, 104.1954],
      name: "China",
      style: { fill: "#EA580C", borderWidth: 2, borderColor: "white", r: 7 },
      data: { users: "1.2k+", growth: "+52%", tier: "Enterprise" }
    },
    {
      latLng: [61.9241, 25.7482],
      name: "Finland",
      style: { fill: highlightColor, borderWidth: 2, borderColor: "white", r: 4 },
      data: { users: "210+", growth: "+41%", tier: "Premium" }
    }
  ];

  // Enhanced region styling with gradients and hover effects
  const regionStyle = {
    initial: {
      fill: mapColor,
      fillOpacity: 1,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      stroke: "white",
      strokeWidth: 0.5,
      strokeOpacity: 0.3,
      transition: "all 0.3s ease",
      cursor: "default"
    },
    hover: {
      fillOpacity: 0.85,
      cursor: "pointer",
      fill: "#2563EB",
      stroke: "#1D4ED8",
      strokeWidth: 1.5,
      strokeOpacity: 0.7,
      filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))",
      transform: "scale(1.01)"
    },
    selected: {
      fill: "#2563EB",
      fillOpacity: 0.9,
      stroke: "#1D4ED8",
      strokeWidth: 2,
      strokeOpacity: 0.8
    },
    selectedHover: {
      fill: "#1D4ED8",
      fillOpacity: 0.95
    }
  };

  // Enhanced marker styling with banking-inspired design
  const markerStyle = {
    initial: {
      fill: "#2563EB",
      stroke: "white",
      strokeWidth: 2,
      strokeOpacity: 0.9,
      r: 5,
      cursor: "pointer",
      filter: "drop-shadow(0px 2px 4px rgba(37, 99, 235, 0.3))",
      transition: "all 0.2s ease"
    },
    hover: {
      fill: "#1D4ED8",
      r: 7,
      strokeWidth: 3,
      filter: "drop-shadow(0px 4px 8px rgba(37, 99, 235, 0.4))",
      transform: "scale(1.1)"
    },
    selected: {
      fill: "#7C3AED",
      stroke: "#6D28D9",
      strokeWidth: 3,
      r: 8,
      filter: "drop-shadow(0px 6px 12px rgba(124, 58, 237, 0.5))"
    }
  } as any;

  // Enhanced label styling
  const regionLabelStyle = {
    initial: {
      fill: "#374151",
      fontWeight: 600,
      fontSize: "12px",
      stroke: "white",
      strokeWidth: 0,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      pointerEvents: "none"
    },
    hover: {
      fill: "#1F2937",
      fontWeight: 700,
      fontSize: "13px",
      cursor: "pointer"
    },
    selected: {
      fill: "#1D4ED8",
      fontWeight: 700
    }
  };

  // Handle marker click with banking context
  const handleMarkerClick = (event: any, index: number) => {
    const marker = bankingMarkers[index];
    console.log(`📊 Banking Data - ${marker.name}:`, marker.data);
    // In a real app, you might:
    // 1. Show a detailed modal with financial metrics
    // 2. Update a sidebar with market analytics
    // 3. Navigate to country-specific dashboard
    // 4. Trigger analytics events
  };

  // Handle region selection with banking context
  const handleRegionSelected = (regions: string[]) => {
    if (regions.length > 0) {
      console.log(`🌍 Selected banking region: ${regions[0]}`);
      // Could trigger:
      // - Market analysis fetch
      // - Regional transaction data
      // - Currency exchange rates
      // - Regulatory compliance info
    }
  };

  return (
    <div className="relative w-full h-full">
      <VectorMap
        map={worldMill}
        backgroundColor="transparent"
        markerStyle={markerStyle}
        markersSelectable={true}
        selectedMarkers={[]}
        markers={bankingMarkers.map(marker => ({
          ...marker,
          style: {
            ...marker.style,
            cursor: "pointer"
          }
        }))}
        onMarkerTipShow={(event, tip, index) => {
          const marker = bankingMarkers[index];
          tip.html(`
            <div class="p-2 min-w-[200px] bg-white rounded-lg shadow-xl border border-gray-200">
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-bold text-gray-900 text-sm">${marker.name}</h4>
                <span class="px-2 py-1 text-xs font-semibold rounded-full ${
                  marker.data.tier === 'Premium' || marker.data.tier === 'Elite' || marker.data.tier === 'Private' 
                    ? 'bg-purple-100 text-purple-800' 
                    : marker.data.tier === 'Growth' || marker.data.tier === 'Emerging'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-amber-100 text-amber-800'
                }">
                  ${marker.data.tier}
                </span>
              </div>
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs text-gray-600">Active Users</span>
                  <span class="font-semibold text-gray-900">${marker.data.users}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-gray-600">YoY Growth</span>
                  <span class="font-semibold text-green-600">${marker.data.growth}</span>
                </div>
                <div class="pt-2 border-t border-gray-100">
                  <span class="text-xs text-gray-500">Click for analytics</span>
                </div>
              </div>
            </div>
          `);
        }}
        onMarkerClick={handleMarkerClick}
        zoomOnScroll={true}
        zoomMax={12}
        zoomMin={1}
        zoomAnimate={true}
        zoomStep={1.2}
        containerStyle={{
          width: "100%",
          height: "100%",
          borderRadius: "12px",
          overflow: "hidden"
        }}
        containerClassName="vector-map-container"
        regionStyle={regionStyle}
        onRegionSelected={handleRegionSelected}
        regionLabelStyle={regionLabelStyle}
        // Add visual effects
        visualMap={{
          show: false,
          // You can enable this for heatmap visualization
          // min: 0,
          // max: 1000,
          // text: ['High', 'Low'],
          // calculable: true,
          // inRange: {
          //   color: ['#DBEAFE', '#2563EB', '#1E40AF']
          // }
        }}
        // Add panning controls
        panOnDrag={true}
        focusOn={{
          x: 0.5,
          y: 0.5,
          scale: 1.1
        }}
        lineStyle={{
          stroke: "#9CA3AF",
          strokeWidth: 0.5,
          strokeOpacity: 0.3
        }}
        // Add tooltip styling
        bindToTouch={true}
        bindToMouse={true}
        // Add responsive behavior
        responsive={true}
      />
      
      {/* Modern banking UI overlay elements */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm border border-gray-200">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#2563EB]"></div>
          <span className="text-xs text-gray-700">Premium Markets</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#7C3AED]"></div>
          <span className="text-xs text-gray-700">Growth Markets</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#059669]"></div>
          <span className="text-xs text-gray-700">Established</span>
        </div>
      </div>
      
      {/* Zoom controls inspired by banking apps */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <button 
          className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all border border-gray-200"
          onClick={() => {
            const mapContainer = document.querySelector('.vector-map-container') as HTMLElement;
            // You would typically access the map instance here
            console.log('Zoom in - Banking map');
          }}
          aria-label="Zoom in"
        >
          <span className="text-gray-700 font-bold text-lg">+</span>
        </button>
        <button 
          className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all border border-gray-200"
          onClick={() => {
            console.log('Zoom out - Banking map');
          }}
          aria-label="Zoom out"
        >
          <span className="text-gray-700 font-bold text-lg">−</span>
        </button>
      </div>
    </div>
  );
};

export default CountryMap;
