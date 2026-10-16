import { useState } from "react"
import UserList from "../components/UserList"
import UserFilters from "../components/UserFilters/UserFilters"
import styles from '../App.module.css';

export default function UsersPage({ users, toggleUser }) {
    const [onlyOnline, setOnlyOnline] = useState(false)
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