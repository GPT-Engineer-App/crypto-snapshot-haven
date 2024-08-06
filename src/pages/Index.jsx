import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Confetti from 'react-confetti';

const fetchCryptoData = async () => {
  const response = await axios.get('https://api.coincap.io/v2/assets');
  return response.data.data;
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const { data: cryptoData, isLoading, isError } = useQuery({
    queryKey: ['cryptoData'],
    queryFn: fetchCryptoData,
  });

  useEffect(() => {
    const confettiInterval = setInterval(() => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds
    }, 60000); // Trigger every 60 seconds (1 minute)

    return () => clearInterval(confettiInterval);
  }, []);

  const filteredData = cryptoData?.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (isError) return <div className="flex justify-center items-center h-screen">Error fetching data</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {showConfetti && <Confetti />}
      <h1 className="text-3xl font-bold mb-6">Crypto Tracker</h1>
      <Input
        type="text"
        placeholder="Search cryptocurrencies..."
        className="mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Price (USD)</TableHead>
            <TableHead>24h Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData?.map((crypto) => (
            <TableRow key={crypto.id}>
              <TableCell>{crypto.rank}</TableCell>
              <TableCell>{crypto.name}</TableCell>
              <TableCell>{crypto.symbol}</TableCell>
              <TableCell>${parseFloat(crypto.priceUsd).toFixed(2)}</TableCell>
              <TableCell className={parseFloat(crypto.changePercent24Hr) >= 0 ? 'text-green-600' : 'text-red-600'}>
                {parseFloat(crypto.changePercent24Hr).toFixed(2)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Index;
