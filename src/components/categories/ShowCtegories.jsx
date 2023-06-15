import { useState } from 'react'
import Typography from '@mui/material/Typography'
import { Button, Card, Box } from '@mui/material'
import CategoriesPopover from './CategoriesPopover'
import Fade from '@mui/material/Fade'
import { useTranslation } from 'react-i18next'
export default function ShowCtegories() {
  const [open, setOpen] = useState(null)

  const { t } = useTranslation()
  return (
    <div>
      <Button
        sx={{ color: 'btnNav.dark' }}
        onMouseOver={() => setOpen(true)}
        onMouseOut={() => setOpen(false)}
      >
        <Typography>{t('دسته بندی ها')}</Typography>
      </Button>
      {open && (
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute',
              right: '0',
              top: '67px',
              width: 1,
              height: '100vh',
              bgcolor: 'bgBlur.main',
            }}
            onClick={() => setOpen(false)}
          >
            <Box
              sx={{
                width: 1,
                position: 'absolute',
                top: '-33px',
                pt: '34px',
                display: 'flex',
                justifyContent: 'center',
              }}
              onMouseOver={() => setOpen(true)}
              onMouseOut={() => setOpen(false)}
            >
              <Card
                sx={{
                  width: '50%',
                  p: 2,
                  bgcolor: 'bgcolor.main',
                  maxHeight: '70vh',
                  overflowY: 'scroll',
                }}
              >
                <CategoriesPopover />
              </Card>
            </Box>
          </Box>
        </Fade>
      )}
    </div>
  )
}
