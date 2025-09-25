export default function CasualCard({ card }) {
  return (
    <div 
    style={{
      fontFamily: '"Amatic SC", sans-serif',
    }}
    className="flex flex-col items-center justify-center p-4 rounded-xl w-full max-w-md">
      {/* Header */}
      <h2 className="text-3xl md:text-6xl font-bold mb-2 text-center text-white capitalize">
        {card.title}
      </h2>

      {/* Image / GIF placeholder */}
      {card.preView && (
        <div className="w-60 h-auto mb-2 flex items-center justify-center overflow-hidden rounded-lg">
          <img
            src={card.preView}
            alt="Step visual"
            className="object-cover rounded-lg"
          />
        </div>
      )}

      {/* Paragraph */}
      <div className="text-2xl font-bold mt-2 text-center leading-relaxed text-white">
        {card.description}
      </div>

      {/* Big Next button */}
    </div>
  );
}
