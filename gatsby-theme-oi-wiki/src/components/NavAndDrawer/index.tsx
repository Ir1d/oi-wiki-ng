import {
  AppBar,
  Button,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon
} from '@material-ui/core'

import { useTheme } from '@material-ui/core/styles'
import { Link } from 'gatsby'
import React from 'react'
import createPersistedState from 'use-persisted-state'

import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import GitHubIcon from '@material-ui/icons/GitHub'
import MenuIcon from '@material-ui/icons/Menu'
import SettingsIcon from '@material-ui/icons/Settings'
import SchoolIcon from '@material-ui/icons/School'
import MoreVertIcon from '@material-ui/icons/MoreVert'
// eslint-disable-next-line
// @ts-ignore
import pathList from '../../sidebar.yaml'
import defaultSettings from '../../lib/defaultSettings'
import Search from '../Search'
import SiderContent from '../Sidebar'
import Tabs from '../Tabs'
import { useStyles } from './styles'

/**
 * To flatten JS object (keys and values) to a single depth object
 * Ref: https://stackoverflow.com/a/53739792
 *
 * @param {*} ob
 * @return {*}  {Record<string, unknown>}
 */
export function flattenObject(ob: any): Record<string, unknown> {
  const toReturn = {}

  for (const i in ob) {
    if (!Object.prototype.hasOwnProperty.call(ob, i)) continue

    if ((typeof ob[i]) === 'object' && ob[i] !== null) {
      const flatObject = flattenObject(ob[i])
      for (const x in flatObject) {
        if (!Object.prototype.hasOwnProperty.call(flatObject, x)) continue

        toReturn[i + '.' + x] = flatObject[x]
      }
    } else {
      toReturn[i] = ob[i]
    }
  }
  return toReturn
}

function getTabIDFromLocation (location: string, pathList: string[]): number {
  for (const v of Object.entries(pathList)) {
    if (Object.values(flattenObject(v[1])).indexOf(location) > -1) return +v[0]
  }
  return -1
}

interface drawerProps {
  pathname: string
}

interface AppBar{
  background: string;
  color: string;
}
interface Props{
  appBar: AppBar;
}

const ResponsiveDrawer: React.FC<drawerProps> = (props) => {
  const { pathname } = props
  const [settings] = createPersistedState('settings')(defaultSettings)
  const theme = useTheme()
  const navColor = settings?.theme?.navColor !== 'auto' && typeof settings?.theme?.navColor !== 'undefined'
    ? settings.theme.navColor
    : theme.palette.background.paper // undefined or 'auto'
  const classes = useStyles({
    appBar: {
      background: navColor,
      color: theme.palette.getContrastText(navColor),
    },
  })
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const OIWikiGithub = 'https://github.com/OI-wiki/OI-wiki'
  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen)
  }
  const tabID = getTabIDFromLocation(pathname, pathList)

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const SmallScreenMenu: React.FC<unknown> = () => <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleClose}
  >
    <MenuItem component="a" href="/settings">
      <ListItemIcon classes={{ root: classes.iconItem }}>
        <SettingsIcon fontSize="small" />
      </ListItemIcon>
    设置
    </MenuItem>
    <MenuItem component="a" href="/tags">
      <ListItemIcon classes={{ root: classes.iconItem }}>
        <LocalOfferIcon fontSize="small" />
      </ListItemIcon>
    标签
    </MenuItem>
    <MenuItem component="a" href="/pages">
      <ListItemIcon classes={{ root: classes.iconItem }}>
        <LibraryBooksIcon fontSize="small" />
      </ListItemIcon>
    目录</MenuItem>
    <MenuItem component="a" href={OIWikiGithub}>
      <ListItemIcon classes={{ root: classes.iconItem }}>
        <GitHubIcon fontSize="small" />
      </ListItemIcon>
    GitHub</MenuItem>
  </Menu>

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Hidden mdDown implementation="css">
            <IconButton component={Link} color="inherit" to="/">
              <SchoolIcon />
            </IconButton>
          </Hidden>
          <Button href="/" color="inherit">
            <Typography variant="h6" noWrap>
              OI Wiki
            </Typography>
          </Button>
          <div style={{ flexGrow: 1 }} />
          <Search />
          <Hidden smDown implementation="css">
            <Tooltip title="设置页" placement="bottom" arrow>
              <IconButton component="a" href="/settings" color="inherit">
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="标签页" placement="bottom" arrow>
              <IconButton component="a" href="/tags" color="inherit">
                <LocalOfferIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="目录页" placement="bottom" arrow>
              <IconButton component="a" href="/pages" color="inherit">
                <LibraryBooksIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="GitHub 存储库" placement="bottom" arrow>
              <IconButton component="a" href={OIWikiGithub} color="inherit">
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          </Hidden>
          <Hidden mdUp implementation="js">
            <IconButton color="inherit" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <SmallScreenMenu/>
          </Hidden>
        </Toolbar>
        <Hidden mdDown implementation="css">
          <Tabs tabID={tabID >= 0 ? tabID : 0} pathList={pathList}/>
        </Hidden>
      </AppBar>
      <Hidden lgUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <SiderContent pathList={pathList} {...props} />
        </Drawer>
      </Hidden>
      <Hidden mdDown implementation="css">
        <Drawer
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <div className={classes.placeholder} />
          <SiderContent pathList={tabID !== -1 ? [pathList[tabID]] : pathList} {...props} />
        </Drawer>
      </Hidden>
    </>
  )
}

export default ResponsiveDrawer
