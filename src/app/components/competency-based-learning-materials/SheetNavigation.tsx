import { Link } from "react-router-dom";
import { cn } from "@/app/components/ui/utils";
import type { SheetNavItem } from "@/app/data/cblmData";
import { cblm, cblmBadge } from "./cblmClasses";

export function SheetNavigation({
  title,
  subtitle,
  items,
  activeId,
  backHref,
  backLabel,
}: {
  title: string;
  subtitle: string;
  items: SheetNavItem[];
  activeId?: string;
  backHref: string;
  backLabel: string;
}) {
  return (
    <div className={cblm.sheetNav}>
      <div className={cblm.snavHdr}>
        <div className={cblm.snavTitle}>{title}</div>
        <div className={cblm.snavSub}>{subtitle}</div>
      </div>
      <div className={cblm.snavBody}>
        {items.map((item) => {
          const inner = (
            <>
              <div
                className={cblm.sniDot}
                style={{ background: item.dotColor }}
              />
              <div>
                <div
                  className={cn(
                    cblm.sniLabel,
                    activeId === item.id && cblm.sniLabelActive,
                  )}
                >
                  {item.label}
                </div>
                <span className={cblmBadge(item.badgeClass, cblm.sniBadge)}>
                  {item.badge}
                </span>
              </div>
            </>
          );

          const itemClass = cn(
            cblm.snavItem,
            item.sub && cblm.snavItemSub,
            activeId === item.id && cblm.snavItemActive,
          );

          if (item.href) {
            return (
              <Link key={item.id} to={item.href} className={itemClass}>
                {inner}
              </Link>
            );
          }

          return (
            <div key={item.id} className={itemClass}>
              {inner}
            </div>
          );
        })}
      </div>
      <div className="border-t border-[#E8E8E8] px-3 py-2">
        <Link to={backHref} className="text-[11px] text-[#1565C0]">
          ← {backLabel}
        </Link>
      </div>
    </div>
  );
}
