import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Fade,
  Paper,
  Box,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useNavigate } from 'react-router-dom'
import { useGetProductQuery } from '../../api'
import { ProductPrice } from '../common'
import { ProductLoading } from '../loading'

const Product = ({ productId }) => {
  const { data: product, isLoading, isSuccess } = useGetProductQuery(productId)
  const navigate = useNavigate()

  if (isLoading || productId === 'loading') {
    return <ProductLoading width={250} productId={productId} />
  }

  return (
    <Fade
      in={isSuccess}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        pt: 2,
      }}
    >
      <Box onClick={() => navigate(`/product/${product.id}`)} sx={{ py: 1 }}>
        <Paper elevation={12} sx={{ width: 250 }}>
          <CardMedia
            component="img"
            sx={{ height: 1, width: 1 }}
            alt={product.name}
            image={product.thumbnail}
          />
        </Paper>
        <CardContent>
          <Typography
            color="text.primary"
            variant="subtitle1"
            textAlign="left"
            gutterBottom
          >
            {product.name}
          </Typography>

          <ProductPrice price={product.price} discount={product.discount} />
        </CardContent>
      </Box>
    </Fade>
  )
}
export default Product
