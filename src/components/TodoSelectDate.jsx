export default function TodoSelectDate({ selectedDate, handleDateChange }) {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  function renderNewDays(count = 10) {
    let now = new Date();
    const daysArray = [];

    for (let i = 0; i < count; i++) {
      const d = new Date();
      d.setDate(now.getDate() + i);
      daysArray.push({
        day: d.getDate(),
        month: d.getMonth(),
        year: d.getFullYear(),
      });
    }
    return daysArray;
  }

  const daysArray = renderNewDays();

  return (
    <div className="relative max-h-full flex justify-between gap-2 p-2 mx-auto md:mx-5 my-2 md:my-4 border rounded overflow-x-auto flex-nowrap touch-pan-x backdrop-blur-[20px]">
      {daysArray.map((dayInfo, index) => {
        const formattedDate = `${dayInfo.year}-${String(
          dayInfo.month + 1
        ).padStart(2, "0")}-${String(dayInfo.day).padStart(2, "0")}`;
        const isSelected = selectedDate === formattedDate;

        return (
          <button
            key={index}
            onClick={() => handleDateChange(formattedDate)}
            style={{ boxShadow: "0 1px 5px black" }}
            className={`overflow-hidden flex flex-col min-w-[40px] md:min-w-[60px] flex-shrink-0 rounded cursor-pointer h-16 md:h-24
              ${isSelected ? "bg-gray-900 text-white" : ""}`}
          >
            <span
              className="text-xs md:text-lg font-light md:font-semibold relative flex-1 flex items-center justify-center"
              style={{ boxShadow: "inset 0 -3px 5px #ccc" }}
            >
              {dayInfo.day}
            </span>
            <span
              className="text-xs md:text-lg font-light md:font-semibold relative flex-1 flex items-center justify-center"
              style={{ boxShadow: "inset 0 3px 5px #ccc" }}
            >
              {months[dayInfo.month]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
