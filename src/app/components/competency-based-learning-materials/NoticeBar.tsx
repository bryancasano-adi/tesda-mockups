import { ReactNode } from "react";
import { cblm } from "./cblmClasses";

export function NoticeBar({ children }: { children: ReactNode }) {
  return <div className={cblm.noticeBar}>{children}</div>;
}
