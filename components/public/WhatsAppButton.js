import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink, trackWhatsAppClick } from '@/lib/whatsapp';

export default function WhatsAppButton({ whatsappNumber }) {
  return (
    <a
      href={getWhatsAppLink({ phone: whatsappNumber })}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackWhatsAppClick}
      className="animate-pulse-wa"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9999,
        width: '62px',
        height: '62px',
        borderRadius: '50%',
        backgroundColor: '#25D366',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(37, 211, 102, 0.45)',
        transition: 'transform 0.2s ease',
      }}
      title="Hablar directamente por WhatsApp"
    >
      <MessageCircle size={32} />
    </a>
  );
}
