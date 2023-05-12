import { Modal, Card } from '@mui/material'

const CustomModal = ({ open, setOpen, width, children }) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
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
          p: 3,
          bgcolor: 'background.main',
          maxHeight: '80vh',
          overflowY: 'scroll',
        }}
      >
        {children}
      </Card>
    </Modal>
  )
}

export default CustomModal
