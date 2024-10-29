"use client"

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

  const sendMessageToChild = () => {
    try {
    const childWindow = window.open('https://www.test.minsoku.shop');
    console.log(childWindow);
    if (childWindow) {
      childWindow.postMessage({
        type: 'PARENT_MESSAGE',
        data: '부모가 보낸 메시지입니다'
      }, 'https://www.test.minsoku.shop');
      console.log('(부모) : 자식에게 메시지 전송 완료');} 
    }catch (error) {
      console.error('(부모) : 메시지 전송 실패:', error);
    }
  };

  useEffect(() => {
    console.log('부모: useEffect');
    
    const receiveMessage = (event) => {
      console.log('(부모) : ', event);
    };
  
    window.addEventListener('message', receiveMessage);
    console.log('(부모): addEventListener');
  
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
      <button onClick={sendMessageToChild}>자식에게 메시지</button>
    </div>
  );
}
