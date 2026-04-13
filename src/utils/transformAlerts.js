export function flattenAlerts(contacts) {
    const result = [];

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];

        for (let j = 0; j < contact.alerts.length; j++) {
            const alert = contact.alerts[j];
            result.push({
                errorId: alert.errorId,
                errorSeverity: alert.errorSeverity,
                errorMessage: alert.errorMessage,
                longMessage: alert.longMessage,
                errorTime: alert.errorTime,
                contactName: contact.contactName,
                contactSatellite: contact.contactSatellite,
                contactDetail: contact.contactDetail,
                contactBeginTimestamp: contact.contactBeginTimestamp,
                contactEndTimestamp: contact.contactEndTimestamp,
            })
        }
    }

    return result;
}