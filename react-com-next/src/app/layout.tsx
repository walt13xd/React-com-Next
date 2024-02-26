'use client'
import "./globals.css"
import type { ReactNode } from "react"
import Provider from "./Provider";
import AppBar from "./AppBar";

interface IProps {
  children: ReactNode;
}

export default function RootLayout({children}: IProps) {
  return (
    <html lang="en">  
      <body>
        <Provider>
          <AppBar />
          <div className={"min-h-screen"}>{children}</div>
        </Provider>
      </body>
    </html>
  );
}
