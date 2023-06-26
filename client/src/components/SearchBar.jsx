import React, { useState } from 'react';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onSearch }) => {
    const [searchId, setSearchId] = useState('');
  
    const handleInputChange = (e) => {
      setSearchId(e.target.value);
    };
  
    const handleSearch = () => {
      onSearch(searchId);
    };
  
    return (
      <div className='searchbar'>
        <input className='searchbar__input' type="text" value={searchId} onChange={handleInputChange} placeholder="ID notatki" />
        <button className='searchbar__button' onClick={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    );
  };

export default SearchBar