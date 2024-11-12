import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CouponReveal from './CouponReveal';
import CouponForm from './CouponForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/reveal" element={<CouponReveal />} />
        <Route path="/form" element={<CouponForm />} />
        <Route path="/" element={<CouponReveal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
