import UserCard from "./UserCard";

export default function UserList({ users, toggleUser, onlyOnline, setOnlyOnline }) {

  return users.length == 0
        ? <h2>Никого нет</h2>
        : <>
            <button
                onClick={() => setOnlyOnline(!onlyOnline)}
            >Показать {!onlyOnline ? 'только online' : 'всех'}</button>
            {users.map(user => (
                <UserCard user={user} key={user.id} onToggle={toggleUser}/>
            ))}
            <p>Всего: {users.length}</p>
        </>
}
