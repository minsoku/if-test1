"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect } from "react";

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

  useEffect(() => {
    const receiveMessage = (event) => {
      console.log('이벤트 :', event);
      console.log('출처 :', event.origin);
      
      // if (event.origin !== 'https://www.minsoku.shop') {
      //   console.log('잘못된 출처:', event.origin);
      //   return;
      // }
      
      console.log('받은 메시지:', event.data);
    };
    console.log('메시지 addEventListener');
    window.addEventListener('message', receiveMessage);
  
    return () => {
      window.removeEventListener('message', receiveMessage);
    };
  }, []);

  return (
    <div className={styles.page}>
      기존페이지
      <button onClick={setCookie}>쿠키 설정</button>
      <button onClick={handleGetCookie}>쿠키 읽기</button>
      <button onClick={deleteCookie}>쿠키 삭제</button>
    </div>
  );
}
