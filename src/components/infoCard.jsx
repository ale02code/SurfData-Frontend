function infoCard({ src, qua, label }) {
  return (
    <div className="px-7 py-5 border border-gray-300 w-56 h-36">
      <img className="h-9 mb-3" src={src} alt={label + "icon"} />
      <strong className="text-3xl">{qua}</strong>
      <p className="text-base">{label}</p>
    </div>
  );
}

export default infoCard;
