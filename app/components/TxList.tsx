export default function TxList({ txs }: { txs: { hash: string }[] }) {
  if (txs.length === 0) return null;

  return (
    <>
      {txs.map((item, index) => (
        <div key={index} className="alert alert-info mt-5">
          <div className="flex-1">
            <label className="text-black text-lg">{item.hash}</label>
          </div>
        </div>
      ))}
    </>
  );
}
