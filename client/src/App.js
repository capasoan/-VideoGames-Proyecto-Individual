import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from "./Components/Landing/LandingPage.jsx";
import HomePage from './Components/HomePage/HomePage.jsx';
import Detail from './Components/Detail/Detail.jsx';
import Form from './Components/Form/Form.jsx';
import FiltrarGenero from './Components/FiltrarEquipo/FiltrarGenero.jsx';
import { Provider } from 'react-redux'; 
import store from './redux/store.js';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Form" element={<Form />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/videogames/:idVideogame" element={<Detail />} />
          <Route path="/FiltrarGenero/:genero" element={<FiltrarGenero />} />

        </Routes>
      </div>
    </Provider>
  );
}

export default App;
