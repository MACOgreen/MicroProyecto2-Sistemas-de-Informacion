import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { auth } from "../utils/firebase-config";
import styles from "./Navbar.module.css";

function Navbar() {
  const { user,setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <ul className={styles.navbarContainer}>
      <li>
        <Link to="/list" className={styles.link}>
          Ver lista de películas
        </Link>
      </li>

      {!user ? (
        <li className={styles.rightSide}>
          <div className={styles.container}>
            <Link to="/login" className={styles.link}>
              Inicio de sesión
            </Link>
          </div>

          <div className={styles.container}>
            <Link to="/reg" className={styles.link}>
              Registrarse
            </Link>
          </div>
        </li>
      ) : (
        <li className={styles.rightSide}>
          <div className={styles.container}>{user.email}</div>

          <div className={styles.container}>
            <button type="button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </li>
      )}
    </ul>
  );
}

export default Navbar;
