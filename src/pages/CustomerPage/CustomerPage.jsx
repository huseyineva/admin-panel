import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../component/Header/Header';
import './customer.css'
import duzenle from '../../assets/img/icons/duzenle.svg';
import sil from '../../assets/img/icons/sil.svg';

function CustomerPage() {
const { customerName } = useParams();
const [customerData, setCustomerData] = useState([]);
const [isLoading, setIsLoading] = useState(true);

const sanitizeCustomerName = (name) => {
const turkishChars = {
ç: 'c', ı: 'i', ş: 's', ğ: 'g', ü: 'u', ö: 'o',
Ç: 'C', İ: 'I', Ş: 'S', Ğ: 'G', Ü: 'U', Ö: 'O'
};

let sanitizedName = name.split('').map(char => turkishChars[char] || char).join('');
sanitizedName = sanitizedName.replace(/\s+/g, '-').toLowerCase();
return sanitizedName;
};

useEffect(() => {
fetch('/data.json')
.then((response) => {
if (!response.ok) {
throw new Error(`HTTP error! Status: ${response.status}`);
}
return response.json();
})
.then((data) => {
const matchedData = data.filter(
(item) => sanitizeCustomerName(item.customer) === customerName
);
setCustomerData(matchedData);
setIsLoading(false);
})
.catch((error) => {
console.error('Müşteri verisi yüklenirken bir hata oluştu:', error);
setIsLoading(false);
});
}, [customerName]);

if (isLoading) {
return (
<>
  <Header props={{ props: 'Yükleniyor...' }} />
  <div>Yükleniyor...</div>
</>
);
}

if (customerData.length === 0) {
return (
<>
  <Header props={{ props: 'Müşteri Bulunamadı' }} />
  <div>Müşteri bulunamadı.</div>
</>
);
}

return (
<>
  <Header props={{ props: customerData[0].customer }} />
  {customerData.map((item, index) => (
  <div className='accordion-main cd-box' key={index}>
      <div className="tc-name">
        <div className="letter-box">
          <span>{item.name.charAt(0)}</span>
        </div>
        <div className="customer-detail">
            <span>{item.name}</span>
            <span>{item.type}</span>
        </div>
      </div>
      <div className="customer-settings">
          <img src={duzenle} alt="" className='duzenle' />
          <img src={sil} alt="" className='sil' />
        </div>
  </div>
  ))}
</>
);
}

export default CustomerPage;