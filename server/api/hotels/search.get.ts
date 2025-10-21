const allHotels = [
  { id: 1, name: 'Hotel Palace', price: 150, rating: 4.5, city: 'Rio de Janeiro' },
  { id: 2, name: 'Resort Beira Mar', price: 300, rating: 4.8, city: 'Recife' },
  { id: 3, name: 'Pousada do Sol', price: 120, rating: 4.2, city: 'Fortaleza' },
  { id: 4, name: 'Hotel Metrópole', price: 200, rating: 4.0, city: 'São Paulo' },
  { id: 5, name: 'Hostel Aconchego', price: 80, rating: 3.9, city: 'São Paulo' },
];

export default defineEventHandler((event) => {
  const query = getQuery(event);
  
  const destination = (query.destination as string || '').toLowerCase();
  
  console.log(`SSR API: Buscando por destino: "${destination}"`);

  if (!destination) {
    return allHotels;
  }

  const filteredHotels = allHotels.filter(hotel => 
    hotel.city.toLowerCase().includes(destination)
  );

  return filteredHotels;
});