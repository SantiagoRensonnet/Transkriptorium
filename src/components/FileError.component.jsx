export const FileError = ({ fileName }) => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-950">
      <h1 className="text-3xl font-semibold text-red-500"> File Error</h1>
      <p className="text-xl text-red-500">{`${fileName} doesn't exist`}</p>
    </main>
  );
};
