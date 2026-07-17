import { useState, type FormEvent } from "react"
import { axiosInstance as mockapi } from "../../API/mockapi"
import { UserSchema, type UserFormValues } from "../../utils/Schema"

const initialFormValues: UserFormValues = {
  FirstName: "",
  LastName: "",
  Age: 18,
  Email: "",
  PhoneNo: "",
  isVerified: false,
  createdAt: "",
}

const AddUser = () => {
  const [formData, setFormData] = useState<UserFormValues>(initialFormValues)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: keyof UserFormValues, value: string | boolean | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "Age" ? Number(value) : value,
    }))
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
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

    try {
      const response = await mockapi.post("hasina", result.data)
      console.log("User added successfully", response.data)
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <h1 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Management Console</h1>
        <p className="mt-4 text-3xl font-bold text-foreground sm:text-5xl">Add User</p>
      </div>

      <form onSubmit={onSubmit} className="mx-auto mt-10 max-w-4xl rounded-2xl bg-white p-8 shadow-lg">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={formData.FirstName}
              onChange={(e) => handleChange("FirstName", e.target.value)}
              className="h-12 w-full rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.FirstName && <p className="mt-2 text-sm text-red-500">{errors.FirstName}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Last Name"
              value={formData.LastName}
              onChange={(e) => handleChange("LastName", e.target.value)}
              className="h-12 w-full rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.LastName && <p className="mt-2 text-sm text-red-500">{errors.LastName}</p>}
          </div>

          <div>
            <input
              type="number"
              placeholder="Age"
              value={formData.Age}
              onChange={(e) => handleChange("Age", e.target.value)}
              className="h-12 w-full rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.Age && <p className="mt-2 text-sm text-red-500">{errors.Age}</p>}
          </div>

          <div>
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.PhoneNo}
              onChange={(e) => handleChange("PhoneNo", e.target.value)}
              className="h-12 w-full rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.PhoneNo && <p className="mt-2 text-sm text-red-500">{errors.PhoneNo}</p>}
          </div>

          <div className="md:col-span-2">
            <input
              type="email"
              placeholder="Email Address"
              value={formData.Email}  
              onChange={(e) => handleChange("Email", e.target.value)}
              className="h-12 w-full rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.Email && <p className="mt-2 text-sm text-red-500">{errors.Email}</p>}
          </div>

          <div>
            <input
              type="date"
              value={formData.createdAt}
              onChange={(e) => handleChange("createdAt", e.target.value)}
              className="h-12 w-full rounded-lg border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.createdAt && <p className="mt-2 text-sm text-red-500">{errors.createdAt}</p>}
          </div>

          <div className="flex h-12 items-center gap-3">
            <input
              type="checkbox"
              id="verified"
              checked={formData.isVerified}
              onChange={(e) => handleChange("isVerified", e.target.checked)}
              className="h-5 w-5 accent-teal-600"
            />
            <label htmlFor="verified" className="text-sm font-medium">
              Mark as Verified
            </label>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => {
              setFormData(initialFormValues)
              setErrors({})
            }}
            className="rounded-lg border border-gray-300 px-6 py-3 transition hover:bg-gray-100"
          >
            Reset
          </button>

          <button
            type="submit"
            className="rounded-lg bg-teal-600 px-6 py-3 text-white transition hover:bg-teal-700"
          >
            Add User
          </button>
        </div>
      </form>
    </>
  )
}

export default AddUser
