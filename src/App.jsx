import React, { Suspense, lazy, useState, useEffect, useRef } from "react";
// Coponents ################################################
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList/TodoList";
import TodoTabs from "./components/TodoTabs";
import TodoNavBar from "./components/Navbar/TodoNavbar";
import HeroSection from "./components/HeroSection/HeroSection";
import TodoSelectDate from "./components/TodoSelectDate";
import DoneTodoList from "./components/DoneTodo/DoneTodoList";
import DeletedTodoList from "./components/DeleteTodo/DeletedTodoList";

const HeroPickerModal = React.lazy(() =>
  import("./components/HeroSection/HeroPickerModal")
);
const Modal = React.lazy(() => import("./components/Modal/Modal"));
// hooks #####################################################
import useAI from "./hooks/useAI";
import useSound from "./hooks/useSound";
import TodoHistory from "./components/TodoHistory/TodoHistory";
import useTodoHistory from "./hooks/useTodoHistory";

// ############################ APP ############################
function App() {
  const appBase = useRef(null);

  const [todosByDate, setTodosByDate] = useState({});
  const [todosDoneByDate, setTodosDoneByDate] = useState({});
  const [todosDeletedByDate, setTodosDeletedByDate] = useState({});

  const [view, setView] = useState("Ongoing");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [todovalue, setTodoValue] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [time, setTime] = useState("");
  // this add for animation :
  const [removingTodos, setRemovingTodos] = useState([]);
  const [addingTodos, setaddingTodos] = useState([]);
  const [restoringTodos, setRestoringTodos] = useState([]);
  const [completingTodos, setCompletingTodos] = useState([]);
  // Play sound Effect of Actions
  const [soundMute, setSoundMute] = useState(false);
  const [sfxVolume, setSfxVolume] = useState(1);
  const playSound = useSound(soundMute, sfxVolume); //hook playSound
  // Themes Background - Color - Font
  const [selectedBackground, setSelectedBackground] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedFont, setSelectedFont] = useState(() => {
    return localStorage.getItem("customFont") || '"Inter", sans-serif';
  });
  // Ai
  const [username, setUsername] = useState("");
  const [aiActive, setAiActive] = useState(false);
  const { aiResponse, sendToAI } = useAI(username); //hook AI
  // Modal
  const [modalToggle, setModalToggle] = useState(() => {
    const seen = localStorage.getItem("modalSeen");
    return seen ? false : true;
  });
  // History
  const { todoHistory, getHistory, removeHistoryFromData } = useTodoHistory(
    todosByDate,
    setTodosByDate,
    todosDoneByDate,
    setTodosDoneByDate,
    todosDeletedByDate,
    setTodosDeletedByDate
  );
  // Hero
  const [isHeroMenuOpen, setIsHeroMenuOpen] = useState(false);
  const [selectedHero, setSelectedHero] = useState(() => {
    return localStorage.getItem("customHero") || "./assets/HeroVideo/1.mp4";
  });

  // ############################  FUNCTIONS  ############################

  // Font
  const changeFont = (fontFamily) => {
    document.body.style.fontFamily = fontFamily;
    setSelectedFont(fontFamily);
  };

  // Modal Info Button
  function closeModal() {
    setModalToggle(false);
    localStorage.setItem("modalSeen", "true");
  }

  // Save selected date to localStorage
  function handleDateChange(date) {
    setSelectedDate(date);
    localStorage.setItem("selectedDate", date);
  }

  // ADD TODO
  function handleAddTodo(newTodo) {
    const dateKey = selectedDate;
    const updatedTodosByDate = { ...todosByDate };

    if (!updatedTodosByDate[dateKey]) updatedTodosByDate[dateKey] = [];
    updatedTodosByDate[dateKey] = [...updatedTodosByDate[dateKey], newTodo];

    setTodoValue("");
    setSubtitle("");
    setTime("");

    setaddingTodos((prev) => [...prev, newTodo.id]);
    setTodosByDate(updatedTodosByDate);
    persistData(updatedTodosByDate, todosDoneByDate, todosDeletedByDate);

    if (aiActive) {
      sendToAI(newTodo.text, username);
    }

    setTimeout(() => {
      if (!soundMute) {
        playSound("add.mp3");
      }
      setaddingTodos((prev) => prev.filter((id) => id !== newTodo.id));
    }, 900);
  }

  // DELETE TODO
  function handleDeleteTodo(uid) {
    const dateKey = selectedDate;
    const currentTodos = todosByDate[dateKey] || [];
    const deletedTodo = currentTodos.find((todo) => todo.id === uid);
    if (!deletedTodo) return;

    setRemovingTodos((prev) => [...prev, uid]);

    setTimeout(() => {
      const updatedTodosByDate = { ...todosByDate };
      updatedTodosByDate[dateKey] = currentTodos.filter(
        (todo) => todo.id !== uid
      );

      const updatedDeletedByDate = { ...todosDeletedByDate };
      if (!updatedDeletedByDate[dateKey]) updatedDeletedByDate[dateKey] = [];
      updatedDeletedByDate[dateKey] = [
        ...updatedDeletedByDate[dateKey],
        deletedTodo,
      ];

      setTodosByDate(updatedTodosByDate);
      setTodosDeletedByDate(updatedDeletedByDate);
      persistData(updatedTodosByDate, todosDoneByDate, updatedDeletedByDate);

      if (!soundMute) playSound("delete.mp3");
      setRemovingTodos((prev) => prev.filter((id) => id !== uid));
    }, 900);
  }

  // EDIT TODO
  function handleEditTodo(uid, updatedTodo) {
    const dateKey = selectedDate;
    const currentTodos = todosByDate[dateKey] || [];
    const updatedTodosByDate = { ...todosByDate };
    updatedTodosByDate[dateKey] = currentTodos.map((todo) =>
      todo.id === uid ? { ...todo, ...updatedTodo } : todo
    );

    setTodosByDate(updatedTodosByDate);
    persistData(updatedTodosByDate, todosDoneByDate, todosDeletedByDate);
    if (!soundMute) {
      playSound("interface.mp3");
    }
  }

  // MARK DONE
  function handleMarkDone(uid) {
    setCompletingTodos((prev) => [...prev, uid]);

    const dateKey = selectedDate;
    const currentTodos = todosByDate[dateKey] || [];
    const doneTodo = {
      ...currentTodos.find((todo) => todo.id === uid),
      done: true,
    };

    const updatedTodosByDate = { ...todosByDate };
    updatedTodosByDate[dateKey] = currentTodos.filter(
      (todo) => todo.id !== uid
    );

    const updatedDoneByDate = { ...todosDoneByDate };
    if (!updatedDoneByDate[dateKey]) updatedDoneByDate[dateKey] = [];
    updatedDoneByDate[dateKey] = [
      ...updatedDoneByDate[dateKey],
      { ...doneTodo, done: true },
    ];

    setTimeout(() => {
      setTodosByDate(updatedTodosByDate);
      setTodosDoneByDate(updatedDoneByDate);
      persistData(updatedTodosByDate, updatedDoneByDate, todosDeletedByDate);

      if (!soundMute) playSound("complete-01.mp3");

      setCompletingTodos((prev) => prev.filter((id) => id !== uid));
    }, 900);
  }

  // RESTORE
  function restoreTodo(uid) {
    const dateKey = selectedDate;
    const deletedTodos = todosDeletedByDate[dateKey] || [];
    const todoToRestore = deletedTodos.find((t) => t.id === uid);
    if (!todoToRestore) return;

    const updatedDeletedByDate = { ...todosDeletedByDate };
    updatedDeletedByDate[dateKey] = deletedTodos.filter((t) => t.id !== uid);

    const updatedTodosByDate = { ...todosByDate };
    if (!updatedTodosByDate[dateKey]) updatedTodosByDate[dateKey] = [];
    updatedTodosByDate[dateKey] = [
      ...updatedTodosByDate[dateKey],
      todoToRestore,
    ];

    setRestoringTodos((prev) => [...prev, uid]);

    setTimeout(() => {
      setTodosDeletedByDate(updatedDeletedByDate);
      setTodosByDate(updatedTodosByDate);
      persistData(updatedTodosByDate, todosDoneByDate, updatedDeletedByDate);
      if (!soundMute) {
        playSound("restore.mp3");
      }
      setRestoringTodos((prev) => prev.filter((id) => id !== uid));
    }, 600);
  }
  // REMOVE
  function removeFromData(uid) {
    const dateKey = selectedDate;
    const updatedDeletedByDate = { ...todosDeletedByDate };
    const updatedDoneByDate = { ...todosDoneByDate };

    updatedDeletedByDate[dateKey] = (
      updatedDeletedByDate[dateKey] || []
    ).filter((t) => t.id !== uid);

    updatedDoneByDate[dateKey] = (updatedDoneByDate[dateKey] || []).filter(
      (t) => t.id !== uid
    );

    setRemovingTodos((prev) => [...prev, uid]);

    setTimeout(() => {
      setTodosDeletedByDate(updatedDeletedByDate);
      setTodosDoneByDate(updatedDoneByDate);
      persistData(todosByDate, updatedDoneByDate, updatedDeletedByDate);
      if (!soundMute) playSound("delete.mp3");
      setRemovingTodos((prev) => prev.filter((id) => id !== uid));
    }, 900);
  }

  // PERSIST TODOS
  function persistData(todosByDate, todosDoneByDate, todosDeletedByDate) {
    localStorage.setItem("todosByDate", JSON.stringify(todosByDate));
    localStorage.setItem("todosDoneByDate", JSON.stringify(todosDoneByDate));
    localStorage.setItem(
      "todosDeletedByDate",
      JSON.stringify(todosDeletedByDate)
    );
  }

  // ############################  USE STATE  ############################
  // LOAD TODOS FROM STORAGE
  useEffect(() => {
    const localTodos = JSON.parse(localStorage.getItem("todosByDate") || "{}");
    const localDone = JSON.parse(
      localStorage.getItem("todosDoneByDate") || "{}"
    );
    const localDeleted = JSON.parse(
      localStorage.getItem("todosDeletedByDate") || "{}"
    );
    const localSelectedDate = localStorage.getItem("selectedDate");

    setTodosByDate(localTodos);
    setTodosDoneByDate(localDone);
    setTodosDeletedByDate(localDeleted);

    if (localSelectedDate) setSelectedDate(localSelectedDate);

    getHistory(localTodos, localDone, localDeleted);
  }, []);

  // APPLY BACKGROUND & THEME
  useEffect(() => {
    if (!appBase.current) return;

    appBase.current.style.backgroundImage = selectedBackground
      ? `url(${selectedBackground})`
      : "none";
    appBase.current.style.backgroundSize = "cover";
    appBase.current.style.backgroundPosition = "center";

    const themes = [
      "purpleTheme",
      "pinkTheme",
      "redTheme",
      "orangeTheme",
      "yellowTheme",
      "creamTheme",
      "greenTheme",
      "darkGreenTheme",
      "neutralTheme",
      "darkTechTheme",
      "DarkBlueTheme",
    ];
    themes.forEach((t) => appBase.current.classList.remove(t));

    if (selectedTheme) appBase.current.classList.add(selectedTheme);
  }, [selectedBackground, selectedTheme]);

  // LOAD SETTING : BACKGROUND - THEME - USERNAME
  useEffect(() => {
    const savedBg = localStorage.getItem("customBackground");
    const savedTheme = localStorage.getItem("customTheme");
    const savedUserName = localStorage.getItem("UserName");
    const savedHero = localStorage.getItem("customHero");

    if (savedBg) setSelectedBackground(savedBg);
    if (savedTheme) setSelectedTheme(savedTheme);
    if (savedUserName) setUsername(savedUserName);
    if (savedHero) setSelectedHero(savedHero);

    // فونت فقط همینجا اعمال بشه
    document.body.style.fontFamily = selectedFont;
  }, []);

  // SAVE SETTINGS WHEN STATE CHANGES [ Background , Color , UserName , Font ]
  useEffect(() => {
    localStorage.setItem("customBackground", selectedBackground);
    localStorage.setItem("customTheme", selectedTheme);
    localStorage.setItem("UserName", username);
    localStorage.setItem("customFont", selectedFont);
    localStorage.setItem("customHero", selectedHero);

    // هر بار فونت تغییر کنه روی body اعمال شه
    document.body.style.fontFamily = selectedFont;
  }, [selectedBackground, selectedTheme, username, selectedFont, selectedHero]);

  // ############################  RENDER APP  ############################
  return (
    <div className="min-h-screen flex justify-center items-start md:p-4 bg-black">
      <div
        id="appBase"
        ref={appBase}
        style={{ fontFamily: selectedFont }}
        className="w-full flex flex-col items-center max-w-full rounded-xl px-4 pb-4"
      >
        {modalToggle && (
          <React.Suspense fallback={null}>
            <Modal modalToggle={modalToggle} closeModal={closeModal} />
          </React.Suspense>
        )}

        {isHeroMenuOpen && (
          <React.Suspense fallback={null}>
            <HeroPickerModal
              setIsHeroMenuOpen={setIsHeroMenuOpen}
              setSelectedHero={setSelectedHero}
              selectedHero={selectedHero}
            />
          </React.Suspense>
        )}

        {/* NavBar  +++++++++++++++++++++ */}
        <div className="w-full rounded-xl">
          <TodoNavBar
            appBase={appBase}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
            setSelectedBackground={setSelectedBackground}
            sfxVolume={sfxVolume}
            setSfxVolume={setSfxVolume}
            soundMute={soundMute}
            setSoundMute={setSoundMute}
            username={username}
            setUsername={setUsername}
            aiActive={aiActive}
            setAiActive={setAiActive}
            selectedFont={selectedFont}
            changeFont={changeFont}
            setModalToggle={setModalToggle}
          />
        </div>
        <div
          className="w-full xl:w-[1400px] rounded-xl flex flex-col md:flex-row-reverse md:justify-center mx-auto
        "
        >
          {/* inside objects +++++++++++++++++++++ */}
          <div className="max-w-full rounded-xl md:w-3/12 lg:5/12">
            <HeroSection
              todosByDate={todosByDate}
              aiActive={aiActive}
              aiResponse={aiResponse}
              setIsHeroMenuOpen={setIsHeroMenuOpen}
              selectedHero={selectedHero}
            />
          </div>

          <div className="max-w-full rounded-xl md:w-8/12 md:ml-5">
            <TodoSelectDate
              selectedDate={selectedDate}
              handleDateChange={handleDateChange}
            />

            <TodoInput
              handleAddTodo={handleAddTodo}
              todovalue={todovalue}
              setTodoValue={setTodoValue}
              subtitle={subtitle}
              setSubtitle={setSubtitle}
              time={time}
              setTime={setTime}
              selectedDate={selectedDate}
            />

            <TodoTabs ViewTabs={setView} view={view} />

            {view === "Ongoing" && (
              <TodoList
                todos={(todosByDate[selectedDate] || []).filter(
                  (todo) => !todo.done
                )}
                handleEditTodo={handleEditTodo}
                handleDeleteTodo={handleDeleteTodo}
                handleMarkDone={handleMarkDone}
                removingTodos={removingTodos}
                addingTodos={addingTodos}
                completingTodos={completingTodos}
              />
            )}

            {view === "Done" && (
              <DoneTodoList
                todosDone={todosDoneByDate[selectedDate] || []}
                removeFromData={removeFromData}
                removingTodos={removingTodos}
              />
            )}

            {view === "Deleted" && (
              <DeletedTodoList
                todosDeleted={todosDeletedByDate[selectedDate] || []}
                restoreTodo={restoreTodo}
                removeFromData={removeFromData}
                restoringTodos={restoringTodos}
                removingTodos={removingTodos}
              />
            )}

            {view === "History" && (
              <TodoHistory
                history={todoHistory}
                removeHistoryFromData={removeHistoryFromData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
