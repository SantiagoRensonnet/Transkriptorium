import { Header } from "../main-page/components/layout/Header.component";
import { Footer } from "../main-page/components/layout/Footer.component";
export const Error404 = () => {
  return (
    <>
      <Header />
      <main className="main-container" aria-label="Error 404 Page">
        <div
          className="flex flex-col items-center"
          role="dialog"
          aria-labelledby="dialog-title"
          aria-describedby="dialog-desc"
        >
          <h1
            className="text-indigo-500 font-bold text-3xl md:text-6xl"
            id="dialog-title"
          >
            404
          </h1>

          <p
            className="font-bold text-xl md:text-3xl mt-2 md:mt-5"
            id="dialog-desc"
          >
            Page Not Found
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
};
