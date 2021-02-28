import React from 'react'

const CoinApiData = ({data}) => {
    //const {day, week, year, detail, ohlcv} = data;

    const renderData = () => {
        // console.log(data.detail.quotes.USD.market_cap.toLocaleString('en'));
        // if (data) {
        //     console.log(data.detail.quotes.USD.market_cap.toLocaleString('en'));
        // };
        // console.log(data.ohlcv);
        // return (
        //         <div className="bg-blue mt-3 p-2 rounded border row">
        //             <span>${data.detail.quotes.USD.market_cap.toLocaleString('en')}</span>
        //         </div>
        // )
        
        if (data) {
            return (
                <div className="bg-blue mt-3 p-2 rounded border row">
                    <div className="col-sm">
                        <div className="d-flex flex-column">
                            <span className="text-muted coin-data-category">Market Cap</span>
                            <span>${data.detail.quotes.USD.market_cap.toLocaleString('en')}</span>
                        </div>
                        <hr/>
                        <div className="d-flex flex-column">
                            <span className="text-muted coin-data-category">Volume (24h)</span>
                            <span>${data.detail.quotes.USD.volume_24h.toLocaleString('en')}</span>
                        </div>
                    </div>

                    <div className="col-sm">
                        <div className="d-flex flex-column">
                            <span className="text-muted coin-data-category">Circulating Supply</span>
                            <span>{data.detail.circulating_supply}</span>
                        </div>
                        <hr/>
                        <div className="d-flex flex-column">
                            <span className="text-muted coin-data-category">Total Supply</span>
                            <span>{data.detail.total_supply}</span>
                        </div>
                    </div>

                    <div className="col-sm">
                        <div className="d-flex flex-column">
                            <span className="text-muted coin-data-category">High (24h)</span>
                            <span>${data.ohlcv[1].high.toLocaleString('en')}</span>
                        </div>
                        <hr/>
                        <div className="d-flex flex-column">
                            <span className="text-muted coin-data-category">Low (24h)</span>
                            <span>${data.ohlcv[1].low.toLocaleString('en')}</span>
                        </div>
                    </div>
                </div>
            )
        }

    }

    return (
        <div>
            {renderData()}
        </div>
    )
}

export default CoinApiData;
