import React from 'react';
import { Table, Text, toaster, Spinner, Pane } from 'evergreen-ui';

function DataTable(props) {
  const { reports } = props;
  return (
    <Table elevation={1} marginTop={25} marginBottom={25}>
      <Table.Head>
        <Table.TextHeaderCell>No.</Table.TextHeaderCell>
        <Table.TextHeaderCell>ID</Table.TextHeaderCell>
        <Table.TextHeaderCell>Date</Table.TextHeaderCell>
        <Table.TextHeaderCell>Status</Table.TextHeaderCell>
      </Table.Head>
      <Table.Body height={475}>
        {!reports && (
          <Pane>
            <Spinner size={50} marginX="auto" marginY={120} />
          </Pane>
        )}
        {reports && reports[0] === undefined && (
          <Table.Row>
            <Table.TextCell>
              <Text size={600} marginLeft={10}>
                There is no reports available.
              </Text>
            </Table.TextCell>
          </Table.Row>
        )}
        {reports &&
          reports[0] !== undefined &&
          reports.map((report, i) => (
            <Table.Row
              key={i}
              isSelectable
              onSelect={() =>
                toaster.notify(report.outcome_status.category, {
                  id: i
                })
              }
            >
              <Table.TextCell>{i + 1}</Table.TextCell>
              <Table.TextCell>{report.id}</Table.TextCell>
              {/* <Table.TextCell>{report.category}</Table.TextCell> */}
              <Table.TextCell>{report.outcome_status.date}</Table.TextCell>
              <Table.TextCell isNumber>
                {report.outcome_status.category}
              </Table.TextCell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
}

export default DataTable;
