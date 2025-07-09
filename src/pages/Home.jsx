import { Typography, Input, Button, Space } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import biocypherLogo from '../assets/biocypher.png'
import SearchResults from '../components/SearchResults'

const { Title } = Typography
const { Search } = Input

function Home() {
  const navigate = useNavigate()
  const [searchVisible, setSearchVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (value) => {
    setSearchQuery(value)
    if (value.trim()) {
      setSearchVisible(true)
    } else {
      setSearchVisible(false)
    }
  }

  const handleCloseSearch = () => {
    setSearchVisible(false)
    setSearchQuery('')
  }

  return (
    <>
      <div style={{ 
        minHeight: '100vh', 
        background: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px'
      }}>
        <div style={{ 
          maxWidth: '600px', 
          width: '100%',
          textAlign: 'center'
        }}>
          {/* Logo and Title */}
          <div style={{ marginBottom: '48px' }}>
            <img 
              src={biocypherLogo} 
              alt="BioCypher" 
              style={{ 
                width: '80px', 
                height: '80px',
                marginBottom: '24px'
              }}
            />
            <Title 
              level={1} 
              style={{ 
                margin: 0, 
                color: '#1c5aa0',
                fontSize: '48px',
                fontWeight: 600,
                letterSpacing: '-1px'
              }}
            >
              BioCypher Adapters
            </Title>
          </div>

          {/* Search Bar */}
          <div style={{ marginBottom: '32px' }}>
            <Search
              placeholder="Search adapters..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
              onChange={(e) => {
                if (!e.target.value.trim()) {
                  handleCloseSearch()
                }
              }}
              style={{ 
                fontSize: '16px',
                borderRadius: '8px'
              }}
            />
          </div>

          {/* Action Buttons */}
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate('/overview')}
              style={{
                height: '48px',
                fontSize: '16px',
                fontWeight: 500,
                borderRadius: '8px',
                width: '300px'
              }}
            >
              View All Components
            </Button>
            
            <Button
              type="default"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => navigate('/register')}
              style={{
                height: '40px',
                fontSize: '14px',
                borderRadius: '8px',
                width: '200px'
              }}
            >
              Add Adapter
            </Button>
          </Space>
        </div>
      </div>

      {searchVisible && (
        <SearchResults 
          query={searchQuery} 
          onClose={handleCloseSearch}
        />
      )}
    </>
  )
}

export default Home