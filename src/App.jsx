import { useState, useMemo } from 'react';
import { RuxDialog, RuxTable, RuxTableHeader, RuxTableHeaderRow, RuxTableHeaderCell, RuxTableBody, RuxTableRow, RuxTableCell, RuxButton, RuxSelect, RuxOption, RuxStatus } from '@astrouxds/react';
import alertData from './data/data.json';
import { flattenAlerts } from './utils/transformAlerts';
import './App.css';

const severityStatus = {
  critical: 'critical',
  serious: 'serious',
  caution: 'caution',
  warning: 'caution',
};

function App() {
  const [severityFilter, setSeverityFilter] = useState('all');
  const [acknowledgedIds, setAcknowledgedIds] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const allAlerts = flattenAlerts(alertData);

  // filter alerts based on severity
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
    <div className="dashboard">
      <h1>GRM Alerts Dashboard</h1>

      <div className="filter-bar">
        <RuxSelect
          label="Filter by severity"
          value={severityFilter}
          onRuxchange={(e) => setSeverityFilter(e.target.value)}
        >
          <RuxOption value="all" label="All" />
          <RuxOption value="critical" label="Critical" />
          <RuxOption value="serious" label="Serious" />
          <RuxOption value="caution" label="Caution" />
          <RuxOption value="warning" label="Warning" />
        </RuxSelect>
        <span className="alert-count">Showing {sortedAlerts.length} alerts</span>
      </div>

      <RuxTable>
        <RuxTableHeader>
          <RuxTableHeaderRow>
            <RuxTableHeaderCell>Severity</RuxTableHeaderCell>
            <RuxTableHeaderCell>Alert Message</RuxTableHeaderCell>
            <RuxTableHeaderCell>Contact Name</RuxTableHeaderCell>
            <RuxTableHeaderCell>Contact Time</RuxTableHeaderCell>
            <RuxTableHeaderCell>Actions</RuxTableHeaderCell>
          </RuxTableHeaderRow>
        </RuxTableHeader>
        <RuxTableBody>
          {sortedAlerts.map((alert, index) => {
            const isAcked = acknowledgedIds.includes(alert.errorId);

            return (
              <RuxTableRow
                key={alert.errorId + '-' + index}
                style={{ opacity: isAcked ? 0.4 : 1 }}
              >
                <RuxTableCell>
                  <span className="severity-cell">
                    <RuxStatus status={severityStatus[alert.errorSeverity] || 'normal'} />
                    {alert.errorSeverity}

                  </span>
                </RuxTableCell>
                <RuxTableCell>{alert.errorMessage}</RuxTableCell>
                <RuxTableCell>{alert.contactName}</RuxTableCell>
                <RuxTableCell>{formatTime(alert.contactBeginTimestamp)} - {formatTime(alert.contactEndTimestamp)}</RuxTableCell>
                <RuxTableCell>
                  <span className="buttons-cell">
                    <RuxButton onClick={() => setSelectedAlert(alert)}>
                      Show Details
                    </RuxButton>
                    <RuxButton
                      disabled={isAcked}
                      onClick={() => acknowledge(alert.errorId)}
                    >
                      {isAcked ? 'Acknowledged' : 'Acknowledge'}
                    </RuxButton>
                  </span>
                </RuxTableCell>
              </RuxTableRow>
            );
          })}
        </RuxTableBody>
      </RuxTable>
      {selectedAlert !== null && (
        <RuxDialog open={true} header="Alert Details" onRuxdialogclosed={() => setSelectedAlert(null)}>
          <div className="dialog-content">
            <p><strong>Satellite:</strong> {selectedAlert.contactSatellite}</p>
            <p><strong>Detail:</strong> {selectedAlert.contactDetail}</p>
            <p><strong>Long Message:</strong> {selectedAlert.longMessage}</p>
            <p><strong>Category:</strong> {selectedAlert.errorCategory}</p>
            <p><strong>Time:</strong> {formatTime(selectedAlert.errorTime / 1000)}</p>
          </div>
        </RuxDialog>
      )}
    </div>
  );
}

export default App;
