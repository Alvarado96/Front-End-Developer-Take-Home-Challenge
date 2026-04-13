import { useState } from 'react';
import { RuxDialog } from '@astrouxds/react';
import alertData from './data/data.json';
import { flattenAlerts } from './utils/transformAlerts';
import './App.css';

function App() {
  const [severityFilter, setSeverityFilter] = useState('all');
  const [acknowledgedIds, setAcknowledgedIds] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const allAlerts = flattenAlerts(alertData);

  let filteredAlerts = [];
  if (severityFilter === 'all') {
    filteredAlerts = allAlerts;
  } else {
    filteredAlerts = allAlerts.filter((alert) => alert.errorSeverity === severityFilter);
  }

  // get the latest alerts
  const sortedAlerts = [...filteredAlerts].sort((a, b) => b.errorTime - a.errorTime);

  function acknowledge(errorId) {
    if (acknowledgedIds.includes(errorId)) {
      return;
    }
    setAcknowledgedIds([...acknowledgedIds, errorId]);
  }

  // turn seconds into a readable time string
  function formatTime(seconds) {
    const date = new Date(seconds * 1000);
    return date.toLocaleString();
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>GRM Alerts Dashboard</h1>

      <label>
        Filter by severity:{' '}
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="critical">Critical</option>
          <option value="serious">Serious</option>
          <option value="caution">Caution</option>
          <option value="warning">Warning</option>
        </select>
      </label>

      <p>Showing {sortedAlerts.length} alerts</p>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Severity</th>
            <th>Alert Message</th>
            <th>Contact Name</th>
            <th>Contact Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedAlerts.map((alert, index) => {
            const isAcked = acknowledgedIds.includes(alert.errorId);

            return (
              <tr
                key={alert.errorId + '-' + index}
                style={{ opacity: isAcked ? 0.4 : 1 }}
              >
                <td>{alert.errorSeverity}</td>
                <td>{alert.errorMessage}</td>
                <td>{alert.contactName}</td>
                <td>{formatTime(alert.contactBeginTimestamp)} - {formatTime(alert.contactEndTimestamp)}</td>
                <td>
                  <button onClick={() => setSelectedAlert(alert)}>
                    Show Details
                  </button>
                  {' '}
                  <button
                    disabled={isAcked}
                    onClick={() => acknowledge(alert.errorId)}
                  >
                    {isAcked ? 'Acknowledged' : 'Acknowledge'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {selectedAlert !== null && (
        <RuxDialog open={true} header="Alert Details" onRuxdialogclosed={() => setSelectedAlert(null)}>
          <p><strong>Satellite:</strong> {selectedAlert.contactSatellite}</p>
          <p><strong>Detail:</strong> {selectedAlert.contactDetail}</p>
        </RuxDialog>
      )}
    </div>
  );
}

export default App;
