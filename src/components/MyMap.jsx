import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Input, Button } from "@nextui-org/react";
import { SearchIcon } from './SearchIcon';
import { MAP_CONFIG } from '../constants/data';
import { useState } from 'react';
import { PerformanceContainer } from './PerformanceContainer';

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
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </Button>
      <Button 
        isIconOnly 
        radius="full" 
        variant="flat" 
        className="bg-white/90 backdrop-blur-xl shadow-xl min-w-10 h-10"
        onClick={() => map.zoomOut()}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </Button>
    </div>
  );
}

function RightSideIcons() {
  return (
    <div className="flex gap-2 right-side-icons">
      <Button
        isIconOnly
        radius="full"
        variant="flat"
        className="bg-white/90 backdrop-blur-xl shadow-xl min-w-10 h-10"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Button>
      <Button
        isIconOnly
        radius="full"
        variant="flat"
        className="bg-white/90 backdrop-blur-xl shadow-xl min-w-10 h-10"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4H10V10H4V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 4H20V10H14V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 14H10V20H4V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 14H20V20H14V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Button>
      <Button
        isIconOnly
        radius="full"
        variant="flat"
        className="bg-white/90 backdrop-blur-xl shadow-xl min-w-10 h-10"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Button>
    </div>
  );
}

function SearchBarAndZoomControls() {
  const [searchQuery, setSearchQuery] = useState("");
  const map = useMap();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Here you can add your search logic
      // For example, you could:
      // 1. Search for locations
      // 2. Update map markers
      // 3. Center map on results
    }
  };

  return (
    <div 
      className="absolute top-4 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-4xl px-2 sm:px-4"
      style={{ position: 'fixed' }}
    >
      <div className="search-controls-container flex flex-nowrap gap-1 sm:gap-2 items-center rounded-full py-2 px-3">
        <MapZoomControl />
        <Input
          value={searchQuery}
          onValueChange={setSearchQuery}
          classNames={{
            base: "flex-1 min-w-0",
            inputWrapper: "bg-transparent shadow-none hover:!bg-transparent h-11",
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
        <div className="desktop-icons">
          <RightSideIcons />
        </div>
      </div>
    </div>
  );
}

function MyMap() {
  return (
    <div className="relative w-full h-full">
      <MapContainer 
        center={MAP_CONFIG.DEFAULT_CENTER}
        zoom={MAP_CONFIG.DEFAULT_ZOOM}
        style={{ height: "100vh", width: "100%" }}
        attributionControl={false}
        zoomControl={false}
      >
        <SearchBarAndZoomControls />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={MAP_CONFIG.DEFAULT_CENTER}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      <PerformanceContainer />
      <div className="mobile-icons">
        <RightSideIcons />
      </div>
    </div>
  );
}

export default MyMap;
