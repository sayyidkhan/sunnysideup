import { useState } from 'react';
import { useMap } from 'react-leaflet';
import { Input, Button, Tooltip } from "@nextui-org/react";
import { IoSearchOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoGridOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoAddOutline } from "react-icons/io5";
import { IoRemoveOutline } from "react-icons/io5";
import { DEBUG_CONFIG, MAP_CONFIG } from '../../constants/data';
import { createPortal } from 'react-dom';

export const SearchIcon = () => <IoSearchOutline className="text-white text-xl" />;

function MapZoomControl() {
  const map = useMap();

  return (
    <div className="flex gap-1">
      <Tooltip 
        content="Zoom In"
        placement="bottom"
        delay={0}
        closeDelay={0}
        classNames={{
          content: [
            "py-1 px-2 shadow-xl text-xs",
            "text-white bg-default-600/90",
            "rounded-lg"
          ],
        }}
      >
        <Button
          isIconOnly
          radius="full"
          variant="flat"
          className="bg-white/90 backdrop-blur-xl shadow-xl min-w-10 h-10"
          onClick={() => map.zoomIn()}
        >
          <IoAddOutline className="text-xl" />
        </Button>
      </Tooltip>
      <Tooltip 
        content="Zoom Out"
        placement="bottom"
        delay={0}
        closeDelay={0}
        classNames={{
          content: [
            "py-1 px-2 shadow-xl text-xs",
            "text-white bg-default-600/90",
            "rounded-lg"
          ],
        }}
      >
        <Button
          isIconOnly
          radius="full"
          variant="flat"
          className="bg-white/90 backdrop-blur-xl shadow-xl min-w-10 h-10"
          onClick={() => map.zoomOut()}
        >
          <IoRemoveOutline className="text-xl" />
        </Button>
      </Tooltip>
    </div>
  );
}

export function RightSideIcons({ toggleDashboard, showDashboard }) {
  const debugStyles = DEBUG_CONFIG.SHOW_CLICK_BOUNDARIES_FOR_RIGHT_SIDE_ICONS ? {
    border: '2px dashed red',
    backgroundColor: 'rgba(255, 0, 0, 0.15)',
  } : {};

  return (
    <div className="relative">
      {/* Desktop debug visualization layer */}
      <div 
        className="absolute md:block hidden pointer-events-none" 
        style={{ 
          borderRadius: '30px',
          position: 'absolute',
          width: '180px',  // Width to cover 3 buttons + gaps
          height: '80px',  // Height to cover buttons + padding
          left: '-16px',   // Negative margin to extend left
          top: '-16px',    // Negative margin to extend top
          right: '-16px',  // Extend right
          bottom: '-16px', // Extend bottom
          zIndex: 9996,
          ...debugStyles
        }} 
      />
      {/* Mobile debug visualization layer */}
      <div 
        className="fixed md:hidden block pointer-events-none" 
        style={{ 
          borderRadius: '50px',  // Match the mobile UI's border radius
          width: '180px',
          height: '90px',
          right: '-6px',
          bottom: '10px',
          zIndex: 9996,
          padding: '8px',
          ...debugStyles
        }} 
      />
      <div className="flex gap-2 right-side-icons relative z-[9998]">
        {/* bell icon */}
        <Button
          isIconOnly
          radius="full"
          variant="flat"
          className="bg-white/90 backdrop-blur-xl shadow-xl min-w-10 h-10"
        >
          <IoNotificationsOutline className="text-xl text-default-600" />
        </Button>
        {/* dashboard toggle button */}
        <Tooltip 
          content={showDashboard ? "Hide Main Dashboard" : "Show Main Dashboard"}
          placement="bottom"
          delay={0}
          closeDelay={0}
          classNames={{
            content: [
              "py-1 px-2 shadow-xl text-xs",
              "text-white bg-default-600/90",
              "rounded-lg"
            ],
          }}
        >
          <Button
            isIconOnly
            radius="full"
            variant="flat"
            className={`bg-white/90 backdrop-blur-xl shadow-xl min-w-10 h-10 transition-transform ${showDashboard ? 'bg-opacity-100' : 'bg-opacity-75'}`}
            onClick={toggleDashboard}
          >
            <IoGridOutline className="text-xl text-default-600" />
          </Button>
        </Tooltip>
        {/* user icon */}
        <Tooltip 
          content="Reset Map View" 
          placement="bottom"
          delay={0}
          closeDelay={0}
          classNames={{
            content: [
              "py-1 px-2 shadow-xl text-xs",
              "text-white bg-default-600/90",
              "rounded-lg"
            ],
          }}
        >
          <Button
            isIconOnly
            radius="full"
            variant="flat"
            className="bg-white/90 backdrop-blur-xl shadow-xl min-w-10 h-10"
            onClick={() => {
              const map = window.leafletMap;
              if (map) {
                map.setView(MAP_CONFIG.DEFAULT_CENTER, MAP_CONFIG.DEFAULT_ZOOM);
              }
            }}
          >
            <IoPersonOutline className="text-xl text-default-600" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}

export function SearchBarAndZoomControls({ toggleDashboard, showDashboard, setShowSiteDetails, setSelectedLocation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const map = useMap();

  // Mock data for suggestions - replace this with your actual data source
  const mockLocations = [
    "Ang Mo Kio",
    "Bedok",
    "Bishan",
    "Boon Lay",
    "Bukit Batok",
    "Bukit Merah",
    "Bukit Panjang",
    "Bukit Timah",
    "Central Water Catchment",
    "Changi",
    "Choa Chu Kang",
    "Clementi",
    "City",
    "Geylang",
    "Hougang",
    "Jalan Bahar",
    "Jurong East",
    "Jurong Island",
    "Jurong West",
    "Kallang",
    "Lim Chu Kang",
    "Mandai",
    "Marine Parade",
    "Novena",
    "Pasir Ris",
    "Paya Lebar",
    "Pioneer",
    "Pulau Tekong",
    "Pulau Ubin",
    "Punggol",
    "Queenstown",
    "Seletar",
    "Sembawang",
    "Sengkang",
    "Sentosa",
    "Serangoon",
    "Southern Islands",
    "Sungei Kadut",
    "Tampines",
    "Tanglin",
    "Tengah",
    "Toa Payoh",
    "Tuas",
    "Western Islands",
    "Western Water Catchment",
    "Woodlands",
    "Yishun"
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsOpen(false);
      // Find the matching location from mockLocations
      const selectedLocation = mockLocations.find(
        location => location.toLowerCase() === searchQuery.toLowerCase()
      );
      
      if (selectedLocation) {
        // Create a location object similar to what's used in markers
        const locationData = {
          locationName: selectedLocation,
          lat: MAP_CONFIG.DEFAULT_CENTER[0], // Using default center for now
          lng: MAP_CONFIG.DEFAULT_CENTER[1], // Using default center for now
        };
        
        // Update selected location and show details
        setSelectedLocation(locationData);
        setShowSiteDetails(true);
        // Clear search after successful search
        setSearchQuery("");
      } else {
        // Removed toast notification code
      }
    }
  };

  const highlightText = (text, query) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="font-semibold bg-[#FFD700]/30 text-[#FFD700]">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  const handleInputChange = (value) => {
    setSearchQuery(value);
    // If search query is empty, hide dropdown
    if (!value.trim()) {
      setIsOpen(false);
      setSuggestions([]);
      return;
    }
    // Filter locations and capitalize each word
    const filtered = mockLocations.filter(location =>
      location.toLowerCase().includes(value.toLowerCase())
    ).map(location => 
      location.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(' ')
    );
    setSuggestions(filtered);
    setIsOpen(filtered.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    // Create a location object similar to what's used in markers
    const locationData = {
      locationName: suggestion,
      lat: MAP_CONFIG.DEFAULT_CENTER[0], // Using default center for now
      lng: MAP_CONFIG.DEFAULT_CENTER[1], // Using default center for now
    };
    
    // Update selected location and show details
    setSelectedLocation(locationData);
    setShowSiteDetails(true);
    
    // Clear the search field and suggestions
    setSearchQuery("");
    setSuggestions([]);
    setIsOpen(false);
  };

  return (
    <>
      <div
        className="absolute top-2 md:top-4 left-1/2 -translate-x-1/2 z-[999] w-full max-w-2xl px-2 sm:px-4"
        style={{ position: 'fixed' }}
      >
        <div className="search-controls-container flex flex-nowrap gap-1 sm:gap-2 items-center rounded-full py-2 px-3">
          <MapZoomControl />
          <div className="relative flex-1">
            <Input
              value={searchQuery}
              onValueChange={handleInputChange}
              classNames={{
                base: "w-full search-input-wrapper",
                inputWrapper: "bg-transparent shadow-none hover:!bg-transparent h-11 focus-within:ring-2 focus-within:ring-blue-500",
                input: "text-base px-4"
              }}
              radius="full"
              placeholder="Search"
              endContent={
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  className="hover:bg-default-100"
                  onClick={handleSearch}
                >
                  <SearchIcon />
                </Button>
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              variant="bordered"
            />
            {isOpen && suggestions.length > 0 && createPortal(
              <div 
                className="fixed bg-[#8392C8]/90 backdrop-blur-xl shadow-xl rounded-2xl max-h-60 overflow-auto z-[998]"
                style={{
                  width: document.querySelector('.search-input-wrapper')?.getBoundingClientRect().width,
                  top: document.querySelector('.search-input-wrapper')?.getBoundingClientRect().bottom + 8,
                  left: document.querySelector('.search-input-wrapper')?.getBoundingClientRect().left,
                }}
              >
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-[#95A3D3] cursor-pointer text-base text-white"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {highlightText(suggestion, searchQuery)}
                  </div>
                ))}
              </div>,
              document.body
            )}
          </div>
          <div className="hidden md:block">
            <RightSideIcons toggleDashboard={toggleDashboard} showDashboard={showDashboard} />
          </div>
        </div>
      </div>
      {createPortal(
        <div className="block md:hidden fixed bottom-4 right-4 z-[999]">
          <div className="flex gap-2 bg-[#8392C8]/90 backdrop-blur-xl rounded-full py-2 px-4 shadow-xl">
            <Button
              isIconOnly
              radius="full"
              variant="light"
              className="text-white min-w-10 h-10 shadow-lg hover:shadow-xl transition-shadow border border-white/20"
            >
              <IoNotificationsOutline className="text-xl" />
            </Button>
            <Button
              isIconOnly
              radius="full"
              variant="light"
              className="text-white min-w-10 h-10 shadow-lg hover:shadow-xl transition-shadow border border-white/20"
              onClick={toggleDashboard}
            >
              <IoGridOutline className="text-xl" />
            </Button>
            <Button
              isIconOnly
              radius="full"
              variant="light"
              className="text-white min-w-10 h-10 shadow-lg hover:shadow-xl transition-shadow border border-white/20"
              onClick={() => {
                const map = window.leafletMap;
                if (map) {
                  map.setView(MAP_CONFIG.DEFAULT_CENTER, MAP_CONFIG.DEFAULT_ZOOM);
                }
              }}
            >
              <IoPersonOutline className="text-xl" />
            </Button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}