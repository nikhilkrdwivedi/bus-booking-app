function KeyValueDisplay({
  containerClass,
  keyName,
  value,
  keyClass,
  valueClass,
}: KeyValueDisplayType) {
  // // console.log({ containerClass, keyName, value, keyClass, valueClass })
  return (
    <div className={`flex justify-start items-center gap-2 ${containerClass}`}>
      <div className={`font-semibold tex-sm ${keyClass}`}>{keyName}:</div>
      <div className={`font-semibold tex-sm ${valueClass}`}>{value}</div>
    </div>
  );
}
type KeyValueDisplayType = {
  containerClass?: string;
  keyClass?: string;
  valueClass?: string;
  keyName?: string;
  value?: string;
};
export default KeyValueDisplay;
