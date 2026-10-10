import UserCard from './UserCard/UserCard'
import styles from './UserList.module.css'

export default function UserList({ users, toggleUser }) {
  if (users.length === 0) {
    return (
      <div className={styles.empty} role="status">
        <p>Пользователи не найдены.</p>
      </div>
    )
  }

  return (
    <section className={styles.list} aria-label="Список игроков">
      <div className={styles.grid}>
        {users.map(user => (
          <UserCard user={user} key={user.id} onToggle={toggleUser} />
        ))}
      </div>
      <p className={styles.total} aria-live="polite">Всего: {users.length}</p>
    </section>
  )
}
