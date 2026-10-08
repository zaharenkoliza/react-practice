import styles from './UserFilters.module.css'

export default function UserFilters({ 
    searchText,
    setSearchText,
    onlyOnline,
    setOnlyOnline,
    sortOrder,
    onSortChange
 }) {

  return <section className={styles.filters}>
            <label>
                Поиск по имени
                <input 
                    aria-label="Поиск по имени"
                    type="text" onChange={(e) => setSearchText(e.target.value)} 
                    value={searchText} 
                />
            </label>

            <label>
                <input 
                    type="checkbox"
                    checked={onlyOnline}
                    onChange={() => setOnlyOnline(!onlyOnline)}
                />
                Показать онлайн
            </label>

             <label>
                Сортировка
                <select 
                    value={sortOrder}
                    onChange={(e) => onSortChange(e.target.value)}
                >
                    <option value="default">По умолчанию</option>
                    <option value="name">По имени</option>
                </select>
            </label>
        </section>
}
