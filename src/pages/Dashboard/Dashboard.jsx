import React, { useState } from 'react';
import './dashboard.css';
import domainIcon from '../../assets/img/icons/domain-icon.svg';
import sunucuIcon from '../../assets/img/icons/sunucu-icon.svg';
import hostingIcon from '../../assets/img/icons/hosting-icon.svg';
import arrowRight from '../../assets/img/icons/arrow-right.svg';
import CustomerList from '../../component/CustomerList/CustomerList';
import DateDropdown from '../../component/DateDropdown/DateDropdown';
import { Link } from 'react-router-dom';

function Dashboard() {

const [selectedDate, setSelectedDate] = useState('');

const [customerData, setCustomerData] = useState([]);

const handleDataLoaded = (data) => {
  setCustomerData(data);
};

const domainCount = customerData.filter((item) => item.type === 'domain').length;
const hostingCount = customerData.filter((item) => item.type === 'hosting').length;
const sunucuCount = customerData.filter((item) => item.type === 'sunucu').length;

const domainTotalPrice = customerData
.filter((item) => item.type === 'domain')
.reduce((sum, item) => {
  const numericPrice = parseFloat(item.price.replace(/[^\d,]/g, '').replace(',', '.'));
  return sum + numericPrice;
}, 0);

const hostingTotalPrice = customerData
.filter((item) => item.type === 'hosting')
.reduce((sum, item) => {
  const numericPrice = parseFloat(item.price.replace(/[^\d,]/g, '').replace(',', '.'));
  return sum + numericPrice;
}, 0);


const sunucuTotalPrice = customerData
.filter((item) => item.type === 'sunucu')
.reduce((sum, item) => {
  const numericPrice = parseFloat(item.price.replace(/[^\d,]/g, '').replace(',', '.'));
  return sum + numericPrice;
}, 0);


  return (
    <div className="dashboard-box">
      <div className="dashboard-title">
        <span>Toplam Alacak</span>
        <DateDropdown setDate={setSelectedDate} />
      </div>  
      <div className="dashboard-content">
        <div className="dc-box">
          <div className="dc-header">
            <div className="dc-title">
              <img src={domainIcon} alt="Domain" />
              <span>Domain</span>
            </div>
            <Link to="/domain">
              <div className="details">
                <span>Detaylar</span>
                <img src={arrowRight} alt="Arrow Right" />
              </div>
            </Link>
          </div>
          <div className="dc-bottom">
            <span>{domainCount} adet</span>
            <span>₺{domainTotalPrice.toFixed(2)}</span>
          </div>
        </div>
        <div className="dc-box">
          <div className="dc-header">
            <div className="dc-title">
              <img src={sunucuIcon} alt="Sunucu" />
              <span className="dc-sunucu">Sunucu</span>
            </div>
          <Link to="/sunucu">
          <div className="details">
              <span>Detaylar</span>
              <img src={arrowRight} alt="Arrow Right" />
            </div>
          </Link>
          </div>
          <div className="dc-bottom">
            <span>{sunucuCount} adet</span>
            <span>₺{sunucuTotalPrice.toFixed(2)}</span>
          </div>
        </div>
        <div className="dc-box">
          <div className="dc-header">
            <div className="dc-title">
              <img src={hostingIcon} alt="Hosting" />
              <span className="dc-hosting">Hosting</span>
            </div>
          <Link to="/hosting">
            <div className="details">
                <span>Detaylar</span>
                <img src={arrowRight} alt="Arrow Right" />
              </div>
          </Link>
          </div>
          <div className="dc-bottom">
            <span>{hostingCount} adet</span>
            <span>₺{hostingTotalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-info">
        <span>Yaklaşan Ödemeler</span>
        <CustomerList selectedDate={selectedDate} onDataLoaded={handleDataLoaded}/>
      </div>
    </div>
  );
}

export default Dashboard;