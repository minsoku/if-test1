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
    window.parent.postMessage({
      type: 'CHILD_MESSAGE',
      data: '자식이 보낸 메시지입니다'
      }, 'https://test.minsoku.shop');
    console.log('(자식) : 부모님께 메시지 전송 완료');
    } catch (error) {
      console.error('(자식) : 메시지 전송 실패:', error);
    }
  };

  useEffect(() => {
    console.log('(자식) : useEffect');
    
    const receiveMessage = (event) => {
      console.log('(자식) : ', event);
    };
  
    window.addEventListener('message', receiveMessage);
    console.log('(자식) : addEventListener');
  
    return () => {
      console.log('(자식) : unMount');
      window.removeEventListener('message', receiveMessage);
    };
  }, []);

  return (
    <div className={styles.page}>
      여기가 자식페이지임
      <button onClick={setCookie}>쿠키 설정</button>
      <button onClick={handleGetCookie}>쿠키 읽기</button>
      <button onClick={deleteCookie}>쿠키 삭제</button>
      <button onClick={sendMessageToChild}>자식에게 메시지</button>
    </div>
  );
}
