"use client";

import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  confirmColor?: "primary" | "secondary" | "success" | "warning" | "danger";
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  confirmColor = "primary",
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.title}>{title}</h2>

        <p style={styles.message}>{message}</p>

        <div style={styles.footer}>
          <button
            style={styles.cancelButton}
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </button>

          <button
            style={{
              ...styles.confirmButton,
              ...colorMap[confirmColor],
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- styles ---------- */

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    width: "100%",
    maxWidth: "420px",
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
  title: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 600,
  },
  message: {
    marginTop: "12px",
    fontSize: "14px",
    color: "#444",
  },
  footer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  cancelButton: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    background: "#f5f5f5",
    cursor: "pointer",
  },
  confirmButton: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },
};

/* ---------- color variants ---------- */

const colorMap: Record<string, React.CSSProperties> = {
  primary: { backgroundColor: "#2563eb" },
  secondary: { backgroundColor: "#6b7280" },
  success: { backgroundColor: "#16a34a" },
  warning: { backgroundColor: "#f59e0b" },
  danger: { backgroundColor: "#dc2626" },
};
