import { useState } from 'react'
import { placeholder } from './constants'
import DebtsList from '@/components/DebtsList/DebtsList'
import { useDebts } from '@/hooks/useDebts'
import Loader from '@/components/Loader/Loader'
import ErrorMessage from '@/components/ErrorMessage'
import WarningModal from '@/components/WarningModal/WarningModal'
import Search from '@/components/Search/Search'

function App() {
	const [phrase, setPhrase] = useState('')
	const { debts, isError, sortBy, isFetching, fetchTopDebts, fetchFilteredDebts, handleDebtsSorting } = useDebts()

	const [showModal, setShowModal] = useState(false)

	const handleSearch = async () => {
		if (phrase.length < 3) {
			setShowModal(true)
			return
		}
		await fetchFilteredDebts(phrase)
	}

	return (
		<>
			<main>
				<Search phrase={phrase} onChange={e => setPhrase(e.target.value)} onSearch={handleSearch} />
				{isError && (
					<ErrorMessage
						actions={{
							fetchTopDebts,
						}}
					/>
				)}
				{isFetching ? <Loader /> : <DebtsList debts={debts} sortBy={sortBy} handleDebtsSorting={handleDebtsSorting} />}
			</main>
			{showModal && <WarningModal message={placeholder} onClose={() => setShowModal(false)} />}
		</>
	)
}

export default App
