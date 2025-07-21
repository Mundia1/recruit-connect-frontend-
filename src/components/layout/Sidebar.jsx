import React from 'react';

const SidebarComponent = ({ activeItem, setActiveItem }) => {
  const menuItems = ['Profile', 'Applications', 'Saved Jobs', 'Settings'];

  return (
    <aside className="w-64 h-full bg-gray-100 p-6 border-r">
      <h3 className="text-xl font-bold mb-8 text-[#177245]">Dashboard</h3>
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li
            key={item}
            className={`cursor-pointer ${
              activeItem === item ? 'font-bold text-[#177245]' : 'text-gray-700'
            } hover:text-[#177245]`}
            onClick={() => setActiveItem(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarComponent;