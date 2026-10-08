import { useState } from 'react'
import './App.css'
import UserList from './components/UserList'
import UserFilters from './components/UserFilters/UserFilters'

const usersData = [
  {id: 1, name: 'Anna', online: true},
  {id: 2, name: 'Max', online: false},
  {id: 3, name: 'Kate', online: true},
];

function App() {
  const [onlyOnline, setOnlyOnline] = useState(false);
  const [users, setUsers] = useState(usersData);
  const [searchText, setSearchText] = useState('');
  const [sortOrder, setSortOrder] = useState("default");

  const visibleUsers = onlyOnline
    ? users
      .filter(user => user.online)
      .filter(user =>
        user.name.toLowerCase().includes(searchText.toLowerCase()))
    : users
        .filter(user =>
        user.name.toLowerCase().includes(searchText.toLowerCase()));

  if (sortOrder === 'name') {
    visibleUsers.sort((a, b) => a.name.localeCompare(b.name));
  }

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
      <h1>Пользователи</h1>
      <UserFilters 
        onlyOnline={onlyOnline}
        setOnlyOnline={setOnlyOnline}
        searchText={searchText}
        setSearchText={setSearchText}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />
      <UserList 
        users={visibleUsers} 
        toggleUser={toggleUser}
      />
    </main>
  )
}

export default App
