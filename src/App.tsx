import { Menu } from 'antd';
import Home from './Home';
import Favorites from './Favorites';
import {Route, Routes, useNavigate} from "react-router-dom";

function App() {
    const navigate = useNavigate();

    const items = [
        {
            key: 'Home',
            label: `Home`,
            onClick: () => navigate("/")
        },
        {
            key: 'Favorites',
            label: `Favorites`,
            onClick: () => navigate("/favorites")
        }
    ];

  return (
      <>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items} />
          <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/favorites" element={<Favorites />} />
          </Routes>
      </>
  )
}

export default App
