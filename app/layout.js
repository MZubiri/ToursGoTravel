import './globals.css';

export const metadata = {
  title: 'GoTravel — Tours Exclusivos en Los Cabos, Cancún y Puerto Vallarta',
  description: 'Reserva los mejores tours y experiencias de lujo en México con atención personalizada 24/7.',
  keywords: ['tours mexico', 'tours los cabos', 'tours cancun', 'tours puerto vallarta', 'yate privado', 'snorkel arco cabos'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
