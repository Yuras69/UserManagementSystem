const AddUser = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Add User</h1>
        <p className="mt-2 text-sm text-muted-foreground">Create a new user account.</p>
      </div>

      <form className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="block" htmlFor="FirstName">
            <span className="text-sm font-medium text-foreground">First Name</span>
            <input
              className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              type="text"
              id="FirstName"
              name="FirstName"
              placeholder="Enter first name"
            />
          </label>

          <label className="block" htmlFor="LastName">
            <span className="text-sm font-medium text-foreground">Last Name</span>
            <input
              className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              type="text"
              id="LastName"
              name="LastName"
              placeholder="Enter last name"
            />
          </label>

          <label className="block" htmlFor="Age">
            <span className="text-sm font-medium text-foreground">Age</span>
            <input
              className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              type="number"
              id="Age"
              name="Age"
              placeholder="Enter age"
            />
          </label>

          <label className="block" htmlFor="PhoneNo">
            <span className="text-sm font-medium text-foreground">Phone Number</span>
            <input
              className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              type="tel"
              id="PhoneNo"
              name="PhoneNo"
              placeholder="Enter phone number"
            />
          </label>

          <label className="block md:col-span-2" htmlFor="Email">
            <span className="text-sm font-medium text-foreground">Email</span>
            <input
              className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              type="email"
              id="Email"
              name="Email"
              placeholder="Enter email address"
            />
          </label>

          <label className="flex items-center gap-3 rounded-md border border-border bg-muted/40 p-4 md:col-span-2" htmlFor="isVerified">
            <input
              className="size-4 accent-primary"
              type="checkbox"
              id="isVerified"
              name="isVerified"
            />
            <span className="text-sm font-medium text-foreground">Is Verified</span>
          </label>

          <label className="block" htmlFor="createdAt">
            <span className="text-sm font-medium text-foreground">Created At</span>
            <input
              className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              type="date"
              id="createdAt"
              name="createdAt"
            />
          </label>

        </div>

        <div className="mt-6 flex justify-end gap-3 border-t border-border pt-6">
          <button
            className="h-10 rounded-md border border-input bg-background px-4 text-sm font-medium transition hover:bg-muted"
            type="button"
          >
            Cancel
          </button>
          <button 
            className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/85"
            type="submit"
          >
            Save User
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddUser
