import Navbar from "./Navbar";

import logo from "../assets/images/knolta.jpg";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles["header__logo"]}>
        <img alt="knolta logo" src={logo} className={styles.logo} />
        <h3>Sacred Heart Catholic Church, Knolta</h3>
      </div>

      {/* navbar component goes her */}
      <Navbar />
    </header>
  );
};

export default Header;
