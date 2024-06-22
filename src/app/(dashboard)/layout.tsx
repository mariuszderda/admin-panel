import { Header } from "@/components/header/header";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

// if (typeof Node === "function" && Node.prototype) {
//   const originalRemoveChild = Node.prototype.removeChild;
//   Node.prototype.removeChild = function (child) {
//     if (child.parentNode !== this) {
//       if (console)
//         console.error(
//           "Cannot remove a child from a different parent",
//           child,
//           this
//         );
//
//       return child;
//     }
//     return originalRemoveChild.apply(this, arguments);
//   };
//
//   const originalInsertBefore = Node.prototype.insertBefore;
//   Node.prototype.insertBefore = function (newNode, referenceNode) {
//     if (referenceNode && referenceNode.parentNode !== this) {
//       if (console)
//         console.error(
//           "Cannot insert before a reference node from a different parent",
//           referenceNode,
//           this
//         );
//
//       return newNode;
//     }
//     return originalInsertBefore.apply(this, arguments);
//   };
// }
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          {children}
        </main>
      </div>
      <Toaster position="top-center" />
    </>
  );
}
