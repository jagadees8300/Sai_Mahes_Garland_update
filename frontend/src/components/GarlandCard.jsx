export default function GarlandCard({ garland }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-3">
      
      <img
        src={garland.image}
        alt={garland.name}
        className="h-48 w-full object-cover rounded"
      />

      <h2 className="mt-2 font-semibold text-lg">
        {garland.name}
      </h2>

      <p className="text-green-600 font-bold text-xl">
        ₹{garland.price}
      </p>

      <button
        className="mt-3 w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded font-semibold"
      >
        Order Now
      </button>
    </div>
  );
}
