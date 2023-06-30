import React, { useEffect, useState } from 'react';
import { BsCurrencyDollar, BsCurrencyExchange } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';



import { ecomPieChartData1, ecomPieChartData2, ecomPieChartData3, pieChartData } from '../data/dummy';
import { ChartsHeader, Pie as PieChart } from '../components';


import { Stacked, Pie, Button, LineChart, SparkLine } from '../components';
import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import product9 from '../data/product9.jpg';
import Marquee from "react-fast-marquee";
import Financial from './Charts/Financial';
import { IgrFinancialChart } from "igniteui-react-charts"
import { IgrFinancialChartModule } from "igniteui-react-charts"
import StocksHistory from "../components/StockHistory"

IgrFinancialChartModule.register()


const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
  </div>
);

const Ecommerce = () => {
  const { currentColor, currentMode } = useStateContext();

  const [allocationBtns, setAllocationBtns] = useState('0');
  const [sectorBtns, setSectorBtns] = useState('0');
  const [marketBtns, setMarketBtns] = useState('0');
  const [data, setData] = useState([])


  useEffect(() => {
    StocksHistory.getMultipleStocks().then(stocks => {
      setData(stocks)
    })

  }, [])

  return (
    <React.Fragment>
      {/* <div className="mt-24">
      <Marquee>
        I can be a React component, multiple React components, or just some text.
      </Marquee>
      <br>
      </br>
      <br>
      </br>


      <hr></hr><div className="flex flex-wrap lg:flex-nowrap p-6 m-3 justify-between">

        <div className="grid grid-cols-2 gap-x-20 gap-y-10 justify-center">
          {earningData.map((item) => (
            <div key={item.title} className="bg-white h-45 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-80 p-4 pt-9 rounded-2xl">
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full p-7 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400 mt-1">{item.title}</p>
            </div>
          ))}
        </div>

        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
          <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold">Portfolio Tracker</p>
            <DropDown currentMode={currentMode} />
          </div>
          <div className="md:w-full overflow-auto">
            <LineChart />
          </div>
        </div>
      </div>


    </div> */}
      <div className='main-wapper w-full px-2.5'>
        <div className='w-full my-4'>
          <Marquee>
            I can be a React component, multiple React components, or just some text.
          </Marquee>
        </div>
        <div className="flex items-center justify-center">
          {earningData.map((item) => (
            <div key={item.title} className="bg-white h-40 dark:text-gray-200 dark:bg-secondary-dark-bg m-2.5 justify-center w-1/4 p-4 flex items-center rounded-2xl">
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full p-7 hover:drop-shadow-xl w-20 h-20 mx-3"
              >
                {item.icon}
              </button>
              <div>
                <p className="mt-3">
                  <span className="text-lg font-semibold">{item.amount}</span>
                  <span className={`text-sm text-${item.pcColor} ml-2`}>
                    {item.percentage}
                  </span>
                </p>
                <p className="text-sm text-gray-400 mt-1">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='my-3 flex items-center justify-center'>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-11/12">
            <div className="container sample">
              <div className="container" style={{ height: "500px" }}>

                <IgrFinancialChart
                  width="100%"
                  height="100%"
                  chartType="Line"
                  thickness={2}
                  chartTitle="Google vs Microsoft Changes"
                  subtitle="Between 2013 and 2017"
                  yAxisMode="PercentChange"
                  yAxisTitle="Percent Changed"
                  dataSource={data}
                />
              </div>
            </div>

          </div>
        </div>

        <div className='my-3'>
          <div className='w-full grid-cols-2 flex items-center justify-between my-2'>
            <button className={allocationBtns === '0' ? 'mx-1.5 w-2/4 p-2.5 rounded-lg bg-[#ebfaf2]' : 'mx-1.5 w-2/4 p-2.5 rounded-lg bg-white'} onClick={() => { setAllocationBtns('0') }}>
              Sector wise allocation
            </button>
            <button className={allocationBtns === '1' ? 'mx-1.5 w-2/4 p-2.5 rounded-lg bg-[#ebfaf2]' : 'mx-1.5 w-2/4 p-2.5 rounded-lg bg-white'} onClick={() => { setAllocationBtns('1') }}>
              Market wise allocation
            </button>
          </div>
          <div className='flex items-center justify-between grid-cols-4 my-2'>
            {
              allocationBtns === '0' ?
                <React.Fragment>
                  <button className={sectorBtns === '0' ? 'mx-1 w-1/4 p-2.5 rounded-lg bg-[#ebfaf2]' : 'mx-1 w-1/4 p-2.5 rounded-lg bg-white'} onClick={() => setSectorBtns('0')} >Sector 1</button>
                  <button className={sectorBtns === '1' ? 'mx-1 w-1/4 p-2.5 rounded-lg bg-[#ebfaf2]' : 'mx-1 w-1/4 p-2.5 rounded-lg bg-white'} onClick={() => setSectorBtns('1')} >Sector 2</button>
                  <button className={sectorBtns === '2' ? 'mx-1 w-1/4 p-2.5 rounded-lg bg-[#ebfaf2]' : 'mx-1 w-1/4 p-2.5 rounded-lg bg-white'} onClick={() => setSectorBtns('2')} >Sector 3</button>
                  <button className={sectorBtns === '3' ? 'mx-1 w-1/4 p-2.5 rounded-lg bg-[#ebfaf2]' : 'mx-1 w-1/4 p-2.5 rounded-lg bg-white'} onClick={() => setSectorBtns('3')} >Sector 4</button>
                </React.Fragment> :
                <React.Fragment>
                  <button className={marketBtns === '0' ? 'mx-1 w-1/4 p-2.5 rounded-lg bg-[#ebfaf2]' : 'mx-1 w-1/4 p-2.5 rounded-lg bg-white'} onClick={() => setMarketBtns('0')} >Market 1</button>
                  <button className={marketBtns === '1' ? 'mx-1 w-1/4 p-2.5 rounded-lg bg-[#ebfaf2]' : 'mx-1 w-1/4 p-2.5 rounded-lg bg-white'} onClick={() => setMarketBtns('1')} >Market 2</button>
                  <button className={marketBtns === '2' ? 'mx-1 w-1/4 p-2.5 rounded-lg bg-[#ebfaf2]' : 'mx-1 w-1/4 p-2.5 rounded-lg bg-white'} onClick={() => setMarketBtns('2')} >Market 3</button>
                  <button className={marketBtns === '3' ? 'mx-1 w-1/4 p-2.5 rounded-lg bg-[#ebfaf2]' : 'mx-1 w-1/4 p-2.5 rounded-lg bg-white'} onClick={() => setMarketBtns('3')} >Market 4</button>
                </React.Fragment>
            }
          </div>
        </div>

        <div className='my-3 flex items-center justify-center'>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-11/12">
            <div className="flex justify-between items-center gap-2 mb-10">
              <p className="text-xl font-semibold">
                {
                  allocationBtns == 0 ? 'Sector ' : 'Market '
                }
              </p>
            </div>
            <div className="md:w-full overflow-auto md:flex ">
              <div className=''>
                {
                  sectorBtns === '0' &&
                  <Pie data={ecomPieChartData} id={allocationBtns == 0 ? 'Sector_' + sectorBtns : 'Market_' + marketBtns} legendVisiblity={true} />
                }
                {
                  sectorBtns === '1' &&
                  <Pie data={ecomPieChartData1} id={allocationBtns == 0 ? 'Sector_' + sectorBtns : 'Market_' + marketBtns} legendVisiblity={true} />
                } {
                  sectorBtns === '2' &&
                  <Pie data={ecomPieChartData2} id={allocationBtns == 0 ? 'Sector_' + sectorBtns : 'Market_' + marketBtns} legendVisiblity={true} />
                } {
                  sectorBtns === '3' &&
                  <Pie data={ecomPieChartData3} id={allocationBtns == 0 ? 'Sector_' + sectorBtns : 'Market_' + marketBtns} legendVisiblity={true} />
                }

                {
                  marketBtns === '0' &&
                  <Pie data={ecomPieChartData} id={allocationBtns == 0 ? 'Sector_' + sectorBtns : 'Market_' + marketBtns} legendVisiblity={true} />
                }
                {
                  marketBtns === '1' &&
                  <Pie data={ecomPieChartData1} id={allocationBtns == 0 ? 'Sector_' + sectorBtns : 'Market_' + marketBtns} legendVisiblity={true} />
                } {
                  marketBtns === '2' &&
                  <Pie data={ecomPieChartData2} id={allocationBtns == 0 ? 'Sector_' + sectorBtns : 'Market_' + marketBtns} legendVisiblity={true} />
                } {
                  marketBtns === '3' &&
                  <Pie data={ecomPieChartData3} id={allocationBtns == 0 ? 'Sector_' + sectorBtns : 'Market_' + marketBtns} legendVisiblity={true} />
                }
              </div>
              <div className=''>
                <table class="table">
                  <thead className='thead-dark' >
                    <tr className='thadeBg' style={{ background: "red" }}>
                      <th scope="col">SR NO.</th>
                      <th scope="col">NSE</th>
                      <th scope="col">LSN</th>
                      <th scope="col">Qty</th>
                      <th scope="col">CP</th>
                      <th scope="col">AVG. PRISE</th>
                      <th scope="col">MTM</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                    </tr>
                    <tr>
                      <th scope="row">4</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                    </tr> <tr>
                      <th scope="row">5</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                    </tr> <tr>
                      <th scope="row">6</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Ecommerce;