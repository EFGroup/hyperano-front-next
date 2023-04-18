import { useEffect, useRef, useState } from 'react';
import useForceUpdate from 'use-force-update';
import { useDispatch, useSelector } from 'react-redux';
import { setLog, addLog, resetQueue, setUser } from 'redux/actions';
import { toast } from 'react-toastify';

const initialConfig = {
  isQueueAsync: false,
};

export const useOfflineQueue = (config) => {
  const { isQueueAsync, timeoutInMS } = {
    ...initialConfig,
    ...config,
  };
  const [isOnline, setIsOnline] = useState(() =>
    navigator && typeof navigator.onLine === 'boolean' ? navigator.onLine : true
  );
  const dispatch = useDispatch();
  const { queue } = useSelector((state) => state.app);

  const offlineTimeoutRef = useRef();
  // const [queueRef, setQueue] = useState(queue.map( q => ({...q, callback: eval(q.callback)}) ));
  const [queueRef, setQueue] = useState(queue);
  const forceUpdate = useForceUpdate();


  useEffect(() => {
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  const clearQueue = () => {
    setQueue([])
    forceUpdate();
    dispatch(resetQueue())
  };

  const createOfflineTimeout = () => {
    offlineTimeoutRef.current = setTimeout(clearQueue, timeoutInMS);
  };

  const dequeueAll = () => {
    if (isQueueAsync) {
      dequeueAllAsync();
    } else {
      queueRef.forEach(callback => callback());
      clearQueue();
    }
  };

  const dequeueAllAsync = async () => {
    const callbacks = [...queueRef];

    for (const callback of callbacks) {
      try {
        const func = eval(callback.callback)
        await func();
      } catch (error) {
        console.log("Q error", error)
      }
      queueRef.shift();
      forceUpdate();
    }
    clearQueue();
  };

  const enqueue = (callback) => {
    if (isOnline) {
      callback.callback();
      return;
    }

    offlineTimeoutRef.current && clearTimeout(offlineTimeoutRef.current);
    timeoutInMS && createOfflineTimeout();

    queueRef.push(callback);
    toast.error("ارتباط شما با شبکه برقرار نیست!")
    toast.warning("درخواست شما در صف ارسال قرار گرفت")
  };

  const isQueueEmpty = () => queueRef.length === 0;

  const onOffline = () => {
    setIsOnline(false);

    if (!timeoutInMS) {
      return;
    }

    createOfflineTimeout();
  };

  const onOnline = () => {
    setIsOnline(true);
    offlineTimeoutRef.current && clearTimeout(offlineTimeoutRef.current);
    queueRef.length > 0 && dequeueAll();
  };

  const peek = () => queueRef[0];

  useEffect( () => {
    queueRef.length > 0 && dispatch(setLog({
      queue: queueRef.map( qRef => ({...qRef, callback: qRef.callback.toString()}) )
    }))
  }, [queueRef.length])

  return {
    dequeueAll,
    dequeueAllAsync,
    enqueue,
    isQueueEmpty,
    isOnline,
    peek,
    queue: queueRef,
  };
};

export default useOfflineQueue;