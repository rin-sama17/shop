import Grid from '@mui/material/Unstable_Grid2'

import { useState } from 'react'
import SwipeableViews from 'react-swipeable-views'

import AdminPanelTabs from '../components/adminPanel/AdminPanelTabs'
import { Page } from '.'
import {
  SliderManagement,
  ProductManagement,
  PostManagement,
  CategoryManagement,
  RoleManagement,
  ContractManagement,
  PremissionManagement,
  UserManagement,
} from '../components/adminPanel/pages'

const pages = [
  <SliderManagement />,
  <ProductManagement />,
  <PostManagement />,
  <CategoryManagement />,
  <ContractManagement />,
  <PremissionManagement />,
  <RoleManagement />,
  <UserManagement />,
]

const AdminPanel = () => {
  const [pageNumber, setPageNumber] = useState(0)

  const handleSwipeNumber = (e) => {
    setPageNumber(e)
  }

  return (
    <Grid
      container
      sx={{
        width: 1,
        position: 'relative',
        minHeight: '100vh',
      }}
    >
      <Grid
        xs={12}
        md={2.5}
        lg={2}
        sx={{
          width: 1,
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          bgcolor: 'bgSidebar.dark',
          position: 'inherit',
          top: '-15px',
        }}
      >
        <AdminPanelTabs pageNumber={pageNumber} setPageNumber={setPageNumber} />
      </Grid>
      <Grid xs={12} md={9.5} lg={10}>
        <SwipeableViews index={pageNumber} onChangeIndex={handleSwipeNumber}>
          {pages.map((page, index) => (
            <Page
              key={index}
              pageNumber={pageNumber}
              name="adminPanel"
              index={index}
            >
              {page}
            </Page>
          ))}
        </SwipeableViews>
      </Grid>
    </Grid>
  )
}

export default AdminPanel
