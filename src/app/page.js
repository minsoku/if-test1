"use client"

import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState('default');
  const [pMessage, setPMessage] = useState('');

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
      data: pMessage
      }, 'https://test.minsoku.shop');
      console.log('(자식) : 부모님께 메시지 전송 완료');
    } catch (error) {
      console.error('(자식) : 메시지 전송 실패:', error);
    }
  };

  useEffect(() => {
    console.log('(자식) : useEffect');
    
    const receiveMessage = (event) => {
      if (event.origin === "https://test.minsoku.shop") {
        setMessage(event.data.data)
      }
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
      <input placeholder='부모님에게 하고 싶은 말' onChange={event => setPMessage(event.target.value)}  />
      <button onClick={sendMessageToChild}>부모님께 메시지</button>
      <div style={{ padding: '5px' }} />
      <div>부모님께서 보내주신 메시지 : {message}</div>
      <button onClick={setCookie}>쿠키 설정</button>
      <button onClick={handleGetCookie}>쿠키 읽기</button>
      <button onClick={deleteCookie}>쿠키 삭제</button>
    </div>
  );
}
