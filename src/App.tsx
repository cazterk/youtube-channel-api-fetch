import { useEffect, useState } from "react";
import { MdSubscriptions } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import CountUp from "react-countup";

function App() {
  const [subscriberCount, setSubscriberCount] = useState<number | any>();
  const [viewCount, setviewrCount] = useState<number | any>();
  const [videoCount, setvideoCount] = useState<number | any>();

  const API_KEY = import.meta.env.VITE_API_KEY;
  const CHANNEL_ID = import.meta.env.VITE_CHANNEL_ID;
  const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`;

  const getYouTubeChannelData = async () => {
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const subCount = parseInt(data.items[0].statistics.subscriberCount);
        const viewCount = parseInt(data.items[0].statistics.viewCount);
        const videoCount = parseInt(data.items[0].statistics.videoCount);

        setSubscriberCount(subCount);
        setviewrCount(viewCount);
        setvideoCount(videoCount);
      });
  };

  useEffect(() => {
    getYouTubeChannelData();
    console.log("subscribers: ", subscriberCount);
    console.log("view count: ", viewCount);
    console.log("video count: ", videoCount);
  });

  const items = "grid justify-items-center text-lg  mx-8";
  return (
    <>
      <div className="w-full shadow-md flex justify-center px-8 h-20 items-center">
        <h1 className="text-center font-bold text-xl">
          ✨Welcome To My Channel Analytics API✨
        </h1>
      </div>
      <IconContext.Provider
        value={{
          size: "50",
          color: "#FF0000",
        }}
      >
        <div className="flex justify-center items-center h-60 ">
          <p className={`${items}`}>
            <MdSubscriptions />
            <CountUp end={subscriberCount} duration={20} separator="," />
          </p>{" "}
          <p className={`${items}`}>
            <AiFillEye />
            <CountUp end={viewCount} duration={20} separator="," />
          </p>{" "}
          <p className={`${items}`}>
            {" "}
            <BsFillCameraVideoFill />
            <CountUp end={videoCount} duration={20} separator="," />
          </p>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default App;
