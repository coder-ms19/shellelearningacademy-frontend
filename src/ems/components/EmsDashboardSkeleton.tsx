
import { Skeleton } from "@/components/ui/skeleton";

export function EmsDashboardSkeleton() {
    return (
        <div className="min-h-screen bg-muted/30">
            {/* Sidebar Skeleton */}
            <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-background border-r border-border p-4 flex flex-col gap-4">
                {/* Logo Area */}
                <div className="flex items-center gap-3 mb-6">
                    <Skeleton className="h-9 w-9 rounded-lg" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                </div>

                {/* Nav Items Skeleton */}
                <div className="space-y-2 flex-1">
                    {[...Array(8)].map((_, i) => (
                        <Skeleton key={i} className="h-10 w-full rounded-md" />
                    ))}
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="pl-64 transition-all duration-300">
                {/* Header Skeleton */}
                <header className="h-16 border-b border-border bg-background/95 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-30">
                    <Skeleton className="h-5 w-48" />
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-9 w-9 rounded-full" />
                        <Skeleton className="h-9 w-9 rounded-full" />
                        <Skeleton className="h-9 w-24 rounded-full" />
                    </div>
                </header>

                {/* Page Content Skeleton */}
                <main className="p-6 space-y-8">
                    {/* Page Title */}
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-64" />
                        <Skeleton className="h-4 w-96" />
                    </div>

                    {/* Stats Cards Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="p-6 bg-background rounded-xl border border-border space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-8 w-16" />
                                    </div>
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                </div>
                                <Skeleton className="h-4 w-full" />
                            </div>
                        ))}
                    </div>

                    {/* Charts Row Skeleton */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Skeleton className="h-[300px] w-full rounded-xl" />
                        <Skeleton className="h-[300px] w-full rounded-xl" />
                    </div>

                    {/* Bottom List Skeleton */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Skeleton className="h-[400px] w-full rounded-xl" />
                        <Skeleton className="h-[400px] w-full rounded-xl" />
                        <Skeleton className="h-[400px] w-full rounded-xl" />
                    </div>
                </main>
            </div>
        </div>
    );
}
