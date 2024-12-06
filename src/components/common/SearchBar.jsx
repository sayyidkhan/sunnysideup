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
      <div className="flex gap-2 right-side-icons">
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
  // this react component is used to consolidate all the search bar UI and logic
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
          <RightSideIcons toggleDashboard={toggleDashboard} showDashboard={showDashboard} />
        </div>
      </div>
    </div>
  );
}