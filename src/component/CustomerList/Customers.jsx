import React, { useEffect, useState } from 'react';
import './customerlist.css';
import hasthag from '../../assets/img/icons/hashtag.svg';
import wifi from '../../assets/img/icons/wifi.svg';
import duzenle from '../../assets/img/icons/duzenle.svg';
import sil from '../../assets/img/icons/sil.svg';
import tableHosting from '../../assets/img/icons/table-hosting.svg';
import { Link, useParams } from 'react-router-dom';

const icons = {
hasthag,
wifi,
tableHosting
};

function Customers({ selectedDate, productType: propProductType, onDataLoaded }) {
const [data, setData] = useState([]);
const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
const [openRows, setOpenRows] = useState([]);

useEffect(() => {
fetch('/data.json')
.then((response) => {
if (!response.ok) {
throw new Error(`HTTP error! Status: ${response.status}`);
}
return response.json();
})
.then((fetchedData) => {
const updatedData = fetchedData.map((item) => ({
...item,
icon: icons[item.icon] || null,
}));
setData(updatedData);
if (onDataLoaded) {
onDataLoaded(updatedData);
}
})
.catch((error) => {
console.error('Veri yüklenirken bir hata oluştu:', error);
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

const uniqueCustomers = new Set();
const filteredUniqueData = filteredData.filter((item) => {
if (uniqueCustomers.has(item.customer)) {
return false;
}
uniqueCustomers.add(item.customer);
return true;
});

const domainCount = filteredData.filter((item) => item.type === 'domain').length;
const sunucuCount = filteredData.filter((item) => item.type === 'sunucu').length;
const hostingCount = filteredData.filter((item) => item.type === 'hosting').length;

const sortedData = [...filteredUniqueData].sort((a, b) => {
if (!sortConfig.key) return 0;

});


const sanitizeCustomerName = (name) => {
  const turkishChars = {
    ç: 'c', ı: 'i', ş: 's', ğ: 'g', ü: 'u', ö: 'o',ç: 'c',
    Ç: 'C', İ: 'I', Ş: 'S', Ğ: 'G', Ü: 'U', Ö: 'O'
  };

  let sanitizedName = name.split('').map(char => turkishChars[char] || char).join('');
  
  sanitizedName = sanitizedName.replace(/\s+/g, '-').toLowerCase();
  
  return sanitizedName;
};

return (
<div className="info-box customer-box">
  <div className="customer-main">
    {sortedData.map((item, index) => (
    <Link to={`/customer/${sanitizeCustomerName(item.customer)}`}>
    <div className='accordion-main'>
      <div>
        <div className="tc-name">
          <div className="letter-box">
            <span>{item.name.charAt(0)}</span>
          </div>
          <div className="tc-customer">
            <span>{item.customer}</span>
          </div>
        </div>
      </div>
      <div>
        <div className="icons-box">
          <div className={'tc-content2 domain'}>
            <img src={icons.hasthag} alt="hasthag" />
            {domainCount}
          </div>
          <div className={'tc-content2 sunucu'}>
            <img src={icons.wifi} alt="wifi" />
            {sunucuCount}
          </div>
          <div className={'tc-content2 hosting'}>
            <img src={icons.tableHosting} alt="tableHosting" />
            {hostingCount}
          </div>
        </div>
      </div>
      <div>
        <div className="customer-settings">
          <img src={duzenle} alt="" className='duzenle' />
          <img src={sil} alt="" className='sil' />
        </div>
      </div>
    </div>
    </Link>
    ))}
  </div>
</div>
);
}

export default Customers;