import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const fetchTopGainers = async () => {
  const response = await axios.get('https://api.coincap.io/v2/assets');
  return response.data.data
    .sort((a, b) => parseFloat(b.changePercent24Hr) - parseFloat(a.changePercent24Hr))
    .slice(0, 10);
};

const TopGainers = () => {
  const { data: topGainers, isLoading, isError } = useQuery({
    queryKey: ['topGainers'],
    queryFn: fetchTopGainers,
  });

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (isError) return <div className="flex justify-center items-center h-screen">Error fetching data</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Top 10 Gainers (24h)</h1>
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
          {topGainers?.map((crypto) => (
            <TableRow key={crypto.id}>
              <TableCell>{crypto.rank}</TableCell>
              <TableCell>{crypto.name}</TableCell>
              <TableCell>{crypto.symbol}</TableCell>
              <TableCell>${parseFloat(crypto.priceUsd).toFixed(2)}</TableCell>
              <TableCell className="text-green-600">
                {parseFloat(crypto.changePercent24Hr).toFixed(2)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TopGainers;
