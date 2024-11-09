// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { store } from './store';
import { theme } from './theme';
import Layout from './components/Layout';
import MapComponent from './components/Map';
import Promotions from './components/Promotions';
import BinList from './components/BinList';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<MapComponent />} />
              <Route path="/bins" element={<BinList />} />
              <Route path="/promotions" element={<Promotions />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;