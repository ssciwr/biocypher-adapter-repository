import { Card, Row, Col, Typography, Tag, Space, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { GithubOutlined, StarOutlined, CalendarOutlined } from '@ant-design/icons'
import Header from '../components/Header'
import { getAllAdapters } from '../services/adapterService'

const { Title, Text } = Typography

function Overview() {
  const navigate = useNavigate()
  const [adapters, setAdapters] = useState([])
  const [loading, setLoading] = useState(true)
  const [githubStats, setGithubStats] = useState({})

  useEffect(() => {
    const fetchAdapters = async () => {
      try {
        const data = await getAllAdapters()
        setAdapters(data)

        // Fetch GitHub stats for adapters
        const stats = {}
        for (const adapter of data) {
          if (adapter.githubUrl) {
            try {
              const match = adapter.githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/)
              if (match) {
                const [, owner, repo] = match
                const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
                if (response.ok) {
                  const repoData = await response.json()
                  stats[adapter.id] = {
                    stars: repoData.stargazers_count
                  }
                }
              }
            } catch (error) {
              console.error(`Failed to fetch GitHub stats for ${adapter.id}:`, error)
            }
          }
        }
        setGithubStats(stats)
      } catch (error) {
        console.error('Failed to fetch adapters:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAdapters()
  }, [])

  const formatDate = (date) => {
    if (!date) return 'Unknown'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Header showRegisterButton={true} />

      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '40px 24px'
      }}>
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <Title level={2} style={{ color: '#1c5aa0', marginBottom: '8px' }}>
            BioCypher Adapter Repository
          </Title>
          <Text type="secondary" style={{ fontSize: '16px' }}>
            Discover and integrate data adapters for your BioCypher knowledge graphs
          </Text>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <Spin size="large" />
            <div style={{ marginTop: '16px' }}>
              <Text type="secondary">Loading adapters...</Text>
            </div>
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            {adapters.map((adapter) => (
              <Col xs={24} sm={12} lg={8} xl={6} key={adapter.id}>
                <Card
                  hoverable
                  style={{
                    height: '100%',
                    borderRadius: '12px',
                    border: '2px solid #ccc',
                    cursor: 'pointer'
                  }}
                  bodyStyle={{ padding: '20px' }}
                  onClick={() => navigate(`/adapter/${adapter.id}`)}
                >
                  <div style={{ height: '200px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '12px' }}>
                      <Title level={4} style={{ margin: 0, fontSize: '18px', lineHeight: '1.3' }}>
                        {adapter.name}
                      </Title>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        v{adapter.version} • by {adapter.author}
                      </Text>
                    </div>

                    <div style={{ flex: 1, marginBottom: '16px' }}>
                      <Text
                        style={{
                          fontSize: '14px',
                          lineHeight: '1.4',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {adapter.description}
                      </Text>
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <Space wrap size={[4, 4]}>
                        <Tag color="blue">{adapter.domain}</Tag>
                        {adapter.details?.dataType && (
                          <Tag color="purple">{adapter.details.dataType}</Tag>
                        )}
                        {adapter.status === 'draft' && (
                          <Tag color="orange">Draft</Tag>
                        )}
                      </Space>
                    </div>

                    <div style={{ fontSize: '12px' }}>
                      <Space split={<span style={{ color: '#d9d9d9' }}>•</span>}>
                        {githubStats[adapter.id]?.stars !== undefined && (
                          <span>
                            <StarOutlined style={{ marginRight: '4px', color: '#faad14' }} />
                            {githubStats[adapter.id].stars.toLocaleString()}
                          </span>
                        )}
                        {adapter.githubUrl && (
                          <span style={{ color: '#666' }}>
                            <GithubOutlined style={{ marginRight: '4px' }} />
                            GitHub
                          </span>
                        )}
                        <span>
                          <CalendarOutlined style={{ marginRight: '4px' }} />
                          {formatDate(adapter.lastUpdated)}
                        </span>
                      </Space>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {!loading && adapters.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <Text type="secondary" style={{ fontSize: '16px' }}>
              No adapters found. Be the first to add one!
            </Text>
          </div>
        )}
      </div>
    </div>
  )
}

export default Overview
