import React from 'react';
import PropTypes from 'prop-types';

const TagsList = ({ data }) => {
  return (
    <>
      {data && (
        <>
          {
            data.map((tag, index) => {
              if (index < 2) return <span key={tag.id}>{tag.nombre}</span>;
              return null;
            })
          }
          {
            data.length > 2 && (
              <span key="plus" className="num">
                {`+${data.length - 2}`}
              </span>
            )
          }
        </>
      )}
    </>
  );
};

TagsList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TagsList;
