import React from 'react';
import { Table, Text, Pane, Spinner, Dialog } from 'evergreen-ui';
import { copyToClipboard } from 'copy-lite';

class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listNumber: 15,
      isBottom: false,
      isDialogShown: false,
      dialogID: null
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll(event) {
    const { scrollHeight, scrollTop, clientHeight } = event.target;
    const bottom = scrollHeight - scrollTop === clientHeight;

    if (bottom) {
      const { listNumber, isBottom } = this.state;
      const { reports } = this.props;
      const reportsArr = [...reports];

      if (reportsArr.length > listNumber) {
        if (!isBottom) {
          this.setState({ isBottom: true });
        }

        setTimeout(() => {
          this.setState({ listNumber: listNumber + 15 });
        }, 1000);
      } else if (isBottom) {
        this.setState({ isBottom: false });
      }
    }
  }

  render() {
    const { listNumber, isBottom, isDialogShown, dialogID } = this.state;
    const { reports, fetchingReports } = this.props;
    // console.log(reports);

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
        borderRadius={8}
      >
        <Dialog
          isShown={isDialogShown}
          onCloseComplete={() => this.setState({ isDialogShown: false })}
          hasHeader={false}
          confirmLabel="Copy"
          onConfirm={close =>
            copyToClipboard(controlledList[dialogID].persistent_id)
          }
        >
          <Text>
            Crime_ID: {isDialogShown && controlledList[dialogID].persistent_id}
          </Text>
        </Dialog>
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
                  // toaster.notify(report.outcome_status.category, {
                  //   id: i
                  // })
                  this.setState({ isDialogShown: true, dialogID: i })
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
