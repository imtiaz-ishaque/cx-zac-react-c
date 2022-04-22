import { useMoralis } from "react-moralis";
import { useNativeBalance } from "hooks/useNativeBalance";
import { n4 } from "helpers/formatters";

function NativeBalance(props) {
  const { balance, nativeName } = useNativeBalance(props);
  const { isAuthenticated } = useMoralis();
  if (!isAuthenticated || !nativeName) return null;
  return (
    <div
      style={{ textAlign: "center", whiteSpace: "nowrap", color: "#fff" }}
    >{`${n4.format(balance.formatted)} ${nativeName}`}</div>
  );
}

export default NativeBalance;
