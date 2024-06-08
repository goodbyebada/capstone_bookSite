// Loading.tsx

import React from "react";
import styles from "@styles/loading.module.css";
import { notFound } from "next/navigation";

const Loading = ({ isFecthed }: { isFecthed: boolean }) => {
  const isLoading = () => {
    return (
      <div className={styles.loading_container}>
        <div className={styles.loading_spinner}></div>
        <p className={styles.loading_text}>Loading...</p>
      </div>
    );
  };
  return (
    // {!isData :<NotFound/>}
    <>{isFecthed ? notFound() : isLoading()}</>
  );
};

export default Loading;
