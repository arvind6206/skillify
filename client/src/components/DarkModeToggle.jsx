import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const DarkModeToggle = () => {
  try {
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
      <button
        onClick={() => {
          console.log('Toggle clicked, current mode:', isDarkMode);
          toggleDarkMode();
        }}
        className="p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        aria-label="Toggle dark mode"
        title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? (
          <FaSun className="w-5 h-5" />
        ) : (
          <FaMoon className="w-5 h-5" />
        )}
      </button>
    );
  } catch (error) {
    console.error('DarkModeToggle error:', error);
    return (
      <button
        className="p-3 bg-gray-600 text-white rounded-lg"
        onClick={() => console.log('Theme context not available')}
      >
        Theme
      </button>
    );
  }
};

export default DarkModeToggle;
