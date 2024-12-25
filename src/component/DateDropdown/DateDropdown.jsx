import React from 'react';
import './datedropdown.css';

function DateDropdown({ setDate }) {
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <div className="dropdown-box">
      <span>Dönem</span>
      <div className="select-dropdown">
        <i className="fa-solid fa-angle-down"></i>
        <select onChange={handleDateChange}>
          <option value="">Tüm Dönemler</option>
          <option value="Kasım 2024">Kasım 2024</option>
          <option value="Aralık 2024">Aralık 2024</option>
          <option value="Ocak 2025">Ocak 2025</option>
          <option value="Şubat 2025">Şubat 2025</option>
          <option value="Mart 2025">Mart 2025</option>
          <option value="Nisan 2025">Nisan 2025</option>
          <option value="Mayıs 2025">Mayıs 2025</option>
          <option value="Haziran 2025">Haziran 2025</option>
          <option value="Temmuz 2025">Temmuz 2025</option>
          <option value="Ağustos 2025">Ağustos 2025</option>
          <option value="Eylül 2025">Eylül 2025</option>
          <option value="Ekim 2025">Ekim 2025</option>
        </select>
      </div>
    </div>
  );
}

export default DateDropdown