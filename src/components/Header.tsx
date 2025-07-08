import { useState } from 'react'
import { Input, Button, Space, Typography } from 'antd'
import { SearchOutlined, MenuOutlined } from '@ant-design/icons'
import SearchResults from './SearchResults'
import './Header.css'

const { Title } = Typography
const { Search } = Input

interface HeaderProps {
    onSearch?: (query: string) => void
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    const [searchVisible, setSearchVisible] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

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
                            <Title level={3} className="logo-title">
                                🧬 BioCypher Adapters
                            </Title>
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
                            <Button type="text" icon={<MenuOutlined />}>
                                Menu
                            </Button>
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