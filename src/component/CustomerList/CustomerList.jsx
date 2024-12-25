import React, { useEffect, useState } from 'react';
import './customerlist.css';
import arrowBottom from '../../assets/img/icons/arrow-bottom.svg';
import hasthag from '../../assets/img/icons/hashtag.svg';
import wifi from '../../assets/img/icons/wifi.svg';
import phone from '../../assets/img/icons/phone.svg';
import mail from '../../assets/img/icons/mail.svg';
import money from '../../assets/img/icons/money.svg';
import tableHosting from '../../assets/img/icons/table-hosting.svg';
import { useParams } from 'react-router-dom';

const icons = {
  hasthag,
  wifi,
  tableHosting
};

function CustomerList({ selectedDate, productType: propProductType, onDataLoaded, }) {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    fetch('/data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(fetchedData => {
      const updatedData = fetchedData.map(item => ({
        ...item,
        icon: icons[item.icon] || null
      }));
      setData(updatedData);
      if (onDataLoaded) {
        onDataLoaded(updatedData);
      }
    })
    .catch(error => {
      console.error("Veri yüklenirken bir hata oluştu:", error);
    });
  }, [onDataLoaded]);

  const { productType: paramProductType } = useParams();
  const productType = propProductType || paramProductType;

  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split('.');
    const date = new Date(year, month - 1);
    const options = { year: 'numeric', month: 'long' };
    return new Intl.DateTimeFormat('tr-TR', options).format(date);
  };


  const filteredData = data
    .filter((item) => {
      if (productType && item.type !== productType) return false;
      if (selectedDate && formatDate(item.date) !== selectedDate) return false;
      return true;
    });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    if (sortConfig.key === 'price' || sortConfig.key === 'duration') {
      aValue = parseFloat(aValue.replace(/[^\d.-]/g, '')) || 0;
      bValue = parseFloat(bValue.replace(/[^\d.-]/g, '')) || 0;
    }

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key, isNumeric = false) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  return (
    <div className="info-box">
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('customer')}>
              <div className="table-title">
                Şirket Adı <img src={arrowBottom} alt="Sort" />
              </div>
            </th>
            <th onClick={() => handleSort('duration', true)}>
              <div className="table-title">
                Kalan Süre <img src={arrowBottom} alt="Sort" />
              </div>
            </th>
            <th onClick={() => handleSort('type')}>
              <div className="table-title">
                Ürün <img src={arrowBottom} alt="Sort" />
              </div>
            </th>
            <th onClick={() => handleSort('date')}>
              <div className="table-title">
                Tarih <img src={arrowBottom} alt="Sort" />
              </div>
            </th>
            <th onClick={() => handleSort('price', true)}>
              <div className="table-title">
                Tutar <img src={arrowBottom} alt="Sort" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              <td>
                <div className="tc-name">
                  <div className="letter-box">
                    <span>{item.name.charAt(0)}</span>
                  </div>
                  <div className="tc-customer">
                    <span>{item.name}</span>
                    <span>{item.customer}</span>
                  </div>
                </div>
              </td>
              <td>{item.duration}</td>
              <td>
                <div className={`tc-content ${item.type}`}>
                  {item.icon ? <img src={item.icon} alt={item.type} /> : null}
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </div>
              </td>
              <td>{item.date}</td>
              <td class="price">{item.price}</td>
              <td>
                <div className="table-contact">
                  <div className="contact-icons">
                    <div className="c-icon">
                      <img src={phone} alt="phone" />
                    </div>
                    <div className="c-icon">
                      <img src={mail} alt="mail" />
                    </div>
                  </div>
                  <button className="payment-button">
                    <img src={money} alt="money" />Ödeme Al
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;