import { Link, Routes, Route } from 'react-router-dom';

import Favorites from 'modules/Favorites';
import Home from 'modules/Home';

import AppLayout from '../AppLayout';

const PageNotFound = () => {
  return (
    <div style={{ marginTop: '300px', textAlign: 'center' }}>
      <h2>Здесь ничего нет!</h2>
      <p>
        <Link to="/">Вернуться домой</Link>
      </p>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
