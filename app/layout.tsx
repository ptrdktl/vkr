import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";
import { CreateUnitModal } from "@/components/modals/create-unit-modal";
import { CreateChallengeModal } from "@/components/modals/create-challenge-modal";
import "./globals.css";
import { CreateChallengeOptionModal } from "@/components/modals/create-challenge-option-modal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Language",
  description: "System for learning foreign languages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    //052 afterSignOutUrl - либо здесь, либо в header в компоненте userbutton
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <Toaster />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
          <CreateUnitModal />
          <CreateChallengeModal />
          <CreateChallengeOptionModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
