
const Loader = ({ loading, message }) => {
    if (!loading) return null; // If loading is false, don't render the Loader

    return (
        <div className="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end z-50">
            <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto">
                <div className="rounded-lg shadow-xs overflow-hidden">
                    <div className="p-4">
                        <div className="flex items-center">
                            <div className="w-0 flex-1 flex justify-center">
                                <svg className="animate-spin h-5 w-5 mr-3 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4c-2.22 0-4.213-.903-5.657-2.343l1.414-1.414zM20 12a8 8 0 01-8 8v4c4.418 0 8-3.582 8-8h-4zm-6-7.291A7.962 7.962 0 0120 12h4c0-4.418-3.582-8-8-8v4c2.22 0 4.213.903 5.657 2.343l-1.414 1.414z"></path>
                                </svg>
                                <p className="text-sm leading-5 font-medium text-gray-900">{message}...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
