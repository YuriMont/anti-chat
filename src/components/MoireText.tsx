export default function MoireText({ text }: { text: string }) {
  return (
    <div className="relative inset-0 select-none">
      <p className="text-black">{text}</p>
      <p className="text-white absolute left-[4px] top-0">{text}</p>
    </div>
  );
}
