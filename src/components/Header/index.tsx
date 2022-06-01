import { useRouter } from "next/router";
import { ReactElement } from "react";

import styles from "./header.module.scss";

export default function Header(): ReactElement {
  const router = useRouter();

  return (
    <header className={styles["header-container"]}>
      <button type="button" onClick={() => router.push("/", {}, {})}>
        <img src="/images/logo.svg" alt="logo" />
      </button>
    </header>
  );
}
