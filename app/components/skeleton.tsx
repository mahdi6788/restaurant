import { useTranslations } from "next-intl";

// Skeleton loader for profile
export  function ProfileSkeleton() {
  const translate =  useTranslations("ProfileSkeleton")
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Title skeleton */}
        <div className="text-2xl font-bold mb-6 text-center">{translate("Your Profile")}</div>

        {/* Form skeleton */}
        <div className="space-y-4">
          {/* Name field */}
          <div>
            <div className="block text-sm font-medium text-gray-700">{translate("Name")}</div>
            <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse"></div>
          </div>

          {/* Address field */}
          <div>
            <div className="block text-sm font-medium text-gray-700">
              {translate("Delivery Address")}
            </div>
            <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse"></div>
          </div>

          {/* Phone field */}
          <div>
            <div className="block text-sm font-medium text-gray-700">
              {translate("Phone Number")}
            </div>
            <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse"></div>
          </div>

          {/* Button skeleton */}
          <div className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 text-center">
            {translate("Save Profile")}
          </div>
        </div>
      </div>
    </div>
  );
}

/// Foods list (Menu)
export  function FoodsListSkeleton() {
  const translate =  useTranslations("FoodsListSkeleton")
  return (
    <div className="mt-1 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 sm:pt-0">
          {/* Mobile Version */}
          <div className="sm:hidden animate-pulse">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="mb-2 w-full rounded-md bg-white p-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="w-full">
                    <div className="flex items-center mb-2 gap-1">
                      {/* Availability skeleton */}
                      <div className="flex items-center justify-center gap-1 w-full">
                        <div className="h-4 w-20 bg-gray-200 rounded mr-2" />
                        <div className="h-5 w-5 bg-gray-200 rounded" />
                      </div>
                      {/* Image skeleton */}
                      <div className="mr-2 rounded-full bg-gray-200 w-[70px] h-[70px]" />
                      {/* Category skeleton */}
                      <div className="h-4 w-24 bg-gray-200 rounded" />
                      {/* Name skeleton */}
                      <div className="h-4 w-32 bg-gray-200 rounded ml-2" />
                    </div>
                    {/* Description skeleton */}
                    <div className="h-3 w-3/4 bg-gray-200 rounded" />
                  </div>
                </div>
                {/* Price and buttons skeleton */}
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="h-6 w-16 bg-gray-200 rounded" />
                  <div className="flex justify-end gap-2">
                    <div className="h-8 w-16 bg-gray-200 rounded" />
                    <div className="h-8 w-16 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Version */}
          <table className="hidden sm:table ">
            <thead className="rounded-lg text-left text-sm">
              <tr>
                <th className="pl-6 py-5 font-medium" scope="col">
                  {translate("Availability")}
                </th>
                <th>{translate("Image")}</th>
                <th className="pl-6 py-5 font-medium" scope="col">
                  {translate("Category")}
                </th>
                <th className="pl-3 py-5 font-medium" scope="col">
                  {translate("Name")}
                </th>
                <th className="px-3 py-5 font-medium" scope="col">
                  {translate("Description")}
                </th>
                <th className="px-3 py-5 font-medium" scope="col">
                  {translate("Price")}
                </th>
                <th className="px-3 py-5 font-medium" scope="col">
                  <span className="sr-only">{translate("Edit")}</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {[...Array(3)].map((_, index) => (
                <tr
                  key={index}
                  className="animate-pulse w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  {/* Availability skeleton */}
                  <td>
                    <div className="flex items-center gap-6 -ml-6">
                      <div className="flex items-center justify-center gap-1 w-full">
                        <div className="h-4 w-20 bg-gray-200 rounded mr-2" />
                        <div className="h-5 w-5 bg-gray-200 rounded" />
                      </div>
                    </div>
                  </td>
                  {/* Image skeleton */}
                  <td>
                    <div className="rounded-full bg-gray-200 w-[70px] h-[70px]" />
                  </td>
                  {/* Category skeleton */}
                  <td className="whitespace-nowrap py-3 px-3">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                  </td>
                  {/* Name skeleton */}
                  <td className="whitespace-nowrap py-3 px-3">
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                  </td>
                  {/* Description skeleton */}
                  <td className="whitespace-nowrap py-3 px-3">
                    <div className="h-3 w-40 bg-gray-200 rounded" />
                  </td>
                  {/* Price skeleton */}
                  <td className="whitespace-nowrap py-3 px-3">
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                  </td>
                  {/* Buttons skeleton */}
                  <td className="whitespace-nowrap py-3 px-3">
                    <div className="flex justify-end gap-3">
                      <div className="h-8 w-16 bg-gray-200 rounded" />
                      <div className="h-8 w-16 bg-gray-200 rounded" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export  function HomeSkeleton() {
  const translate =  useTranslations("HomeSkeleton")
  return (
    <div className="flex items-center justify-center bg-cover bg-center min-h-screen w-full max-w-screen-2xl mx-auto bg-[url('/images/BG/bgHomeNightMobile.jpg')] sm:bg-[url('/images/BG/bgHomeMorning.jpg')] sm:dark:bg-[url('/images/BG/bgHomeNight.jpg')]">
      <div className="w-3/4 pb-10 bg-emerald-600 opacity-75 rounded-xl animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between gap-2 text-stone-100 font-bold w-fit h-fit p-2 rounded-br-lg rounded-tl-xl shadow-xl"></div>
          {/* Menu */}
          <div className="text-stone-800 font-bold bg-slate-100 rounded-b-lg w-fitt h-fit p-2 px-10">
            <div>
              <p>{translate("Specials")}</p>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-between text-stone-100 font-bold w-fit h-fit p-2 rounded-bl-lg rounded-tr-xl shadow-xl"></div>
        </div>
        <div className=" mt-10 ">
          <p className="font-bold text-4xl text-center mb-5 text-orange-200"></p>
          <div>
            {[...Array(2)].map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export  function MenuSkeleton() {
  return (
    <div className=" flex items-center justify-center bg-cover bg-center w-full max-w-screen-2xl mx-auto min-h-screen bg-[url('/images/BG/bg3.jpg')] pt-16">
      <div className="relative pb-10 px-1 ">
        {/* Menu */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 animate-pulse">
            {[...Array(2)].map((_, index) => (
              <div key={index} />
            ))}
          </div>
        </section>

        {/* Appetizers */}
        <section className="my-20">
          <div className="flex flex-wrap gap-6 justify-center animate-pulse">
            {[...Array(4)].map((_, index) => (
              <div key={index} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export  function OrdersSkeleton() {
  const translate =  useTranslations("OrdersSkeleton")
  return (
    <div className="mt-1 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 sm:pt-0">
          {/* Desktop Version */}
          <table className="hidden sm:table">
            <thead className="rounded-lg text-left text-sm">
              <tr>
                <th className="pl-6 py-5 font-medium">{translate("Image")}</th>
                <th className="pl-6 py-5 font-medium">{translate("Name")}</th>
                <th className="pl-6 py-5 font-medium">{translate("Price")}</th>
                <th className="pl-6 py-5 font-medium">{translate("Quantity")}</th>
                <th className="pl-6 py-5 font-medium">{translate("Order Date")}</th>
                <th className="pl-6 py-5 font-medium">{translate("Payment Method")}</th>
                <th className="pl-6 py-5 font-medium">{translate("Payment Status")}</th>
                <th className="pl-6 py-5 font-medium"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {[...Array(2)].map((_, index) => (
                <tr
                  key={index}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap p-6 animate-pulse"></td>
                  <td className="whitespace-nowrap p-6 animate-pulse"></td>
                  <td className="whitespace-nowrap p-6 animate-pulse"></td>
                  <td className="whitespace-nowrap p-6 animate-pulse"></td>
                  <td className="whitespace-nowrap p-6 animate-pulse"></td>
                  <td className="whitespace-nowrap p-6 animate-pulse"></td>
                  <td className="whitespace-nowrap p-6 animate-pulse"></td>
                  <td className="whitespace-nowrap p-6 animate-pulse"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
