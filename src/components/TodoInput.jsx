import { useRef, useState } from "react";

export default function TodoInput(props) {
  const {
    handleAddTodo,
    todovalue,
    setTodoValue,
    subtitle,
    setSubtitle,
    time,
    setTime,
    selectedDate,
  } = props;

  const [inputErrorMessage, setInputErrorMessage] = useState("");
  const timeRef = useRef(null);

  const handleAddClick = () => {
    const subtitleValid = subtitle.trim().length >= 3;
    const textValid = todovalue.trim().length >= 3;

    if (!subtitleValid && !textValid) {
      setInputErrorMessage(
        "You should at least fill one of subtitle or text with more than 3 letters"
      );
      return;
    }

    handleAddTodo({
      done: false,
      id: Date.now(), // uid
      text: todovalue,
      subtitle,
      date: selectedDate,
      time,
    });

    setInputErrorMessage("");
  };

  return (
    <header className="w-auto rounded-lg">
      <div
        style={{ backgroundColor: "var(--bg-color)" }}
        className="flex flex-col md:flex-row gap-1 rounded-lg mx-auto md:mx-5"
      >
        {/* Subtitle & Todo */}
        <div className="flex flex-col  md:w-3/4 gap-2 p-2 rounded">
          <input
            style={{ backgroundColor: "var(--bg-color)" }}
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Enter subtitle ... required !"
            className="p-2 rounded w-full text-lg font-semibold"
            maxLength={30} // ⬅️ فقط اجازه می‌ده تا 30 کاراکتر نوشته بشه
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddClick();
              }
            }}
          />
          <textarea
            style={{ backgroundColor: "var(--bg-color)" }}
            value={todovalue}
            onChange={(e) => setTodoValue(e.target.value)}
            placeholder="Enter todo ..."
            className="p-2 h-12 rounded w-full text-left align-top resize-none"
            onKeyDown={(e) => {
              if (e.key == "Enter" && e.ctrlKey) {
                e.preventDefault();
                handleAddClick();
              }
            }}
          />
        </div>

        {/* Date & Time  & Button*/}
        <div className="flex md:w-1/4 gap-2 items-center justify-between flex-col p-2 rounded">
          <div className="flex md:flex-col gap-2 w-full place-items-center">
            {/* Time Picker */}
            <div
              style={{ backgroundColor: "var(--bg-color)" }}
              className="flex gap-1 text-center place-items-center rounded-full w-full"
            >
              <div className="relative w-full">
                <button
                  type="button"
                  onClick={() => timeRef.current.showPicker()}
                  className="p-1  md:p-2 rounded-full w-full md:h-[50px] flex items-center justify-center"
                >
                  <i className="text-2xl md:text-3xl fa-regular fa-clock block md:hidden lg:block"></i>
                  <span
                    className={` text-center mx-auto  md:text-xl text-white font-bold `}
                  >
                    {time ? time : "TIME"}
                  </span>
                </button>

                <input
                  ref={timeRef}
                  type="time"
                  value={time || ""}
                  onChange={(e) => setTime(e.target.value)}
                  className="bg-red-600 absolute top-0 left-0 w-0 h-100 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Add Button */}
            <button
              onClick={() => handleAddClick()}
              className="px-4 py-2 rounded w-full"
            >
              Add
            </button>
          </div>

          {/* add button here if needed */}
        </div>
      </div>

      {/* توضیح پایین */}
      {inputErrorMessage ? (
        <div
          id="alert-border-1"
          class="flex items-center p-4 my-2 mx-5 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
          role="alert"
        >
          <svg
            class="shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div class="ms-3 text-sm font-medium">{inputErrorMessage}</div>
        </div>
      ) : (
        <br />
      )}
    </header>
  );
}
