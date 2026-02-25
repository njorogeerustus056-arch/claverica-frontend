export function DemographicCard() {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        User Demographics
      </h2>

      <div className="space-y-4">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Male</p>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
            <div className="h-full bg-blue-500 rounded-full w-3/5"></div>
          </div>
        </div>

        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Female</p>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
            <div className="h-full bg-purple-500 rounded-full w-2/5"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
