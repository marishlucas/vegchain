import { useEffect, useState } from "react";
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useNavigate } from "react-router-dom";
const { VITE_API_URL } = import.meta.env

export default function Dashboard({ user, setBatches }) {

  const [sameOrgAssets, setSameOrgAssets] = useState([]);
  const [differentOrgAssets, setDifferentOrgAssets] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const sameOrgAssets1 = [
    {
      ID: "batch1",
      Type: "Fruit",
      HarvestDate: "2024-02-20",
      ExpirationDate: "2024-03-20",
      Location: "Farm A",
      QualityRating: 4,
      Quantity: 15,
    },
    {
      ID: "batch2",
      Type: "Vegetable",
      HarvestDate: "2024-02-21",
      ExpirationDate: "2024-03-21",
      Location: "Farm A",
      QualityRating: 3,
      Quantity: 10,
    },
    {
      ID: "batch3",
      Type: "Grains",
      HarvestDate: "2024-02-22",
      ExpirationDate: "2024-03-22",
      Location: "Farm A",
      QualityRating: 5,
      Quantity: 18,
    },
    {
      ID: "batch4",
      Type: "Herbs",
      HarvestDate: "2024-02-23",
      ExpirationDate: "2024-03-23",
      Location: "Farm A",
      QualityRating: 4,
      Quantity: 22,
    },
    {
      ID: "batch5",
      Type: "Nuts",
      HarvestDate: "2024-02-24",
      ExpirationDate: "2024-03-24",
      Location: "Farm A",
      QualityRating: 3,
      Quantity: 12,
    },
    {
      ID: "batch6",
      Type: "Legumes",
      HarvestDate: "2024-02-25",
      ExpirationDate: "2024-03-25",
      Location: "Farm A",
      QualityRating: 4,
      Quantity: 20,
    },
    // Add more assets as needed
  ];


  const differentOrgAssets1 = [
    {
      ID: "batch4",
      Type: "Fruit",
      HarvestDate: "2024-02-25",
      ExpirationDate: "2024-03-25",
      Location: "Farm B",
      QualityRating: 4,
      Quantity: 20,
    },
    {
      ID: "batch5",
      Type: "Vegetable",
      HarvestDate: "2024-02-26",
      ExpirationDate: "2024-03-26",
      Location: "Farm C",
      QualityRating: 3,
      Quantity: 15,
    },
    {
      ID: "batch6",
      Type: "Grains",
      HarvestDate: "2024-02-27",
      ExpirationDate: "2024-03-27",
      Location: "Farm D",
      QualityRating: 5,
      Quantity: 25,
    },
    {
      ID: "batch7",
      Type: "Herbs",
      HarvestDate: "2024-02-28",
      ExpirationDate: "2024-03-28",
      Location: "Farm E",
      QualityRating: 4,
      Quantity: 18,
    },
    {
      ID: "batch8",
      Type: "Nuts",
      HarvestDate: "2024-03-01",
      ExpirationDate: "2024-03-29",
      Location: "Farm F",
      QualityRating: 3,
      Quantity: 12,
    },
    {
      ID: "batch9",
      Type: "Legumes",
      HarvestDate: "2024-03-02",
      ExpirationDate: "2024-03-30",
      Location: "Farm G",
      QualityRating: 4,
      Quantity: 22,
    },
    // Add more assets as needed
  ];

  useEffect(() => {
    async function getAssets() {
      try {
        const response = await fetch(`${VITE_API_URL}/list`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': user.token
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch assets');
        }

        const data = await response.json();

        const userOrgAssets = data.filter(asset => {
          //FIXME: user.owner = orgx si asset.Owner returneaza OrgxMSP ca asa are chef backendu
          const owner = JSON.parse(asset.Owner);
          let parsedOwner = owner.org.charAt(0).toLowerCase() + owner.org.slice(1).replace("MSP", "");
          return parsedOwner === user.organization;
        });

        const differentOrgAssets = data.filter(asset => {
          const owner = JSON.parse(asset.Owner);
          let parsedOwner = owner.org.charAt(0).toLowerCase() + owner.org.slice(1).replace("MSP", "");
          return parsedOwner !== user.organization;
        });

        // Order by harvest date
        sameOrgAssets.sort((a, b) => new Date(a.HarvestDate) - new Date(b.HarvestDate));
        differentOrgAssets.sort((a, b) => new Date(a.HarvestDate) - new Date(b.HarvestDate));

        setBatches(userOrgAssets);

        setSameOrgAssets(userOrgAssets);
        setDifferentOrgAssets(differentOrgAssets);

      } catch (error) {
        setError(`An error has occured: ${error.message}`);
        console.error('Error:', error.message);
      }
    }

    getAssets();
  }, [user]);

  async function transferAsset(id) {

    let item = sameOrgAssets.find(item => item.ID === id);
    setSameOrgAssets(sameOrgAssets.filter(orgAsset => orgAsset.ID !== id));

    try {
      const response = await fetch(`${VITE_API_URL}/transfer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': user.token
        },
        body: JSON.stringify({ ID: id, newOwner: "org2user", newOwnerOrg: "Org2MSP" }),
      });

      if (!response.ok) {
        console.log(response.json())
        setError(response.message);
        throw new Error('Failed to transfer asset');
      }
      const data = await response.json();
      setMessage(data.message);
      setDifferentOrgAssets(prevDifferentOrgAssets => [...prevDifferentOrgAssets, item]);
    } catch (error) {
      setError(error);
      console.error('Error:', error);
    }
  }

  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col space-y-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold leading-6 text-gray-700">{user.username} - {user.organization}</h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              onClick={() => navigate('/dashboard/batch?mode=create')}
              type="button"
              className="block transition rounded-md bg-emerald-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Add batch
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-0"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Harvest Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Expiration Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Current Location
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Quality Rating
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Quantity
                    </th>
                    <th scope="col" className="relative py-3 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative py-3 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Send to seller</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr className="border-t border-gray-200">
                    <th
                      colSpan={12}
                      scope="colgroup"
                      className="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                    >
                      Your Assets
                    </th>
                  </tr>
                  {sameOrgAssets.map((asset) => (
                    <tr key={asset.ID}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {asset.ID}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{asset.Type}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{asset.HarvestDate}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{asset.ExpirationDate}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{asset.Location}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{asset.QualityRating}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{asset.Quantity}</td>
                      <td className="flex justify-end items-center space-x-4 relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button onClick={() => navigate(`/dashboard/batch?mode=edit&id=${asset.ID}`)} className="text-emerald-500 hover:text-emerald-900">
                          Edit<span className="sr-only">, {asset.ID}</span>
                        </button>
                        {
                          user.organization == "org1" &&
                          <button
                            onClick={() => transferAsset(asset.ID)}
                            type="button"
                            title="Send to seller"
                            className="rounded bg-white px-2 py-1 text-xs font-semibold text-emerald-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          >
                            Send
                          </button>
                        }
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t border-gray-200">
                    <th
                      colSpan={12}
                      scope="colgroup"
                      className="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                    >
                      {
                        user.organization == "org1" ? "Sold Assets" : "Assets in tranzit"
                      }
                    </th>
                  </tr>
                  {differentOrgAssets.map((asset) => (
                    <tr key={asset.ID}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {asset.ID}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{asset.Type}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{asset.HarvestDate}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{asset.ExpirationDate}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{asset.Location}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{asset.QualityRating}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{asset.Quantity}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="-mx-4 sm:mx-0">
            {
              error &&
              <div className="rounded-md bg-red-50 p-4 mt-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                  <div className="ml-auto pl-3">
                    <div className="-mx-1.5 -my-1.5">
                      <button
                        type="button"
                        onClick={() => setError('')}
                        className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                      >
                        <span className="sr-only">Dismiss</span>
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>

  )
}
