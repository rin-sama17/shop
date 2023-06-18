import { useEffect, useMemo } from 'react'
import { Delete } from '@mui/icons-material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'

import { EditTag, AddTag, CustomNoRowsOverlay } from '../components'

import { deleteTag, fetchTags, selectAllTags } from '../../../reducers/tagSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const TagManagement = () => {
  const dispatch = useDispatch()
  const tag = useSelector(selectAllTags)
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(fetchTags())
  }, [])

  const columns = useMemo(
    () => [
      { field: 'name', headerName: t('نام تگ'), width: 150 },
      {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<Delete />}
            sx={{ color: 'tomato' }}
            onClick={() => dispatch(deleteTag(params.id))}
          />,
          <EditTag tag={params.row} />,
        ],
      },
    ],
    [tag, EditTag, t],
  )
  return (
    <>
      <AddTag />
      <div style={{ height: 600, width: '100%', direction: 'rtl' }}>
        <DataGrid
          rows={tag}
          columns={columns}
          components={{
            NoRowsOverlay: () => <CustomNoRowsOverlay />,
          }}
        />
      </div>
    </>
  )
}

export default TagManagement