import { Typography, Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useGetCategoryQuery } from '../../api'
import Spinner from './Spinner'

const ShowCategory = ({ categoryId, tags }) => {
  const splitedTags = tags && tags.split('/')
  const { data: category, isSuccess, isLoading, isError } = useGetCategoryQuery(
    {
      id: categoryId,
    },
  )

  if (isLoading) {
    return <Spinner />
  } else if (isSuccess) {
    return (
      <Box>
        <Typography
          color="text.secondary"
          variant="subtitle2"
          sx={{ mr: 1 }}
          gutterBottom
        >
          دسته بندی:
          <Button
            component={Link}
            to={`/search/${categoryId};name:${category.name}`}
            color="secondary"
            sx={{ ml: 1 }}
            size="small"
          >
            {category.name}
          </Button>
        </Typography>
        <Typography
          color="text.secondary"
          variant="caption"
          sx={{ mr: 1, display: 'flex' }}
          gutterBottom
        >
          تگ ها:
          {splitedTags.map((tag, index) => (
            <Box key={index}>
              <Typography
                component={Link}
                to={`/search/${tag}`}
                color="secondary"
                variant="caption"
                sx={{ mx: 0.5 }}
              >
                {tag}
              </Typography>
              /
            </Box>
          ))}
        </Typography>
      </Box>
    )
  } else if (isError) {
    return (
      <Typography
        color="text.secondary"
        variant="caption"
        sx={{ mr: 1, display: 'flex' }}
        gutterBottom
      >
        تگ ها:
        {splitedTags.map((tag, index) => (
          <Box key={index}>
            <Typography
              component={Link}
              to={`/search/${tag}`}
              color="secondary"
              variant="caption"
              sx={{ mx: 0.5 }}
            >
              {tag}
            </Typography>
            /
          </Box>
        ))}
      </Typography>
    )
  }
}
export default ShowCategory
