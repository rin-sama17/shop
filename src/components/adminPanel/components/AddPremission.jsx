import { Button } from '@mui/material'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { addPremission } from '../../../reducers/premissionSlice'

import { CustomForm, CustomModal } from '../../common'
import { premissionFieldsData } from '../../fieldsData'
import { premissionValidation } from '../../validations/premissionValidation'

const AddPremission = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    // validationSchema: premissionValidation,
    onSubmit: (values, { resetForm }) => {
      dispatch(addPremission({ values, setOpen }))
      resetForm()
    },
  })
  const fields = premissionFieldsData(formik)
  return (
    <>
      <Button onClick={() => setOpen(true)} color="secondary" sx={{ m: 2 }}>
        افزودن دسترسی جدید
      </Button>
      <CustomModal open={open} setOpen={setOpen}>
        <CustomForm
          formik={formik}
          fields={fields}
          label="افزودن دسترسی جدید"
        />
      </CustomModal>
    </>
  )
}

export default AddPremission