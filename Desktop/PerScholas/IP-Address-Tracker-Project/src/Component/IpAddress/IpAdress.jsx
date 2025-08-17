import {useState,useEffect} from 'react';
import arrow from '../../../src/images/icon-arrow.svg'
import background from '../../../src/images/pattern-bg-desktop.png'

function IpAdress({ address, setAddress }) {
  const [ipAddress, setIpAddress] = useState('');

  const checkIpAddress =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
  const checkDomain =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const queryParam = checkIpAddress.test(ipAddress)
      ? `ipAddress=${ipAddress}`
      : checkDomain.test(ipAddress)
      ? `domain=${ipAddress}`
      : '';

    if (!queryParam) return;

    try {
      const res = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_NIHvthwDkHuOfyNqqFYXrd3763NQw&${queryParam}`
      );
      const data = await res.json()
      setAddress(data)
      setIpAddress('')
    } catch (error) {
      console.error('Search fetch failed:', error);
    }
  };

  return (
    <section>
      <div className="absolute -z-10">
        <img src={background} alt="background" className="w-full h-80 object-cover" />
      </div>
      <article className="relative">
        <h1 className="text-2xl text-center text-white font-bold mb-8">IP Address Tracker</h1>
        <form onSubmit={handleSubmit} className="flex justify-center max-w-xl mx-auto">
          <input
            type="text"
            name="ipaddress"
            id="ipaddress"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            placeholder="Search for any IP address or domain"
            className="py-2 px-4 rounded-l-lg bg-white w-full"
          />
          <button type="submit">
            <img src={arrow} alt="search" className="bg-black py-4 px-4 hover:opacity-60" />
          </button>
        </form>
      </article>

      {address && (
        <article className="flex flex-col md:flex-row gap-4 w-full bg-white rounded-lg shadow p-8 mt-4 max-w-6xl xl:mx-auto text-center md:text-left relative" style={{ zIndex: 1000 }}>
          <div className="flex-1 lg:border-r lg:border-slate-400">
            <h2 className="uppercase text-sm font-semibold text-slate-400 tracking-widest mb-3">IP ADDRESS</h2>
            <p className="font-bold text-slate-800 text-lg md:text-xl xl:text-2xl">{address.ip}</p>
          </div>
          <div className="flex-1 lg:border-r lg:border-slate-400">
            <h2 className="uppercase text-sm font-semibold text-slate-400 tracking-widest mb-3">LOCATION</h2>
            <p className="font-bold text-slate-800 text-lg md:text-xl xl:text-2xl">
              {address.location.city}, {address.location.region}
            </p>
          </div>
          <div className="flex-1 lg:border-r lg:border-slate-400">
            <h2 className="uppercase text-sm font-bold text-slate-400 tracking-widest mb-3">TIMEZONE</h2>
            <p className="font-bold text-slate-800 text-lg md:text-xl xl:text-2xl">
              UTC {address.location.timezone}
            </p>
          </div>
          <div className="flex-1">
            <h2 className="uppercase text-sm font-bold text-slate-400 tracking-widest mb-3">ISP</h2>
            <p className="font-bold text-slate-800 text-lg md:text-xl xl:text-2xl">{address.isp}</p>
          </div>
        </article>
      )}
    </section>
  );
}

export default IpAdress;