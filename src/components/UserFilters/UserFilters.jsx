import styles from './UserFilters.module.css'

export default function UserFilters({
  searchText,
  setSearchText,
  onlyOnline,
  setOnlyOnline,
  sortOrder,
  onSortChange,
}) {
  return (
    <section className={styles.filters} aria-label="Фильтры игроков">
      <label className={styles.field}>
        <span className={styles.label}>Поиск по имени</span>
        <input
          className={styles.control}
          type="text"
          placeholder="Например, Anna"
          value={searchText}
          onChange={event => setSearchText(event.target.value)}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Сортировка</span>
        <select
          className={styles.control}
          value={sortOrder}
          onChange={event => onSortChange(event.target.value)}
        >
          <option value="default">По умолчанию</option>
          <option value="name">По имени</option>
        </select>
      </label>

      <label className={styles.onlineFilter}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={onlyOnline}
          onChange={() => setOnlyOnline(!onlyOnline)}
        />
        Показать онлайн
      </label>
    </section>
  )
}
