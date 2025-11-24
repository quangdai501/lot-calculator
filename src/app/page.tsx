"use client";

import { useState } from "react";

export default function Home() {
  const [entryPrice, setEntryPrice] = useState<string>("");
  const [stopLoss, setStopLoss] = useState<string>("");
  const [leverage, setLeverage] = useState<string>("1");
  const [accountBalance, setAccountBalance] = useState<string>("");
  const [riskPercent, setRiskPercent] = useState<string>("2");
  const [positionSize, setPositionSize] = useState<number | null>(null);
  const [positionType, setPositionType] = useState<"long" | "short">("long");

  const calculatePosition = () => {
    const entry = parseFloat(entryPrice);
    const sl = parseFloat(stopLoss);
    const lev = parseFloat(leverage);
    const balance = parseFloat(accountBalance);
    const risk = parseFloat(riskPercent);

    if (!entry || !sl || !lev || !balance || !risk) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (lev <= 0) {
      alert("Đòn bẩy phải lớn hơn 0");
      return;
    }

    // Validate position type matches price relationship
    if (positionType === "long" && entry <= sl) {
      alert("Với lệnh LONG, giá vào lệnh phải lớn hơn giá stop loss");
      return;
    }
    if (positionType === "short" && entry >= sl) {
      alert("Với lệnh SHORT, giá vào lệnh phải nhỏ hơn giá stop loss");
      return;
    }

    // Calculate risk amount
    const riskAmount = (balance * risk) / 100;

    // Calculate price difference percentage
    const priceDiff = Math.abs(entry - sl);
    const priceChangePercent = (priceDiff / entry) * 100;

    // Calculate position size
    // Position size = Risk amount / (Price change % * Leverage)
    const position = riskAmount / (priceChangePercent / 100 * lev);

    setPositionSize(position);
  };

  const reset = () => {
    setEntryPrice("");
    setStopLoss("");
    setLeverage("1");
    setAccountBalance("");
    setRiskPercent("2");
    setPositionSize(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20">
          <h1 className="text-3xl font-bold text-white mb-1 text-center">
            Crypto Position Calculator
          </h1>
          <p className="text-purple-200 text-center text-sm mb-6">
            Tính toán số tiền vào lệnh dựa trên % rủi ro
          </p>

          <div className="space-y-4">
            {/* Position Type */}
            <div>
              <label className="block text-xs font-medium text-purple-200 mb-1">
                Loại lệnh
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setPositionType("long")}
                  className={`flex-1 py-2 rounded-lg font-semibold transition-all text-sm ${
                    positionType === "long"
                      ? "bg-green-500 text-white shadow-lg"
                      : "bg-white/10 text-purple-200 hover:bg-white/20"
                  }`}
                >
                  LONG
                </button>
                <button
                  onClick={() => setPositionType("short")}
                  className={`flex-1 py-2 rounded-lg font-semibold transition-all text-sm ${
                    positionType === "short"
                      ? "bg-red-500 text-white shadow-lg"
                      : "bg-white/10 text-purple-200 hover:bg-white/20"
                  }`}
                >
                  SHORT
                </button>
              </div>
            </div>

            {/* Account Balance */}
            <div>
              <label className="block text-xs font-medium text-purple-200 mb-1">
                Số dư tài khoản (USDT)
              </label>
              <input
                type="number"
                value={accountBalance}
                onChange={(e) => setAccountBalance(e.target.value)}
                placeholder="VD: 1000"
                className="w-full px-3 py-2 text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Entry Price */}
            <div>
              <label className="block text-xs font-medium text-purple-200 mb-1">
                Giá vào lệnh (USDT)
              </label>
              <input
                type="number"
                value={entryPrice}
                onChange={(e) => setEntryPrice(e.target.value)}
                placeholder="VD: 50000"
                className="w-full px-3 py-2 text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Stop Loss */}
            <div>
              <label className="block text-xs font-medium text-purple-200 mb-1">
                Giá Stop Loss (USDT)
              </label>
              <input
                type="number"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                placeholder="VD: 48000"
                className="w-full px-3 py-2 text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Leverage and Risk in a row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-purple-200 mb-1">
                  Đòn bẩy
                </label>
                <input
                  type="number"
                  value={leverage}
                  onChange={(e) => setLeverage(e.target.value)}
                  placeholder="VD: 10"
                  min="1"
                  className="w-full px-3 py-2 text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-purple-200 mb-1">
                  % Rủi ro
                </label>
                <input
                  type="number"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(e.target.value)}
                  placeholder="VD: 2"
                  min="0.1"
                  step="0.1"
                  className="w-full px-3 py-2 text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={calculatePosition}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2.5 text-sm rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Tính toán
              </button>
              <button
                onClick={reset}
                className="px-6 bg-white/10 text-purple-200 font-bold py-2.5 text-sm rounded-lg hover:bg-white/20 transition-all border border-white/20"
              >
                Reset
              </button>
            </div>

            {/* Result */}
            {positionSize !== null && (
              <div className="mt-4 p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border border-green-400/30">
                <h2 className="text-base font-bold text-white mb-2">Kết quả:</h2>
                <div className="space-y-1 text-sm">
                  <p className="text-purple-200">
                    Số tiền rủi ro:{" "}
                    <span className="text-yellow-300 font-bold">
                      {((parseFloat(accountBalance) * parseFloat(riskPercent)) / 100).toFixed(2)} USDT
                    </span>
                  </p>
                  <p className="text-purple-200">
                    % Giá thay đổi:{" "}
                    <span className="text-yellow-300 font-bold">
                      {((Math.abs(parseFloat(entryPrice) - parseFloat(stopLoss)) / parseFloat(entryPrice)) * 100).toFixed(2)}%
                    </span>
                  </p>
                  <p className="text-xl text-white font-bold mt-2 pt-2 border-t border-white/20">
                    Số tiền vào lệnh:{" "}
                    <span className="text-green-400">
                      {positionSize.toFixed(2)} USDT
                    </span>
                  </p>
                  <p className="text-xs text-purple-300 mt-1">
                    Margin cần thiết: {(positionSize / parseFloat(leverage)).toFixed(2)} USDT
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
