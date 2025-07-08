import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import Adapter from './pages/adapter/Adapter'
import Overview from './pages/Overview'
import Home from "./pages/Home.jsx";

function App() {
  return (
      <ConfigProvider
          theme={{
            token: {
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
              borderRadius: 8,
            },
          }}
      >
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/adapter/:id" element={<Adapter />} />
            </Routes>
          </Router>
      </ConfigProvider>
  )
}

export default App