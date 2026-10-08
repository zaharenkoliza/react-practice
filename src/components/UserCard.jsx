export default function UserCard({ user, onToggle }) {

  return (
    <article>
      <h2>{user.name}</h2>
      <p>{user.online ? 'Онлайн' : 'Оффлайн'}</p>
      <button
        onClick={() => onToggle(user.id)}
      >Изменить статус</button>
    </article>
  )
}