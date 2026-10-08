import UserCard from "./UserCard/UserCard";

export default function UserList({ 
    users, 
    toggleUser 
}) {

    if (users.length == 0) {
        return <p>Пользователи не найдены.</p>
    }

  return (
        <div>
            {users.map(user => (
                <UserCard 
                    user={user}     
                    key={user.id} 
                    onToggle={toggleUser}/>
            ))}
            <p>Всего: {users.length}</p>
        </div>
    )
}
