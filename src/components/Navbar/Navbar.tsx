import React from 'react';
import {
  Toolbar,
  Typography,
  IconButton,
  AppBar,
  Menu,
  MenuItem,
  Container,
  SpeedDialIcon,
  Avatar,
  SpeedDial,
  SpeedDialAction,
} from '@mui/material';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu as MenuIcon } from '@mui/icons-material';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { ColorSchema, MuiNavBarButton } from '../MuiStyling/MuiStyling';
import { routerPath } from '../../common/constants/routerPath';
import { getCookie } from '../../common/helper/storage';
import { useAppDispatch, useAppSelector } from '../../common/hooks/ReduxHook';
import { AuthActionType, AuthenticationStatus } from '../../reduxToolKit-Saga/types/auth';
import CustomFooter from '../Footer/CustomFooter';
import { useWindowWidth } from '../../common/hooks/Window';
import { setScrollTopDisplay } from '../../reduxToolKit-Saga/common/General/GeneralSlice';
import { Tab } from '../../pages/client/Account/Account';

const Navbar = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const scrollTopDisplay = useAppSelector((globalState) => globalState.general.scrollTopDisplay);
  const [windowWidth] = useWindowWidth();
  const navigate = useNavigate();
  const token = getCookie('token');
  const userInfo = useAppSelector((globalState) => globalState.clientInfo);
  const status = useAppSelector((globalState) => globalState.login.status);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScroll = React.useCallback(() => {
    const position = window.pageYOffset;
    if (position >= 600 && scrollTopDisplay === false) {
      dispatch(setScrollTopDisplay(true));
    }
    if (position <= 600 && scrollTopDisplay) {
      dispatch(setScrollTopDisplay(false));
    }
  }, [dispatch, scrollTopDisplay]);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch({
      type: AuthActionType.LOGOUT,
    });
  };

  const renderMenuItem = () => {
    if (token === undefined) {
      let result = (
        <div>
          <MenuItem>
            <Link to={routerPath.auth.LOG_IN}>Sign In</Link>
          </MenuItem>
        </div>
      );

      if (windowWidth < 600) {
        result = (
          <div>
            <Link to={routerPath.common.HOME}>
              <MenuItem>Home</MenuItem>
            </Link>
            <MenuItem>
              <Link to={routerPath.common.BRAND}>Brand</Link>
            </MenuItem>
            <MenuItem>
              <Link to={routerPath.common.BLOGS}>Blog</Link>
            </MenuItem>
            <MenuItem>
              <Link to={routerPath.auth.LOG_IN}>Sign In</Link>
            </MenuItem>
          </div>
        );
      }

      return result;
    }

    return windowWidth > 600 ? (
      <div>
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
        <MenuItem>
          <Link to={routerPath.auth.MY_ACCOUNT}>My Account</Link>
        </MenuItem>
      </div>
    ) : (
      <div>
        <MenuItem>
          <Link to={routerPath.common.HOME}>Home</Link>
        </MenuItem>
        <MenuItem>
          <Link to={routerPath.common.BRAND}>Brand</Link>
        </MenuItem>
        <MenuItem>
          <Link to={routerPath.common.BLOGS}>Blog</Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
        <MenuItem>
          <Link to={routerPath.auth.MY_ACCOUNT}>My Account</Link>
        </MenuItem>
      </div>
    );
  };

  const renderAvatar = () => {
    if (status === AuthenticationStatus.Authorized && userInfo.avatar && windowWidth > 600) {
      return <Avatar alt="" src={userInfo.avatar} />;
    } else if (windowWidth < 600) {
      return <MenuIcon fontSize="large" />;
    }
    return <Avatar alt="" src="" />;
  };

  return (
    <div>
      <AppBar position="fixed" sx={{ backgroundColor: '#fff' }}>
        <Toolbar variant="regular" sx={{ width: '100%', paddingBlock: '20px' }}>
          <Typography variant="h6" color="inherit" sx={{ letterSpacing: '2px', color: 'black', fontWeight: 600 }}>
            Gara-Auto
          </Typography>
          <Container sx={{ display: 'flex', justifyContent: 'flex-end', marginInline: '0', ml: 'auto' }}>
            {windowWidth > 600 ? (
              <div>
                <Link to={routerPath.common.HOME}>
                  <MuiNavBarButton sx={{ color: `${pathname.includes('home') ? 'black' : '#C4C4C4'}` }}>
                    Home
                  </MuiNavBarButton>
                </Link>
                <Link to={routerPath.common.BRAND}>
                  <MuiNavBarButton sx={{ color: `${pathname.includes('brand') ? 'black' : '#C4C4C4'}` }}>
                    Brand
                  </MuiNavBarButton>
                </Link>
                <Link to={routerPath.common.BLOGS}>
                  <MuiNavBarButton sx={{ color: `${pathname.includes('blog') ? 'black' : '#C4C4C4'}` }}>
                    Blog
                  </MuiNavBarButton>
                </Link>
                <IconButton sx={{ color: 'black' }} onClick={handleClick}>
                  {renderAvatar()}
                  <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                    {renderMenuItem()}
                  </Menu>
                </IconButton>
              </div>
            ) : (
              <div>
                <IconButton sx={{ color: 'black' }} onClick={handleClick}>
                  {renderAvatar()}
                  <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    {renderMenuItem()}
                  </Menu>
                </IconButton>
              </div>
            )}
          </Container>
        </Toolbar>
      </AppBar>
      <Outlet />
      <CustomFooter windowWidth={windowWidth} />
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={{ position: 'fixed', bottom: 18, left: 18, display: scrollTopDisplay ? 'flex' : 'none' }}
        icon={<SpeedDialIcon />}
        className="speed-dial"
      >
        <SpeedDialAction
          key={'Scroll to top'}
          icon={<ArrowUpwardRoundedIcon sx={{ color: ColorSchema.LightGreen }} />}
          tooltipTitle={'Scroll to top'}
          onClick={scrollToTop}
        />

        {token && pathname !== routerPath.auth.MY_ACCOUNT && (
          <SpeedDialAction
            key="Wish list"
            icon={<FavoriteIcon sx={{ color: ColorSchema.LightGreen }} />}
            tooltipTitle="Wish list"
            onClick={() => navigate(routerPath.auth.MY_ACCOUNT, { state: { component: Tab.WISH_LIST } })}
          />
        )}
      </SpeedDial>
    </div>
  );
};

export default Navbar;
