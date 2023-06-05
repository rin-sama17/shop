'use client'

import { toast } from 'react-toastify'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { Delete, Edit } from '@mui/icons-material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { getProducts } from '@/api'
import { AddProduct, EditProduct } from '../components'
import { useMemo } from 'react'

const ProductManagement = () => {
  const { products } = getProducts('/admin')
  const deleteProduct = async (productId) => {
    'use server'

    try {
      const url = `http://127.0.0.1:8000/api/admin/admin/products/delete/${productId}`
      const res = await fetch(url, {
        method: 'DELETE',
      })

      const jsonResponse = await res.json()
      const status = res.status

      console.log(status)
      console.log(jsonResponse)
    } catch (error) {
      console.error(error)
    }
  }
  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'شماره', width: 100 },
      { field: 'name', headerName: 'نام محصول', width: 100 },
      { field: 'price', headerName: 'قیمت', width: 100 },
      { field: 'discount', headerName: 'تخفیف(به درصد)', width: 120 },
      { field: 'remaining', headerName: 'موجودی', width: 100 },
      { field: 'category_id', headerName: 'دسته بندی', width: 100 },
      {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<Delete />}
            sx={{ color: 'tomato' }}
            label="حذف"
            onClick={() => deleteProduct(params.id)}
          />,
          <EditProduct product={params.row} />,
        ],
      },
    ],
    [EditProduct, products.data],
  )
  return (
    <>
      <AddProduct />
      <div style={{ height: 600, width: '100%', direction: 'rtl' }}>
        <DataGrid rows={products.data} columns={columns} />
      </div>
    </>
  )
}

export default ProductManagement