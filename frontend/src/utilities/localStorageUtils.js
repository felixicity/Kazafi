// get an item from localStorage or return defualt value
export const getFromLocalStorage = (key, defaultValue) => {
      try {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : defaultValue;
      } catch (error) {
            return defaultValue;
      }
};

// set an item to localStorage
export const setToLocalStorage = (key, value) => {
      try {
            localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
            console.error("Error saving to localStorage", error);
      }
};
