import { ReactNode } from "react";
import { cblm } from "./cblmClasses";

export function CblmEditorLayout({
  sheetNav,
  toolbar,
  notice,
  children,
  sourcePanel,
}: {
  sheetNav: ReactNode | null;
  toolbar: ReactNode | null;
  notice: ReactNode | null;
  children: ReactNode;
  sourcePanel: ReactNode | null;
}) {
  const shellLayout = !toolbar && !notice;

  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden text-sm text-[#333]">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#F5F5F5]">
        <div className={cblm.editorShell}>
          {sheetNav}
          <div className={cblm.editorCenter}>
            {toolbar}
            {notice}
            {shellLayout ? (
              <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
                {children}
              </div>
            ) : (
              <div className={cblm.editorScroll}>{children}</div>
            )}
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
