"use client"

import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const setCookie = () => {
    document.cookie = "volleh=hi; path=/; domain=minsoku.shop; max-age=360000";
    console.log(document.cookie);
  };


  const handleGetCookie = () => {
    console.log(document.cookie);
  };

  const deleteCookie = () => {
    document.cookie = "volleh" + '=; Max-Age=-99999999;';
  };
  return (
    <div className={styles.page}>
      기존페이지

      붙이는 페이지 
      <button onClick={setCookie}>쿠키 설정</button>
      <button onClick={handleGetCookie}>쿠키 읽기</button>
      <button onClick={deleteCookie}>쿠키 삭제</button>
    </div>
  );
}
