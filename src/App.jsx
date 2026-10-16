import { useState } from 'react'
import styles from './App.module.css'
import UsersPage from './pages/UsersPage'
import { usersData } from './data/users'
import { NavLink, Route, Routes } from 'react-router'
import UserDetailsPage from './pages/UserDetailsPage'
import OnlinePage from './pages/OnlinePage'

function App() {
  const [users, setUsers] = useState(usersData)
  
  function toggleUser(id) {
    setUsers(currentUsers =>
      currentUsers.map(user =>
        user.id === id ? { ...user, online: !user.online } : user,
      ),
    )
  }

  return (
    <main className={styles.page}>
      <nav className={styles.navigation}>
        <NavLink to="/">Главная</NavLink>
        <NavLink to="/users">Игроки</NavLink>
        <NavLink to="/online">Онлайн</NavLink>
      </nav>
      <Routes>
        <Route path="/online" element={<OnlinePage users={users} toggleUser={toggleUser} />} />
        <Route path="/" element={<h1>Главная страница</h1>} /> 
        <Route path="/users" element={ <UsersPage users={users} toggleUser={toggleUser}></UsersPage>} />
        <Route path="/users/:userId" element={<UserDetailsPage users={users} toggleUser={toggleUser}/>} />  
        <Route path="*" element={<h1>Страница не найдена</h1>} />  
      </Routes>
    </main>
  )
}

export default App
