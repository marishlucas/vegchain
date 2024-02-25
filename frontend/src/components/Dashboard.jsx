import { useEffect, useState } from "react";

export default function Dashboard({ user }) {
  const [assets, setAssets] = useState([]);
  const [sameOrgAssets1, setSameOrgAssets] = useState([]);
  const [differentOrgAssets1, setDifferentOrgAssets] = useState([]);

  const sameOrgAssets = [
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


  const differentOrgAssets = [
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
        const response = await fetch('http://localhost:8080/list', {
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

        setAssets(data);
        const userOrgAssets = data.filter(asset => {
          const owner = JSON.parse(asset.Owner);
          return owner.org === user.organization;
        });

        const differentOrgAssets = data.filter(asset => {
          const owner = JSON.parse(asset.Owner);
          return owner.org !== user.organization;
        });

        setSameOrgAssets(userOrgAssets);
        setDifferentOrgAssets(differentOrgAssets);

      } catch (error) {
        console.error('Error:', error.message);
      }
    }

    getAssets();
  }, [user]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col space-y-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name, title, email and role.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block transition rounded-md bg-emerald-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Add user
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
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a href="#" className="text-emerald-500 hover:text-emerald-900">
                          Edit<span className="sr-only">, {asset.ID}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t border-gray-200">
                    <th
                      colSpan={12}
                      scope="colgroup"
                      className="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                    >
                      Sold Assets
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
                        <a href="#" className="text-emerald-500 hover:text-emerald-900">
                          <span className="inline-flex items-center rounded-md bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                            Sold
                          </span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
