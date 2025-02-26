import React from "react";

export default function OurImpact() {
  return (
    <div className="container lg:py-32 py-12">
      <h2 className="text-center text-gray-9 lg:text-5xl text-2xl font-bold lg:mb-6 mb-4">
        Our Impact
      </h2>

      <p className="text-gray-8 text-base lg:text-2xl text-center lg:mb-12 mb-6">
        Support for Families provided information, education and support for
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="lg:p-8 p-4 bg-primary-2 rounded-xl">
          <h2 className="text-gray-9 font-bold lg:text-5xl text-3xl lg:mb-4 mb-3">
            111
          </h2>
          <p className="text-gray-900 lg:text-base text-sm">
            Interactions with families and providers
          </p>
        </div>

        <div className="lg:p-8 p-4 bg-primary-2 rounded-xl">
          <h2 className="text-gray-9 font-bold lg:text-5xl text-3xl lg:mb-4 mb-3">
            5413
          </h2>
          <p className="text-gray-900 lg:text-base text-sm">
            Attendees at our live and virtual events
          </p>
        </div>

        <div className="lg:p-8 p-4 bg-primary-2 rounded-xl">
          <h2 className="text-gray-9 font-bold lg:text-5xl text-3xl lg:mb-4 mb-3">
            58
          </h2>
          <p className="text-gray-900 lg:text-base text-sm">
            Individuals receiving 1:1 support
          </p>
        </div>

        <div className="lg:p-8 p-4 bg-primary-2 rounded-xl">
          <h2 className="text-gray-9 font-bold lg:text-5xl text-3xl lg:mb-4 mb-3">
            20
          </h2>
          <p className="text-gray-900 lg:text-base text-sm">
            Support Group meetings throughout USA
          </p>
        </div>
      </div>
    </div>
  );
}
