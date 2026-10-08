import { useState } from 'react'
import './App.css'
import UserList from './components/UserList'

const usersData = [
  {id: 1, name: 'Anna', online: true},
  {id: 2, name: 'Max', online: false},
  {id: 3, name: 'Kate', online: true},
];

function App() {
  const [onlyOnline, setOnlyOnline] = useState(false);
  const [users, setUsers] = useState(usersData);
  const [searchText, setSearchText] = useState('');

  const visibleUsers = onlyOnline
    ? users
      .filter(user => user.online)
      .filter(user =>
        user.name.toLowerCase().includes(searchText.toLowerCase()))
    : users
        .filter(user =>
        user.name.toLowerCase().includes(searchText.toLowerCase()))

  const toggleUser = (id) => {
    setUsers(
      users.map( user =>
        user.id === id
        ? {
            ...user,
            online: !user.online
          }
        : user
      )
    )
  }

  return (
    <main>
      <input aria-label="Поиск по имени" type="text" onChange={(e) => setSearchText(e.target.value)} value={searchText} />
      <UserList users={visibleUsers} toggleUser={toggleUser} onlyOnline={onlyOnline} setOnlyOnline={setOnlyOnline}/>
    </main>
  )
}

export default App
