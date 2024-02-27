import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";

export default function Batch({ user, batches }) {

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [queryParameters] = useSearchParams()
  const [mode, setMode] = useState(queryParameters.get("mode"))

  let assetID = queryParameters.get('id')

  console.log(batches)
  const [params, setParams] = useState({
    ID: assetID || "batch",
    Type: 'Type of batch',
    HarvestDate: '2023/04/20',
    Owner: user.username,
    Quantity: 0,
    ExpirationDate: '2023/05/20',
    Location: '123 Main Street, Anytown USA',
    QualityRating: 1
  })

  async function createAsset() {
    try {
      const response = await fetch('http://localhost:8080/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': user.token
        },
        body: JSON.stringify(params)
      });

      if (!response.ok) {
        console.log(response.json())
        setError(response.message);
        throw new Error('Failed to create asset');
      }
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setError(error.messerror);
      console.error('Error:', error.error);
    }
  }
  async function updateAsset() {
    try {
      const response = await fetch('http://localhost:8080/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': user.token
        },
        body: JSON.stringify(params)
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(data.error)
        setError(data.error);
        throw new Error(data.error);
      }
      setMessage(data.message);
    } catch (error) {
      setError(error.error);
      console.error('Error:', error.error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (mode === "create") {
      createAsset()
    }
    else if (mode === "edit") {
      updateAsset()
    }
  }


  return (
    <div className="max-w-xl mx-auto py-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">{mode == "edit" ? "Edit the batch" : "Create a new batch"}</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Please double check your details before submitting.</p>
            <div className="mt-10 pb-4 border-b borde-gray-200 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="batches" className="block text-sm font-medium leading-6 text-gray-900">
                  Mode
                </label>
                <div className="mt-2">
                  <select
                    onChange={(e) => {
                      console.log(e.target.value)
                      setMode(e.target.value)
                    }}
                    required
                    type="text"
                    name="batches"
                    id="batches"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                  >
                    <option value="create">
                      Create
                    </option>
                    <option selected={mode == "edit"} value="edit">
                      Edit
                    </option>
                  </select>
                </div>
              </div>
              {
                mode === "edit" &&
                <div className="sm:col-span-3">
                  <label htmlFor="batches" className="block text-sm font-medium leading-6 text-gray-900">
                    Batches
                  </label>
                  <div className="mt-2">
                    <select
                      onChange={(e) => {
                        setParams({
                          ...params,
                          ID: e.target.value
                        });
                      }}
                      required
                      type="text"
                      name="batches"
                      id="batches"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 :text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                    >
                      {
                        batches.map((batch) => (
                          <option selected={assetID == batch.ID} value={batch.ID}>{batch.ID}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>

              }
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              <div className="sm:col-span-3">
                <label htmlFor="batch" className="block text-sm font-medium leading-6 text-gray-900">
                  Batch name
                </label>
                <div className="mt-2">
                  <input
                    disabled={mode == "edit"}
                    onChange={(e) => {
                      setParams({
                        ...params,
                        ID: e.target.value
                      });
                    }}
                    required
                    placeholder="batch"
                    type="text"
                    name="batch"
                    id="batch"
                    autoComplete="given-name"
                    className={`${mode == "edit" ? "bg-gray-100" : ""} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6r`}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="product" className="block text-sm font-medium leading-6 text-gray-900">
                  Product type
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => {
                      setParams({
                        ...params,
                        Type: e.target.value
                      });
                    }}
                    required
                    placeholder={params.Type}
                    type="text"
                    name="product"
                    id="product"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="harvest-date" className="block text-sm font-medium leading-6 text-gray-900">
                  Harvest Date
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => {
                      setParams({
                        ...params,
                        HarvestDate: e.target.value
                      });
                    }}
                    required
                    placeholder="2024/01/01"
                    type="text"
                    name="harvest-date"
                    id="harvest-date"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="expiration-date" className="block text-sm font-medium leading-6 text-gray-900">
                  Expiration Date
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => {
                      setParams({
                        ...params,
                        ExpirationDate: e.target.value
                      });
                    }}
                    placeholder="2024/01/01"
                    type="text"
                    name="expiration-date"
                    id="expiration-date"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>




              <div className="col-span-full">
                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                  Location
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => {
                      setParams({
                        ...params,
                        Location: e.target.value
                      });
                    }}
                    required
                    placeholder="123 Main Street, Anytown USA"
                    type="text"
                    name="location"
                    id="location"
                    autoComplete="location"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="quality" className="block text-sm font-medium leading-6 text-gray-900">
                  Quality Rating
                </label>
                <div className="mt-2">
                  <select
                    onChange={(e) => {
                      setParams({
                        ...params,
                        QualityRating: e.target.value
                      });
                    }}
                    required
                    id="quality"
                    name="quality"
                    autoComplete="quality"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    {Array.from({ length: 5 }, (_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">
                  Quantity
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => {
                      setParams({
                        ...params,
                        Quantity: e.target.value
                      });
                    }}
                    required
                    type="number"
                    id="quantity"
                    name="quantity"
                    autoComplete="quantity"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                  </input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            {mode == "edit" ? "Update the batch" : "Save to the blockchain"}
          </button>
        </div>
      </form>
    </div>
  )
}

