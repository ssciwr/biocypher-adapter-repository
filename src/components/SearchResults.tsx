import { useState, useEffect } from 'react'
import { Modal, List, Card, Tag, Typography, Spin, Empty, Input, Space } from 'antd'
import { CloseOutlined, SearchOutlined } from '@ant-design/icons'
import { searchAdapters } from '../services/adapterService'
import './SearchResults.css'

const { Title, Text } = Typography

interface Adapter {
    id: string
    name: string
    description: string
    author: string
    domain: string
    version: string
    tags: string[]
    githubUrl?: string
    downloads?: number
}

interface SearchResultsProps {
    query: string
    onClose: () => void
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, onClose }) => {
    const [results, setResults] = useState<Adapter[]>([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState(query)

    useEffect(() => {
        if (query) {
            performSearch(query)
        }
    }, [query])

    const performSearch = async (searchQuery: string) => {
        setLoading(true)
        try {
            const searchResults = await searchAdapters(searchQuery)
            setResults(searchResults)
        } catch (error) {
            console.error('Search failed:', error)
            setResults([])
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (value: string) => {
        setSearchTerm(value)
        if (value.trim()) {
            performSearch(value)
        }
    }

    const getDomainColor = (domain: string) => {
        const colors: { [key: string]: string } = {
            'genomics': 'blue',
            'proteomics': 'green',
            'transcriptomics': 'orange',
            'metabolomics': 'purple',
            'microgenomics': 'cyan',
            'genetics': 'red',
            'bioinformatics': 'geekblue'
        }
        return colors[domain.toLowerCase()] || 'default'
    }

    return (
        <Modal
            open={true}
            onCancel={onClose}
            footer={null}
            width="80%"
            style={{ maxWidth: '1200px', top: 20 }}
            className="search-results-modal"
            closeIcon={<CloseOutlined />}
            title={null}
        >
            <div className="search-results-content">
                <div className="search-header">
                    <Title level={3}>Search Results</Title>
                    <Space.Compact style={{ width: '100%', maxWidth: '500px' }}>
                        <Input
                            placeholder="Refine your search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onPressEnter={(e) => handleSearch(e.currentTarget.value)}
                            size="large"
                        />
                        <Input.Search
                            enterButton={<SearchOutlined />}
                            size="large"
                            onSearch={handleSearch}
                        />
                    </Space.Compact>
                </div>

                <div className="search-results-body">
                    {loading ? (
                        <div className="search-loading">
                            <Spin size="large" />
                            <Text>Searching adapters...</Text>
                        </div>
                    ) : results.length === 0 ? (
                        <Empty
                            description={`No adapters found for "${searchTerm}"`}
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                    ) : (
                        <>
                            <div className="results-count">
                                <Text type="secondary">
                                    Found {results.length} adapter{results.length !== 1 ? 's' : ''} for "{searchTerm}"
                                </Text>
                            </div>
                            <List
                                grid={{
                                    gutter: 16,
                                    xs: 1,
                                    sm: 1,
                                    md: 2,
                                    lg: 2,
                                    xl: 3,
                                    xxl: 3,
                                }}
                                dataSource={results}
                                renderItem={(adapter) => (
                                    <List.Item>
                                        <Card
                                            hoverable
                                            className="adapter-result-card"
                                            onClick={() => window.open(`/adapter/${adapter.id}`, '_blank')}
                                        >
                                            <div className="adapter-card-header">
                                                <Title level={5} className="adapter-name">
                                                    {adapter.name}
                                                </Title>
                                                <Tag color="blue">v{adapter.version}</Tag>
                                            </div>

                                            <Text className="adapter-description">
                                                {adapter.description}
                                            </Text>

                                            <div className="adapter-meta">
                                                <div>
                                                    <Text strong>Author: </Text>
                                                    <Text>{adapter.author}</Text>
                                                </div>
                                                <div>
                                                    <Text strong>Domain: </Text>
                                                    <Tag color={getDomainColor(adapter.domain)}>
                                                        {adapter.domain}
                                                    </Tag>
                                                </div>
                                                {adapter.downloads && (
                                                    <div>
                                                        <Text strong>Downloads: </Text>
                                                        <Text>{adapter.downloads.toLocaleString()}</Text>
                                                    </div>
                                                )}
                                            </div>

                                            {adapter.tags && adapter.tags.length > 0 && (
                                                <div className="adapter-tags">
                                                    {adapter.tags.slice(0, 3).map(tag => (
                                                        <Tag key={tag} size="small">{tag}</Tag>
                                                    ))}
                                                    {adapter.tags.length > 3 && (
                                                        <Tag size="small">+{adapter.tags.length - 3} more</Tag>
                                                    )}
                                                </div>
                                            )}
                                        </Card>
                                    </List.Item>
                                )}
                            />
                        </>
                    )}
                </div>
            </div>
        </Modal>
    )
}

export default SearchResults
