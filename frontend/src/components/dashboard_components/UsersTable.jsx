import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";

function UsersTable() {
  const {
    data: sellers,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/users/sellers");
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) {
          return null;
        }
        toast.error(err.response.data.message || "Something went wrong");
      }
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex flex-col p-4 tablet:p-8">
      <h1 className="self-center mb-10 font-bold text-lg tablet:text-2xl">Total Users</h1>
      <div className="flex justify-center">
        <div className="w-full tablet:w-11/12 xl:w-10/12 px-4 overflow-x-auto">
          <table className="w-full table-auto mb-10">
            <thead>
              <tr>
                <th className="px-4 py-2 border tablet:px-6 tablet:py-4 sticky top-0 bg-white">Image</th>
                <th className="px-4 py-2 border tablet:px-6 tablet:py-4 sticky top-0 bg-white">Name</th>
                <th className="px-4 py-2 border tablet:px-6 tablet:py-4 sticky top-0 bg-white">Email</th>
                <th className="px-4 py-2 border tablet:px-6 tablet:py-4 sticky top-0 bg-white">Phone</th>
                <th className="px-4 py-2 border tablet:px-6 tablet:py-4 sticky top-0 bg-white">Role</th>
                <th className="px-4 py-2 border tablet:px-6 tablet:py-4 sticky top-0 bg-white">Created Date</th>
              </tr>
            </thead>
            <tbody>
              {sellers?.data?.map((user) => (
                <tr key={user._id} className="odd:bg-white even:bg-gray-100">
                  <td className="px-4 py-2 border tablet:px-6 tablet:py-4">
                    <img
                      src={user?.avatar ? user?.avatar : "https://via.placeholder.com/200x200"}
                      alt={user?.fullName}
                      className="w-10 h-10 rounded-full object-cover tablet:w-12 tablet:h-12"
                    />
                  </td>
                  <td className="px-4 py-2 border tablet:px-6 tablet:py-4">{user?.fullName}</td>
                  <td className="px-4 py-2 border tablet:px-6 tablet:py-4">{user?.email}</td>
                  <td className="px-4 py-2 border tablet:px-6 tablet:py-4">{user?.phone}</td>
                  <td className="px-4 py-2 border tablet:px-6 tablet:py-4">{user?.role}</td>
                  <td className="px-4 py-2 border tablet:px-6 tablet:py-4">{user?.createdAt.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UsersTable;