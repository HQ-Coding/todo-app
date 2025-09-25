import { useEffect, useState } from "react";

export default function HeroText({ todosByDate, aiActive, aiResponse }) {
  const [fQuotes, setFQuotes] = useState(null);
  const [textToShow, setTextToShow] = useState("");

  const quotes_Url =
    "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

  const randomChose = (itemList) => {
    const randomItem = itemList[Math.floor(Math.random() * itemList.length)];
    return randomItem;
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchQuotes = async () => {
      try {
        const res = await fetch(quotes_Url, { signal });
        if (!res.ok) {
          throw new Error("❌ پاسخ معتبر نیست: " + res.status);
        }
        const json = await res.json();
        setFQuotes(json);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("⏹️ درخواست قطع شد");
        } else {
          console.error("⚠️ خطا:", err.message);
        }
      }
    };

    fetchQuotes();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (fQuotes) {
      setTextToShow(randomChose(fQuotes.quotes).quote);
    }
  }, [fQuotes, JSON.stringify(todosByDate)]); // use JSON.stringify of todosByDate - its a parent state so each change could change state

  return (
    <div
      className=" p-5 w-full text-xs md:text-lg md:font-medium font-semibold leading-relaxed
                 h-[100px] md:h-[300px] overflow-y-scroll
                 [scrollbar-width:none] [-ms-overflow-style:none]"
      style={{
        color: "var(--text-color)",
        scrollbarWidth: "none", // برای فایرفاکس
      }}
    >
      <p className="text-white">
        {!aiActive ? textToShow || "Loading..." : aiResponse || "Loading..."}
      </p>
    </div>
  );
}
