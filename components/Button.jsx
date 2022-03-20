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
          transition: opacity .3s ease;
        }

        button > :global(svg) {
          margin-right: 8px;
        }

        button:hover {
          opacity .7;
        }
      `}</style>
    </>
  );
}
