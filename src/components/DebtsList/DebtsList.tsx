import { Debt, SortOrder } from '@/types'
import './DebtsList.scss'

interface DebtsListProps {
	handleDebtsSorting: (column: keyof Debt) => void
	debts: Debt[]
	sortBy: {
		order: SortOrder
		column: keyof Debt
	}
}

const useColumns = () => [
	{ name: 'dluznik', key: 'name' },
	{ name: 'nip', key: 'nip' },
	{ name: 'kwota zadluzenia', key: 'value' },
	{ name: 'data powstania zobowiazania', key: 'date' },
]

const DebtsList = ({ debts, sortBy, handleDebtsSorting }: DebtsListProps) => {
	const columns = useColumns()

	if (debts.length === 0) {
		return (
			<div className='empty-state'>
				<p className='empty-state__message'>Brak danych</p>
			</div>
		)
	}

	return (
		<div className='debts-list'>
			<table className='debts-list__table'>
				<thead>
					<tr>
						{columns.map(column => (
							<th key={column.key} onClick={() => handleDebtsSorting(column.key as keyof Debt)}>
								{column.name}
								{sortBy.column === column.key && (
									<span className='sort-icon'>{sortBy.order === 'asc' ? ' ▲' : ' ▼'}</span>
								)}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{debts.map(debt => (
						<tr key={debt.id}>
							<td data-label='Dłużnik'>{debt.name}</td>
							<td data-label='NIP'>{debt.nip}</td>
							<td data-label='Kwota zadłużenia'>{debt.value}</td>
							<td data-label='Data powstania zobowiązania'>{debt.date}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default DebtsList
