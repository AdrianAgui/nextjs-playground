export default function Button({ children, onClick }) {
  return (
    <>
      <button onClick={onClick}>{children}</button>

      <style jsx>{`
        button {
          display: flex;
          align-items: center;
          background: black;
          border: 0;
          border-radius: 15px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          padding: 8px 24px;
          opacity: 1;
          transition: 0.3s ease;
        }

        button:hover {
          opacity: 0.75;
        }

        button > :global(svg) {
          margin-right: 8px;
        }
      `}</style>
    </>
  );
}
