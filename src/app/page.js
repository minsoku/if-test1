"use client"

import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const setCookie = () => {
    let expires = "";
    const date = new Date();
    date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();

    document.cookie = "meme" + "=" + ("meme" || "") + expires + "; path=/";
  };


  const handleGetCookie = () => {
    console.log(document.cookie);
  };

  const deleteCookie = () => {
    document.cookie = "meme" + '=; Max-Age=-99999999;'; // 즉시 만료
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
