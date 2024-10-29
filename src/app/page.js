"use client"

import styles from "./page.module.css";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  // const [message, setMessage] = useState('default');
  // const [pMessage, setPMessage] = useState('');

  // const setCookie = () => {
  //   document.cookie = "volleh=hi; path=/; domain=minsoku.shop; max-age=360000";
  //   console.log(document.cookie);
  // };

  // const handleGetCookie = () => {
  //   console.log(document.cookie);
  // };

  // const deleteCookie = () => {
  //   document.cookie = "volleh" + '=; Max-Age=-99999999;';
  // };

  // const sendMessageToChild = () => {
  //   try {
  //   window.parent.postMessage({
  //     type: 'CHILD_MESSAGE',
  //     data: pMessage
  //     }, 'https://test.minsoku.shop');
  //     console.log('(자식) : 부모님께 메시지 전송 완료');
  //   } catch (error) {
  //     console.error('(자식) : 메시지 전송 실패:', error);
  //   }
  // };

  // useEffect(() => {    
  //   const receiveMessage = (event) => {
  //     if (event.origin === "https://test.minsoku.shop") {
  //       setMessage(event.data.data)
  //     }
  //   };
  
  //   window.addEventListener('message', receiveMessage);

  //   return () => {
  //     console.log('(자식) : unMount');
  //     window.removeEventListener('message', receiveMessage);
  //   };
  // }, []);

  // return (
  //   <div className={styles.page}>
  //     여기가 자식페이지임
  //     <input placeholder='부모님에게 하고 싶은 말' onChange={event => setPMessage(event.target.value)}  />
  //     <button onClick={sendMessageToChild}>부모님께 메시지</button>
  //     <div style={{ padding: '5px' }} />
  //     <div>부모님께서 보내주신 메시지 : {message}</div>
  //     <button onClick={setCookie}>쿠키 설정</button>
  //     <button onClick={handleGetCookie}>쿠키 읽기</button>
  //     <button onClick={deleteCookie}>쿠키 삭제</button>
  //   </div>
  // );
  const iframeRef = useRef(null);
  const [message, setMessage] = useState('');
  const [pMessage, setPMessage] = useState('');
  useEffect(() => {
    const receiveMessage = (event) => {
      if (event.origin === "https://www.test.minsoku.shop") {
        setMessage(event.data.data);
      }
    };
    window.addEventListener('message', receiveMessage);
  
    return () => {
      console.log('(부모) : unMount');
      window.removeEventListener('message', receiveMessage);
    };
  }, []);

  const sendMessage = () => {
    try {
      iframeRef.current.contentWindow.postMessage({
        type: 'PARENT_MESSAGE',
        data: pMessage
      }, 'https://www.test.minsoku.shop');
      console.log('(부모) : 완료');
    } catch (error) {
      console.error('(부모) : 실패:', error);
    }
  };

  return (
    <div>
      여기가 부모페이지임
      <input placeholder='자식에게 하고 싶은 말' onChange={event => setPMessage(event.target.value)}  />
      <button onClick={sendMessage}>자식에게 하고 싶은 말</button>
      <div style={{ padding: '5px' }} />
      <div>자식이 보낸 말 : {message}</div>
      <div style={{ padding: '5px' }} />
      <iframe
        ref={iframeRef}
        src="https://www.test.minsoku.shop"
        width="100%"
        height="100vh"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
        allowFullScreen
        onLoad={() => console.log('iframe 로드 완료')}
        style={{ border: 'none', height: '100vh' }}
      />
    </div>
  );
}
