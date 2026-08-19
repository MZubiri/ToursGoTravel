import { INITIAL_CONFIG } from './demo-data';

export function getWhatsAppLink({ phone = INITIAL_CONFIG.whatsappNumber, tourTitle = '', destination = '', customMessage = '' }) {
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  let message = customMessage;

  if (!message && tourTitle) {
    message = `Hola, me interesa reservar el tour "${tourTitle}"${destination ? ` en ${destination}` : ''}. ¿Me pueden compartir información de disponibilidad y fechas?`;
  } else if (!message) {
    message = "Hola, me gustaría recibir más información sobre sus tours y promociones disponibles.";
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodedMessage}`;
}
