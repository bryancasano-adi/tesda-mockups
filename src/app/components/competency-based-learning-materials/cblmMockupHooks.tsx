import { useCallback, useEffect, useState } from "react";
import { cblm } from "./cblmClasses";

export function useCblmToast() {
  const [toast, setToast] = useState<{ msg: string; color: string } | null>(
    null,
  );

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const showToast = useCallback((msg: string, color = "#1565C0") => {
    setToast({ msg, color });
  }, []);

  return { toast, showToast };
}

export function useDropdown() {
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const close = () => setOpenId(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const toggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenId((prev) => (prev === id ? null : id));
  };

  return { openId, toggle, isOpen: (id: string) => openId === id };
}

export function useModal() {
  const [openId, setOpenId] = useState<string | null>(null);
  return {
    openId,
    open: (id: string) => setOpenId(id),
    close: () => setOpenId(null),
    isOpen: (id: string) => openId === id,
  };
}

export function useAiRegen(showToast: (msg: string, color?: string) => void) {
  const [openAi, setOpenAi] = useState<Record<string, boolean>>({});
  const [generating, setGenerating] = useState<Record<string, boolean>>({});

  const toggleAI = (id: string) => {
    setOpenAi((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const runRegen = (boxId: string, label: string) => {
    setGenerating((prev) => ({ ...prev, [boxId]: true }));
    setTimeout(() => {
      setGenerating((prev) => ({ ...prev, [boxId]: false }));
      setOpenAi((prev) => ({ ...prev, [boxId]: false }));
      showToast(`${label} regenerated successfully`, "#7C3AED");
    }, 1800);
  };

  return { openAi, generating, toggleAI, runRegen };
}

export function useSaveValidate(showToast: (msg: string, color?: string) => void) {
  const [saved, setSaved] = useState(false);
  const [validated, setValidated] = useState(false);

  const saveSheet = () => {
    setSaved(true);
    showToast("Sheet saved", "#2E7D32");
    setTimeout(() => setSaved(false), 2000);
  };

  const validateSheet = () => {
    setValidated(true);
    showToast("Sheet validated", "#2E7D32");
  };

  return { saved, validated, saveSheet, validateSheet };
}

export function CblmToast({
  toast,
}: {
  toast: { msg: string; color: string } | null;
}) {
  if (!toast) return null;
  return (
    <div className={cblm.toastWrap} style={{ background: toast.color }}>
      {toast.msg}
    </div>
  );
}
