
const PublicFooter = () => {
  return (
    <footer className="flex h-12 items-center justify-center border-t">
      <div className="text-sm">
        &copy; {new Date().getFullYear()} User Management System. All rights reserved.
      </div>
    </footer>
  )
}

export default PublicFooter
