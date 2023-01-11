import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

class SpecialDocument extends Document {
  render() {
    return (
      <Html >
        <Head />
        <body className="bg-slate-100 text-black dark:bg-background dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default SpecialDocument;