import { useEffect, useState, type FormEvent } from 'react'
import { axiosInstance as mockapi } from "../../API/mockapi"
import type { UserFormValues } from "../../utils/Schema"
import { toast } from "sonner"
import { SquarePen, Trash } from 'lucide-react'

type User = UserFormValues & { id: string }

const User = () => {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [editingUser, setEditingUser] = useState<User | null>(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await mockapi.get<User[]>("hasina")
                setUsers(response.data)
            } catch (error) {
                console.error("Error fetching user data:", error)
                setError("Unable to load users. Please try again later.")
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])


    const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!editingUser) return

        try {
            const response = await mockapi.put<User>(`hasina/${editingUser.id}`, editingUser)
            setUsers((currentUsers) =>
                currentUsers.map((user) => (user.id === editingUser.id ? response.data : user)),
            )
            setEditingUser(null)
            toast.success("User updated successfully")
        } catch (error) {
            console.error("Error updating user:", error)
            toast.error("Unable to update user")
        }
    }

    const handleDeleteUser = async (id: string) => {
        try {
            await mockapi.delete(`hasina/${id}`)
            setUsers((currentUsers) => currentUsers.filter((user) => user.id !== id))
            if (editingUser?.id === id) setEditingUser(null)
            toast.success("User deleted successfully")
        } catch (error) {
            console.error("Error deleting user:", error)
            toast.error("Unable to delete user")
        }
    }

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
            <h1 className="text-3xl font-bold">Users</h1>

            {editingUser && (
                <form onSubmit={handleUpdateUser} className="mt-6 grid gap-4 rounded-lg border bg-slate-00 p-5 md:grid-cols-2">
                    <input
                        value={editingUser.FirstName}
                        onChange={(event) => setEditingUser({ ...editingUser, FirstName: event.target.value })}
                        className="rounded-md border p-2"
                        placeholder="First name"
                    />
                    <input
                        value={editingUser.LastName}
                        onChange={(event) => setEditingUser({ ...editingUser, LastName: event.target.value })}
                        className="rounded-md border p-2"
                        placeholder="Last name"
                    />
                    <input
                        type="email"
                        value={editingUser.Email}
                        onChange={(event) => setEditingUser({ ...editingUser, Email: event.target.value })}
                        className="rounded-md border p-2"
                        placeholder="Email"
                    />
                    <input
                        value={editingUser.PhoneNo}
                        onChange={(event) => setEditingUser({ ...editingUser, PhoneNo: event.target.value })}
                        className="rounded-md border p-2"
                        placeholder="Phone number"
                    />
                    <input
                        type="number"
                        value={editingUser.Age}
                        onChange={(event) => setEditingUser({ ...editingUser, Age: Number(event.target.value) })}
                        className="rounded-md border p-2"
                        placeholder="Age"
                    />
                    <input
                        type="url"
                        value={editingUser.Image}
                        onChange={(event) => setEditingUser({ ...editingUser, Image: event.target.value })}
                        className="rounded-md border p-2"
                        placeholder="Image URL"
                    />
                    <input
                        type="date"
                        value={editingUser.createdAt}
                        onChange={(event) => setEditingUser({ ...editingUser, createdAt: event.target.value })}
                        className="rounded-md border p-2"
                    />
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={editingUser.isVerified}
                            onChange={(event) => setEditingUser({ ...editingUser, isVerified: event.target.checked })}
                        />
                        Verified
                    </label>
                    <div className="flex gap-2">
                        <button type="submit" className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white">Save changes</button>
                        <button type="button" onClick={() => setEditingUser(null)} className="rounded-md border px-3 py-2 text-sm">Cancel</button>
                    </div>
                </form>
            )}

            {error && <p className="mt-6 text-red-500">{error}</p>}

            {!loading && !error && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {users.map((user) => (
                        <div key={user.id} className="rounded-lg border bg-white p-5 shadow-sm">
                            <img
                                src={user.Image}
                                alt={`${user.FirstName} ${user.LastName}`}
                                className="h-20 w-20 rounded-full object-cover"
                            />
                            <h2 className="text-lg font-semibold">
                                {user.FirstName} {user.LastName}
                            </h2>
                            <p className="mt-2 text-sm">Email: {user.Email}</p>
                            <p className="text-sm">Phone: {user.PhoneNo}</p>
                            <p className="text-sm">Age: {user.Age}</p>
                            <p className="text-sm">Verified: {user.isVerified ? "Yes" : "No"}</p>
                            <p className="text-sm">Created At: {user.createdAt}</p>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setEditingUser(user)} className="mt-2 rounded-md bg-blue-600 px-2 py-1 text-sm text-white">  <SquarePen /></button>
                                <button onClick={() => handleDeleteUser(user.id)} className="mt-2 rounded-md bg-red-600 px-2 py-1 text-sm text-white">   <Trash />
                                </button>
                            </div>
                        </div>
                    ))}
                    {users.length === 0 && <p>No users found.</p>}
                </div>
            )}
        </div>
    )
}

export default User

