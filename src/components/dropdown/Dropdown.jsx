import React from 'react';
import PropTypes from 'prop-types';
import './dropdown.scss';
import { Link } from 'react-router-dom';

function Dropdown({ MenuItems }) {
  return (
    <>
      <ul
        className="cm-dropdown-menu bg-dark"
      >
        {MenuItems.map((item) => {
          return (
            <li key={item.title}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={item.onclick}
              >
                {item.icon}
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

Dropdown.propTypes = {
  MenuItems: PropTypes.array,
};

Dropdown.defaultProps = {
  MenuItems: [],
};

export default Dropdown;
