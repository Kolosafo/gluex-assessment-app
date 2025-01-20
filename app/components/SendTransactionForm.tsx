import React from "react";
import ErrorMessage from "./ErrorMsg";
import TxList from "./TxList";
import FormField from "./FormField";

const SendTransactionForm = ({
  handleSubmit,
  error,
  txs,
  currency,
}: {
  handleSubmit: (e: any) => void;
  error: string;
  txs: any;
  currency: string;
}) => {
  return (
    <form className="m-4 w-full" onSubmit={handleSubmit}>
      <div className="py-6 shadow-lg rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Send {currency}
          </h1>
          <div className="">
            <div className="my-3">
              <FormField
                labelName=""
                placeholder="Recipient Address"
                inputType="text"
                name="addr"
                value={""}
                handleChange={(e) => {}}
              />
            </div>
            <div className="my-3">
              <FormField
                labelName=""
                placeholder={`Amount in ${currency}`}
                inputType="text"
                value={""}
                name="amount"
                handleChange={(e) => {}}
              />
            </div>
          </div>
        </main>
        <footer className="p-4">
          <button
            type="submit"
            className="bg-purple-500 p-2 rounded-md focus:ring focus:outline-none w-full"
          >
            Pay now
          </button>
          <ErrorMessage message={error} />
          <TxList txs={txs} />
        </footer>
      </div>
    </form>
  );
};

export default SendTransactionForm;
