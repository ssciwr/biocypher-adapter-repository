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
            title: 'BioCypher Adapters',
            description: 'Learn how to create adapters that connect to BioCypher core and provide data from specific resources.',
            difficulty: 'intermediate',
            duration: '30 min',
            tags: ['adapters', 'development']
        },
        {
            id: '2',
            title: 'Handling Ontologies',
            description: 'Understand how BioCypher uses ontologies to ground knowledge graphs in biology and customize them.',
            difficulty: 'intermediate',
            duration: '25 min',
            tags: ['ontologies', 'biolink']
        },
        {
            id: '3',
            title: 'BioCypher and Pandas',
            description: 'Comprehensive guide to using BioCypher with Pandas for data processing and knowledge graph creation.',
            difficulty: 'beginner',
            duration: '20 min',
            tags: ['pandas', 'data-processing']
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
                            <div 
                                className="cookbook-item" 
                                onClick={() => {
                                    const urls = [
                                        'https://biocypher.org/BioCypher/learn/tutorials/tutorial003_adapters/',
                                        'https://biocypher.org/BioCypher/learn/tutorials/tutorial002_handling_ontologies/',
                                        'https://biocypher.org/BioCypher/learn/tutorials/pandas_tutorial/'
                                    ]
                                    window.open(urls[parseInt(tutorial.id) - 1], '_blank')
                                }}
                            >
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