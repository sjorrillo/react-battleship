import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useTheme } from '@mui/material/styles';
import { Paths } from '../../constants/route-paths';
import { useNavigate } from 'react-router-dom';

const pages = [{ text: 'Board', path: Paths.HOME }];
const settings = [
  { text: 'Setup', path: Paths.GAME.SETUP },
  { text: 'Game History', path: Paths.GAME.HISTORY },
];

interface IOwnProps {}

const PageAppBar: React.FC<IOwnProps> = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenSettingMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (path?: string) => {
    setAnchorElNav(null);
    path && navigate(path);
  };

  const handleCloseUserMenu = (path?: string) => {
    setAnchorElUser(null);
    path && navigate(path);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            variant="h6"
            noWrap
          >
            React Battleship
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              aria-label="account of current user"
              color="inherit"
              onClick={handleOpenNavMenu}
              size="large"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              id="menu-appbar"
              onClose={() => handleCloseNavMenu()}
              open={Boolean(anchorElNav)}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
            >
              {pages.map((page) => (
                <MenuItem key={page.text} onClick={() => handleCloseNavMenu(page.path)}>
                  <Typography textAlign="center">{page.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            variant="h6"
            noWrap
          >
            React Battleship
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.text}
                onClick={() => handleCloseNavMenu(page.path)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.text}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenSettingMenu} sx={{ p: 0 }}>
                <SettingsOutlinedIcon htmlColor={theme.palette.common.white} />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              id="menu-appbar"
              onClose={() => handleCloseUserMenu()}
              open={Boolean(anchorElUser)}
              sx={{ mt: '45px' }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
            >
              {settings.map((setting) => (
                <MenuItem key={setting.text} onClick={() => handleCloseUserMenu(setting.path)}>
                  <Typography textAlign="center">{setting.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default PageAppBar;
