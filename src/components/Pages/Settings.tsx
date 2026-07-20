import { useEffect, useState } from "react"
import { Bell, Building2, Globe2, LockKeyhole, Save, ShieldCheck } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

type SettingsState = {
  workspaceName: string
  timezone: string
  emailNotifications: boolean
  weeklyReport: boolean
  verificationRequired: boolean
}

const defaultSettings: SettingsState = {
  workspaceName: "User Management System",
  timezone: "Asia/Kathmandu",
  emailNotifications: true,
  weeklyReport: true,
  verificationRequired: true,
}

const Settings = () => {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings)

  useEffect(() => {
    const saved = localStorage.getItem("management-system-settings")
    if (saved) {
      try { setSettings({ ...defaultSettings, ...JSON.parse(saved) }) } catch { localStorage.removeItem("management-system-settings") }
    }
  }, [])

  const update = <Key extends keyof SettingsState>(key: Key, value: SettingsState[Key]) => setSettings((current) => ({ ...current, [key]: value }))
  const saveSettings = () => {
    localStorage.setItem("management-system-settings", JSON.stringify(settings))
    toast.success("Settings saved")
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-medium uppercase tracking-wide text-primary">Workspace</p><h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">Settings</h1><p className="mt-2 text-sm text-muted-foreground">Manage your workspace preferences and user access defaults.</p></div><Button onClick={saveSettings}><Save className="mr-2 h-4 w-4" /> Save changes</Button></div>

      <div className="mt-8 space-y-6">
        <article className="rounded-2xl border border-border bg-card p-6 shadow-sm"><div className="flex gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Building2 className="h-5 w-5" /></span><div><h2 className="font-semibold">Workspace details</h2><p className="mt-1 text-sm text-muted-foreground">Basic information for your management system.</p></div></div><div className="mt-6 grid gap-5 md:grid-cols-2"><label className="grid gap-2 text-sm font-medium">Workspace name<input value={settings.workspaceName} onChange={(event) => update("workspaceName", event.target.value)} className="h-10 rounded-lg border border-input bg-background px-3 font-normal outline-none focus:border-primary" /></label><label className="grid gap-2 text-sm font-medium">Timezone<select value={settings.timezone} onChange={(event) => update("timezone", event.target.value)} className="h-10 rounded-lg border border-input bg-background px-3 font-normal outline-none focus:border-primary"><option>Asia/Kathmandu</option><option>Asia/Kolkata</option><option>UTC</option><option>America/New_York</option><option>Europe/London</option></select></label></div></article>

        <article className="rounded-2xl border border-border bg-card p-6 shadow-sm"><div className="flex gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Bell className="h-5 w-5" /></span><div><h2 className="font-semibold">Notifications</h2><p className="mt-1 text-sm text-muted-foreground">Choose which workspace updates you receive.</p></div></div><div className="mt-6 divide-y divide-border"><SettingRow title="Email notifications" description="Receive updates about user activity and important changes." checked={settings.emailNotifications} onCheckedChange={(value) => update("emailNotifications", value)} /><SettingRow title="Weekly activity report" description="Get a weekly summary of new users and verification status." checked={settings.weeklyReport} onCheckedChange={(value) => update("weeklyReport", value)} /></div></article>

        <article className="rounded-2xl border border-border bg-card p-6 shadow-sm"><div className="flex gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><LockKeyhole className="h-5 w-5" /></span><div><h2 className="font-semibold">User access</h2><p className="mt-1 text-sm text-muted-foreground">Set the default security requirements for new users.</p></div></div><div className="mt-6"><SettingRow title="Require account verification" description="New users must be verified before they are considered active." checked={settings.verificationRequired} onCheckedChange={(value) => update("verificationRequired", value)} /></div><div className="mt-5 flex items-start gap-2 rounded-xl bg-muted/60 p-4 text-sm text-muted-foreground"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />This setting affects newly created users. Existing users will keep their current status.</div></article>

        <article className="rounded-2xl border border-border bg-card p-6 shadow-sm"><div className="flex gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Globe2 className="h-5 w-5" /></span><div><h2 className="font-semibold">Appearance</h2><p className="mt-1 text-sm text-muted-foreground">Your system follows the device theme automatically.</p></div></div></article>
      </div>
    </section>
  )
}

function SettingRow({ title, description, checked, onCheckedChange }: { title: string; description: string; checked: boolean; onCheckedChange: (checked: boolean) => void }) {
  return <div className="flex items-center justify-between gap-5 py-5 first:pt-0 last:pb-0"><div><h3 className="text-sm font-medium">{title}</h3><p className="mt-1 max-w-xl text-sm text-muted-foreground">{description}</p></div><Switch checked={checked} onCheckedChange={onCheckedChange} /></div>
}

export default Settings
