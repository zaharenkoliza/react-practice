import { useState } from 'react'
import styles from './App.module.css'
import UserList from './components/UserList'
import UserFilters from './components/UserFilters/UserFilters'

const usersData = [
  { id: 1, name: 'Anna', online: true },
  { id: 2, name: 'Max', online: false },
  { id: 3, name: 'Kate', online: true },
]

function App() {
  const [onlyOnline, setOnlyOnline] = useState(false)
  const [users, setUsers] = useState(usersData)
  const [searchText, setSearchText] = useState('')
  const [sortOrder, setSortOrder] = useState('default')

  const visibleUsers = users
    .filter(user => !onlyOnline || user.online)
    .filter(user =>
      user.name.toLowerCase().includes(searchText.toLowerCase()),
    )

  if (sortOrder === 'name') {
    visibleUsers.sort((a, b) => a.name.localeCompare(b.name))
  }

  function toggleUser(id) {
    setUsers(currentUsers =>
      currentUsers.map(user =>
        user.id === id ? { ...user, online: !user.online } : user,
      ),
    )
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>React Practice / Лобби</p>
        <h1 className={styles.title}>Игроки</h1>
        <p className={styles.description}>
          Найдите участников и посмотрите, кто сейчас онлайн.
        </p>
      </header>
      <UserFilters
        onlyOnline={onlyOnline}
        setOnlyOnline={setOnlyOnline}
        searchText={searchText}
        setSearchText={setSearchText}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />
      <UserList users={visibleUsers} toggleUser={toggleUser} />
    </main>
  )
}

export default App
