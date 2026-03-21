import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "建築・内装AIソリューション",
  description: "図面からフォトリアルな完成イメージを自動生成。建築・内装業者様向けAIプラットフォーム。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
