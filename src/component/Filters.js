import React from 'react';
import SearchableDropdown from './SearchableDropDown';
import { minExperience, location, remoteOrOnSite, techStack, role, minBasePay } from "../data/data";

const FilterComponent = ({ filters, onFilterChange }) => {
  const handleChange = (name, value) => {
    const updatedFilters = { ...filters, [name]: value };
    onFilterChange(updatedFilters);
  };

  return (
    <div className="filterComponent">
      {/* Searchable dropdown for Role */}
      <SearchableDropdown
        options={role}
        label="name"
        id="role"
        selectedVal={filters?.jobRole}
        placeholder="Role"
        handleChange={(val) => handleChange('jobRole', val)}
      />

      {/* Searchable dropdown for MinimumExperience */}
      <SearchableDropdown
        options={minExperience}
        label="years"
        id="minExperience"
        selectedVal={filters?.minExp}
        placeholder="Minimum Experience"
        handleChange={(val) => handleChange('minExp', val)}
      />

      {/* Searchable dropdown for Location */}
      <SearchableDropdown
        options={location}
        label="city"
        id="location"
        selectedVal={filters?.location}
        placeholder="Location"
        handleChange={(val) => handleChange('location', val)}
      />

      {/* Searchable dropdown for Remote/On-site */}
      <SearchableDropdown
        options={remoteOrOnSite}
        label="type"
        id="remoteOrOnSite"
        selectedVal={filters?.remoteOrOnsite}
        placeholder="Remote/On-site"
        handleChange={(val) => handleChange('remote', val)}
      />

      {/* Searchable dropdown for Minimum Base Pay */}
      <SearchableDropdown
        options={minBasePay}
        label="amount"
        id="minBasePay"
        selectedVal={filters?.maxJdSalary}
        placeholder="Minimum Base Pay"
        handleChange={(val) => handleChange('maxJdSalary', val)}
      />

      <div className="dropdown">
        <div className="control">
          <div className="selected-value">
            <input
              type="text"
              name="search"
              placeholder="Search"
              handleChange={(val) => handleChange('company', val)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;