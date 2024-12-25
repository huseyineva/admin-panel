import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Header from "./component/Header/Header";
import Sidebar from "./component/Sidebar/Sidebar";
import Domain from "./pages/Domain/Domain";
import CustomerList from "./component/CustomerList/CustomerList";
import Hosting from "./pages/Hosting/Hosting";
import Sunucu from "./pages/Sunucu/Sunucu";
import { useState } from "react";
import DateDropdown from "./component/DateDropdown/DateDropdown";
import AddButton from "./component/AddButton/AddButton";
import Customers from "./component/CustomerList/Customers";
import CustomerPage from "./pages/CustomerPage/CustomerPage";

function App() {

  const [selectedDate, setSelectedDate] = useState('');

  return (
    <Router>
      <section className="main-section">
        <Sidebar />
        <div className="main-box">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header props={{ props: "Dashboard" }} />
                  <Dashboard />
                </>
              }
            />
            <Route
              path="/domain" 
              element={
                <>
                  <Header props={{ props: "Domain" }} />
                  <Domain />
                  <div className="dashboard-title dt-in">
                    <AddButton name="Domain Ekle" btnName="domain" />
                    <DateDropdown setDate={setSelectedDate} />
                  </div>
                  <CustomerList productType="domain" selectedDate={selectedDate} />
                </>
              }
            />
            <Route
              path="/hosting"
              element={
                <>
                  <Header props={{ props: "Hosting" }} />
                  <Hosting />
                  <div className="dashboard-title dt-in">
                    <AddButton name="Hosting Ekle" btnName="hosting" />
                    <DateDropdown setDate={setSelectedDate} />
                  </div>
                  <CustomerList productType="hosting" selectedDate={selectedDate}/>
                </>
              }
            />
            <Route
              path="/sunucu"
              element={
                <>
                  <Header props={{ props: "Sunucu" }} />
                  <Sunucu />
                  <div className="dashboard-title dt-in">
                    <AddButton name="Sunucu Ekle" btnName="sunucu" />
                    <DateDropdown setDate={setSelectedDate} />
                  </div>
                  <CustomerList productType="sunucu" selectedDate={selectedDate}/>
                </>
              }
            />
            <Route
              path="/musteri"
              element={
                <>
                  <Header props={{ props: "Müşteri" }} />
                  <Sunucu />
                  <div className="dashboard-title dt-in">
                    <AddButton name="Müşteri Ekle" btnName="musteri" />
                  </div>
                  <Customers  />
                </>
              }
            />
            <Route
              path="/customer/:customerName"
              element={<CustomerPage />}
            />
          </Routes>
        </div>
      </section>
    </Router>
  );
}

export default App;