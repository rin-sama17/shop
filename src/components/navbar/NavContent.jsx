import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { AppsOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import CustomIconButton from '../common/CustomIconButton'
import { Login } from '../../pages'
import NavSearch from './NavSearch'
import { bg } from '../../assets'
import ShowCtegories from '../categories/ShowCtegories'
import NavLang from './NavLang'
import { useTranslation } from 'react-i18next'

const buttons = [
  { name: 'نمایندگی', to: '/agencies' },
  { name: 'وبلاگ', to: '/posts' },
  { name: 'فروشگاه', to: '/products' },
  { name: 'درباره ما', to: '/about-us' },
]
const NavContent = ({ setDrawerOpen }) => {
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down('md'))
  const { t } = useTranslation()
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${bg} )`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          width: 1,
          height: downMd ? 50 : 'auto',
          px: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomIconButton
            color="btnNav"
            icon={<AppsOutlined />}
            onClick={() => setDrawerOpen(true)}
          />
          <Link href="/" underline="none">
            <Typography variant="h5" sx={{ ml: 1, color: 'title.light' }}>
              {t('فروشگاه من')}
            </Typography>
          </Link>
        </Box>

        <Box sx={{ display: 'flex', py: 2, alignItems: 'center' }}>
          <NavSearch />

          <NavLang />
          <Login />
        </Box>
      </Box>

      <Box
        sx={{
          width: 1,
          py: 2,
          bgcolor: 'bgcolor.dark',
          position: 'relative',
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          divider={
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{
                bgcolor: 'primary.light',
              }}
            />
          }
          spacing={2}
          sx={{
            width: 1,
            m: 'auto',

            display: 'flex',
          }}
        >
          {!downMd && <ShowCtegories />}
          {buttons.map((btn, index) => (
            <Button
              sx={{ color: 'btnNav.dark' }}
              key={index}
              component={Link}
              to={btn.to}
            >
              <Typography variant={downMd ? 'caption' : 'body1'}>
                {t(btn.name)}
              </Typography>
            </Button>
          ))}
        </Stack>
      </Box>
    </>
  )
}
export default NavContent
