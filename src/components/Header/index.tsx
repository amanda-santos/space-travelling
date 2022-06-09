import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement } from "react";

import styles from "./header.module.scss";

export default function Header(): ReactElement {
  const router = useRouter();

  return (
    <header className={styles["header-container"]}>
      <Link href="/">
        <img src="/images/logo.svg" alt="logo" />
      </Link>
    </header>
  );
}
