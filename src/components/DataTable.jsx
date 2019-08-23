import React from 'react';
import { Table, Text, toaster, Pane, Spinner } from 'evergreen-ui';

class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listNumber: 15
    };

    this.handleScrolling = this.handleScrolling.bind(this);
  }

  handleScrolling(event) {
    const { listNumber } = this.state;
    // console.log('<><><><>Scrolling');

    const bottom =
      event.target.scrollHeight - event.target.scrollTop ===
      event.target.clientHeight;

    if (bottom) {
      this.setState({ listNumber: listNumber + 15 });
    }
  }

  render() {
    const { listNumber } = this.state;
    const { reports } = this.props;

    let controlledList;

    if (reports) {
      controlledList = [...reports];
      controlledList.length = listNumber;
    } else {
      controlledList = null;
    }

    return (
      <Table
        onScroll={this.handleScrolling}
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
          {!controlledList && (
            <Pane>
              <Spinner size={50} marginX="auto" marginY={10} />
            </Pane>
          )}
          {controlledList && controlledList[0] === undefined && (
            <Table.Row>
              <Table.TextCell>
                <Text size={600} marginLeft={10}>
                  There is no report available.
                </Text>
              </Table.TextCell>
            </Table.Row>
          )}
          {controlledList &&
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
        </Table.Body>
      </Table>
    );
  }
}

export default DataTable;
