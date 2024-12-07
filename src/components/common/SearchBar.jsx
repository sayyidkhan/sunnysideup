import { useState } from 'react';
import { useMap } from 'react-leaflet';
import { Input, Button } from "@nextui-org/react";
import { IoSearchOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoGridOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoAddOutline } from "react-icons/io5";
import { IoRemoveOutline } from "react-icons/io5";
import { DEBUG_CONFIG } from '../../constants/data';
import { createPortal } from 'react-dom';

export const SearchIcon = () => <IoSearchOutline className="text-white text-xl" />;

function MapZoomControl() {
  const map = useMap();

  return (
    <div className="flex gap-1">
      <Button
        isIconOnly
        radius="full"
        variant="flat"
        className="bg-white/90 backdrop-blur-xl shadow-xl min-w-10 h-10"
        onClick={() => map.zoomIn()}
      >
        <IoAddOutline className="text-xl" />
      </Button>
      <Button
        isIconOnly
        radius="full"
        variant="flat"
        className="bg-white/90 backdrop-blur-xl shadow-xl min-w-10 h-10"
        onClick={() => map.zoomOut()}
      >
        <IoRemoveOutline className="text-xl" />
      </Button>
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
          <IoNotificationsOutline className="text-xl" />
        </Button>
        {/* dashboard icon */}
        <Button
          isIconOnly
          radius="full"
          variant="flat"
          className={`bg-white/90 backdrop-blur-xl shadow-xl min-w-10 h-10 transition-transform ${showDashboard ? 'bg-opacity-100' : 'bg-opacity-75'}`}
          onClick={toggleDashboard}
        >
          <IoGridOutline className="text-xl" />
        </Button>
        {/* user icon */}
        <Button
          isIconOnly
          radius="full"
          variant="flat"
          className="bg-white/90 backdrop-blur-xl shadow-xl min-w-10 h-10"
        >
          <IoPersonOutline className="text-xl" />
        </Button>
      </div>
    </div>
  );
}

export function SearchBarAndZoomControls({ toggleDashboard, showDashboard }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const map = useMap();

  // Mock data for suggestions - replace this with your actual data source
  const mockLocations = [
    "New York, USA",
    "London, UK",
    "Tokyo, Japan",
    "Paris, France",
    "Sydney, Australia"
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      setIsOpen(false);
      // Here you can add your search logic
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
    if (value.trim()) {
      // Filter suggestions based on input
      const filtered = mockLocations.filter(location =>
        location.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
    setIsOpen(false);
    handleSearch();
  };

  return (
    <div
      className="absolute top-2 md:top-4 left-1/2 -translate-x-1/2 z-[2000] w-full max-w-2xl px-2 sm:px-4"
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
              className="fixed bg-[#8392C8]/90 backdrop-blur-xl shadow-xl rounded-2xl max-h-60 overflow-auto z-[9999]"
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
        <div className="desktop-icons">
          <RightSideIcons toggleDashboard={toggleDashboard} showDashboard={showDashboard} />
        </div>
      </div>
    </div>
  );
}