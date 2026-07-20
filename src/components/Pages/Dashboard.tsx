import { useEffect, useMemo, useState } from "react"
import { Activity, ArrowUpRight, Clock3, ShieldCheck, Users, UserPlus } from "lucide-react"
import { axiosInstance as mockapi } from "../../API/mockapi"
import type { UserFormValues } from "../../utils/Schema"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

type UserRecord = UserFormValues & { id?: string }

const timeSince = (value: string) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "Date unavailable"
  const days = Math.max(0, Math.floor((Date.now() - date.getTime()) / 86_400_000))
  if (days === 0) return "Joined today"
  if (days === 1) return "Joined yesterday"
  return `Joined ${days} days ago`
}

const Dashboard = () => {
  const [users, setUsers] = useState<UserRecord[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await mockapi.get<UserRecord[]>("hasina")
        setUsers(Array.isArray(response.data) ? response.data : [])
      } catch (error) {
        console.error("Unable to load dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }
    void loadUsers()
  }, [])

  const activity = useMemo(() => {
    const verified = users.filter((user) => user.isVerified).length
    const weekAgo = Date.now() - 7 * 86_400_000
    const thisWeek = users.filter((user) => new Date(user.createdAt).getTime() >= weekAgo).length
    return {
      verified,
      pending: users.length - verified,
      thisWeek,
      recent: [...users].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 6),
    }
  }, [users])

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div><p className="text-sm font-medium uppercase tracking-wide text-primary">Dashboard</p><h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">User activity</h1><p className="mt-2 text-sm text-muted-foreground">Keep an eye on your directory and the latest account activity.</p></div>
        <Button onClick={() => navigate("/add-user")}><UserPlus className="mr-2 h-4 w-4" /> Add user</Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total users", value: users.length, note: "In your directory", icon: Users },
          { label: "New this week", value: activity.thisWeek, note: "Recent sign-ups", icon: UserPlus },
          { label: "Verified accounts", value: activity.verified, note: "Ready for access", icon: ShieldCheck },
          { label: "Needs verification", value: activity.pending, note: "Awaiting review", icon: Clock3 },
        ].map(({ label, value, note, icon: Icon }) => <article key={label} className="rounded-2xl border border-border bg-card p-5 shadow-sm"><div className="flex justify-between"><p className="text-sm font-medium text-muted-foreground">{label}</p><Icon className="h-5 w-5 text-primary" /></div><p className="mt-5 text-3xl font-semibold">{loading ? "—" : value}</p><p className="mt-2 text-xs text-muted-foreground">{note}</p></article>)}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <article className="rounded-2xl border border-border bg-card shadow-sm lg:col-span-3">
          <div className="flex items-center justify-between border-b border-border px-6 py-5"><div><h2 className="font-semibold">Recent user activity</h2><p className="mt-1 text-sm text-muted-foreground">Newest members in your directory</p></div><Activity className="h-5 w-5 text-primary" /></div>
          <div>{loading ? <p className="px-6 py-10 text-center text-sm text-muted-foreground">Loading activity...</p> : activity.recent.length ? activity.recent.map((user) => <div key={user.id ?? user.Email} className="flex items-center gap-4 border-b border-border px-6 py-4 last:border-0"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">{user.FirstName?.[0] ?? "U"}{user.LastName?.[0] ?? ""}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{user.FirstName} {user.LastName}</p><p className="mt-0.5 text-xs text-muted-foreground">{user.Email}</p></div><div className="text-right"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${user.isVerified ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{user.isVerified ? "Verified" : "Pending"}</span><p className="mt-1.5 text-xs text-muted-foreground">{timeSince(user.createdAt)}</p></div></div>) : <p className="px-6 py-10 text-center text-sm text-muted-foreground">No activity yet. Add a user to get started.</p>}</div>
          <div className="border-t border-border px-6 py-4"><Button variant="link" className="px-0" onClick={() => navigate("/user")}>View all users <ArrowUpRight className="ml-1 h-4 w-4" /></Button></div>
        </article>
        <article className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-2"><h2 className="font-semibold">Directory health</h2><p className="mt-1 text-sm text-muted-foreground">Account verification progress</p><div className="mt-8"><div className="flex items-end justify-between"><p className="text-4xl font-semibold">{users.length ? Math.round((activity.verified / users.length) * 100) : 0}%</p><p className="text-sm text-muted-foreground">{activity.verified} of {users.length} verified</p></div><div className="mt-4 h-3 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${users.length ? (activity.verified / users.length) * 100 : 0}%` }} /></div></div><div className="mt-8 rounded-xl bg-muted/60 p-4"><p className="text-sm font-medium">Quick insight</p><p className="mt-1 text-sm leading-6 text-muted-foreground">{activity.pending ? `${activity.pending} user${activity.pending === 1 ? " is" : "s are"} waiting for verification.` : "All users are verified and ready to go."}</p></div><Button variant="outline" className="mt-6 w-full" onClick={() => navigate("/reports")}>Open full report</Button></article>
      </div>
    </section>
  )
}

export default Dashboard
