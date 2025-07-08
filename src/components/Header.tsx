import { useState } from 'react'
import { Input, Button, Space, Typography } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import SearchResults from './SearchResults'
import biocypherLogo from '../assets/biocypher.png'
import './Header.css'

const { Title } = Typography
const { Search } = Input

interface HeaderProps {
    onSearch?: (query: string) => void
    showRegisterButton?: boolean
}

const Header: React.FC<HeaderProps> = ({ onSearch, showRegisterButton = false }) => {
    const [searchVisible, setSearchVisible] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()

    const handleSearch = (value: string) => {
        setSearchQuery(value)
        if (value.trim()) {
            setSearchVisible(true)
            onSearch?.(value)
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
            <header className="app-header">
                <div className="header-content">
                    <div className="header-left">
                        <a href="/overview" className="logo-link">
                            <div className="logo-container">
                                <img src={biocypherLogo} alt="BioCypher" className="logo-image" />
                                <Title level={3} className="logo-title">
                                    BioCypher Adapters
                                </Title>
                            </div>
                        </a>
                    </div>
                    
                    <div className="header-center">
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
                            className="header-search"
                        />
                    </div>

                    <div className="header-right">
                        <Space>
                            {showRegisterButton ? (
                                <Button 
                                    type="default"
                                    icon={<PlusOutlined />}
                                    onClick={() => navigate('/register')}
                                >
                                    Register your Adapter
                                </Button>
                            ) : (
                                <Button 
                                    type="default"
                                    onClick={() => navigate('/overview')}
                                >
                                    View All
                                </Button>
                            )}
                        </Space>
                    </div>
                </div>
            </header>

            {searchVisible && (
                <SearchResults 
                    query={searchQuery} 
                    onClose={handleCloseSearch}
                />
            )}
        </>
    )
}

export default Header