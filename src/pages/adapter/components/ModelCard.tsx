import { Typography, Space, Divider, Tag } from 'antd'
import './ModelCard.css'

const { Title, Text, Paragraph } = Typography

interface ModelCardProps {
    adapterId: string
}

const ModelCard: React.FC<ModelCardProps> = ({ adapterId }) => {
    // Mock data - replace with actual API call
    const modelInfo = {
        author: 'BioCypher Team',
        domain: 'genomics',
        description: 'This adapter provides seamless integration with ExampleDB, enabling efficient data transformation and loading for bioinformatics workflows.',
        features: [
            'High-performance batch processing',
            'Automatic schema validation',
            'Support for multiple data formats',
            'Built-in data quality checks'
        ],
        requirements: {
            biocypher: '>=0.5.0',
            python: '>=3.8',
            memory: '4GB recommended'
        }
    }

    return (
        <div className="model-card">
            <Space direction="vertical" size={24} style={{ width: '100%' }}>
                <div>
                    <Title level={4}>🏷️ Model Card</Title>
                    <Space direction="vertical" size={16}>
                        <div>
                            <Text strong>Author: </Text>
                            <Text>{modelInfo.author}</Text>
                        </div>
                        <div>
                            <Text strong>Domain: </Text>
                            <Tag color="purple">{modelInfo.domain}</Tag>
                        </div>
                    </Space>
                </div>

                <div>
                    <Title level={4}>📝 Description</Title>
                    <Paragraph className="model-description">
                        {modelInfo.description}
                    </Paragraph>
                </div>

                <div>
                    <Title level={4}>✨ Key Features</Title>
                    <Space direction="vertical" size={8}>
                        {modelInfo.features.map((feature, index) => (
                            <div key={index} className="feature-item">
                                <Text>• {feature}</Text>
                            </div>
                        ))}
                    </Space>
                </div>

                <Divider />

                <div>
                    <Title level={4}>🔧 Requirements</Title>
                    <Space wrap>
                        <Tag color="blue">BioCypher {modelInfo.requirements.biocypher}</Tag>
                        <Tag color="green">Python {modelInfo.requirements.python}</Tag>
                        <Tag color="orange">{modelInfo.requirements.memory}</Tag>
                    </Space>
                </div>

                <div>
                    <Title level={4}>🚀 Quick Example</Title>
                    <pre className="code-example">
{`from biocypher import BioCypher
from ${adapterId} import ExampleAdapter

# Initialize BioCypher
bc = BioCypher()

# Load adapter
adapter = ExampleAdapter()
bc.add_adapter(adapter)

# Run pipeline
bc.run()`}
          </pre>
                </div>
            </Space>
        </div>
    )
}

export default ModelCard