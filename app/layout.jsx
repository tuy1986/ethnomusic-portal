import "./globals.css";

export const metadata = {
  title: "Лаборатория этномузыковедения им. Ю. И. Шейкина",
  description: "Цифровой архив исследовательской коллекции",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
