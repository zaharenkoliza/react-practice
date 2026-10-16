import UserList from '../components/UserList'
import styles from '../App.module.css'

export default function OnlinePage({ users, toggleUser }) {
  const onlineUsers = users.filter(user => user.online === true)

  return (
    <section>
      <header className={styles.header}>
        <h1 className={styles.title}>Игроки онлайн</h1>
      </header>
      <UserList
        users={onlineUsers}
        toggleUser={toggleUser}
      />
    </section>
  )
}
