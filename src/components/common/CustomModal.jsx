import { Modal, Card } from '@mui/material'

const CustomModal = ({ open, setOpen, width, children, lock }) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(lock)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(3px)',
      }}
    >
      <Card
        sx={{
          width: width ? width : '90%',
          p: 2,
          bgcolor: 'bgcolor.main',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {children}
      </Card>
    </Modal>
  )
}

export default CustomModal
