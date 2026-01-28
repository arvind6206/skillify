import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = ({ 
  searchQuery, 
  setSearchQuery, 
  placeholder = "Search courses...", 
  showClearButton = true 
}) => {
  const handleClear = () => {
    setSearchQuery('');
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
        <FaSearch className="w-4 h-4" />
      </div>
      
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
      />
      
      {showClearButton && searchQuery && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Clear search"
        >
          <FaTimes className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
