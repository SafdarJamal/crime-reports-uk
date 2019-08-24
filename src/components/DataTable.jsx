import React from 'react';
import { Table, Text, Pane, Spinner, toaster } from 'evergreen-ui';

class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listNumber: 15,
      isBottom: false
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll(event) {
    const bottom =
      event.target.scrollHeight - event.target.scrollTop ===
      event.target.clientHeight;

    if (bottom) {
      const { listNumber } = this.state;
      const { reports } = this.props;
      console.log('=====>>> 111');

      const reportsArr = [...reports];
      if (reportsArr.length > listNumber) {
        console.log('=====>>> 222');
        this.setState({ isBottom: true });

        setTimeout(() => {
          this.setState({ isBottom: false, listNumber: listNumber + 15 });
        }, 2000);
      }
    }
  }

  render() {
    const { listNumber, isBottom } = this.state;
    const { reports, fetchingReports } = this.props;

    let controlledList;

    if (reports) {
      controlledList = [...reports];
      controlledList.length = listNumber;
    } else {
      controlledList = null;
    }

    return (
      <Table
        onScroll={this.handleScroll}
        elevation={1}
        marginTop={25}
        marginBottom={25}
      >
        <Table.Head>
          <Table.TextHeaderCell>NO.</Table.TextHeaderCell>
          <Table.TextHeaderCell>ID</Table.TextHeaderCell>
          <Table.TextHeaderCell>DATE</Table.TextHeaderCell>
          <Table.TextHeaderCell>STATUS</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height={475}>
          {fetchingReports && (
            <Pane>
              <Spinner size={50} marginX="auto" marginY={10} />
            </Pane>
          )}
          {!fetchingReports &&
            controlledList &&
            controlledList[0] === undefined && (
              <Table.Row>
                <Table.TextCell>
                  <Text size={600} marginLeft={10}>
                    There is no report available.
                  </Text>
                </Table.TextCell>
              </Table.Row>
            )}
          {!fetchingReports &&
            controlledList &&
            controlledList[0] !== undefined &&
            controlledList.map((report, i) => (
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
                <Table.TextCell>{report.persistent_id}</Table.TextCell>
                <Table.TextCell>{report.outcome_status.date}</Table.TextCell>
                <Table.TextCell>
                  {report.outcome_status.category}
                </Table.TextCell>
              </Table.Row>
            ))}
          {isBottom && (
            <Pane>
              <Spinner size={50} marginX="auto" marginY={10} />
            </Pane>
          )}
        </Table.Body>
      </Table>
    );
  }
}

export default DataTable;
