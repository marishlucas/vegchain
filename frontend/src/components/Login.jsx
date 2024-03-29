import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ user, setUser }) {

  async function loginUser(credentials) {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const responseData = response.json();
        throw new Error('Invalid credentials or server error');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  const [error, setError] = useState(false);

  let navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user]);

  const [User, setUserName] = useState();
  const [Password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const user = await loginUser({
      User,
      Password
    });
    setUser(user);
  }


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="user" className="block text-sm font-medium leading-6 text-gray-900">
                  User
                </label>
                <div className="mt-2">
                  <input
                    onChange={e => setUserName(e.target.value)}
                    id="user"
                    name="user"
                    type="text"
                    autoComplete="username"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    onChange={e => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex transition w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500">
              Contact us!
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

