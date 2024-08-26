import { Button, Pagination } from '@nextui-org/react';
import React, { useCallback, useMemo } from 'react';

// State
import tableActionCreators from '@/_private/lib/actions/tableActions';

// Types
import { Simulation } from '@/_private/types/lib/simulationTypes';
import { TableAction, TableType } from '@/_private/types/lib/tableTypes';

export default function DashboardFooter({
  table,
  dispatchTable,
  allItems,
}: {
  table: TableType,
  dispatchTable: React.Dispatch<TableAction>,
  allItems: Simulation[]
}) {
  const pages = useMemo((): number => (
    Math.ceil((allItems.length || 1) / table.page.rows)
  ), [allItems.length, table.page.rows]);

  const onNextPage = useCallback((): void => {
    if (table.page.current < pages) {
      tableActionCreators.updatePageCurrent(dispatchTable, table.page.current + 1);
    }
  }, [pages, table.page.current]);

  const onPreviousPage = useCallback((): void => {
    if (table.page.current > 1) {
      tableActionCreators.updatePageCurrent(dispatchTable, table.page.current - 1);
    }
  }, [pages, table.page.current]);

  const onChange = useCallback((page: number): void => {
    tableActionCreators.updatePageCurrent(dispatchTable, page);
  }, []);

  return (
    <footer className="p-4 border-t border-t-neutral-800 flex justify-between">
      <Button
        isDisabled={table.page.current === 1}
        onPress={onPreviousPage}
      >
        ←
      </Button>
      <Pagination
        isCompact
        showShadow
        color="primary"
        page={table.page.current}
        total={pages}
        onChange={onChange}
      />
      <Button
        isDisabled={table.page.current === pages}
        onPress={onNextPage}
      >
        →
      </Button>
    </footer>
  );
}
