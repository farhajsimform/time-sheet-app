import React, { FC } from 'react'
import Button from 'react-bootstrap/Button'
import Modal, { ModalProps } from 'react-bootstrap/Modal'

interface IModalProps extends ModalProps {
  visible: boolean
  isFooter: boolean
  handleModal: (value: boolean) => void
  heading: string
  handleSubmit: () => void
  children: React.ReactNode
}

const ModalDialog: FC<IModalProps> = ({
  handleModal,
  children,
  isFooter,
  heading,
  visible,
  handleSubmit,
}) => {
  return (
    <Modal
      show={visible}
      onHide={() => {
        handleModal(false)
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {isFooter && (
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={() => {
              handleModal(false)
            }}
          >
            Close
          </Button>
          <Button variant='primary' onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  )
}

export default ModalDialog
