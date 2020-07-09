import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Text, Spinner, Dialog } from 'evergreen-ui';
import { copyToClipboard } from 'copy-lite';

const DataTable = ({ isFetching, reports, bottomRef }) => {
  const [listNumber, setListNumber] = useState(15);
  const [isBottom, setIsBottom] = useState(false);
  const [isDialogShown, setIsDialogShown] = useState(false);
  const [dialogID, setDialogID] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleScroll = event => {
    const { scrollHeight, scrollTop, clientHeight } = event.target;
    const bottom = scrollHeight - scrollTop === clientHeight;

    if (bottom) {
      const reportsArr = [...reports];

      if (reportsArr.length > listNumber) {
        if (!isBottom) {
          setIsBottom(true);
        }

        setTimeout(() => {
          setListNumber(listNumber + 15);
        }, 1000);
      } else if (isBottom) {
        setIsBottom(false);
      }
    }
  };

  let controlledList;

  if (reports) {
    controlledList = [...reports];
    controlledList.length = listNumber;
  } else {
    controlledList = null;
  }

  return (
    <>
      <Table
        onScroll={handleScroll}
        elevation={1}
        marginTop={25}
        marginBottom={25}
        borderRadius={8}
      >
        <Dialog
          isShown={isDialogShown}
          hasHeader={false}
          confirmLabel={isCopied ? 'Copied' : 'Copy'}
          onConfirm={close => {
            copyToClipboard(controlledList[dialogID].persistent_id);
            setIsCopied(true);
          }}
          onCloseComplete={() => {
            setIsDialogShown(false);
            setIsCopied(false);
          }}
        >
          <Text>
            <b>CRIME_ID:</b>
            <br />
            {isDialogShown && controlledList[dialogID].persistent_id}
          </Text>
        </Dialog>

        <Table.Head>
          <Table.TextHeaderCell>NO.</Table.TextHeaderCell>
          <Table.TextHeaderCell>ID</Table.TextHeaderCell>
          <Table.TextHeaderCell>DATE</Table.TextHeaderCell>
          <Table.TextHeaderCell>STATUS</Table.TextHeaderCell>
        </Table.Head>

        <Table.Body height={475}>
          {isFetching && <Spinner size={50} marginX="auto" marginY={10} />}

          {!isFetching && controlledList && controlledList[0] === undefined && (
            <Table.Row>
              <Table.TextCell>
                <Text size={600} marginLeft={10}>
                  There is no reports available.
                </Text>
              </Table.TextCell>
            </Table.Row>
          )}

          {!isFetching &&
            controlledList &&
            controlledList[0] !== undefined &&
            controlledList.map((report, i) => (
              <Table.Row
                key={i}
                isSelectable
                onSelect={() => {
                  setIsDialogShown(true);
                  setDialogID(i);
                }}
              >
                <Table.TextCell>{i + 1}</Table.TextCell>
                <Table.TextCell>{report.persistent_id}</Table.TextCell>
                <Table.TextCell>{report.month}</Table.TextCell>
                <Table.TextCell>
                  {report.outcome_status.category}
                </Table.TextCell>
              </Table.Row>
            ))}

          {isBottom && <Spinner size={50} marginX="auto" marginY={10} />}
        </Table.Body>
      </Table>
      <div ref={bottomRef}></div>
    </>
  );
};

DataTable.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  reports: PropTypes.array.isRequired,
  bottomRef: PropTypes.object.isRequired
};

export default DataTable;
