import { useState } from "react"
import { Check, Pencil, Plus, ShieldCheck, UsersRound } from "lucide-react"
import { Button } from "@/components/ui/button"

type Role = {
  id: number
  name: string
  description: string
  members: number
  color: string
  permissions: string[]
}

const initialRoles: Role[] = [
  { id: 1, name: "Administrator", description: "Full access to users, settings, and reports.", members: 2, color: "bg-primary", permissions: ["Manage users", "Manage roles", "View reports", "Update settings"] },
  { id: 2, name: "Manager", description: "Oversees users and reviews directory activity.", members: 5, color: "bg-sky-500", permissions: ["Manage users", "View reports", "Export data"] },
  { id: 3, name: "Member", description: "Standard access to their user profile and directory.", members: 18, color: "bg-violet-500", permissions: ["View directory", "Edit own profile"] },
]

const Roles = () => {
  const [roles, setRoles] = useState(initialRoles)
  const [selectedRoleId, setSelectedRoleId] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [roleName, setRoleName] = useState("")
  const [roleDescription, setRoleDescription] = useState("")

  const selectedRole = roles.find((role) => role.id === selectedRoleId) ?? roles[0]

  const addRole = () => {
    const name = roleName.trim()
    if (!name) return

    const newRole: Role = {
      id: Date.now(),
      name,
      description: roleDescription.trim() || "Custom role for your user management workspace.",
      members: 0,
      color: "bg-amber-500",
      permissions: ["View directory"],
    }
    setRoles((current) => [...current, newRole])
    setSelectedRoleId(newRole.id)
    setRoleName("")
    setRoleDescription("")
    setShowForm(false)
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-primary">Access control</p>
          <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">Roles & permissions</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Give each user the right level of access to your management system.</p>
        </div>
        <Button onClick={() => setShowForm((visible) => !visible)}><Plus className="mr-2 h-4 w-4" /> New role</Button>
      </div>

      {showForm && (
        <div className="mt-7 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-semibold">Create a custom role</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-[1fr_2fr_auto]">
            <input value={roleName} onChange={(event) => setRoleName(event.target.value)} placeholder="Role name" className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary" />
            <input value={roleDescription} onChange={(event) => setRoleDescription(event.target.value)} placeholder="Brief description (optional)" className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary" />
            <Button onClick={addRole}>Create role</Button>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        <div className="space-y-3 lg:col-span-3">
          {roles.map((role) => (
            <button key={role.id} type="button" onClick={() => setSelectedRoleId(role.id)} className={`w-full rounded-2xl border p-5 text-left transition ${selectedRole.id === role.id ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-card hover:border-primary/40"}`}>
              <div className="flex items-start justify-between gap-4"><div className="flex gap-4"><span className={`mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl ${role.color} text-white`}><ShieldCheck className="h-5 w-5" /></span><div><h2 className="font-semibold">{role.name}</h2><p className="mt-1 text-sm text-muted-foreground">{role.description}</p></div></div><Pencil className="h-4 w-4 text-muted-foreground" /></div>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><UsersRound className="h-3.5 w-3.5" />{role.members} {role.members === 1 ? "member" : "members"}<span className="mx-1">•</span>{role.permissions.length} permissions</div>
            </button>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center gap-3"><span className={`grid h-10 w-10 place-items-center rounded-xl ${selectedRole.color} text-white`}><ShieldCheck className="h-5 w-5" /></span><div><p className="text-sm text-muted-foreground">Selected role</p><h2 className="font-semibold">{selectedRole.name}</h2></div></div>
          <p className="mt-5 text-sm leading-6 text-muted-foreground">{selectedRole.description}</p>
          <div className="mt-6 border-t border-border pt-5"><h3 className="text-sm font-semibold">Included permissions</h3><ul className="mt-4 space-y-3">{selectedRole.permissions.map((permission) => <li key={permission} className="flex items-center gap-3 text-sm"><span className="grid h-5 w-5 place-items-center rounded-full bg-primary/10 text-primary"><Check className="h-3.5 w-3.5" /></span>{permission}</li>)}</ul></div>
          <Button variant="outline" className="mt-7 w-full"><Pencil className="mr-2 h-4 w-4" /> Edit permissions</Button>
        </aside>
      </div>
    </section>
  )
}

export default Roles
