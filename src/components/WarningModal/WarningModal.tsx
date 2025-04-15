import './WarningModal.scss'

interface WarningModalProps {
	message: string
	onClose: () => void
}
const WarningModal = ({ message, onClose }: WarningModalProps) => {
	return (
		<div className='modal-overlay' role='dialog'>
			<div className='modal'>
				<p className='modal__message'>{message}</p>
				<button className='modal__button' onClick={onClose}>
					OK
				</button>
			</div>
		</div>
	)
}

export default WarningModal
