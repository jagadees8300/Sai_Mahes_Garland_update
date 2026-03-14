function MapSection() {
  return (
    <div className="w-full mt-10">
      <h2 className="text-xl font-bold text-center mb-4">Location</h2>

      <iframe
        src="https://www.google.com/maps?q=Sai+Maheshwari+Garlands&output=embed"
        width="40%"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        title="Sai Maheshwari Garlands Location"
      />
    </div>
  );
}

export default MapSection;
