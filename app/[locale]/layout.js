import { getDictionary, locales, defaultLocale } from '@/lib/i18n';
import { getGeneralConfig } from '@/lib/firestore';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import WhatsAppButton from '@/components/public/WhatsAppButton';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const locale = locales.includes(params.locale) ? params.locale : defaultLocale;
  const dict = getDictionary(locale);
  const config = await getGeneralConfig();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar locale={locale} dict={dict} config={config} />
      <main style={{ flexGrow: 1 }}>{children}</main>
      <Footer locale={locale} dict={dict} config={config} />
      <WhatsAppButton whatsappNumber={config.whatsappNumber} />
    </div>
  );
}
