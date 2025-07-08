import { Card } from 'antd'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

function Overview() {
  return (
    <div>
      <Header showRegisterButton={true} />
      <Card title="Overview" style={{ width: 300 }}>
        <p>This is the overview page.</p>
        <Link to="/adapter/example">Go to Adapter</Link>
      </Card>
    </div>
  )
}

export default Overview