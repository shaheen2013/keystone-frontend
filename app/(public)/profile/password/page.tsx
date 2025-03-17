"use client";

import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import Modal from "@/components/partials/Modal";
import Image from "next/image";

export default function AccountPassword() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-primary-1 rounded-2xl">
      <div className="font-semibold lg:text-2xl text-lg lg:py-6 lg:px-8 p-4  bg-primary-2 rounded-t-2xl">
        Password
      </div>

      {/* profile/upload */}
      <div className="lg:p-8 p-4" onClick={() => setOpen(true)}>
        <div className="bg-white lg:p-6 py-3 px-4 rounded-xl border border-primary-2 flex justify-between hover:border-secondary-4">
          <div>
            <p className="lg:text-xl text-sm font-medium">Change Password</p>
          </div>

          <div>
            <Image
              src="/icons/chevron-right.svg"
              width={24}
              height={24}
              alt=""
            />
          </div>
        </div>
      </div>

      {/* modal */}
      <Modal title="Change Password" open={open} onOpenChange={setOpen}>
        This is a content in modal
      </Modal>
    </div>
  );
}
