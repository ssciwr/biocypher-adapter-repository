import { Card, Typography, Button, Space, Tag, Tooltip, message } from 'antd'
import { CopyOutlined, PlusOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import { useState, useEffect } from 'react'
import { useAdapterStore } from '../../../stores/AdapterStore'
import { getDeduplicationResult } from '../../../services/adapterService'

const { Title, Text } = Typography

interface DuplicationPanelProps {
    adapterId: string
}

const DuplicationPanel: React.FC<DuplicationPanelProps> = observer(({ adapterId }) => {
    const adapterStore = useAdapterStore()
    const [loading, setLoading] = useState(false)
    const [cachedResults, setCachedResults] = useState<{[key: string]: number}>({})

    useEffect(() => {
        adapterStore.addSelectedAdapter(adapterId)
        return () => {
            adapterStore.removeSelectedAdapter(adapterId)
        }
    }, [adapterId, adapterStore])

    useEffect(() => {
        // Fetch cached deduplication results for selected adapters
        const fetchCachedResults = async () => {
            const selectedAdapters = adapterStore.selectedAdapters.filter(id => id !== adapterId)
            const results: {[key: string]: number} = {}
            
            for (const otherAdapterId of selectedAdapters) {
                try {
                    const result = await getDeduplicationResult(adapterId, otherAdapterId)
                    if (result) {
                        results[otherAdapterId] = result.duplicationRate
                    }
                } catch (error) {
                    console.error('Failed to fetch deduplication result:', error)
                }
            }
            
            setCachedResults(results)
        }

        if (adapterStore.selectedAdapters.length > 1) {
            fetchCachedResults()
        }
    }, [adapterId, adapterStore.selectedAdapters])

    const handleCopyCommand = () => {
        const command = adapterStore.generateCLICommand()
        navigator.clipboard.writeText(command)
        message.success('Command copied to clipboard!')
    }

    const handleAddAdapter = () => {
        // Open adapter selection modal
        message.info('Adapter selection coming soon!')
    }

    const selectedAdapters = adapterStore.selectedAdapters.filter(id => id !== adapterId)

    /* As commented below, this panel only has use with a developed CLI/API to calculate the duplication/coverage/
    data compatibility of adapters, and it would be a stretch to save output of crowd-soruced researchers on to the
    central data we store in any case. Read here for more, if this is implemented, it makes more sense to implement
    this panel: https://github.com/biocypher/biocypher/discussions/451#discussioncomment-13588587
     */
    return(<div></div>)

    return (
        <Card className="duplication-panel card-base">
            <Title level={5} className="section-header">🔍 Duplication Analysis</Title>

            <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <div>
                    Pipeline namespace compatibility {/* This would use the CLI API (that does not exist
                    discussed here: https://github.com/biocypher/biocypher/discussions/451#discussioncomment-13588587
                    It's pointless to have this until that gets implemented, so this is hidden for now.
                    */}
                </div>
                <div>
                    <Text type="secondary" className="section-label">Selected Adapters</Text>
                    <div className="selected-adapters flex flex-wrap gap-8 align-center">
                        {selectedAdapters.length === 0 ? (
                            <Text type="secondary">No other adapters selected</Text>
                        ) : (
                            selectedAdapters.map(id => (
                                <Tag
                                    key={id}
                                    closable
                                    onClose={() => adapterStore.removeSelectedAdapter(id)}
                                    className="adapter-tag tag-base"
                                >
                                    {id}
                                </Tag>
                            ))
                        )}
                    </div>
                    <div>
                        <Button
                            type="dashed"
                            icon={<PlusOutlined />}
                            onClick={handleAddAdapter}
                            className="add-adapter-btn btn-primary"
                        >
                            Adapter Comparison
                        </Button>
                        <div style={{ 
                            textAlign: 'center', 
                            marginTop: '4px', 
                            color: '#999', 
                            fontSize: '12px' 
                        }}>
                            to calculate deduplication
                        </div>
                    </div>
                </div>

                {selectedAdapters.length > 0 && (
                    <>
                        <div className="overlap-results">
                            <Text type="secondary" className="section-label">Overlap Analysis</Text>
                            {Object.keys(cachedResults).length > 0 ? (
                                <Space direction="vertical" size={8} style={{ width: '100%' }}>
                                    {Object.entries(cachedResults).map(([otherAdapterId, rate]) => (
                                        <div key={otherAdapterId} className="overlap-item list-item">
                                            <Text strong>vs {otherAdapterId}: </Text>
                                            <Text className="overlap-percentage">
                                                {rate}%
                                            </Text>
                                            <Tag size="small" color="green">cached</Tag>
                                        </div>
                                    ))}
                                </Space>
                            ) : (
                                <div className="cli-command-section">
                                    <Text type="secondary">
                                        No cached deduplication data available. Run this command to calculate:
                                    </Text>
                                    <div className="command-box code-block-base">
                                        <code>{adapterStore.generateCLICommand()}</code>
                                        <Tooltip title="Copy command">
                                            <Button
                                                type="text"
                                                icon={<CopyOutlined />}
                                                onClick={handleCopyCommand}
                                                className="copy-btn"
                                            />
                                        </Tooltip>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </Space>
        </Card>
    )
})

export default DuplicationPanel