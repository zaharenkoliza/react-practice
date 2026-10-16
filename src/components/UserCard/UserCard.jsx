import styles from './UserCard.module.css'
import { Link } from 'react-router'

export default function UserCard({ user, onToggle }) {
  return (
    <article className={styles.card} aria-label={`Игрок ${user.name}`}>
      <div className={styles.identity}>
        <span className={styles.avatar} aria-hidden="true">
          {user.name.slice(0, 1)}
        </span>
        <div>
          <h2 className={styles.name}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </h2>
          <p className={`${styles.status} ${user.online ? styles.online : styles.offline}`}>
            {user.online ? 'Онлайн' : 'Оффлайн'}
          </p>
        </div>
      </div>
      <button
        className={styles.button}
        aria-pressed={user.online}
        onClick={() => onToggle(user.id)}
      >
        Изменить статус
      </button>
    </article>
  )
}
