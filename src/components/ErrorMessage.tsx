interface ErrorMessageProps {
	actions: {
		fetchTopDebts: () => void
	}
}

const ErrorMessage = ({ actions }: ErrorMessageProps) => {
	return (
		<div>
			<p>Wystąpił błąd podczas pobierania danych</p>
			<button onClick={actions.fetchTopDebts}>Spróbuj ponownie</button>
		</div>
	)
}

export default ErrorMessage
