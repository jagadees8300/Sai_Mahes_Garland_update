const steps = [
  "Ordered",
  "Packed",
  "Out for Delivery",
  "Delivered",
];

export default function TrackOrder() {
  const order = JSON.parse(localStorage.getItem("order"));

  if (!order) {
    return <h2 className="text-center mt-10">No Order Found</h2>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Track Order</h1>

      {/* Order Details */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <p><b>Product:</b> {order.name}</p>
        <p><b>Price:</b> ₹{order.price}</p>
        <p><b>Order Date:</b> {order.orderDate}</p>
        <p><b>Delivery Date:</b> {order.deliveryDate}</p>
      </div>

      {/* Status Bar */}
      <div className="bg-white p-6 rounded shadow">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 text-center">
              
              {/* Circle */}
              <div
                className={`mx-auto w-8 h-8 rounded-full text-white flex items-center justify-center
                ${order.status > index ? "bg-green-600" : "bg-gray-300"}`}
              >
                ✔
              </div>

              {/* Line */}
              {index < steps.length - 1 && (
                <div
                  className={`h-1 mx-auto
                  ${order.status > index + 1 ? "bg-green-600" : "bg-gray-300"}`}
                ></div>
              )}

              <p className="mt-2 text-sm">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
