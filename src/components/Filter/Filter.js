import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Filter.css';

function Filter({ onInputFilter }) {
  const [filter, setFilter] = useState('');

  const handleChange = event => {
    const filterText = event.target.value;

    setFilter(filterText);
    onInputFilter(filterText);
  };

  return (
    <div>
      <p className="FindTitle">Find contacts by name</p>

      <input
        className="InputFilter"
        value={filter}
        onChange={handleChange}
        type="text"
        name="filter"
      />
    </div>
  );
}

Filter.propTypes = {
  onInputFilter: PropTypes.func.isRequired,
};

export default Filter;
