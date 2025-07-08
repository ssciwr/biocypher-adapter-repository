import { Card, Progress, Typography, Space, Spin, Tag, Button } from 'antd'
import { useState, useEffect } from 'react'
import { StarOutlined, ForkOutlined, LinkOutlined, RocketOutlined } from '@ant-design/icons'

const { Title, Text, Link } = Typography

interface DataSource {
    name: string
    percentage: number
}

interface GitHubStats {
    stars: number
    forks: number
    url: string
}

interface DataSourcesPanelProps {
    dataSources: DataSource[]
    githubUrl?: string
    version?: string
    license?: string
    lastUpdate?: string
}

const DataSourcesPanel: React.FC<DataSourcesPanelProps> = ({ dataSources, githubUrl, version, license, lastUpdate }) => {
    const [githubStats, setGithubStats] = useState<GitHubStats | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (githubUrl) {
            fetchGitHubStats(githubUrl)
        }
    }, [githubUrl])

    const fetchGitHubStats = async (url: string) => {
        setLoading(true)
        try {
            // Extract owner and repo from GitHub URL
            const match = url.match(/github\.com\/([^/]+)\/([^/]+)/)
            if (!match) return

            const [, owner, repo] = match
            const apiUrl = `https://api.github.com/repos/${owner}/${repo}`
            
            const response = await fetch(apiUrl)
            if (response.ok) {
                const data = await response.json()
                setGithubStats({
                    stars: data.stargazers_count,
                    forks: data.forks_count,
                    url: data.html_url
                })
            }
        } catch (error) {
            console.error('Failed to fetch GitHub stats:', error)
        } finally {
            setLoading(false)
        }
    }

    const getProgressColor = (percentage: number) => {
        return '#52c41a' // All green color
    }

    return (
        <Card className="data-sources-panel card-base">
            <Button 
                type="primary" 
                size="large" 
                icon={<RocketOutlined />}
                className="use-adapter-btn btn-primary btn-large btn-block"
                block
            >
                Use this Adapter
            </Button>
            
            {githubUrl && (
                <div className="github-section" style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <LinkOutlined />
                        <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
                            {githubUrl}
                        </Link>
                    </div>
                    {loading ? (
                        <Spin size="small" />
                    ) : githubStats && (
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <StarOutlined style={{ color: '#faad14' }} />
                                <Text strong>{githubStats.stars.toLocaleString()}</Text>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <ForkOutlined style={{ color: '#1890ff' }} />
                                <Text strong>{githubStats.forks.toLocaleString()}</Text>
                            </div>
                        </div>
                    )}
                </div>
            )}
            
            {(version || license || lastUpdate) && (
                <div style={{ marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #f0f0f0' }}>
                    <Space wrap>
                        {version && <Tag color="blue">🔄 v{version}</Tag>}
                        {license && <Tag color="green">📄 {license}</Tag>}
                        {lastUpdate && <Tag>🕐 {lastUpdate}</Tag>}
                    </Space>
                </div>
            )}
            
            <Title level={5} className="section-header">📊 Data Sources</Title>
            <Space direction="vertical" size={12} style={{ width: '100%' }}>
                {dataSources.map((source, index) => (
                    <div key={index} className="data-source-item">
                        <div className="source-header flex justify-between align-center">
                            <Text className="source-name">{source.name}</Text>
                            <Text strong>{source.percentage}%</Text>
                        </div>
                        <Progress
                            percent={source.percentage}
                            showInfo={false}
                            strokeColor={getProgressColor(source.percentage)}
                            strokeWidth={8}
                        />
                    </div>
                ))}
            </Space>
        </Card>
    )
}

export default DataSourcesPanel