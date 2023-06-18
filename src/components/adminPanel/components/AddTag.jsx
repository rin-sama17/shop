import { Chip } from '@mui/material'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLang } from '../../../reducers/langSlice'
import {
  addTag,
  selectTag_id,
  tagDeleted,
  tagAdded,
  tagIdsCleared,
} from '../../../reducers/tagSlice'

import { CustomForm, CustomModal } from '../../common'
import { tagFieldData } from '../../fieldsData'
import { tagValidation } from '../../validations/tagValidation'
import AddBtn from './AddBtn'

const AddTag = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const tempTags = useSelector(selectTag_id)
  const lang = useSelector(selectLang)

  useEffect(() => {
    if (!open) {
      dispatch(tagIdsCleared())
    }
  }, [open])
  const handleDelete = (tag) => {
    dispatch(tagDeleted(tag))
  }
  const handleAddToTemp = (values) => {
    dispatch(tagAdded(values))
  }
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: tagValidation,
    onSubmit: (values) => {
      handleAddToTemp(values)
    },
  })

  const handleSubmit = () => {
    const arrayTags = tempTags.map((tag) => tag.name)
    const singleName = formik.values.name
    if (
      singleName &&
      singleName.length > 0 &&
      !singleName.includes(arrayTags)
    ) {
      arrayTags.push(singleName)
    }
    const myObject = {}

    arrayTags.forEach((value, index) => {
      myObject[`name${index + 1}`] = value
    })
    console.log(myObject)
    dispatch(addTag({ values: { ...myObject, lang }, setOpen }))
    dispatch(tagIdsCleared())
  }
  const fields = tagFieldData(formik)
  const extraFields = [
    {
      md: 12,
      submit: true,
      isBtn: true,
      onClick: () => handleSubmit(),
      customLabel: 'ثبت',
    },
  ]
  return (
    <>
      <AddBtn setOpen={setOpen} title="افزودن تگ جدید" />

      <CustomModal open={open} setOpen={setOpen}>
        {tempTags?.map((tag) => (
          <Chip
            label={tag.name}
            variant="outlined"
            sx={{ m: 0.4 }}
            onDelete={() => handleDelete(tag.name)}
          />
        ))}
        <CustomForm
          formik={formik}
          fields={fields}
          extraFields={extraFields}
          label="افزودن تگ جدید"
        />
      </CustomModal>
    </>
  )
}

export default AddTag
