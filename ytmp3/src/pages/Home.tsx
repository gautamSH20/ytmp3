import { useState } from "react";
import axios from "axios";
import { BACK_URL } from "../confi/Backurl";
import { MainIcon } from "../assets/Place";

export const Home = () => {
  const [getValue, setGetVlaue] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [back, setBack] = useState(false);
  const [link, setLink] = useState("");

  const handel = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = new URL(getValue); // Proper URL parsing
      const videoId =
        url.searchParams.get("v") || url.pathname.split("/").pop();

      console.log(videoId);
      if (!videoId) {
        console.error("Invalid YouTube URL");
        return;
      }

      const response = await axios.post(
        `${BACK_URL}/api/v1/download`,
        { id: videoId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        } // No need for manual JSON stringification
      );

      // console.log(response);
      if (response.data.data.status === "ok") {
        setBack(true);
        setTitle(response.data.data.title);
        setLink(response.data.data.link);
        setLoading(false);
      } else if (response.data.status === "fail") {
        alert(response.data.msg);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      alert(
        `${error} eighter the vid is too long or check the thing again refresh the page`
      );
      console.log("Error:" + error);
    }
  };

  return (
    <div className="flex flex-col items-center md:h-[70vh] p-4 md:w-[60vh] h-[70%] w-[45vh] rounded-md shadow-lg dark:bg-[#1e2939] dark:shadow-[#1e2949] shadow-white bg-linear-to-br from-[#6f19e8] to-[#a914ce]">
      <div className="flex items-center mb-10 dark:text-blue-300 text-white gap-5">
        <MainIcon />
        <div className="text-lg">IN-YT2MP4</div>
        <hr />
      </div>
      <div className="mb-1 text-lg opacity-60 dark:text-white ">
        {title
          ? title + " want to download it "
          : "here you can put the the link of the youtube video to download the audio"}
      </div>
      <div className=" gap-6 h-full flex flex-col justify-center w-[50vh] items-center ">
        <input
          placeholder="put your link "
          className="  border-b-2 w-[40vh] dark:text-white text-black"
          value={getValue}
          onChange={(e) => {
            setGetVlaue(e.target.value);
          }}
        ></input>
        {back ? (
          <button
            onClick={() => {
              setBack((e) => !e);
              setGetVlaue("");
              setLink("");
              setTitle("");
            }}
            className="bg-pink-300 dark:bg-pink-700 text-black p-1 rounded-md   hover:w-[20vh] hover:shadow-lg shadow-black ease-in duration-300 cursor-pointer"
          >
            to do more
          </button>
        ) : (
          <button
            disabled={loading}
            onClick={handel}
            className="bg-pink-300 dark:bg-pink-700 text-black dark:text-gray-300 p-1 rounded-md w-[20vh]  hover:w-[30vh] hover:shadow-lg shadow-black ease-in duration-300 hover:text-lg"
          >
            {loading ? "Converting...." : "Convert"}
          </button>
        )}

        {back ? (
          <a href={link}>
            <button
              disabled={loading}
              onClick={() => {
                setBack((e) => !e);
                setGetVlaue("");
                setLink("");
                setTitle("");
              }}
              className="bg-pink-400 dark:bg-pink-700 text-black p-1 rounded-md cursor-pointer   hover:w-[20vh] hover:shadow-lg shadow-black ease-in duration-300"
            >
              Download
            </button>
          </a>
        ) : null}
      </div>
    </div>
  );
};
