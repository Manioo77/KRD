import { placeholder } from '@/constants'
import './Search.scss'

interface SearchProps {
	phrase: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	onSearch: () => void
}

const Search = ({ phrase, onChange, onSearch }: SearchProps) => {
	return (
		<header className='header'>
			<div className='header__container'>
				<p className='header__paragraph'>podaj nip lub nazwę dłużnika</p>
				<div className='header__controls'>
					<input
						className='header__input'
						type='text'
						value={phrase}
						name='phrase'
						placeholder={placeholder}
						minLength={3}
						onChange={onChange}
					/>
					<button className='header__button' onClick={onSearch}>
						szukaj
					</button>
				</div>
			</div>
		</header>
	)
}

export default Search
