function MobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <div className="flex items-center mb-2">
            <div className="bg-gray-100 mr-2 rounded-full"></div>
            <p className="bg-gray-100"></p>
          </div>
          <p className="text-sm text-gray-500 bg-gray-100"></p>
        </div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <p className="text-xl font-medium bg-gray-100"></p>
        </div>
        <div className="flex justify-end gap-2 bg-gray-100"></div>
      </div>
    </div>
  );
}

function DesktopSkeleton() {
  return (
    <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      <td className="whitespace-nowrap py-3 px-3">
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-full bg-gray-100"></div>
          <p className="bg-gray-100"></p>
        </div>
      </td>
      <td className="whitespace-nowrap py-3 px-3 bg-gray-100"></td>
      <td className="whitespace-nowrap py-3 px-3 bg-gray-100"></td>
      <td className="whitespace-nowrap py-3 px-3">
        <div className="flex justify-end gap-3 bg-gray-100"></div>
      </td>
    </tr>
  );
}

export function FoodsListSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 sm:pt-0">
          {/* pointing to hidden in small screen into the parent tag */}
          <div className="sm:hidden">
            <MobileSkeleton />
            <MobileSkeleton />
            <MobileSkeleton />
            <MobileSkeleton />
          </div>
          {/* when pointing to hidden and sm:table in advance, no need to point the screen size for other tags  */}
          <table className="hidden min-w-full text-gray-900 sm:table">
            <thead className="rounded-lg text-left text-sm">
              <tr>
                <th className="pl-6 py-5 font-medium" scope="col">
                  Title
                </th>
                <th className="px-3 py-5 font-medium" scope="col">
                  Description
                </th>
                <th className="px-3 py-5 font-medium" scope="col">
                  Price
                </th>
                <th className="px-3 py-5 font-medium" scope="col">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <DesktopSkeleton />
              <DesktopSkeleton />
              <DesktopSkeleton />
              <DesktopSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
