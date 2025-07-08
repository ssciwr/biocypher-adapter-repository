import { Card, List, Typography, Tag, Space, Tooltip } from 'antd'
import { BookOutlined, ClockCircleOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

interface Tutorial {
    id: string
    title: string
    description: string
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    duration: string
    tags: string[]
}

interface CookbookTutorialsProps {
    adapterId: string
}

const CookbookTutorials: React.FC<CookbookTutorialsProps> = ({ adapterId }) => {
    // Mock data - replace with actual API call
    const tutorials: Tutorial[] = [
        {
            id: '1',
            title: 'Getting Started with ExampleAdapter',
            description: 'Learn the basics of setting up and running your first pipeline with this adapter.',
            difficulty: 'beginner',
            duration: '15 min',
            tags: ['setup', 'basics']
        },
        {
            id: '2',
            title: 'Advanced Data Transformation',
            description: 'Deep dive into complex data transformation scenarios and optimization techniques.',
            difficulty: 'advanced',
            duration: '45 min',
            tags: ['optimization', 'performance']
        },
        {
            id: '3',
            title: 'Integration with BioCypher Workflows',
            description: 'Best practices for integrating this adapter into existing BioCypher pipelines.',
            difficulty: 'intermediate',
            duration: '30 min',
            tags: ['integration', 'workflows']
        }
    ]

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner': return 'green'
            case 'intermediate': return 'orange'
            case 'advanced': return 'red'
            default: return 'default'
        }
    }

    return (
        <div className="cookbook-bottom-bar">
            <div className="cookbook-container">
                <div className="cookbook-header">
                    <Title level={5} className="section-header">📚 Tutorials</Title>
                </div>
                <div className="cookbook-items">
                    {tutorials.map(tutorial => (
                        <Tooltip
                            key={tutorial.id}
                            title={
                                <div>
                                    <div style={{ marginBottom: '8px' }}>
                                        <strong>{tutorial.title}</strong>
                                    </div>
                                    <div style={{ marginBottom: '8px' }}>
                                        {tutorial.description}
                                    </div>
                                    <Space wrap>
                                        {tutorial.tags.map(tag => (
                                            <Tag key={tag} size="small">{tag}</Tag>
                                        ))}
                                    </Space>
                                </div>
                            }
                            placement="top"
                        >
                            <div className="cookbook-item">
                                <div className="cookbook-item-title">{tutorial.title}</div>
                                <div className="cookbook-item-meta">
                                    <Tag color={getDifficultyColor(tutorial.difficulty)} size="small">
                                        {tutorial.difficulty}
                                    </Tag>
                                    <Tag icon={<ClockCircleOutlined />} size="small">
                                        {tutorial.duration}
                                    </Tag>
                                </div>
                            </div>
                        </Tooltip>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CookbookTutorials