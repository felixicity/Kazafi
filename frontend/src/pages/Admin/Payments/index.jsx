import TransactionTable from "./TransactionTable";
import DropDownButton from "../../../components/DropdownButton";
import { FaCaretDown } from "react-icons/fa";
const PaymentsDashboard = () => {
      const options = ["Export as CSV", "Export as Pdf"];

      return (
            <div>
                  <div className="transaction-header">
                        <h2>All Transactions</h2>
                        <DropDownButton initialOption={"Export"} icon={<FaCaretDown />} options={options} />
                  </div>
                  <TransactionTable />
            </div>
      );
};

export default PaymentsDashboard;
