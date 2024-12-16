import React, { useState, useEffect } from "react";
import axios from "axios";
import Accordion from "./components/Accordion/Accordion";
import Tooltip from "./components/Tooltip/Tooltip";
import Input from "./components/Input/Input";
import "./App.css";

function App() {
    const [cryptos, setCryptos] = useState([]);
    const [search, setSearch] = useState("");
    const fetchCryptos = async () => {
        try {
            const response = await axios.get(
                "https://api.coinlore.net/api/tickers/"
            );
            setCryptos(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchCryptos();
    }, []);
    const filteredCryptos = cryptos.filter(
        (crypto) =>
            crypto.name.toLowerCase().includes(search.toLowerCase()) ||
            crypto.symbol.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="app">
            <h1>Cryptocurrency Prices</h1>
            <button className="update-button" onClick={fetchCryptos}>
                Update
            </button>
            <div className="search">
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                />
            </div>
            {filteredCryptos.map((crypto) => (
                <Accordion key={crypto.id} title={crypto.name}>
                    <p>
                        <strong>Symbol:</strong> {crypto.symbol}
                    </p>
                    <p>
                        <strong>Price USD:</strong> ${crypto.price_usd}
                    </p>
                    <p>
                        <strong>Price BTC:</strong> {crypto.price_btc}
                    </p>
                    <Tooltip text="The market capitalization of a cryptocurrency is calculated by multiplying the number of coins in circulation by the current price">
                        <p>
                            <strong>Market Cap USD:</strong> $
                            {crypto.market_cap_usd}
                        </p>
                    </Tooltip>
                    <p
                        style={{
                            color:
                                crypto.percent_change_24h > 0 ? "green" : "red",
                        }}
                    >
                        <strong>Percent Change 24H:</strong>{" "}
                        {crypto.percent_change_24h}%
                    </p>
                </Accordion>
            ))}
        </div>
    );
}

export default App;
