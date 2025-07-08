import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { AdapterStoreProvider } from './stores/AdapterStore'
import Adapter from './pages/adapter/Adapter'
import Overview from './pages/Overview'
import Home from "./pages/Home.jsx";

// Example of how to wrap your app with the store provider
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
        <AdapterStoreProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/adapter/:id" element={<Adapter />} />
            </Routes>
          </Router>
        </AdapterStoreProvider>
      </ConfigProvider>
  )
}

export default App