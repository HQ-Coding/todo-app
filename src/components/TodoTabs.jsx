export default function TodoTabs({ ViewTabs, view }) {
  return (
    <div className="max-w-full">
      <div
        className="grid w-md grid-cols-4 gap-1 p-1 mx-auto md:mx-5  rounded-lg"
        role="group"
      >
        <button
          onClick={() => ViewTabs("Ongoing")}
          type="button"
          className={`flex items-center justify-center gap-2 px-5 py-2 text-sm font-medium rounded-l transition ${
            view === "Ongoing" ? "bg-gray-300" : ""
          }`}
        >
          <i className="fa-solid fa-hourglass-start"></i>Ongoing
        </button>

        <button
          onClick={() => ViewTabs("Done")}
          type="button"
          className={`flex items-center justify-center gap-2 px-5 py-2 text-sm font-medium transition ${
            view === "Done" ? "bg-gray-300" : ""
          }`}
        >
          <i className="fa-solid fa-hourglass-end"></i> Done
        </button>

        <button
          onClick={() => ViewTabs("Deleted")}
          type="button"
          className={`flex items-center justify-center gap-2 px-5 py-2 text-sm font-medium rounded-r transition ${
            view === "Deleted" ? "bg-gray-300" : ""
          }`}
        >
          <i className="fa-solid fa-trash-can"></i> Deleted
        </button>

        <button
          onClick={() => ViewTabs("History")}
          type="button"
          className={`flex items-center justify-center gap-2 px-5 py-2 text-sm font-medium rounded-r transition ${
            view === "History" ? "bg-gray-300" : ""
          }`}
        >
          <i class="fa-solid fa-clock-rotate-left"></i> History
        </button>
      </div>
      {/* <hr className="mx-auto w-[95%] mt-3" /> */}
    </div>
  );
}
