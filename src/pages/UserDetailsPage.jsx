import { Link, useParams } from "react-router";
import UserCard from "../components/UserCard/UserCard";
import styles from '../App.module.css';

export default function UserDetailsPage({ users, toggleUser }) {
    const { userId } = useParams();
    const user = users.find(user => user.id === Number(userId));

    if (!user) {
        return (
            <>
                <h1 className={styles.title}>Игрок не найден</h1>
                <Link to="/users">К списку игроков</Link>
            </>
        )
    }

    return (
        <section>
            <h1>Профиль игрока</h1>
            <UserCard user={user} onToggle={toggleUser} />
            <Link to="/users">К списку игроков</Link>
        </section>
    )
}
