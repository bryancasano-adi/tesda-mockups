"use client";

import React, { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

type Crumb = {
  label: string;
  href?: string;
};

export const SECTOR_ID = "6271d427-bb95-4d6d-8fe1-85a7f28e1b33";
export const PROJECT_ID = "607e0c3a-35d4-4486-b140-f80aa07505bf";
export const DOCUMENT_ID = "2fa19c87-ccd0-4d0b-aa99-bc3a3e25be03";

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return React.createElement(
    "div",
    { className: "mb-4 text-sm text-gray-500 flex items-center gap-1" },
    items.map((item, i) =>
      React.createElement(
        "div",
        { key: i, className: "flex items-center gap-1" },
        item.href
          ? React.createElement(
              Link,
              {
                className: "hover:text-gray-900 hover:underline",
                to: item.href,
              },
              item.label,
            )
          : React.createElement(
              "span",
              { className: "text-gray-700 font-medium" },
              item.label,
            ),
        i < items.length - 1 && React.createElement("span", null, "›"),
      ),
    ),
  );
}

export function usePageNavigation() {
  const navigate = useNavigate();

  const navigateToPage = (page: string) => {
    if (page && page !== "") {
      navigate(`/cats/${page}`);
    }
  };

  return { navigateToPage };
}

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: "top" | "right" | "bottom" | "left";
}

export default function Tooltip({
  content,
  children,
  position = "top",
}: TooltipProps) {
  const positionStyles = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowStyles = {
    top: "top-full left-1/2 -translate-x-1/2",
    bottom: "bottom-full left-1/2 -translate-x-1/2",
    left: "left-full top-1/2 -translate-y-1/2",
    right: "right-full top-1/2 -translate-y-1/2",
  };

  return React.createElement(
    "span",
    { className: "relative inline-flex group" },
    children,
    React.createElement(
      "span",
      {
        className: `
          pointer-events-none
          absolute
          z-50
          hidden
          group-hover:block
          ${positionStyles[position]}
        `,
      },
      React.createElement(
        "span",
        {
          className: `
            relative
            max-w-[380px]
            w-max
            inline-block
            rounded-md
            bg-gray-900
            px-4
            py-2
            text-xs
            text-white
            leading-snug
            whitespace-normal
            break-words
            opacity-0
            transition-opacity
            duration-150
            group-hover:opacity-100
          `,
        },
        content,
        React.createElement("span", {
          className: `
              absolute
              h-2 w-2
              rotate-45
              bg-gray-900
              ${arrowStyles[position]}
            `,
        }),
      ),
    ),
  );
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
}: ModalProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  return React.createElement(
    "div",
    {
      className:
        "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
    },
    React.createElement(
      "div",
      {
        className: `bg-white rounded-lg shadow-xl ${sizeClasses[size]} w-full max-h-[90vh] overflow-hidden`,
      },
      // Header
      React.createElement(
        "div",
        {
          className:
            "flex items-center justify-between p-6 border-b border-gray-200",
        },
        React.createElement(
          "h2",
          { className: "text-lg font-semibold text-gray-900" },
          title,
        ),
        React.createElement(
          "button",
          {
            className: "text-gray-400 hover:text-gray-600 text-xl",
            onClick: onClose,
          },
          "✕",
        ),
      ),
      // Content
      React.createElement(
        "div",
        { className: "p-6 overflow-y-auto max-h-[calc(90vh-140px)]" },
        children,
      ),
      // Footer
      footer &&
        React.createElement(
          "div",
          {
            className:
              "flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50",
          },
          footer,
        ),
    ),
  );
}
