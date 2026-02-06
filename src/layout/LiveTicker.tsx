export default function LiveTicker() {
  return (
    <div className="bg-teal-600 text-white py-2.5 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap text-sm font-medium">
        <span className="mx-8">USD/GBP 0.7723</span>
        <span className="mx-8">USD/EUR 0.9124</span>
        <span className="mx-8">BTC/USD 97,420.00</span>
        <span className="mx-8">ETH/USD 3,812.00</span>
        <span className="mx-8">USDT/USD 1.0001</span>
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0%); } to { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 28s linear infinite; }
      `}</style>
    </div>
  );
}