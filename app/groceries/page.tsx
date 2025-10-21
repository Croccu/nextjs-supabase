import GroceriesClient from './GroceriesClient'

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-card text-foreground border border-border rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-primary">My Groceries</h1>
        <GroceriesClient />
      </div>
    </main>
  )
}
