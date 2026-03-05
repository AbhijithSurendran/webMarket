export default function Loading() {
    return (
        <div className="w-full min-h-screen bg-gray-50 flex flex-col animate-pulse">
            {/* Header Skeleton */}
            <div className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 lg:px-12 w-full">
                <div className="w-32 h-8 bg-gray-200 rounded-lg"></div>
                <div className="hidden md:flex gap-6">
                    <div className="w-16 h-4 bg-gray-200 rounded-md"></div>
                    <div className="w-16 h-4 bg-gray-200 rounded-md"></div>
                    <div className="w-16 h-4 bg-gray-200 rounded-md"></div>
                    <div className="w-16 h-4 bg-gray-200 rounded-md"></div>
                </div>
                <div className="w-24 h-10 bg-gray-200 rounded-lg hidden md:block"></div>
            </div>

            {/* Hero / Top Section Skeleton */}
            <div className="w-full h-80 md:h-96 bg-gray-200 flex flex-col items-center justify-center p-8 gap-6">
                <div className="w-3/4 max-w-2xl h-12 bg-gray-300 rounded-xl"></div>
                <div className="w-1/2 max-w-md h-6 bg-gray-300 rounded-lg mt-2"></div>
                <div className="flex gap-4 mt-6">
                    <div className="w-32 h-12 bg-gray-300 rounded-full"></div>
                    <div className="w-32 h-12 bg-gray-300 rounded-full"></div>
                </div>
            </div>

            {/* Content Body Skeleton */}
            <div className="flex-1 w-full max-w-7xl mx-auto px-6 lg:px-12 py-16">
                <div className="w-48 h-8 bg-gray-200 rounded-lg mb-12 text-center mx-auto"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Skeleton Cards */}
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl h-80 border border-gray-100 shadow-sm flex flex-col overflow-hidden">
                            <div className="w-full h-48 bg-gray-200"></div>
                            <div className="p-6 flex flex-col gap-3">
                                <div className="w-3/4 h-6 bg-gray-200 rounded-md"></div>
                                <div className="w-full h-4 bg-gray-100 rounded-md"></div>
                                <div className="w-5/6 h-4 bg-gray-100 rounded-md"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
