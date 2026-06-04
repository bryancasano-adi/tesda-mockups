import { ReactNode } from "react";
import { cblm } from "./cblmClasses";

export function CblmEditorLayout({
  sheetNav,
  toolbar,
  notice,
  children,
  sourcePanel,
}: {
  sheetNav: ReactNode;
  toolbar: ReactNode;
  notice: ReactNode;
  children: ReactNode;
  sourcePanel: ReactNode;
}) {
  return (
    <div className={cblm.editorRoot}>
      <div className="-m-6 flex h-[calc(100vh-2.5rem)] flex-col overflow-hidden bg-[#F5F5F5]">
        <div className={cblm.editorShell}>
          {sheetNav}
          <div className={cblm.editorCenter}>
            {toolbar}
            {notice}
            <div className={cblm.editorScroll}>{children}</div>
          </div>
          {sourcePanel}
        </div>
      </div>
    </div>
  );
}

export function CblmPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className={cblm.pageRoot}>
      <div className={cblm.pageShell}>
        <div className={cblm.pageContent}>{children}</div>
      </div>
    </div>
  );
}
