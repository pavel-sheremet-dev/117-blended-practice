"use client";

import { useAuthStore } from "@/lib/store/authStore";
import Container from "../Container/Container";

import styles from "./Footer.module.css";

const Footer = () => {
  const { theme, toggleTheme } = useAuthStore();

  return (
    <footer className={styles.footer}>
      <Container className={styles.box}>
        My App | {new Date().getFullYear()}
        <button onClick={toggleTheme}>{theme}</button>
      </Container>
    </footer>
  );
};

export default Footer;
