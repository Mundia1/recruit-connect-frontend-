import React from 'react';
import PropTypes from 'prop-types';

const DataTable = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-[var(--border-light)]">
        <thead className="bg-[var(--bg-secondary)]">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider"
              >
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-[var(--bg-primary)] divide-y divide-[var(--border-light)]">
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((column) => (
                <td key={column.accessor} className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-primary)]">
                  {column.Cell ? column.Cell({ value: row[column.accessor] }) : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    Header: PropTypes.string.isRequired,
    accessor: PropTypes.string.isRequired,
    Cell: PropTypes.func,
  })).isRequired,
  data: PropTypes.array.isRequired,
};

export default DataTable;
