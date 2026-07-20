import { useEffect, useMemo, useState } from "react"
import { BarChart3, CalendarDays, CheckCircle2, Download, RefreshCw, Users, UserRoundCheck } from "lucide-react"
import { axiosInstance as mockapi } from "../../API/mockapi"
import type { UserFormValues } from "../../utils/Schema"
import { Button } from "@/components/ui/button"

type UserRecord = UserFormValues & { id?: string }

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const formatDate = (value: string) => {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
}

const Reports = () => {
  const [users, setUsers] = useState<UserRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null)

  const loadReport = async () => {
    setLoading(true)
    try {
      const response = await mockapi.get<UserRecord[]>("hasina")
      setUsers(Array.isArray(response.data) ? response.data : [])
      setUpdatedAt(new Date())
    } catch (error) {
      console.error("Unable to load report data:", error)
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadReport()
  }, [])

  const report = useMemo(() => {
    const verified = users.filter((user) => user.isVerified).length
    const monthlyUsers = Array.from({ length: 6 }, (_, index) => {
      const date = new Date()
      date.setMonth(date.getMonth() - (5 - index))
      const month = date.getMonth()
      const year = date.getFullYear()
      return {
        label: monthLabels[month],
        count: users.filter((user) => {
          const created = new Date(user.createdAt)
          return !Number.isNaN(created.getTime()) && created.getMonth() === month && created.getFullYear() === year
        }).length,
      }
    })

    return {
      total: users.length,
      verified,
      pending: users.length - verified,
      rate: users.length ? Math.round((verified / users.length) * 100) : 0,
      monthlyUsers,
      recent: [...users]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5),
    }
  }, [users])

  const maxMonthlyUsers = Math.max(...report.monthlyUsers.map((item) => item.count), 1)

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-primary">Reports</p>
          <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">User activity overview</h1>
          <p className="mt-2 text-sm text-muted-foreground">A live summary of your directory’s growth and verification status.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xs text-muted-foreground">{updatedAt ? `Updated ${updatedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : "Loading report"}</p>
          <Button variant="outline" size="sm" onClick={() => void loadReport()} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
          <Button size="sm" onClick={() => window.print()}><Download className="mr-2 h-4 w-4" /> Export</Button>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total users", value: report.total, detail: "All directory members", icon: Users },
          { label: "Verified users", value: report.verified, detail: `${report.rate}% of total`, icon: UserRoundCheck },
          { label: "Pending verification", value: report.pending, detail: "Need review", icon: CheckCircle2 },
          { label: "New this month", value: report.monthlyUsers.at(-1)?.count ?? 0, detail: "Recently added", icon: CalendarDays },
        ].map(({ label, value, detail, icon: Icon }) => (
          <article key={label} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between"><p className="text-sm font-medium text-muted-foreground">{label}</p><Icon className="h-5 w-5 text-primary" /></div>
            <p className="mt-5 text-3xl font-semibold tracking-tight">{loading ? "—" : value}</p>
            <p className="mt-2 text-xs text-muted-foreground">{detail}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <article className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-3">
          <div className="flex items-center justify-between"><div><h2 className="font-semibold">User growth</h2><p className="mt-1 text-sm text-muted-foreground">New users over the last six months</p></div><BarChart3 className="h-5 w-5 text-primary" /></div>
          <div className="mt-8 flex h-52 items-end gap-3 sm:gap-5">
            {report.monthlyUsers.map((item) => <div key={item.label} className="flex h-full flex-1 flex-col justify-end gap-2"><div className="group relative rounded-t-md bg-primary/80 transition hover:bg-primary" style={{ height: `${Math.max((item.count / maxMonthlyUsers) * 100, item.count ? 8 : 2)}%` }}><span className="absolute -top-6 left-1/2 hidden -translate-x-1/2 rounded bg-foreground px-2 py-1 text-xs text-background group-hover:block">{item.count}</span></div><span className="text-center text-xs text-muted-foreground">{item.label}</span></div>)}
          </div>
        </article>

        <article className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-2">
          <h2 className="font-semibold">Verification status</h2><p className="mt-1 text-sm text-muted-foreground">Directory completion at a glance</p>
          <div className="mt-8 flex items-center gap-6"><div className="grid h-28 w-28 place-items-center rounded-full" style={{ background: `conic-gradient(var(--primary) ${report.rate}%, var(--muted) 0)` }}><div className="grid h-20 w-20 place-items-center rounded-full bg-card text-lg font-semibold">{report.rate}%</div></div><div className="space-y-3 text-sm"><p className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-primary" />Verified <strong className="ml-auto">{report.verified}</strong></p><p className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-muted" />Pending <strong className="ml-auto">{report.pending}</strong></p></div></div>
        </article>
      </div>

      <article className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border px-6 py-5"><div><h2 className="font-semibold">Recently added users</h2><p className="mt-1 text-sm text-muted-foreground">Latest additions to your directory</p></div></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground"><tr><th className="px-6 py-3 font-medium">User</th><th className="px-6 py-3 font-medium">Email</th><th className="px-6 py-3 font-medium">Joined</th><th className="px-6 py-3 font-medium">Status</th></tr></thead><tbody>{loading ? <tr><td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">Loading report data...</td></tr> : report.recent.length ? report.recent.map((user) => <tr key={user.id ?? user.Email} className="border-t border-border"><td className="px-6 py-4 font-medium">{user.FirstName} {user.LastName}</td><td className="px-6 py-4 text-muted-foreground">{user.Email}</td><td className="px-6 py-4 text-muted-foreground">{formatDate(user.createdAt)}</td><td className="px-6 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${user.isVerified ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{user.isVerified ? "Verified" : "Pending"}</span></td></tr>) : <tr><td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">No users available for this report.</td></tr>}</tbody></table></div>
      </article>
    </section>
  )
}

export default Reports
