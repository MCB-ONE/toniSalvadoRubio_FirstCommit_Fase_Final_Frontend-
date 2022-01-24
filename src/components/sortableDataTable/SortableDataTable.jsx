import React from 'react';
import PropTypes from 'prop-types';
/** Styles import */
import './dataTable.scss';
import { Link } from 'react-router-dom';
import TableHeader from './TableHeader';
import TagsList from '../tags/TagsList';
import useSortableData from '../../hooks/useSortableData';

const SortableDataTable = ({ data, columns }) => {
  // Use custom hook
  const { items, requestSort } = useSortableData(data);
  // Conditional styles for estado labels
  const renderSwitchClass = (value) => {
    switch (value) {
      case 'contratado':
        return 'success';
      case 'en_proceso':
        return 'pending';
      case 'libre':
        return 'free';
      case 'descartado':
        return 'error';
      default:
        return 'free';
    }
  };

  return (
    <div className="cm-table">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => {
              const {
                label, row, sortable, isTag,
              } = col;
              return (
                <TableHeader
                  key={row}
                  label={label}
                  sortable={sortable}
                  onClick={() => requestSort({ row, isTag })}
                />
              );
            })}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => {
                // eslint-disable-next-line no-nested-ternary
                return column.isTag
                  ? (
                    <td key={item[column.label]} className="tags">
                      <TagsList data={item[column.row]} />
                    </td>
                  )
                  // eslint-disable-next-line no-nested-ternary
                  : column.isState
                    ? (
                      <td className="estado" key={item[column.row]}>
                        {column.link
                          ? (
                            <Link to={column.link.to}>
                              <span>{item[column.row]}</span>
                            </Link>
                          ) : (
                            <span className={renderSwitchClass(item[column.row])}>
                              {item[column.row]}
                            </span>
                          )}
                      </td>
                    ) : column.isNum
                      ? (
                        <td key={item[column.row]} className="num">
                          {column.link
                            ? (
                              <Link to={column.link.to}>
                                {item[column.row]}
                              </Link>
                            ) : (
                              <>{item[column.row]}</>
                            )}
                        </td>
                      )
                      : (
                        <td key={item[column.row]}>
                          {column.link
                            ? (
                              <Link to={column.link.to}>
                                {item[column.row]}
                              </Link>
                            ) : (
                              <>{item[column.row]}</>
                            )}
                        </td>
                      );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

SortableDataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

export default SortableDataTable;
