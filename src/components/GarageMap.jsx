const GarageMap = ({address}) => (
  <iframe
    className="garage-map"
    title="Garage location"
    src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    allowFullScreen
  />
);

export default GarageMap;
