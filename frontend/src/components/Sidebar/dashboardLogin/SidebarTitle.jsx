import styles from "./Sidebar.module.css";

function SidebarTitle({ titles, user }) {
  const inicial = user ? user.nombre.charAt(0).toUpperCase() : "";

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <div>{titles.dashboard}</div>
        <div>{user ? `${user.nombre} ${user.apellido}` : ""}</div>
      </div>
      {inicial && <div className={styles.avatar}>{inicial}</div>}
    </div>
  );
}

export default SidebarTitle;
