import { Typography, Box, Divider, Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectAllPosts } from '../../reducers/postSlice'
import { ShowTime } from '../common'

import { Link as RouterLink } from 'react-router-dom'
import { useGetPostsQuery } from '../../api'
const FooterContent = () => {
  const { data: posts = [] } = useGetPostsQuery()
  return (
    <Stack
      justifyContent="space-around"
      spacing={2}
      divider={<Divider orientation="vertical" flexItem />}
      sx={{
        ml: 1,
        height: 1,
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'start', sm: 'center' },
      }}
    >
      <Box sx={{ width: { xs: 4 / 5, sm: 1 / 3 } }}>
        <Typography variant="h6" color="secondary" sx={{ mb: 1 }}>
          فروشگاه من
        </Typography>
        <Typography variant="caption" color="text.primary">
          فروشگاه من یک فروشگاه ساخته شده با ری اکت و لاراول است که با متریال یو
          ای دیزاین شدهروشگاه من یک فروشگاه ساخته شده با ری اکت و لاراول است که
          با متریال یو ای دیزاین شده استروشگاه من یکلاراول است که با متریال یو
          ای دیزاین شده استروشگاه من یک فروشگاه ساخته شده با ری اکت و لاراول است
          که با متریال یو ای دتریال یو ای دیزاین شده استر
        </Typography>
      </Box>
      <Box sx={{ width: { xs: 4 / 5, sm: 1 / 4 } }}>
        <Typography variant="h6" color="secondary" sx={{ mb: 1 }}>
          جدیدترین مجله های ما
        </Typography>
        {posts.slice(0, 4).map((item, index) => (
          <Stack alignItems="start" key={index} sx={{ mb: 1 }}>
            <Typography
              component={RouterLink}
              to={`/posts/${item.id}`}
              color="primary"
              sx={{ textDecoration: 'none' }}
            >
              {item.heading}
            </Typography>

            <ShowTime timestamp={item.date} />
          </Stack>
        ))}
      </Box>
      <Box>
        <Typography variant="h6" color="secondary" sx={{ mb: 1 }}>
          تماس با ما
        </Typography>
        <Typography variant="subtitle2" color="text.primary" sx={{ mb: 1 }}>
          ادرس: ایران-تهران-فروشگاه من
        </Typography>
        <Typography variant="subtitle2" color="text.primary" sx={{ mb: 1 }}>
          شماره تلفن: 021128182812
        </Typography>
      </Box>
    </Stack>
  )
}
export default FooterContent
