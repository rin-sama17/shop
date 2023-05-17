import { Button } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useEffect } from 'react'
import { CustomDivider, CustomFields, ImageUploader } from '.'

const CustomForm = ({
  fields,
  formik,
  label,
  color = 'primary',
  imageUploader,
  imageUploaderName,
  imageUploaderProps,
}) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CustomDivider label={label} color={color} />
        {imageUploader ? (
          <ImageUploader
            formik={formik}
            name={imageUploaderName}
            color={color}
            {...imageUploaderProps}
          />
        ) : null}
        <Grid xs={12} md={imageUploader ? 9 : 12}>
          <Grid container spacing={2} sx={{ direction: 'ltr' }}>
            {fields.map((field, index) => (
              <CustomFields {...field} key={index} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default CustomForm
