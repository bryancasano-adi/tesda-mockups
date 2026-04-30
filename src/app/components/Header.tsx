"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bars3Icon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { ConfirmationModal } from "../utils/confirmation-modal";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeaderProps {
  children?: React.ReactNode;
  sidebarOpen?: boolean;
  onToggleSidebar?: () => void;
  variant?: "default" | "cats" | "lam" | "ig";
  onSaveDraft?: () => void;
  onValidate?: () => void;
  onFinalize?: () => void;
  onBack?: () => void;
}

export function Header({
  children,
  onToggleSidebar,
  variant = "default",
  onSaveDraft,
  onValidate,
  onFinalize,
  onBack,
}: HeaderProps) {
  const navigate = useNavigate();

  const [isSignoutOpen, setIsSignoutOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isValidated, setIsValidated] = useState(false);

  const confirmSignout = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);
    setTimeout(() => {
      setIsLoggedIn(false);
      setIsSignoutOpen(false);
      navigate("/");
      setIsSigningOut(false);
    }, 500);
  };

  const handleValidate = async () => {
    if (onValidate) {
      await onValidate();
    }
    setIsValidated(true);
  };

  const isWorkspace = ["cats", "lam", "ig"].includes(variant);

  return (
    <div className="fixed top-0 left-0 z-20 w-full bg-white border-b border-gray-200">
      {/* MAIN HEADER ROW */}
      <div className="px-6 py-2 flex items-center justify-between gap-4">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button
            className="p-1 rounded hover:bg-gray-100"
            onClick={onToggleSidebar}
          >
            <Bars3Icon className="w-6 h-6 text-gray-600" />
          </button>

          <div className="flex items-center gap-3">
            <ImageWithFallback
              alt="Logo"
              className="cursor-pointer"
              height={36}
              width={36}
              src="/header-icon.png"
              onClick={() => navigate("/")}
            />

            <span className="text-[10px] text-gray-400">v1.2.0</span>

            {isWorkspace && (
              <>
                {isLoggedIn ? (
                  <button
                    onClick={() => setIsSignoutOpen(true)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
                  >
                    Sign Out
                  </button>
                ) : (
                  <span className="text-sm text-gray-400">Signed out</span>
                )}

                <button
                  onClick={onBack}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-black"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  Back to Sector Details
                </button>
              </>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {isWorkspace ? (
            <>
              <button
                onClick={onSaveDraft}
                className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50"
              >
                Save Draft
              </button>

              <button
                onClick={handleValidate}
                className={`px-3 py-1.5 text-sm border border-blue-500 text-blue-600 rounded-md hover:bg-blue-50 ${isValidated ? "cursor-not-allowed opacity-50" : ""}`}
                disabled={isValidated}
              >
                Validate
              </button>

              <button
                onClick={onFinalize}
                disabled={!isValidated}
                className={`px-3 py-1.5 text-sm rounded-md text-white
                  ${
                    isValidated
                      ? "bg-gray-800 hover:bg-black"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
              >
                Finalize
              </button>
            </>
          ) : (
            <>
              {isLoggedIn ? (
                <button
                  onClick={() => setIsSignoutOpen(true)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700"
                >
                  Sign Out
                </button>
              ) : (
                <span className="text-sm text-gray-400">Signed out</span>
              )}
            </>
          )}
        </div>
      </div>

      {children}

      {/* MODAL */}
      <ConfirmationModal
        cancelText="Cancel"
        confirmColor="danger"
        confirmText="Sign Out"
        isOpen={isSignoutOpen}
        message="Are you sure you want to sign out? Please ensure you have saved your work to prevent loss of progress"
        title="Sign out?"
        onClose={() => setIsSignoutOpen(false)}
        onConfirm={confirmSignout}
      />
    </div>
  );
}
