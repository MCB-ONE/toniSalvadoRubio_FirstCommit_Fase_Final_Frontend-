import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoChevronDown } from 'react-icons/go';
import { IoSettingsOutline, IoExitOutline, IoPersonOutline } from 'react-icons/io5';
import { FaRegBell } from 'react-icons/fa';
import Dropdown from '../../dropdown/Dropdown';
import FilterSearch from '../../filterSearch/FilterSearch';
import { logout } from '../../../store/slices/auth';

const AdminHeader = () => {
  const [dropdown, setDropdown] = useState(false);
  const userData = useSelector((state) => state.auth.user.data);
  const dispatch = useDispatch();

  const onMouseEnter = () => {
    setDropdown(true);
  };

  const onMouseLeave = () => {
    setDropdown(false);
  };

  const logoutHandler = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <header className="admin-header">
      <FilterSearch
        bgColor="light"
        marginStart
      />
      <div
        className="profile"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="profile-img">
          <img src="/images/profile-default-img.jpg" alt="profile" />
        </div>
        <h3
          className="name"
        >
          {userData ? userData.fullName : 'Name'}
        </h3>
        <GoChevronDown className="dropdown-button" />
        {dropdown && (
        <Dropdown MenuItems={[
          {
            title: 'Perfil',
            path: '/',
            cName: 'cm-dropdown-link',
            icon: <IoPersonOutline />,
          },
          {
            title: 'Mensajes',
            path: '/',
            cName: 'cm-dropdown-link',
            icon: <FaRegBell />,
          },
          {
            title: 'Ajustes',
            path: '/',
            cName: 'cm-dropdown-link',
            icon: <IoSettingsOutline />,
          },
          {
            title: 'Salir',
            path: '/',
            cName: 'cm-dropdown-link',
            icon: <IoExitOutline />,
            onclick: logoutHandler,
          },
        ]}
        />
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
