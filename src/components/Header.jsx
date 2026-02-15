export default function Header() {
  return (
    <Header className="bg-blue-100 text-black py-12 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Medicine Finder</h1>
        <p className="text-lg mb-6">
          Search Medicine by name, symptoms or category
        </p>
      </div>
    </Header>
  );
}
