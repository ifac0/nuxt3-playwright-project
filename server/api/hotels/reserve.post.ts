export default async function (event) {
  const body = await readBody(event);
  console.log('SSR API: Recebendo reserva para:', body.userName);
  
  if (!body.userName) {
    throw createError({ 
      statusCode: 400, 
      statusMessage: 'Nome é obrigatório' 
    });
  }

  return {
    success: true,
    reservationId: `fake-${Date.now()}`,
    status: 'Reserva Confirmada' 
  };
};