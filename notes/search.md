Animated Search

```javascript
import React, { useState } from 'react';
import './SearchBar.css'; // Import your CSS file

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={`search-container ${isFocused ? 'focused' : ''}`}>
      <input
        type="text"
        placeholder="Search..."
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <button>Search</button>
    </div>
  );
};

export default SearchBar;
```

```css
.search-container {
  position: relative;
  width: 300px;
}

.search-container input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 20px;
  outline: none;
  background: linear-gradient(to right, #ff6a00, #ee0979);
  color: white;
  transition: width 0.4s ease-in-out;
}

.search-container button {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background-color: #333;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-container button:hover {
  background-color: #555;
}

.search-container.focused input {
  width: 400px;
}

```
