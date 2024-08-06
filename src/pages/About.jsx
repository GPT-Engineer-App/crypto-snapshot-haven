const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Crypto Tracker</h1>
      <p className="mb-4">
        Crypto Tracker is a simple web application that allows you to track cryptocurrency prices and market trends.
        Our data is sourced from the CoinCap API, providing real-time information on various cryptocurrencies.
      </p>
      <p className="mb-4">
        Features:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>View current prices of top cryptocurrencies</li>
        <li>Search for specific cryptocurrencies</li>
        <li>Check the top gainers in the last 24 hours</li>
        <li>Real-time data updates</li>
      </ul>
      <p>
        Stay informed about the crypto market with Crypto Tracker!
      </p>
    </div>
  );
};

export default About;
