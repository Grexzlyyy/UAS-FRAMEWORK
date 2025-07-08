import Navbar from './components/Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ padding: '16px', minHeight: 'calc(100vh - 64px)' }}>
        {children}
      </main>
    </>
  );
}
