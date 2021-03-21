import { useEffect, useState } from "react";

function useCountdown(date) {
  // date would be a string of when the thing is expired
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(date) - new Date(); // will give us how long till the item expires in ms
      setTimeLeft(Math.round(msLeft / 1000)); // then turn the timer to seconds and remove decimals
    };

    const timerId = setInterval(findTimeLeft, 1000); // run interval every second, which would update the state, thus component would rerender
    return () => {
      // ensure whe component unmounts we remove timer
      clearInterval(timerId);
    };
  }, []);

  return timeLeft;
}

export default useCountdown;
