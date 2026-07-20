import { useEffect, useState, type FormEvent } from "react"
import { Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { axiosInstance as mockapi } from "../../API/mockapi"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { UserSchema, type UserFormValues } from "../../utils/Schema"

type UserRecord = UserFormValues & {
  id?: string
}

const initialFormValues: UserFormValues = {
  FirstName: "",
  LastName: "",
  Age: 18,
  Email: "",
  PhoneNo: "",
  Image: "",
  isVerified: false,
  createdAt: "",
}

const UserManagement = () => {
  const [users, setUsers] = useState<UserRecord[]>([])
  const [formData, setFormData] = useState<UserFormValues>(initialFormValues)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [fetchingUsers, setFetchingUsers] = useState(true)

  const fetchUsers = async () => {
    try {
      setFetchingUsers(true)
      const response = await mockapi.get<UserRecord[]>("hasina")
      setUsers(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      console.error("Error fetching users:", error)
      toast.error("Unable to load users")
    } finally {
      setFetchingUsers(false)
    }
  }

  useEffect(() => {
    void fetchUsers()
  }, [])

  const resetForm = () => {
    setFormData(initialFormValues)
    setEditingId(null)
    setErrors({})
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrors({})

    const result = UserSchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors = Object.fromEntries(
        result.error.issues.map((issue) => [issue.path[0], issue.message]),
      )
      setErrors(fieldErrors)
      return
    }

    setLoading(true)
    try {
      if (editingId) {
        await mockapi.put<UserRecord>(`hasina/${editingId}`, result.data)
        toast.success("User updated successfully")
      } else {
        await mockapi.post<UserRecord>("hasina", result.data)
        toast.success("User created successfully")
      }

      resetForm()
      await fetchUsers()
    } catch (error) {
      console.error("Error saving user:", error)
      toast.error("Unable to save user")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id?: string) => {
    if (!id) return

    try {
      await mockapi.delete(`hasina/${id}`)
      toast.success("User deleted successfully")
      await fetchUsers()
    } catch (error) {
      console.error("Error deleting user:", error)
      toast.error("Unable to delete user")
    }
  }

  const handleEdit = (user: UserRecord) => {
    setEditingId(user.id ?? null)
    setFormData({
      FirstName: user.FirstName,
      LastName: user.LastName,
      Age: user.Age,
      Email: user.Email,
      PhoneNo: user.PhoneNo,
      Image: user.Image,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    })
    setErrors({})
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">User Management</p>
        <h1 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">Manage users in a table</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Create, edit, and delete users from one place using your mock API.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{editingId ? "Edit User" : "Add New User"}</h2>
            <p className="text-sm text-muted-foreground">
              {editingId ? "Update the selected user details below." : "Fill in the form to add a new user."}
            </p>
          </div>
          {editingId && (
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel Edit
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={formData.FirstName}
              onChange={(e) => setFormData((prev) => ({ ...prev, FirstName: e.target.value }))}
              className="h-11 w-full rounded-lg border border-input bg-background px-4 outline-none ring-0 focus:border-ring"
            />
            {errors.FirstName && <p className="mt-2 text-sm text-red-500">{errors.FirstName}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Last Name"
              value={formData.LastName}
              onChange={(e) => setFormData((prev) => ({ ...prev, LastName: e.target.value }))}
              className="h-11 w-full rounded-lg border border-input bg-background px-4 outline-none ring-0 focus:border-ring"
            />
            {errors.LastName && <p className="mt-2 text-sm text-red-500">{errors.LastName}</p>}
          </div>

          <div>
            <input
              type="number"
              placeholder="Age"
              value={formData.Age}
              onChange={(e) => setFormData((prev) => ({ ...prev, Age: Number(e.target.value) }))}
              className="h-11 w-full rounded-lg border border-input bg-background px-4 outline-none ring-0 focus:border-ring"
            />
            {errors.Age && <p className="mt-2 text-sm text-red-500">{errors.Age}</p>}
          </div>

          <div>
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.PhoneNo}
              onChange={(e) => setFormData((prev) => ({ ...prev, PhoneNo: e.target.value }))}
              className="h-11 w-full rounded-lg border border-input bg-background px-4 outline-none ring-0 focus:border-ring"
            />
            {errors.PhoneNo && <p className="mt-2 text-sm text-red-500">{errors.PhoneNo}</p>}
          </div>

          <div className="md:col-span-2">
            <input
              type="email"
              placeholder="Email Address"
              value={formData.Email}
              onChange={(e) => setFormData((prev) => ({ ...prev, Email: e.target.value }))}
              className="h-11 w-full rounded-lg border border-input bg-background px-4 outline-none ring-0 focus:border-ring"
            />
            {errors.Email && <p className="mt-2 text-sm text-red-500">{errors.Email}</p>}
          </div>

          <div className="md:col-span-2">
            <input
              type="url"
              placeholder="Image URL"
              value={formData.Image}
              onChange={(e) => setFormData((prev) => ({ ...prev, Image: e.target.value }))}
              className="h-11 w-full rounded-lg border border-input bg-background px-4 outline-none ring-0 focus:border-ring"
            />
            {errors.Image && <p className="mt-2 text-sm text-red-500">{errors.Image}</p>}
          </div>

          <div>
            <input
              type="date"
              value={formData.createdAt}
              onChange={(e) => setFormData((prev) => ({ ...prev, createdAt: e.target.value }))}
              className="h-11 w-full rounded-lg border border-input bg-background px-4 outline-none ring-0 focus:border-ring"
            />
            {errors.createdAt && <p className="mt-2 text-sm text-red-500">{errors.createdAt}</p>}
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-input bg-background px-4 py-3">
            <input
              type="checkbox"
              id="verified"
              checked={formData.isVerified}
              onChange={(e) => setFormData((prev) => ({ ...prev, isVerified: e.target.checked }))}
              className="h-4 w-4 accent-teal-600"
            />
            <label htmlFor="verified" className="text-sm font-medium text-foreground">
              Mark as Verified
            </label>
            {errors.isVerified && <p className="text-sm text-red-500">{errors.isVerified}</p>}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={resetForm}>
            Reset
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : editingId ? "Update User" : "Create User"}
          </Button>
        </div>
      </form>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <Table>
          <TableCaption>A list of all created users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fetchingUsers ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-sm text-muted-foreground">
                  Loading users...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-sm text-muted-foreground">
                  No users yet. Create one to get started.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id ?? `${user.Email}-${user.PhoneNo}`}>
                  <TableCell className="font-medium text-foreground">
                    {user.FirstName} {user.LastName}
                  </TableCell>
                  <TableCell>{user.Email}</TableCell>
                  <TableCell>{user.PhoneNo}</TableCell>
                  <TableCell>{user.isVerified ? "Verified" : "Pending"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(user)}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => void handleDelete(user.id)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default UserManagement
