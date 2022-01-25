/* eslint-disable no-unused-vars */
import { useMemo, useState } from 'react';
import removeAccents from '../helpers/removeAccents';

const useSortableData = (items, row, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    const sortableItems = [...items];
    if (sortConfig !== null) {
      const sortKey = sortConfig.key.row;
      const { direction } = sortConfig;
      if (sortConfig.key.isTag) {
        sortableItems.sort((a, b) => {
          if (direction === 'ascending') {
            if (a[sortKey][0].nombre > b[sortKey][0].nombre) {
              return 1;
            }
            if (a[sortKey][0].nombre < b[sortKey][0].nombre) return -1;
            return 0;
          }
          if (a[sortKey][0].nombre < b[sortKey][0].nombre) return 1;
          if (a[sortKey][0].nombre > b[sortKey][0].nombre) return -1;
          return 0;
        });
      } else if (sortConfig.key.isDouble) {
        const field = sortConfig.key.row[0];
        sortableItems.sort((a, b) => {
          if (direction === 'ascending') {
            if (a[field] > b[field]) {
              return 1;
            }
            if (a[field] < b[field]) return -1;
            return 0;
          }
          if (a[field] < b[field]) return 1;
          if (a[field] > b[field]) return -1;
          return 0;
          /* return console.log(sortConfig.key.row[0]); */
        });
      } else {
        sortableItems.sort((a, b) => {
          if (direction === 'ascending') {
            if (removeAccents(a[sortKey]) > removeAccents(b[sortKey])) return 1;
            if (removeAccents(a[sortKey]) < b[sortKey]) return -1;
            console.log(a[sortKey], b[sortKey]);
            return 0;
          }
          console.log(a[sortKey], b[sortKey]);
          if (removeAccents(a[sortKey][0]) < removeAccents(b[sortKey][0])) return 1;
          if (removeAccents(a[sortKey][0]) > removeAccents(b[sortKey][0])) return -1;
          return 0;
        });
      }
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig
      && sortConfig.key.row === key.row
      && sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    if (key.isTag) {
      setSortConfig({ key, direction });
    }
    setSortConfig({ key, direction });
  };
  return { items: sortedItems, requestSort };
};
export default useSortableData;
